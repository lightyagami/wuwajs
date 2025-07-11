"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDragItem = undefined;
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
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CLICKTIME = 300;
const CLICKCALLGAP = 1;
const MOVEPARENTDELAYTIME = 1;
class VisionDragItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s, e, h) {
    super();
    this.CeaseAnimationPromise = undefined;
    this.YCo = undefined;
    this.i0o = undefined;
    this.o0o = undefined;
    this.Xy = -1;
    this.$8i = undefined;
    this.JCo = undefined;
    this.OnOverlayCallBack = undefined;
    this.OnUnOverlayCallBack = undefined;
    this.ClickFunction = undefined;
    this.ClickFailFunction = undefined;
    this.rgo = undefined;
    this.pgo = new Vector2D_1.Vector2D(0, 0);
    this.vgo = new Vector2D_1.Vector2D(0, 0);
    this.SPe = undefined;
    this.Igo = undefined;
    this.r0o = undefined;
    this.Tgo = undefined;
    this.Gyt = TickSystem_1.TickSystem.InvalidId;
    this.mgo = TickSystem_1.TickSystem.InvalidId;
    this.hgo = undefined;
    this.Mgo = new Array();
    this.Uqe = 0;
    this.Cgo = undefined;
    this.ago = undefined;
    this.ngo = undefined;
    this.sgo = undefined;
    this.Dgo = undefined;
    this.dgo = Vector_1.Vector.Create();
    this.n0o = Vector_1.Vector.Create();
    this.Ugo = undefined;
    this.Sgo = false;
    this._go = false;
    this.lgo = false;
    this.L6e = 0;
    this.ugo = false;
    this.Ego = false;
    this.Rgo = undefined;
    this.wqe = undefined;
    this.ggo = 0;
    this.fgo = 0;
    this.ygo = 0;
    this.K3t = t => {
      if (t === "Cease") {
        this.CeaseAnimationPromise.SetResult(true);
        this.sgo?.(this.GetCurrentIndex());
      }
    };
    this.OnDragBegin = t => {
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy)) {
        this.n0o.X = this.YCo.RootUIComp.GetAnchorOffsetX();
        this.n0o.Y = this.YCo.RootUIComp.GetAnchorOffsetY();
        this.Mgo = [];
        this._go = true;
        this.OnBeginDrag();
      }
    };
    this.OnPointerDown = t => {
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() && (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() && ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(this.Xy), this.lgo = false, this.Uqe = 0, this.ugo = false, this._go = false, this.CeaseAnimationPromise = undefined, this.hgo = undefined, this.cgo = false, this.Gyt = TickSystem_1.TickSystem.Add(() => {
        this.Ogo();
        this.Uqe += Time_1.Time.DeltaTime;
      }, "DragTick", 0, true, undefined, true).Id, this.$8i)) {
        this.JCo?.(this.GetCurrentIndex());
      }
    };
    this.OnPointUp = t => {
      var i;
      this.Fgo();
      this.Vgo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "OnPointUp", ["OnPointUp", this.Xy]);
      }
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy)) {
        ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex();
        if (this.$8i) {
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
    this.cgo = false;
    this.OnDragEnd = t => {
      if (this.$8i && this._go) {
        if (this.Uqe < CLICKTIME) {
          this.jgo();
        } else {
          this.ago?.(this, this.Mgo);
        }
        this._go = false;
      }
    };
    this.Agt = t => {
      if (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(this.Xy) && this.$8i) {
        this.hgo = t;
        if (!(this.Uqe < CLICKTIME)) {
          this.TickCheckDrag();
        }
      }
    };
    this.YCo = i;
    this.Ugo = this.YCo.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    this.i0o = s;
    this.o0o = e;
    this.Xy = h;
    this.Dgo = t;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.Ugo);
    this.SPe.BindSequenceCloseEvent(this.K3t);
    this.wqe = t;
    this.Rgo = Vector2D_1.Vector2D.Create(0, 0).ToUeVector2D();
    this.ggo = t.Width;
    this.fgo = t.Width;
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  SetDragItemHierarchyMax() {
    this.GetDragRoot().SetAsLastHierarchy();
  }
  GetDragRoot() {
    return this.Ugo;
  }
  SetDragCheckItem(t) {
    this.Cgo = t;
  }
  SetDraggingParent(t) {
    this.r0o = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.ngo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.sgo = t;
  }
  SetOnClickCallBack(t) {
    this.ClickFunction = t;
  }
  SetOnClickFailCallBack(t) {
    this.ClickFailFunction = t;
  }
  SetOnBeginDragCall(t) {
    this.rgo = t;
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
  CheckAndGetCurrentClickState() {
    return this.lgo;
  }
  SetDragSuccessCallBack(t) {
    this.ago = t;
  }
  GetAnimationTargetPos() {
    return this.Tgo;
  }
  ClearStayingItem() {
    this.Mgo = [];
  }
  GetStayingItem() {
    return this.Mgo;
  }
  DoDragSequence() {
    this.TickCheckDrag();
    this.SPe.PlayLevelSequenceByName("Drag");
    this.Ego = true;
    this.ngo?.(this.GetCurrentIndex());
  }
  DoCeaseSequence() {
    this.Ego = false;
    this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise();
    this.SPe.PlayLevelSequenceByName("Cease");
  }
  $go() {
    if (this.Ego) {
      this.SPe.PlayLevelSequenceByName("Fail");
      this.sgo?.(this.GetCurrentIndex());
    }
  }
  ResetPositionThenStartDragState() {
    this.ResetPosition();
    this.StartDragState();
  }
  CacheStartDragPosition() {
    this.YCo.RootUIComp.SetAnchorAlign(2, 2);
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.YCo.RootUIComp.SetUIParent(this.r0o, true);
    this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(t);
    var i = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.Igo = new Vector2D_1.Vector2D(i.X, i.Y);
    this.Tgo = new Vector2D_1.Vector2D(t.X, t.Y);
    this.Xgo();
    var i = new UE.Vector(1, 1, 1);
    this.YCo.RootUIComp.SetUIItemScale(i);
  }
  StartDragState() {
    this.Sgo = true;
    this.YCo.RootUIComp.SetAnchorAlign(2, 2);
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.YCo.RootUIComp.SetUIParent(this.r0o, true);
    this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(t);
    this.ygo = 0;
  }
  SetItemToSourceSize() {
    this.YCo.RootUIComp.SetWidth(this.ggo);
    this.YCo.RootUIComp.SetHeight(this.fgo);
  }
  StartClickCheckTimer() {
    this.Vgo();
    this.mgo = TickSystem_1.TickSystem.Add(() => {
      if (this.s0o() === 0) {
        this.OnPointUp(undefined);
        this.Vgo();
      }
    }, "DragTick", 0, true, undefined, true).Id;
  }
  SetPointerDownCallBack(t) {
    this.JCo = t;
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
  Ogo() {
    if (this.Qgo() >= 2 || this.Qgo() === 0) {
      this.Fgo();
    } else if (this.Uqe >= CLICKTIME && (this.Fgo(), this.$8i) && (this.ugo || (this.DoDragSequence(), this.ugo = true), this.rgo && this.rgo(this.Xy), this.hgo)) {
      this.Agt(this.hgo);
    }
  }
  s0o() {
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
  SetToTargetParentAndSetStretch(t) {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4);
    this.YCo.RootUIComp.SetUIParent(t, true);
    this.YCo.RootUIComp.SetVerticalStretch(this.Rgo);
    this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo);
  }
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.Dgo);
  }
  ResetPosition() {
    if (this.Ego) {
      this.$go();
    }
    this.Ego = false;
    if (this.Sgo) {
      this.a0o();
      if (this.Igo) {
        this.YCo.RootUIComp.SetAnchorOffset(this.Rgo);
      }
      this.Sgo = false;
    }
  }
  a0o() {
    this.Xgo();
  }
  Xgo() {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4);
    this.YCo.RootUIComp.SetUIParent(this.Dgo, true);
    var t = new UE.Vector(1, 1, 1);
    this.YCo.RootUIComp.SetUIItemScale(t);
    this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo);
    this.YCo.RootUIComp.SetVerticalStretch(this.Rgo);
  }
  Wgo() {
    return this.Uqe < CLICKTIME && this.Hgo();
  }
  Hgo() {
    return !!Info_1.Info.IsInGamepad() || TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > CLICKCALLGAP;
  }
  OnBeginDrag() {
    this.cgo = true;
  }
  Vgo() {
    if (this.mgo !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.mgo);
      this.mgo = TickSystem_1.TickSystem.InvalidId;
    }
  }
  Fgo() {
    if (this.Gyt !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.Gyt);
      this.Gyt = TickSystem_1.TickSystem.InvalidId;
    }
  }
  SetItemToPointerPosition() {
    var t;
    var i;
    var s;
    if (this.Sgo) {
      s = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).GetWorldPointInPlane();
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir();
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
      i = s.X + i;
      s = s.Z + t;
      if (this.dgo.X !== i || this.dgo.Y !== s) {
        this.dgo.X = i;
        this.dgo.Y = s;
        this.YCo.RootUIComp.SetAnchorOffsetX(this.dgo.X);
        this.YCo.RootUIComp.SetAnchorOffsetY(this.dgo.Y);
      }
    }
  }
  TickCheckDrag() {
    if (this.ygo <= MOVEPARENTDELAYTIME) {
      this.ygo++;
    } else {
      this.SetItemToPointerPosition();
      this.Ygo();
    }
  }
  GetMiddlePosition() {
    return [this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X, this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y];
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
        t.OnUnOverlay();
      }
    });
    i.forEach(t => {
      if (!this.Mgo.includes(t)) {
        t.OnOverlay();
      }
    });
    this.Mgo = i;
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  Refresh(t) {
    this.$8i = t;
    this.Kbe(t);
    this.BGt(t);
  }
  GetCurrentData() {
    return this.$8i;
  }
  OnUnOverlay() {
    this.OnUnOverlayCallBack?.();
  }
  OnOverlay() {
    this.OnOverlayCallBack?.();
  }
  CheckOverlap(t, i) {
    var s = t.X;
    var t = t.Y;
    var e = i.X;
    var i = i.Y;
    var h = this.zgo().X;
    var r = this.zgo().Y;
    var a = this.Zgo().X;
    var n = this.Zgo().Y;
    return s < r && h < t && e < n && a < i;
  }
  Kbe(t) {
    this.o0o.SetUIActive(t !== undefined);
    if (t) {
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.GetConfigId(true));
      this.SetTextureByPath(t.IconMiddle, this.o0o, "VisionEquipmentView");
    }
  }
  BGt(t) {
    this.i0o.SetUIActive(t !== undefined);
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
}
exports.VisionDragItem = VisionDragItem;
//# sourceMappingURL=VisionDragItem.js.map