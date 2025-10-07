"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteItemBase = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const SCALE_TOLERATION = 0.01;
class CommonQteItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsMobile = false;
    this.IsQteActive = false;
    this.IsQtePlayStart = false;
    this.IsQteStart = false;
    this.IsQteEnd = false;
    this.IsQteInteractive = false;
    this.IsQtePause = false;
    this.TickTimer = undefined;
    this.TickInterval = TimerSystem_1.MIN_TIME;
    this.IsAttaching = false;
    this.IsKeepRelativeToCamera = false;
    this.IsUseTargetScreenPos = false;
    this.OffsetRotator = undefined;
    this.TempRotator = undefined;
    this.IsInitPositionRef = false;
    this.ScreenPositionRef = undefined;
    this.ViewportSizeX = undefined;
    this.ViewportSizeY = undefined;
    this.UiRootSize = undefined;
    this.PointTransform = undefined;
    this.UiPositionOffset = undefined;
    this.AttachTarget = undefined;
    this.AttachRootItem = undefined;
    this.ScaleCurve = undefined;
    this.ScaleVector = undefined;
    this.TargetLocation = undefined;
    this.q6d = undefined;
    this.oIl = t => {
      this.CommonQteEnd(t);
    };
    this.mFl = () => {
      this.RefreshOnBattleUiVisibleChanged();
    };
    this.esh = () => {
      if (!this.IsQteEnd) {
        if (Time_1.Time.TimeDilation === 0) {
          this.PauseQte();
        } else {
          this.ResumeQte(true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.IsMobile = Info_1.Info.IsInTouch();
  }
  OnStart() {
    var t = UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, 2);
    if (t) {
      this.GetOriginalItem().SetUIParent(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisableCustomInputData, this.RootActor.GetName());
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(20, this.mFl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
  }
  OnBeforeDestroy() {
    var t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableCacheCustomInputData, this.RootActor.GetName());
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(20, this.mFl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
    this.ClearTickTimer();
    if (this.q6d !== undefined) {
      if (t = UiLayer_1.UiLayer.WorldSpaceUiRoot?.GetComponentByClass(UE.LGUIWorldSpaceInteraction.StaticClass())) {
        t.depth = this.q6d;
      }
      this.q6d = undefined;
    }
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.ResumeQte();
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.PauseQte();
  }
  CommonQteEnd(t) {}
  RefreshOnBattleUiVisibleChanged() {}
  Tick(t) {
    if (this.IsKeepRelativeToCamera) {
      this.HXu();
    } else if (this.IsUseTargetScreenPos) {
      this.UpdateScreenPosition();
    }
    if (this.ScaleCurve) {
      this.UpdateScale();
    }
    this.OnTick(t);
  }
  OnTick(t) {}
  PauseQte() {
    if (!this.IsQtePause && !this.IsQteEnd) {
      this.TickTimer?.Pause();
      this.IsQtePause = true;
      if (this.IsQteActive) {
        this.OnQtePause();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte界面进入暂停", ["IsQteActive", this.IsQteActive]);
      }
    }
  }
  ResumeQte(t = false) {
    if (this.IsQtePause && !this.IsQteEnd && (this.TickTimer?.Resume(), this.IsQtePause = false, this.IsQteActive && (t ? TimerSystem_1.TimerSystem.Next(() => {
      if (this.GetOriginalItem()?.IsValid()) {
        this.OnQteResume();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte界面暂停恢复失败, 界面已销毁");
      }
    }) : this.OnQteResume()), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("CommonQte", 67, "Qte界面暂停恢复", ["IsQteActive", this.IsQteActive]);
    }
  }
  OnQtePause() {}
  OnQteResume() {}
  HandleQteEnd() {}
  IsValidInput() {
    return !!this.IsQteInteractive && !this.IsQteEnd && !this.IsQtePause;
  }
  SetQteActive(t) {
    var i;
    this.IsQteActive = true;
    this.ClearTickTimer();
    this.TickTimer = TimerSystem_1.TimerSystem.Forever(t => {
      this.Tick(t);
    }, this.TickInterval);
    if (t.IsAttachToActor()) {
      if (t.GetAttachConfig()?.UseTargetScreenPos) {
        this.AttachToTargetScreenPos(t);
      } else {
        this.AttachToTarget(t);
      }
      if (Time_1.Time.TimeDilation === 0) {
        this.PauseQte();
      }
    } else if (t.Source === 3) {
      if ((i = UiManager_1.UiManager.GetViewByName("VideoView")) && (i = i.GetRootItem())) {
        this.GetOriginalItem().SetUIParent(i);
      }
    } else if (t.Source === 0) {
      if (!ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20) || Time_1.Time.TimeDilation === 0) {
        this.PauseQte();
      }
    } else if (t.Source === 1 && Time_1.Time.TimeDilation === 0) {
      this.PauseQte();
    }
  }
  AttachToTarget(t) {
    var i;
    var e = t.GetAttachConfig();
    var s = t.GetAttachTarget();
    if (e && s) {
      this.OffsetRotator = Rotator_1.Rotator.Create(e.Rotation.X, e.Rotation.Y, e.Rotation.Z);
      this.TempRotator = Rotator_1.Rotator.Create();
      this.IsKeepRelativeToCamera = e.KeepRelativeToCamera;
      i = (this.AttachTarget = s).GetComponentByClass(UE.SceneComponent.StaticClass());
      this.RootActor?.K2_AttachToComponent(i, undefined, 0, this.IsKeepRelativeToCamera ? 1 : 0, 0, false);
      this.HXu();
      i = Vector_1.Vector.Create(e.Location.X, e.Location.Y, e.Location.Z);
      this.RootActor?.D_K2_SetActorRelativeLocation(i.ToUeVector(), false, undefined, true);
      this.ScaleCurve = t.Resource?.ScaleCurve;
      if (this.ScaleCurve) {
        this.TargetLocation = Vector_1.Vector.Create();
        this.ScaleVector = Vector_1.Vector.Create(1, 1, 1);
        this.UpdateScale();
      }
      this.IsAttaching = true;
      this.SetUiActive(true);
      if (t.Source === 2 && (i = UiLayer_1.UiLayer.UiRoot?.GetComponentByClass(UE.LGUIScreenSpaceInteraction.StaticClass()), t = UiLayer_1.UiLayer.WorldSpaceUiRoot?.GetComponentByClass(UE.LGUIWorldSpaceInteraction.StaticClass()), i) && t) {
        this.q6d = t.depth;
        t.depth = i.depth + 1;
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "QteItem挂接失败", ["AttachConfig", e], ["AttachTarget", s]);
    }
  }
  HXu() {
    var t;
    var i;
    var e = this.GetAttachRootItem();
    if (e) {
      if (this.IsKeepRelativeToCamera) {
        t = (i = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator).Pitch - 90;
        i = i.Yaw + 90;
        this.TempRotator.Roll = this.OffsetRotator.Roll + t;
        this.TempRotator.Pitch = this.OffsetRotator.Pitch;
        this.TempRotator.Yaw = this.OffsetRotator.Yaw + i;
        e.SetUIWorldRotation(this.TempRotator.ToUeRotator());
      } else {
        this.TempRotator.Roll = this.OffsetRotator.Roll - 90;
        this.TempRotator.Pitch = this.OffsetRotator.Pitch;
        this.TempRotator.Yaw = this.OffsetRotator.Yaw;
        e.SetUIRelativeRotation(this.TempRotator.ToUeRotator());
      }
    }
  }
  AttachToTargetScreenPos(t) {
    var i;
    var e = t.GetAttachConfig();
    var t = t.GetAttachTarget();
    if (e && t) {
      this.IsUseTargetScreenPos = e.UseTargetScreenPos;
      this.AttachTarget = t;
      if (!this.IsInitPositionRef) {
        this.IsInitPositionRef = true;
        this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
        this.ViewportSizeX = (0, puerts_1.$ref)(undefined);
        this.ViewportSizeY = (0, puerts_1.$ref)(undefined);
        i = UiLayer_1.UiLayer.UiRootItem;
        this.UiRootSize = Vector2D_1.Vector2D.Create(i?.GetWidth() ?? 0, i?.GetHeight() ?? 0);
        this.PointTransform = Vector2D_1.Vector2D.Create(1, -1);
        this.UiPositionOffset = Vector2D_1.Vector2D.Create(e.Location.X, e.Location.Y);
        this.OffsetRotator = Rotator_1.Rotator.Create(e.Rotation.X, e.Rotation.Y, e.Rotation.Z);
      }
      this.UpdateScreenPosition();
      this.IsAttaching = true;
      this.SetUiActive(true);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "QteItem挂接失败", ["AttachConfig", e], ["AttachTarget", t]);
    }
  }
  UpdateScreenPosition() {
    if (this.AttachTarget && this.AttachTarget.IsValid() && UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, this.AttachTarget.D_K2_GetActorLocation(), this.ScreenPositionRef)) {
      let t = (0, puerts_1.$unref)(this.ScreenPositionRef);
      Global_1.Global.CharacterController.GetViewportSize(this.ViewportSizeX, this.ViewportSizeY);
      var i = (0, puerts_1.$unref)(this.ViewportSizeX);
      t = t.op_Multiply(this.UiRootSize.X / i).op_Subtraction(this.UiRootSize.ToUeVector2D().op_Multiply(0.5)).op_Multiply(this.PointTransform.ToUeVector2D()).op_Addition(this.UiPositionOffset.ToUeVector2D());
      var i = this.GetAttachRootItem();
      i?.SetAnchorOffset(t);
      i?.SetUIRelativeRotation(this.OffsetRotator.ToUeRotator());
    }
  }
  UpdateScale() {
    var t;
    var i;
    if (this.AttachTarget && this.ScaleCurve) {
      i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      t = this.AttachTarget.D_K2_GetActorLocation();
      this.TargetLocation.FromUeVector(t);
      t = Vector_1.Vector.DistSquared(i, this.TargetLocation);
      if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte挂接调试", ["相机与挂接目标的距离平方值", t]);
      }
      if (!((i = this.ScaleCurve.GetFloatValue(t)) <= 0)) {
        if (Math.abs(this.ScaleVector.Z - i) > SCALE_TOLERATION) {
          this.ScaleVector.X = i;
          this.ScaleVector.Y = i;
          this.ScaleVector.Z = i;
          this.GetAttachRootItem()?.SetUIRelativeScale3D(this.ScaleVector.ToUeVectorOld(true));
        }
      }
    }
  }
  ClearTickTimer() {
    if (this.TickTimer) {
      TimerSystem_1.TimerSystem.Remove(this.TickTimer);
      this.TickTimer = undefined;
    }
  }
  SetPreloadQte(t) {}
  GetAttachRootItem() {
    return this.AttachRootItem ?? this.GetOriginalItem();
  }
  SetAttachRootItem(t) {
    this.AttachRootItem = t;
  }
  Reattach(t) {
    this.IsInitPositionRef = false;
    if (this.IsUseTargetScreenPos) {
      this.AttachToTargetScreenPos(t);
    } else {
      this.AttachToTarget(t);
    }
  }
}
exports.CommonQteItemBase = CommonQteItemBase;
//# sourceMappingURL=CommonQteItemBase.js.map