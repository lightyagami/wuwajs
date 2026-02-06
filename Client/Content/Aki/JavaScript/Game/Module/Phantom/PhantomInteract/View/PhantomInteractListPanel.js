"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractListPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const PhantomInteractListItem_1 = require("./PhantomInteractListItem");
const PhantomInteractListLongPressPanel_1 = require("./PhantomInteractListLongPressPanel");
const allTogItems = [0, 1, 2, 3, 4, 5, 6, 7];
class LongPressContext {
  constructor(t) {
    this.Param = t;
    this.zDf = 0;
    this.JDf = false;
    this.ZDf = false;
    this.j9i = 0;
    this.W9i = 0;
  }
  Reset() {
    this.zDf = 0;
    this.ZDf = false;
    this.JDf = false;
  }
  Start() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane();
    this.j9i = t.X;
    this.W9i = t.Z;
  }
  CheckIsMoved() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane();
    var s = this.j9i - t.X;
    var t = this.W9i - t.Z;
    return Math.abs(s) + Math.abs(t) > this.Param.InvalidMoveDistance;
  }
  Update(t) {
    this.zDf += t;
    t = [false, false];
    if (!this.JDf && this.zDf >= this.Param.BeforeLongPressThreshold) {
      this.JDf = true;
      t[0] = true;
    }
    if (!this.ZDf && this.LongPressProgress >= 1) {
      this.ZDf = true;
      t[1] = true;
    }
    return [t[0], t[1]];
  }
  IsBeforeLongPressThreshold() {
    return this.zDf < this.Param.BeforeLongPressThreshold;
  }
  IsLongPressing() {
    return this.zDf >= this.Param.BeforeLongPressThreshold;
  }
  get LongPressProgress() {
    var t = this.zDf - this.Param.BeforeLongPressThreshold;
    var s = Math.max(this.Param.LongPressThreshold, 0.01);
    return Math.max(Math.min(t / s, 1), 0);
  }
}
class PhantomInteractListPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.UseLongPress = t;
    this.hMf = [];
    this.lMf = undefined;
    this.eUf = undefined;
    this.tUf = undefined;
    this.iUf = TickSystem_1.TickSystem.InvalidId;
    this.rUf = undefined;
    this.OnClickCb = undefined;
    this.OnHoverCb = undefined;
    this.HRu = -1;
    this.oUf = () => {
      var [t, s] = this.tUf.Update(Time_1.Time.DeltaTime);
      if (!this.tUf.IsBeforeLongPressThreshold()) {
        if (this.tUf.CheckIsMoved()) {
          this.nUf(this.rUf);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("PhantomInteraction", 95, "Long press cancelled due to movement");
          }
        } else {
          if (t) {
            this.T7i();
          }
          if (this.tUf.LongPressProgress < 1) {
            this.lMf?.SetUiActive(true);
            this.lMf?.SetFillProgress(this.tUf.LongPressProgress);
          } else {
            this.lMf?.SetUiActive(false);
          }
          if (s && this.OnHoverCb && this.rUf) {
            this.OnHoverCb(this.rUf, true);
          }
        }
      }
    };
    this.rMf = t => {
      if (this.OnClickCb) {
        this.OnClickCb(t);
      }
    };
    this._Mf = (t, s) => {
      if (this.OnHoverCb) {
        this.OnHoverCb(t, s);
      }
    };
    this.sUf = t => {
      if (!(t.MonsterId <= 0)) {
        this.Gtd();
        this.rUf = t;
        this.iUf = TickSystem_1.TickSystem.Add(this.oUf, "PhantomInteractDetailPressTick", 0, true, undefined, true).Id;
        this.tUf?.Reset();
        this.tUf?.Start();
        this.lMf?.SetFillProgress(0);
      }
    };
    this.nUf = t => {
      if (this.tUf.IsBeforeLongPressThreshold()) {
        if (this.OnClickCb) {
          this.OnClickCb(t);
        }
      } else if (this.OnHoverCb) {
        this.OnHoverCb(t, false);
      }
      this.Gtd();
      this.rUf = undefined;
      this.lMf?.SetUiActive(false);
      this.tUf.Reset();
    };
    this.bsg = (t, s, e) => {
      s = s.ItemIndex === this.HRu;
      if (e !== s) {
        t.SetSelected(s);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (const h of allTogItems) {
      var s = this.GetItem(h);
      var e = new PhantomInteractListItem_1.PhantomInteractListItem();
      this.hMf.push(e);
      t.push(e.CreateByActorAsync(s.GetOwner()));
    }
    this.lMf = new PhantomInteractListLongPressPanel_1.PhantomInteractListLongPressPanel();
    t.push(this.lMf.CreateByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(t);
    for (const r of this.hMf) {
      r.SetUiActive(true);
      if (this.UseLongPress) {
        r.OnPointerDownCb = this.sUf;
        r.OnPointerUpCb = this.nUf;
      } else {
        r.OnClickCb = this.rMf;
        r.OnHoverCb = this._Mf;
      }
      r.OnToggleStateChangeCb = this.bsg;
    }
    this.lMf.SetUiActive(false);
    var i = PhantomInteractListPanel.aUf();
    this.eUf = i;
    this.tUf = new LongPressContext(i);
  }
  T7i() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    var s = this.eUf.OffsetX;
    var e = this.eUf.OffsetY;
    var s = t.X + s;
    var t = t.Y + e;
    this.GetItem(8).SetLGUISpaceAbsolutePosition(new UE.Vector(s, t, 0));
  }
  Gtd() {
    if (this.iUf !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.iUf);
      this.iUf = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnBeforeDestroy() {
    this.Gtd();
  }
  Refresh(s, e, i = true) {
    for (let t = 0; t < this.hMf.length; t++) {
      var h = s[t];
      this.hMf[t].Refresh(h, e, i);
    }
  }
  SetSelectedItem(t) {
    this.HRu = t;
    for (const s of this.hMf) {
      s.SetSelected(t === s.ItemIndex);
    }
  }
  static aUf() {
    return {
      BeforeLongPressThreshold: CommonParamById_1.configCommonParamById.GetIntConfig("PhantomInteractBeforeLongPressTime") ?? 0,
      LongPressThreshold: CommonParamById_1.configCommonParamById.GetIntConfig("PhantomInteractLongPressTime") ?? 0,
      InvalidMoveDistance: CommonParamById_1.configCommonParamById.GetIntConfig("PhantomInteractLongPressMoveDistance") ?? 0,
      OffsetX: CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetX") ?? 0,
      OffsetY: CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetY") ?? 0
    };
  }
}
exports.PhantomInteractListPanel = PhantomInteractListPanel;
//# sourceMappingURL=PhantomInteractListPanel.js.map