"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraAnimationHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
const UiCameraLoadingAnimation_1 = require("./UiCameraLoadingAnimation");
class UiCameraAnimationHandle {
  constructor() {
    this.XAo = undefined;
    this.$Ao = undefined;
    this.ZRo = false;
    this.YAo = undefined;
    this.JAo = undefined;
    this.IsViewInLoading = false;
    this.zAo = false;
    this.ZAo = false;
    this.ePo = () => {
      this.tPo();
    };
  }
  Initialize() {
    this.JAo = new UiCameraLoadingAnimation_1.UiCameraLoadingAnimation();
    this.JAo.Initialize();
    this.ZRo = false;
  }
  Reset() {
    this.Deactivate();
    this.$Ao = undefined;
    this.XAo = undefined;
    this.JAo = undefined;
    this.IsViewInLoading = false;
    this.zAo = false;
    this.YAo = undefined;
  }
  Tick(a) {
    this.JAo?.Tick(a);
  }
  SetHandleData(a) {
    this.$Ao = a;
  }
  Activate(a, i = true, e = true) {
    this.$Ao = a;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态", ["HandleData", this.$Ao.ToString()]);
    }
    var t = this.$Ao.GetUiCameraAnimationConfig();
    if (t) {
      if (a.IsEmptyState) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，激活了一个空状态", ["HandleData", this.$Ao.ToString()]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, a);
      } else {
        this.XAo = t;
        this.ZAo = false;
        var n = this.iPo(t.BlendInCameraSequence, t.BlendInCameraSequencePlayRate, t.bRevertBlendInCameraSequence, () => {
          this.ZAo = false;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUiBlendInCameraSequenceFinished, a);
        });
        if (n === 2) {
          this.ZAo = false;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，填了BlendInCameraSequence，但是目标Actor无法找到，直接休眠UI相机状态", ["HandleData", this.$Ao.ToString()]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.$Ao);
          this.Deactivate();
        } else if (n === 0) {
          this.ZAo = true;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，填了BlendInCameraSequence，会直接播放Sequence而不会进行其他线性变化计算", ["HandleData", this.$Ao.ToString()]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, a);
        } else if (UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera) {
          this.zAo = false;
          var n = this.$Ao.GetTargetLocation();
          var r = this.$Ao.GetTargetRotation();
          if (n && r) {
            this.StopSequence();
            this.SetUiCameraAnimationRotation(r);
            this.SetUiCameraAnimationLocation(n);
            this.SetSpringArmLength(this.$Ao.GetTargetArmLength());
            this.SetSpringArmRelativeLocation(this.$Ao.GetTargetArmOffsetLocation());
            this.SetSprintArmRelativeRotation(this.$Ao.GetTargetArmOffsetRotation());
            this.oPo(this.$Ao.GetTargetArmCollisionTest());
            this.SetCameraFieldOfView(this.$Ao.GetTargetFieldOfView());
            this.SetCameraFocalRegion(this.$Ao.GetTargetFocalRegion());
            this.SetCameraPostProcessBlendWeight(this.$Ao.GetTargetPostProcessBlendWeight());
            this.SetWidgetCameraAttachToAnimationActor();
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(i ? t.BlendInTime : 0, t.BlendInFunction, t.BlendInExp, () => {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, a);
            });
            if (this.XAo.bResetCameraTransform) {
              UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation();
            }
            r = this.$Ao.ViewName;
            n = this.$Ao.UiCameraMappingConfig;
            if (r && UiManager_1.UiManager.IsViewCreating(r) && n?.bPlayLoadingCameraAnimation) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，当前界面在加载中，过渡到模糊镜头效果", ["HandleData", this.$Ao.ToString()]);
              }
              this.JAo.Play(UiCameraAnimationManager_1.UiCameraAnimationManager.LoadingViewCameraAnimationLength, UiCameraAnimationManager_1.UiCameraAnimationManager.LoadingViewManualFocusDistance, UiCameraAnimationManager_1.UiCameraAnimationManager.LoadingViewAperture);
              this.IsViewInLoading = true;
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，当前界面不在加载中，所以停止模糊效果", ["HandleData", this.$Ao.ToString()]);
              }
              this.IsViewInLoading = false;
              this.JAo.Stop();
              const s = ModelManager_1.ModelManager.CameraModel;
              const m = s.GetSavedSeqCameraThings();
              if (!m) {
                this.SetCameraFocalDistance(this.$Ao.GetTargetFocalDistance());
              }
              this.SetCameraAperture(this.$Ao.GetTargetAperture());
              if (e) {
                this.rPo(t.BlendInSequence, t.BlendInPlayRate, t.bBlendInSequenceReverse);
              }
            }
            this.ZRo = true;
            const s = ModelManager_1.ModelManager.CameraModel;
            const m = s.GetSavedSeqCameraThings();
            if (m) {
              s.ResetSavedSeqCameraThings();
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, a);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CameraAnimation", 58, "激活界面镜头状态时，找不到对应位置或旋转，可能是对应目标无法找到", ["HandleData", this.$Ao.ToString()], ["ReplaceCameraTag", this.$Ao.ReplaceCameraTag], ["ReplaceCameraIsValid", this.$Ao.GetReplaceCameraActor()?.IsValid()]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.$Ao);
            this.Deactivate();
          }
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.$Ao);
          this.Deactivate();
        }
      }
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.$Ao);
    }
  }
  Deactivate() {
    if (this.ZRo) {
      if (this.JAo?.IsPlaying) {
        this.JAo.Stop();
      }
      this.ZRo = false;
    }
  }
  GetHandleData() {
    return this.$Ao;
  }
  GetIsActivate() {
    return this.ZRo;
  }
  Revert(a = true, i = undefined) {
    var e;
    var t;
    var n;
    var r;
    var s;
    var m;
    var o = this.$Ao.GetUiCameraAnimationConfig();
    if (o) {
      e = (this.XAo = o).BlendOutCameraSequence;
      t = o.BlendOutCameraSequencePlayRate;
      o = o.bRevertBlendOutCameraSequence;
      this.YAo = i;
      if (this.iPo(e, t, o, () => {
        this.tPo();
      }) === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "还原界面镜头状态时，填了BlendOutCameraSequence，会直接播放Sequence而不会进行其他线性变化计算", ["HandleData", this.$Ao.ToString()]);
        }
      } else {
        e = this.XAo.BlendOutTime;
        t = this.XAo.BlendOutFunction;
        o = this.XAo.BlendOutExp;
        n = this.XAo.bResetCameraTransform;
        r = this.XAo.BlendOutSequence;
        s = this.XAo.bBlendOutSequenceReverse;
        m = this.XAo.BlendOutPlayRate;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "还原镜头至战斗镜头", ["HandleData", this.$Ao.ToString()]);
        }
        if (n) {
          UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation();
        }
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Exit(e, t, o);
        this.zAo = true;
        if (a && UE.KismetSystemLibrary.IsValidSoftObjectReference(r)) {
          this.rPo(r, m, s).then(() => {
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(this.ePo);
          }, () => {});
        } else {
          this.tPo();
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CameraAnimation", 58, "找不到镜头配置，强制还原镜头至战斗镜头", ["HandleData", this.$Ao.ToString()]);
      }
      if (i) {
        i();
      }
      this.Reset();
    }
  }
  tPo() {
    if (this.$Ao) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "界面镜头状态 Revert(BlendOut) 完成", ["HandleData", this.$Ao.ToString()]);
      }
      if (this.YAo) {
        this.YAo();
      }
      this.Reset();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "界面镜头状态 Revert(BlendOut) 完成时已被重置");
    }
  }
  GetIsPendingRevert() {
    return this.zAo;
  }
  StopSequence() {
    if (UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent) {
      UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.DestroyUiCameraSequence(true, 1);
    }
  }
  GetViewName() {
    return this.$Ao?.ViewName;
  }
  GetIsPlayingBlendInSequence() {
    return this.ZAo;
  }
  get GetUiCameraAnimationActor() {
    return UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.GetOwnActor();
  }
  iPo(a, i, e, t) {
    var n;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a)) {
      if ((n = this.$Ao.GetTargetActor())?.IsValid()) {
        this.SetWidgetCameraDetachFromAnimationActor();
        this.rPo(a, i, e, n).then(() => {
          var a = this.$Ao.GetUiCameraAnimationConfig();
          UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(a.BlendInTime, a.BlendInFunction, a.BlendInExp);
        }, () => {});
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(t);
        return 0;
      } else {
        return 2;
      }
    } else {
      return 1;
    }
  }
  SetUiCameraAnimationLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorLocation(a);
  }
  SetUiCameraAnimationRelativeLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRelativeLocation(a);
  }
  SetUiCameraAnimationRotation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRotation(a);
  }
  SetSpringArmLength(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmLength(a);
  }
  SetSprintArmRelativeRotation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSprintArmRelativeRotation(a);
  }
  SetSpringArmRelativeLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmRelativeLocation(a);
  }
  oPo(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCollisionTest(a);
  }
  SetCameraFieldOfView(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFieldOfView(a);
  }
  SetCameraFocalDistance(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFocalDistance(a);
  }
  SetCameraCurrentFocalLength(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraCurrentFocalLength(a);
  }
  SetCameraAperture(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraAperture(a);
  }
  SetCameraFocalRegion(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFocalRegion(a);
  }
  SetCameraPostProcessBlendWeight(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraPostProcessBlendWeight(a);
  }
  SetWidgetCameraAttachToAnimationActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorAttachToSpringActor();
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(Vector_1.Vector.ZeroVectorDouble);
  }
  SetWidgetCameraDetachFromAnimationActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorDetachFromSpringActor();
  }
  async rPo(a, i, e, t) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a)) {
      this.StopSequence();
      return UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.LoadAndPlayUiCameraSequence(a, i, e, t);
    }
  }
  DeepCopyCameraInfo(a) {
    this.SetUiCameraAnimationRotation(a.K2_GetActorRotation());
    this.SetUiCameraAnimationLocation(a.D_K2_GetActorLocation());
    this.SetCameraFieldOfView(a.CameraComponent.FieldOfView);
  }
}
exports.UiCameraAnimationHandle = UiCameraAnimationHandle;
//# sourceMappingURL=UiCameraAnimationHandle.js.map