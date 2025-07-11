"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionCommonDragItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CLICKTIME = 300;
const CLICKCALLGAP = 1;
const MOVEPARENTDELAYTIME = 1;
const HEIGHTCANVASSORT = 100;
class VisionCommonDragItem {
  constructor(t, i, s, e) {
    this.CeaseAnimationPromise = undefined;
    this.YCo = undefined;
    this.Xy = -1;
    this.JCo = undefined;
    this.zCo = undefined;
    this.ZCo = undefined;
    this.ego = undefined;
    this.tgo = undefined;
    this.igo = undefined;
    this.Tbt = undefined;
    this.ogo = undefined;
    this.rgo = undefined;
    this.ngo = undefined;
    this.sgo = undefined;
    this.ago = undefined;
    this.hgo = undefined;
    this.lgo = false;
    this.Uqe = 0;
    this._go = false;
    this.ugo = false;
    this.Gyt = TickSystem_1.TickSystem.InvalidId;
    this.cgo = false;
    this.mgo = TickSystem_1.TickSystem.InvalidId;
    this.L6e = 0;
    this.dgo = Vector_1.Vector.Create();
    this.Cgo = undefined;
    this.ggo = 0;
    this.fgo = 0;
    this.pgo = new Vector2D_1.Vector2D(0, 0);
    this.vgo = new Vector2D_1.Vector2D(0, 0);
    this.Mgo = new Array();
    this.Ego = false;
    this.Sgo = false;
    this.SPe = undefined;
    this.ygo = 0;
    this.$8i = undefined;
    this.Igo = undefined;
    this.Tgo = undefined;
    this.Lgo = undefined;
    this.Dgo = undefined;
    this.Rgo = undefined;
    this.Ugo = undefined;
    this.Ago = new Vector2D_1.Vector2D(0, 0);
    this.Pgo = new Vector2D_1.Vector2D(0, 0);
    this.xgo = false;
    this.wgo = new Vector2D_1.Vector2D(0, 0);
    this.Bgo = false;
    this.bgo = new Vector2D_1.Vector2D(0, 0);
    this.qgo = false;
    this.fLt = undefined;
    this.Ggo = false;
    this.Ngo = t => {
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() && !this.Sgo && (ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(this.Xy), this.lgo = false, this.Uqe = 0, this.ugo = false, this._go = false, this.hgo = undefined, this.cgo = false, this.Gyt = TickSystem_1.TickSystem.Add(() => {
        this.Ogo();
        this.Uqe += Time_1.Time.DeltaTime;
      }, "DragTick", 0, true, undefined, true).Id, this.$8i)) {
        this.JCo?.(this.GetCurrentIndex());
      }
    };
    this.kgo = t => {
      var i;
      this.Fgo();
      this.Vgo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["OnPointUp", this.Xy]);
      }
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy)) {
        ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex();
        if (this.Ggo) {
          if (this.Hgo()) {
            this.jgo(true);
          } else {
            this.jgo();
          }
        } else if (this.$8i) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["this.IfBeginDrag", this.cgo]);
          }
          i = this.Uqe < CLICKTIME;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["timeState", i]);
          }
          if (!this.cgo) {
            this.jgo();
          }
        } else if (this.Wgo()) {
          this.jgo(true);
        }
      }
    };
    this.Agt = t => {
      if (!this.Ggo) {
        if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy) && this.$8i) {
          this.hgo = t;
          if (!(this.Uqe < CLICKTIME)) {
            this.TickCheckDrag();
          }
        }
      }
    };
    this.Pgt = t => {
      if (!this.Ggo) {
        if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy)) {
          if (this.$8i) {
            this.Mgo = [];
            this._go = true;
            this.cgo = true;
          } else {
            ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex();
          }
        }
      }
    };
    this.Kgo = t => {
      if (!this.Ggo) {
        if (this.$8i && (this._go && (this.Uqe < CLICKTIME ? this.jgo() : this.xgo || this.ago?.(this, this.Mgo, this.xgo), this._go = false), this.xgo)) {
          this.xgo = false;
          this.Ego = false;
          this.ego?.(this.GetCurrentIndex(), this.$8i);
        }
      }
    };
    this.K3t = t => {
      if (t === "Cease") {
        this.CeaseAnimationPromise.SetResult(true);
        this.sgo?.(this.GetCurrentIndex());
      }
    };
    this.TickDoCeaseAnimation = async t => {
      var i = await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(t, this.bgo.X, this.wgo.X);
      var t = await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(t, this.bgo.Y, this.wgo.Y);
      if (this.Bgo && this.qgo) {
        this.Ugo.SetLGUISpaceAbsolutePosition(new UE.Vector(i, t, 0));
      }
    };
    this.Rgo = new UE.Vector2D(0, 0);
    this.Dgo = t;
    this.YCo = i;
    this.Xy = e;
    this.Lgo = i.RootUIComp.GetParentAsUIItem();
    i.OnPointerDownCallBack.Bind(this.Ngo);
    i.OnPointerUpCallBack.Bind(this.kgo);
    i.OnPointerDragCallBack.Bind(this.Agt);
    i.OnPointerBeginDragCallBack.Bind(this.Pgt);
    i.OnPointerEndDragCallBack.Bind(this.Kgo);
    t = this.YCo.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    this.Ugo = t;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.SPe.BindSequenceCloseEvent(this.K3t);
    this.fLt = i.GetOwner().GetComponentByClass(UE.LGUICanvas.StaticClass());
  }
  GetNormalParent() {
    return this.Dgo;
  }
  SetActive(t) {
    this.YCo?.RootUIComp.SetUIActive(t);
  }
  SetScrollViewItem(t) {
    var i = t.GetLGUISpaceAbsolutePositionByPivot(new Vector2D_1.Vector2D(0.5, 0.5).ToUeVector2D());
    var s = t.Width / 2;
    var e = i.X - s;
    var h = i.X + s;
    this.Ago.X = e;
    this.Ago.Y = h;
    s = t.Height / 2;
    var e = i.Y - s;
    var h = i.Y + s;
    this.Pgo.X = e;
    this.Pgo.Y = h;
  }
  Refresh(t, i) {
    this.$8i = t;
    this.Ggo = i;
  }
  StartClickCheckTimer() {
    this.Vgo();
    this.mgo = TickSystem_1.TickSystem.Add(() => {
      if (this.Qgo() === 0) {
        this.kgo(undefined);
        this.Vgo();
      }
    }, "DragTick", 0, true, undefined, true).Id;
  }
  GetAnimationTargetPos() {
    return this.Tgo;
  }
  SetDragItemHierarchyMax() {
    this.Ugo.SetAsLastHierarchy();
    this.fLt.SetSortOrder(HEIGHTCANVASSORT + 1, true);
  }
  GetCurrentData() {
    return this.$8i;
  }
  CacheStartDragPosition() {
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    var i = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.Igo = new Vector2D_1.Vector2D(i.X, i.Y);
    this.Tgo = new Vector2D_1.Vector2D(t.X, t.Y);
  }
  Xgo() {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4);
    var t = new UE.Vector(1, 1, 1);
    this.YCo.RootUIComp.SetUIItemScale(t);
    this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo);
    this.YCo.RootUIComp.SetVerticalStretch(this.Rgo);
    this.fLt.SetSortOrder(0, true);
    this.YCo.RootUIComp.SetBubbleUpToParent(true);
  }
  StartDragState() {
    this.CacheStartDragPosition();
    this.Sgo = true;
    this.xgo = false;
    this.YCo.RootUIComp.SetAnchorAlign(2, 2);
    this.ggo = this.YCo.RootUIComp.Width;
    this.fgo = this.YCo.RootUIComp.Height;
    this.ygo = 0;
    this.fLt.SetSortOrder(HEIGHTCANVASSORT, true);
    this.YCo.RootUIComp.SetBubbleUpToParent(false);
  }
  ResetPosition() {
    this.SPe.StopSequenceByKey("Drag", false, true);
    if (this.Ego) {
      this.$go();
    }
    this.Ego = false;
    if (this.Sgo) {
      this.Xgo();
      if (this.Igo) {
        this.YCo.RootUIComp.SetAnchorOffset(this.Rgo);
      }
      this.Sgo = false;
    }
  }
  SetToTargetParentAndSetStretch(t) {}
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.Lgo);
  }
  SetDragSuccessCallBack(t) {
    this.ago = t;
  }
  SetMoveToScrollViewCallBack(t) {
    this.tgo = t;
  }
  SetRemoveFromScrollViewCallBack(t) {
    this.igo = t;
  }
  SetEndDragWhenOnScrollViewCallBack(t) {
    this.ego = t;
  }
  SetOnUnOverlayCallBack(t) {
    this.ZCo = t;
  }
  SetOnOverlayCallBack(t) {
    this.zCo = t;
  }
  SetPointerDownCallBack(t) {
    this.JCo = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.ngo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.sgo = t;
  }
  SetOnClickCallBack(t) {
    this.Tbt = t;
  }
  SetOnClickFailCallBack(t) {
    this.ogo = t;
  }
  SetOnBeginDragCall(t) {
    this.rgo = t;
  }
  SetDragCheckItem(t) {
    this.Cgo = t;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  TickCheckDrag() {
    if (this.ygo <= MOVEPARENTDELAYTIME) {
      this.ygo++;
    } else {
      this.SetItemToPointerPosition();
      this.Ygo();
    }
  }
  ClearStayingItem() {
    this.Mgo = [];
  }
  GetStayingItem() {
    return this.Mgo;
  }
  SetItemToPointerPosition() {
    var t;
    var i;
    var s;
    if (this.Sgo) {
      s = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
      (s = Vector2D_1.Vector2D.Create(s.X, s.Y)).FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(s.ToUeVector2D(true)));
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir();
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
      i = s.X + i;
      s = s.Y + t;
      if (this.dgo.X !== i || this.dgo.Y !== s) {
        this.dgo.X = i;
        this.dgo.Y = s;
        this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(new UE.Vector(i, s, 0));
      }
    }
  }
  Vgo() {
    if (this.mgo !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.mgo);
      this.mgo = TickSystem_1.TickSystem.InvalidId;
    }
  }
  CheckAndGetCurrentClickState() {
    return this.lgo;
  }
  Fgo() {
    if (this.Gyt !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.Gyt);
      this.Gyt = TickSystem_1.TickSystem.InvalidId;
    }
  }
  Qgo() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(0);
    var i = LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(1);
    let s = 0;
    if (t) {
      s++;
    }
    if (i) {
      s++;
    }
    return s;
  }
  DoCeaseSequence() {
    this.Ego = false;
    this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise();
    this.SPe.PlayLevelSequenceByName("Cease");
  }
  GetCeaseAnimationPromise() {
    return this.CeaseAnimationPromise;
  }
  $go() {
    if (this.Ego) {
      this.SPe.PlayLevelSequenceByName("Fail");
      this.sgo?.(this.GetCurrentIndex());
    }
  }
  Jgo() {
    if (!this.Ggo) {
      this.TickCheckDrag();
      this.SPe.PlayLevelSequenceByName("Drag");
      this.Ego = true;
      this.ngo?.(this.GetCurrentIndex());
    }
  }
  Ogo() {
    if (this.Qgo() >= 2 || this.Qgo() === 0) {
      this.Fgo();
    } else if (this.Uqe >= CLICKTIME && (this.Fgo(), this.$8i) && (this.ugo || (this.Jgo(), this.ugo = true), this.rgo && this.rgo(this.Xy), this.hgo)) {
      this.Agt(this.hgo);
    }
  }
  jgo(t = false) {
    if (t || this.Wgo()) {
      this.Tbt?.(this.Xy);
      this.L6e = TimeUtil_1.TimeUtil.GetServerTime();
      return this.lgo = true;
    } else {
      this.lgo = false;
      this.ogo?.(this.Xy);
      return false;
    }
  }
  Hgo() {
    return !!Info_1.Info.IsInGamepad() || TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > CLICKCALLGAP;
  }
  Wgo() {
    return this.Uqe < CLICKTIME && this.Hgo();
  }
  Ygo() {
    const i = new Array();
    this.Cgo?.forEach(t => {
      if (!t.CheckIfSelfItem(this.Xy)) {
        if (t.CheckOverlap(this.zgo(), this.Zgo())) {
          i.push(t);
        }
      }
    });
    this.Mgo.forEach(t => {
      if (!i.includes(t)) {
        t.e0o();
      }
    });
    i.forEach(t => {
      if (!this.Mgo.includes(t)) {
        t.t0o();
      }
    });
    this.Mgo = i;
    if (this.Ago.X !== 0) {
      if (this.CheckOverlap(this.Ago, this.Pgo)) {
        if (!this.xgo) {
          this.tgo?.(this.GetCurrentIndex());
          this.xgo = true;
        }
      } else if (this.xgo) {
        this.igo?.(this.GetCurrentIndex());
        this.xgo = false;
      }
    }
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  CheckOverlap(t, i) {
    var s = t.X;
    var t = t.Y;
    var e = i.X;
    var i = i.Y;
    var h = this.zgo().X;
    var r = this.zgo().Y;
    var a = this.Zgo().X;
    var o = this.Zgo().Y;
    return s < r && h < t && e < o && a < i;
  }
  zgo() {
    var t = this.YCo.RootUIComp;
    var i = this.ggo / 2;
    var s = t.GetLGUISpaceCenterAbsolutePosition().X - i;
    var t = t.GetLGUISpaceCenterAbsolutePosition().X + i;
    this.pgo.X = s;
    this.pgo.Y = t;
    return this.pgo;
  }
  Zgo() {
    var t = this.YCo.RootUIComp;
    var i = this.fgo / 2;
    var s = t.GetLGUISpaceCenterAbsolutePosition().Y - i;
    var t = t.GetLGUISpaceCenterAbsolutePosition().Y + i;
    this.vgo.X = s;
    this.vgo.Y = t;
    return this.vgo;
  }
  e0o() {
    this.ZCo?.(this.GetCurrentIndex());
  }
  t0o() {
    this.zCo?.(this.GetCurrentIndex());
  }
  GetMiddlePosition() {
    return [this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X, this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y];
  }
  static GetOverlapIndex(t, i) {
    var s = i.length;
    var t = t.GetMiddlePosition();
    let e = i[0].GetCurrentIndex();
    var h = i[0].GetMiddlePosition();
    var r = t[0] * t[0];
    var a = t[1] * t[1];
    let o = Math.abs(r - h[0] * h[0]) + Math.abs(a - h[1] * h[1]);
    for (let t = 0; t < s; t++) {
      var h = i[t].GetMiddlePosition();
      var n = Math.abs(r - h[0] * h[0]) + Math.abs(a - h[1] * h[1]);
      if (o > n) {
        o = n;
        e = i[t].GetCurrentIndex();
      }
    }
    return e;
  }
  SetDragComponentToTargetPositionParam(t) {
    this.Bgo = true;
    this.wgo.X = t.X;
    this.wgo.Y = t.Y;
    t = this.Ugo.GetLGUISpaceAbsolutePosition();
    this.bgo.X = t.X;
    this.bgo.Y = t.Y;
  }
  SetMovingState(t) {
    this.qgo = t;
  }
}
exports.VisionCommonDragItem = VisionCommonDragItem;
//# sourceMappingURL=VisionCommonDragItem.js.map