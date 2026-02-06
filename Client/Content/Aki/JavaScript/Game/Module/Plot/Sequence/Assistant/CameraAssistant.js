"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraAssistant = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const CameraBlueprintFunctionLibrary_1 = require("../../../../Camera/CameraBlueprintFunctionLibrary");
const CameraController_1 = require("../../../../Camera/CameraController");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MovementLockController_1 = require("../../../MovementLock/MovementLockController");
const UiCameraPostEffectComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../../../UiCamera/UiCameraManager");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class CameraAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.aio = false;
    this.dYs = undefined;
    this.CYs = undefined;
    this.pYi = new Map();
    this.mZm = undefined;
  }
  PreAllPlay() {
    var e;
    var r;
    var o;
    var t;
    if (this.Model.IsViewTargetControl && ((e = this.Model.SequenceData.相机过渡时间) > 0 && (t = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.GetCineCameraComponent(), this.Model.SequenceData.约束宽高比 ? t.bConstrainAspectRatio || (o = (0, puerts_1.$ref)(0), r = (0, puerts_1.$ref)(0), Global_1.Global.CharacterController.GetViewportSize(o, r), o = (0, puerts_1.$unref)(o) / (0, puerts_1.$unref)(r), t.bConstrainAspectRatio = true, t.Filmback.SensorWidth = t.Filmback.SensorHeight * o) : t.bConstrainAspectRatio && ControllerHolder_1.ControllerHolder.PlotController.ManualAdaptAspectRatio(e * CommonDefine_1.MILLIONSECOND_PER_SECOND)), r = this.Model.SequenceData.CameraBlendInTime, (o = CameraController_1.CameraController.SequenceCamera.GetComponent(10))?.GetIsInCinematic() && o?.GetIfNeedWaitInPlot() && o.StopSequence(), CameraController_1.CameraController.EnterCameraMode(1, r), this.aio = true, this.Model.SequenceData.IsEnableDynamicStreamingSource && (this.mZm = ActorSystem_1.ActorSystem.Spawn(UE.BP_KuroStreamingSourceProxy_Seq_C.StaticClass(), new UE.TransformDouble(), undefined), ControllerHolder_1.ControllerHolder.GameModeController?.SwitchStreamingSource(this.mZm, false, false, 2)), ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming)) {
      this.dYs ||= ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble(), undefined);
      if (!this.CYs) {
        this.CYs = ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble(), undefined);
        t = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
        this.CYs.K2_AttachToActor(t, undefined, 2, 1, 1, false);
      }
    }
  }
  PreEachPlay() {
    var e = UE.NewArray(UE.Actor);
    var r = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
    if (this.Model.SequenceData.相机过渡时间 <= 0 || this.Model.SubSeqIndex !== 0) {
      r.ResetSeqCineCamSetting();
    }
    e.Add(r);
    this.Model.CurLevelSeqActor.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, e, false, true);
    CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.D_K2_SetActorTransform(ModelManager_1.ModelManager.CameraModel.CameraTransform, false, undefined, true);
    if (this.mZm?.IsValid()) {
      (r = UE.NewArray(UE.Actor)).Add(this.mZm);
      this.Model.CurLevelSeqActor.SetBindingByTag(SequenceDefine_1.SeqStreamingSourceProxy_TAG, r, false, true);
    }
  }
  EachStop() {}
  AllStop() {
    var e;
    var r;
    var o;
    if (this.Model.IsViewTargetControl && !this.Model.IsSeamless) {
      if (this.Model.Config.KeepCamera) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: KeepCamera");
        }
        this.aio = false;
        (o = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera();
        if (!(o = o.GetSavedSeqCameraThings())) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 58, "读取Sequence相机信息时，信息不存在");
          }
        }
        (e = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(o.CameraLocation);
        e.SetWorldRotation(o.CameraRotation);
        (r = e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent)).SetCameraAperture(o.CurrentAperture);
        r.SetCameraFocalDistance(o.FocusSettings.ManualFocusDistance);
        r.SetCameraFieldOfView(o.FieldOfView);
        CameraController_1.CameraController.ExitCameraMode(1);
        e.Enter();
      } else {
        ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.LookatTrackingSettings.bEnableLookAtTracking = false;
        if (this.Model.Config.ResetCamera) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: ResetCamera");
          }
          CameraBlueprintFunctionLibrary_1.default.ResetFightCameraPitchAndArmLength();
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: 继承seq相机");
          }
          (r = CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation()).Roll = 0;
          CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(r);
        }
        o = this.Model.SequenceData.CameraBlendOutTime;
        this.aio = false;
        if (o === 0) {
          ControllerHolder_1.ControllerHolder.SequenceController.DisableMotionBlurAwhile();
        }
        CameraController_1.CameraController.ExitCameraMode(1, o, 0, 0);
      }
    }
  }
  async AllStopPromise() {
    if (this.mZm && MovementLockController_1.MovementLockController.LockMode === 2) {
      await ControllerHolder_1.ControllerHolder.GameModeController?.ResetStreamingSourceAttachment();
    }
    return true;
  }
  End() {
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraGuideAtOnce();
    if (this.dYs) {
      this.dYs.WorldPartitionStreamingSource?.DisableStreamingSource();
    }
    if (this.CYs) {
      this.CYs.WorldPartitionStreamingSource?.DisableStreamingSource();
    }
    if (this.mZm) {
      ModelManager_1.ModelManager.GameModeModel?.DetachStreamingSourceFromActor();
      ActorSystem_1.ActorSystem.Put("CameraAssistant.DestroySeqDynamicStreamingSourceProxy", this.mZm);
      ModelManager_1.ModelManager.GameModeModel.AttachStreamingSourcesToActor(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
      MovementLockController_1.MovementLockController.Unlock();
    }
    if (!this.Model.IsSeamless) {
      var e;
      var r;
      if (this.aio) {
        CameraController_1.CameraController.ExitCameraMode(1);
      }
      ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.LookatTrackingSettings.bEnableLookAtTracking = false;
      for ([e, r] of this.pYi) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "清理相机震动", ["path", e]);
        }
        Global_1.Global.CharacterCameraManager.StopCameraShake(r);
      }
      this.pYi.clear();
    }
  }
  CalcPreloadLocation() {}
  StartCameraShake(e) {
    if (UE.KismetSystemLibrary.IsValidSoftClassReference(e)) {
      const r = e.ToAssetPathName();
      if (this.pYi.has(r)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "相机震动已存在", ["path", r]);
        }
      } else {
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.Class, e => {
          if (this.Model?.IsPlaying && e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "开始相机震动", ["path", r]), e = Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(e))) {
            this.pYi.set(r, e);
          }
        });
      }
    }
  }
  StopCameraShake(e) {
    if (UE.KismetSystemLibrary.IsValidSoftClassReference(e)) {
      e = e.ToAssetPathName();
      const r = this.pYi.get(e);
      if (r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "停止相机震动", ["path", e]);
        }
        Global_1.Global.CharacterCameraManager.StopCameraShake(r);
        this.pYi.delete(e);
      }
    } else {
      for (const [, r] of this.pYi) {
        Global_1.Global.CharacterCameraManager.StopCameraShake(r);
      }
      this.pYi.clear();
    }
  }
}
exports.CameraAssistant = CameraAssistant;
//# sourceMappingURL=CameraAssistant.js.map