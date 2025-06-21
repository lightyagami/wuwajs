"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CameraAssistant = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  CameraBlueprintFunctionLibrary_1 = require("../../../../Camera/CameraBlueprintFunctionLibrary"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiCameraPostEffectComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class CameraAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments), this.aio = !1, this.dYs = void 0, this.CYs = void 0
  }
  PreAllPlay() {
    var e, r, a, o;
    this.Model.IsViewTargetControl && (0 < (e = this.Model.SequenceData.相机过渡时间) && (r = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.GetCineCameraComponent(), this.Model.SequenceData.约束宽高比 ? r.bConstrainAspectRatio || (o = (0, puerts_1.$ref)(0), a = (0, puerts_1.$ref)(0), Global_1.Global.CharacterController.GetViewportSize(o, a), o = (0, puerts_1.$unref)(o) / (0, puerts_1.$unref)(a), r.bConstrainAspectRatio = !0, r.Filmback.SensorWidth = r.Filmback.SensorHeight * o) : r.bConstrainAspectRatio && ControllerHolder_1.ControllerHolder.PlotController.ManualAdaptAspectRatio(e * CommonDefine_1.MILLIONSECOND_PER_SECOND), CameraController_1.CameraController.ResetViewTarget(e)), a = this.Model.SequenceData.CameraBlendInTime, CameraController_1.CameraController.EnterCameraMode(1, a), this.aio = !0, ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming) && (this.dYs || (this.dYs = ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble, void 0)), this.CYs || (this.CYs = ActorSystem_1.ActorSystem.Spawn(UE.BP_StreamingSourceActor_C.StaticClass(), new UE.TransformDouble, void 0), o = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera, this.CYs.K2_AttachToActor(o, void 0, 2, 1, 1, !1)))
  }
  PreEachPlay() {
    var e = UE.NewArray(UE.Actor),
      r = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
    (this.Model.SequenceData.相机过渡时间 <= 0 || 0 !== this.Model.SubSeqIndex) && r.ResetSeqCineCamSetting(), e.Add(r), this.Model.CurLevelSeqActor.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, e, !1, !0), CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.D_K2_SetActorTransform(ModelManager_1.ModelManager.CameraModel.CameraTransform, !1, void 0, !0)
  }
  EachStop() {}
  AllStop() {
    var e, r, a;
    this.Model.IsViewTargetControl && !this.Model.IsSeamless && (this.Model.Config.KeepCamera ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: KeepCamera"), this.aio = !1, (a = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera(), (a = a.GetSavedSeqCameraThings()) || Log_1.Log.CheckError() && Log_1.Log.Error("Camera", 58, "读取Sequence相机信息时，信息不存在"), (e = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(a.CameraLocation), e.SetWorldRotation(a.CameraRotation), (r = e.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent)).SetCameraAperture(a.CurrentAperture), r.SetCameraFocalDistance(a.FocusSettings.ManualFocusDistance), r.SetCameraFieldOfView(a.FieldOfView), CameraController_1.CameraController.ExitCameraMode(1), e.Enter()) : (ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.LookatTrackingSettings.bEnableLookAtTracking = !1, this.Model.Config.ResetCamera ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: ResetCamera"), CameraBlueprintFunctionLibrary_1.default.ResetFightCameraPitchAndArmLength()) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "剧情Seq结束时相机状态: 继承seq相机"), (r = CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation()).Roll = 0, CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(r)), a = this.Model.SequenceData.CameraBlendOutTime, this.aio = !1, 0 === a && ControllerHolder_1.ControllerHolder.SequenceController.DisableMotionBlurAwhile(), CameraController_1.CameraController.ExitCameraMode(1, a, 0, 0)))
  }
  End() {
    this.dYs && this.dYs.WorldPartitionStreamingSource?.DisableStreamingSource(), this.CYs && this.CYs.WorldPartitionStreamingSource?.DisableStreamingSource(), this.Model.IsSeamless || (this.aio && CameraController_1.CameraController.ExitCameraMode(1), ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.LookatTrackingSettings.bEnableLookAtTracking = !1)
  }
  CalcPreloadLocation() {}
}
exports.CameraAssistant = CameraAssistant;
//# sourceMappingURL=CameraAssistant.js.map