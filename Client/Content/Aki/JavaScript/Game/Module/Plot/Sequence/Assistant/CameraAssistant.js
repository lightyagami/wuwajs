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
const CameraBlueprintFunctionLibrary_1 = require("../../../../Camera/CameraBlueprintFunctionLibrary");
const CameraController_1 = require("../../../../Camera/CameraController");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
  }
  PreAllPlay() {
    var e;
    var r;
    var a;
    var o;
    if (this.Model.IsViewTargetControl && ((e = this.Model.SequenceData.相机过渡时间) > 0 && (r = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.GetCineCameraComponent(), this.Model.SequenceData.约束宽高比 ? r.bConstrainAspectRatio || (o = (0, puerts_1.$ref)(0), a = (0, puerts_1.$ref)(0), Global_1.Global.CharacterController.GetViewportSize(o, a), o = (0, puerts_1.$unref)(o) / (0, puerts_1.$unref)(a), r.bConstrainAspectRatio = true, r.Filmback.SensorWidth = r.Filmback.SensorHeight * o) : r.bConstrainAspectRatio && ControllerHolder_1.ControllerHolder.PlotController.ManualAdaptAspectRatio(e * CommonDefine_1.MILLIONSECOND_PER_SECOND), CameraController_1.CameraController.ResetViewTarget(e)), a = this.Model.SequenceData.CameraBlendInTime, CameraController_1.CameraController.EnterCameraMode(1, a), this.aio = true, ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming)) {
      this.dYs ||= ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble(), undefined);
      if (!this.CYs) {
        this.CYs = ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble(), undefined);
        o = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
        this.CYs.K2_AttachToActor(o, undefined, 2, 1, 1, false);
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
  }
  EachStop() {}
  AllStop() {
    var e;
    var r;
    var a;
    if (this.Model.IsViewTargetControl && !this.Model.IsSeamless) {
      if (this.Model.Config.KeepCamera) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: KeepCamera");
        }
        this.aio = false;
        (a = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera();
        if (!(a = a.GetSavedSeqCameraThings())) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 58, "读取Sequence相机信息时，信息不存在");
          }
        }
        (e = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(a.CameraLocation);
        e.SetWorldRotation(a.CameraRotation);
        (r = e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent)).SetCameraAperture(a.CurrentAperture);
        r.SetCameraFocalDistance(a.FocusSettings.ManualFocusDistance);
        r.SetCameraFieldOfView(a.FieldOfView);
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
        a = this.Model.SequenceData.CameraBlendOutTime;
        this.aio = false;
        if (a === 0) {
          ControllerHolder_1.ControllerHolder.SequenceController.DisableMotionBlurAwhile();
        }
        CameraController_1.CameraController.ExitCameraMode(1, a, 0, 0);
      }
    }
  }
  End() {
    if (this.dYs) {
      this.dYs.WorldPartitionStreamingSource?.DisableStreamingSource();
    }
    if (this.CYs) {
      this.CYs.WorldPartitionStreamingSource?.DisableStreamingSource();
    }
    if (!this.Model.IsSeamless) {
      if (this.aio) {
        CameraController_1.CameraController.ExitCameraMode(1);
      }
      ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.LookatTrackingSettings.bEnableLookAtTracking = false;
    }
  }
  CalcPreloadLocation() {}
}
exports.CameraAssistant = CameraAssistant;
//# sourceMappingURL=CameraAssistant.js.map