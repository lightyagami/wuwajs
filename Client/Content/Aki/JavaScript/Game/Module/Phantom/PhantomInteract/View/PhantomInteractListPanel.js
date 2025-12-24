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
    this.wwf = 0;
    this.Rwf = false;
    this.Lwf = false;
    this.j9i = 0;
    this.W9i = 0;
  }
  Reset() {
    this.wwf = 0;
    this.Lwf = false;
    this.Rwf = false;
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
    this.wwf += t;
    t = [false, false];
    if (!this.Rwf && this.wwf >= this.Param.BeforeLongPressThreshold) {
      this.Rwf = true;
      t[0] = true;
    }
    if (!this.Lwf && this.LongPressProgress >= 1) {
      this.Lwf = true;
      t[1] = true;
    }
    return [t[0], t[1]];
  }
  IsBeforeLongPressThreshold() {
    return this.wwf < this.Param.BeforeLongPressThreshold;
  }
  IsLongPressing() {
    return this.wwf >= this.Param.BeforeLongPressThreshold;
  }
  get LongPressProgress() {
    var t = this.wwf - this.Param.BeforeLongPressThreshold;
    var s = Math.max(this.Param.LongPressThreshold, 0.01);
    return Math.max(Math.min(t / s, 1), 0);
  }
}
class PhantomInteractListPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.UseLongPress = t;
    this.Egf = [];
    this.Igf = undefined;
    this.Pwf = undefined;
    this.Awf = undefined;
    this.Dwf = TickSystem_1.TickSystem.InvalidId;
    this.Uwf = undefined;
    this.OnClickCb = undefined;
    this.OnHoverCb = undefined;
    this.HRu = -1;
    this.xwf = () => {
      var [t, s] = this.Awf.Update(Time_1.Time.DeltaTime);
      if (!this.Awf.IsBeforeLongPressThreshold()) {
        if (this.Awf.CheckIsMoved()) {
          this.Bwf(this.Uwf);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("PhantomInteraction", 95, "Long press cancelled due to movement");
          }
        } else {
          if (t) {
            this.T7i();
          }
          if (this.Awf.LongPressProgress < 1) {
            this.Igf?.SetUiActive(true);
            this.Igf?.SetFillProgress(this.Awf.LongPressProgress);
          } else {
            this.Igf?.SetUiActive(false);
          }
          if (s && this.OnHoverCb && this.Uwf) {
            this.OnHoverCb(this.Uwf, true);
          }
        }
      }
    };
    this.pgf = t => {
      if (this.OnClickCb) {
        this.OnClickCb(t);
      }
    };
    this.Tgf = (t, s) => {
      if (this.OnHoverCb) {
        this.OnHoverCb(t, s);
      }
    };
    this.kwf = t => {
      if (!(t.MonsterId <= 0)) {
        this.Gtd();
        this.Uwf = t;
        this.Dwf = TickSystem_1.TickSystem.Add(this.xwf, "PhantomInteractDetailPressTick", 0, true, undefined, true).Id;
        this.Awf?.Reset();
        this.Awf?.Start();
        this.Igf?.SetFillProgress(0);
      }
    };
    this.Bwf = t => {
      if (this.Awf.IsBeforeLongPressThreshold()) {
        if (this.OnClickCb) {
          this.OnClickCb(t);
        }
      } else if (this.OnHoverCb) {
        this.OnHoverCb(t, false);
      }
      this.Gtd();
      this.Uwf = undefined;
      this.Igf?.SetUiActive(false);
      this.Awf.Reset();
    };
    this.sQf = (t, s, e) => {
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
      this.Egf.push(e);
      t.push(e.CreateByActorAsync(s.GetOwner()));
    }
    this.Igf = new PhantomInteractListLongPressPanel_1.PhantomInteractListLongPressPanel();
    t.push(this.Igf.CreateByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(t);
    for (const r of this.Egf) {
      r.SetUiActive(true);
      if (this.UseLongPress) {
        r.OnPointerDownCb = this.kwf;
        r.OnPointerUpCb = this.Bwf;
      } else {
        r.OnClickCb = this.pgf;
        r.OnHoverCb = this.Tgf;
      }
      r.OnToggleStateChangeCb = this.sQf;
    }
    this.Igf.SetUiActive(false);
    var i = PhantomInteractListPanel.qwf();
    this.Pwf = i;
    this.Awf = new LongPressContext(i);
  }
  T7i() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    var s = this.Pwf.OffsetX;
    var e = this.Pwf.OffsetY;
    var s = t.X + s;
    var t = t.Y + e;
    this.GetItem(8).SetLGUISpaceAbsolutePosition(new UE.Vector(s, t, 0));
  }
  Gtd() {
    if (this.Dwf !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.Dwf);
      this.Dwf = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnBeforeDestroy() {
    this.Gtd();
  }
  Refresh(s, e, i = true) {
    for (let t = 0; t < this.Egf.length; t++) {
      var h = s[t];
      this.Egf[t].Refresh(h, e, i);
    }
  }
  SetSelectedItem(t) {
    this.HRu = t;
    for (const s of this.Egf) {
      s.SetSelected(t === s.ItemIndex);
    }
  }
  static qwf() {
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