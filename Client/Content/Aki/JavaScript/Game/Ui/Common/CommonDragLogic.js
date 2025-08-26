"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonDragItemLogic = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../UiLayer");
const CLICKCALLGAP = 0.1;
const MOVEPARENTDELAYTIME = 1;
const HEIGHTCANVASSORT = 100;
class CommonDragItemLogic {
  constructor(t, i, s, h) {
    this.CeaseAnimationPromise = undefined;
    this.uGo = undefined;
    this.YCo = undefined;
    this.Xy = -1;
    this.OnPointerDownCallBack = undefined;
    this.OnEndDragWhenOnScrollViewCallBack = undefined;
    this.OnMoveToScrollViewCallBack = undefined;
    this.OnRemoveFromScrollViewCallBack = undefined;
    this.ClickFunction = undefined;
    this.ClickFailFunction = undefined;
    this.OnBeginDragFunction = undefined;
    this.OnDragAnimationStartFunction = undefined;
    this.OnDragAnimationEndFunction = undefined;
    this.OnDragEndFunction = undefined;
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
    this.CheckList = undefined;
    this.CurrentStaying = undefined;
    this.Ego = false;
    this.Sgo = false;
    this.SPe = undefined;
    this.ygo = 0;
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
    this.Ngo = t => {
      if (this.uGo.CheckIfCanDrag() && !this.Sgo && (this.uGo.SetCurrentDragIndex(this.Xy), this.lgo = false, this.Uqe = 0, this.ugo = false, this._go = false, this.hgo = undefined, this.cgo = false, this.Gyt = TickSystem_1.TickSystem.Add(() => {
        this.Ogo();
        this.Uqe += Time_1.Time.DeltaTime;
      }, "DragTick", 0, true, undefined, true).Id, this.uGo.GetCurrentData())) {
        this.OnPointerDownCallBack?.(this.GetCurrentIndex());
      }
    };
    this.kgo = t => {
      var i;
      this.Fgo();
      this.Vgo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["OnPointUp", this.Xy]);
      }
      if (this.uGo.CheckIfCurrentDragIndex(this.Xy)) {
        this.uGo.ClearCurrentDragIndex();
        if (this.uGo.GetCurrentData()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["this.IfBeginDrag", this.cgo]);
          }
          i = this.Uqe < this.uGo.GetClickTime();
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
      if (this.uGo.CheckIfCurrentDragIndex(this.Xy) && this.uGo.GetCurrentData()) {
        this.hgo = t;
        if (!(this.Uqe < this.uGo.GetClickTime())) {
          this.TickCheckDrag();
        }
      }
    };
    this.Pgt = t => {
      if (this.uGo.CheckIfCurrentDragIndex(this.Xy)) {
        if (this.uGo.GetCurrentData()) {
          this.CurrentStaying = undefined;
          this._go = true;
          this.cgo = true;
        } else {
          this.uGo.ClearCurrentDragIndex();
        }
      }
    };
    this.Kgo = t => {
      if (this.uGo.GetCurrentData() && (this._go && (this.Uqe < this.uGo.GetClickTime() ? this.jgo() : this.xgo || this.OnDragEndFunction?.(this.uGo, this.CurrentStaying, this.xgo), this._go = false), this.xgo)) {
        this.xgo = false;
        this.Ego = false;
        this.OnEndDragWhenOnScrollViewCallBack?.(this.GetCurrentIndex(), this.uGo.GetCurrentData());
      }
    };
    this.K3t = t => {
      if (t === "Cease") {
        this.CeaseAnimationPromise.SetResult(true);
        this.OnDragAnimationEndFunction?.(this.GetCurrentIndex());
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
    this.Xy = s;
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
    this.uGo = h();
    this.uGo.SetDragComponent(this.YCo);
    this.uGo.SetCurrentIndex(s);
  }
  GetNormalParent() {
    return this.Dgo;
  }
  GetItem() {
    return this.uGo;
  }
  SetActive(t) {
    this.YCo?.RootUIComp.SetUIActive(t);
  }
  SetScrollViewItem(t) {
    var i = t.GetLGUISpaceAbsolutePositionByPivot(new Vector2D_1.Vector2D(0.5, 0.5).ToUeVector2D());
    var s = t.Width / 2;
    var h = i.X - s;
    var e = i.X + s;
    this.Ago.X = h;
    this.Ago.Y = e;
    s = t.Height / 2;
    var h = i.Y - s;
    var e = i.Y + s;
    this.Pgo.X = h;
    this.Pgo.Y = e;
  }
  Refresh(t) {
    this.uGo.SetCurrentData(t);
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
    return this.uGo.GetCurrentData();
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
    this.OnDragEndFunction = t;
  }
  SetMoveToScrollViewCallBack(t) {
    this.OnMoveToScrollViewCallBack = t;
  }
  SetRemoveFromScrollViewCallBack(t) {
    this.OnRemoveFromScrollViewCallBack = t;
  }
  SetEndDragWhenOnScrollViewCallBack(t) {
    this.OnEndDragWhenOnScrollViewCallBack = t;
  }
  SetOnUnOverlayCallBack(t) {
    this.uGo.SetOnUnOverlayCallBack(t);
  }
  SetOnOverlayCallBack(t) {
    this.uGo.SetOnOverlayCallBack(t);
  }
  SetPointerDownCallBack(t) {
    this.OnPointerDownCallBack = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.OnDragAnimationStartFunction = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.OnDragAnimationEndFunction = t;
  }
  SetOnClickCallBack(t) {
    this.ClickFunction = t;
  }
  SetOnClickFailCallBack(t) {
    this.ClickFailFunction = t;
  }
  SetOnBeginDragCall(t) {
    this.OnBeginDragFunction = t;
  }
  SetDragCheckItem(t) {
    var i = [];
    for (const s of t) {
      i.push(s.GetItem());
    }
    this.CheckList = i;
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
    this.CurrentStaying = undefined;
  }
  GetStayingItem() {
    return this.CurrentStaying;
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
      this.OnDragAnimationEndFunction?.(this.GetCurrentIndex());
    }
  }
  Jgo() {
    this.TickCheckDrag();
    this.SPe.PlayLevelSequenceByName("Drag");
    this.Ego = true;
    this.OnDragAnimationStartFunction?.(this.GetCurrentIndex());
  }
  Ogo() {
    if (this.Qgo() >= 2 || this.Qgo() === 0) {
      this.Fgo();
    } else if (this.Uqe >= this.uGo.GetClickTime() && (this.Fgo(), this.uGo.GetCurrentData()) && (this.ugo || (this.Jgo(), this.ugo = true), this.OnBeginDragFunction && this.OnBeginDragFunction(this.Xy), this.hgo)) {
      this.Agt(this.hgo);
    }
  }
  jgo(t = false) {
    if (t || this.Wgo()) {
      this.ClickFunction?.(this.Xy);
      this.L6e = TimeUtil_1.TimeUtil.GetServerTime();
      return this.lgo = true;
    } else {
      this.lgo = false;
      this.ClickFailFunction?.(this.Xy);
      return false;
    }
  }
  Hgo() {
    return !!Info_1.Info.IsInGamepad() || TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > CLICKCALLGAP;
  }
  Wgo() {
    return this.Uqe < this.uGo.GetClickTime() && this.Hgo();
  }
  Ygo() {
    const i = new Array();
    let t = undefined;
    this.CheckList?.forEach(t => {
      if (!t.CheckIfSelfItem(this.Xy)) {
        if (t.CheckOverlap(this.uGo.GetBounceX(), this.uGo.GetBounceY())) {
          i.push(t);
        }
      }
    });
    var s = this.uGo.GetOverlapIndex(i);
    if (this.CheckList && s >= 0) {
      t = this.CheckList[s];
    }
    if (this.CurrentStaying !== t) {
      this.CurrentStaying?.OnUnOverlay();
      t?.OnOverlay();
    }
    this.CurrentStaying = t;
    if (this.Ago.X !== 0) {
      if (this.uGo.CheckOverlap(this.Ago, this.Pgo)) {
        if (!this.xgo) {
          this.OnMoveToScrollViewCallBack?.(this.GetCurrentIndex());
          this.xgo = true;
        }
      } else if (this.xgo) {
        this.OnRemoveFromScrollViewCallBack?.(this.GetCurrentIndex());
        this.xgo = false;
      }
    }
  }
  GetMiddlePosition() {
    return [this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X, this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y];
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
exports.CommonDragItemLogic = CommonDragItemLogic;
//# sourceMappingURL=CommonDragLogic.js.map