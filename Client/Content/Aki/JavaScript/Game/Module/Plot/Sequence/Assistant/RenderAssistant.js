"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderAssistant = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const PerfSightController_1 = require("../../../../../Game/PerfSight/PerfSightController");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../../GameSettings/GameSettingsUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager");
const RenderUtil_1 = require("../../../../Render/Utils/RenderUtil");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class RenderAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.uio = false;
    this.cio = false;
    this.mio = new UE.FName("LightDisableSwitch");
    this.dio = 0;
    this.LSl = false;
  }
  PreAllPlay() {
    this.dio = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Mobile.EnableKuroSpotlightsShadow");
    RenderUtil_1.RenderUtil.CloseToonSceneShadow();
    RenderUtil_1.RenderUtil.OpenMobileSpotLightShadow();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetSequenceFrameRateLimit();
    if (Info_1.Info.IsLowMemoryDevice) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.Streaming.RuntimeLODBiasDeviceMappingIndices 274432");
    }
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 0");
    }
    if (this.Model.GetType() === 0 && (this.Model.PreviousMotionBlur = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.MotionBlur.Amount"), this.Model.PreviousMotionBlur !== 0)) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
    }
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(), this.mio, 0);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("PrePlaySequence");
    var e = this.Model.GetCurrentSequence();
    UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e);
    var t = UE.KuroStaticLibrary.GetEnableMobileLowStreaming(e);
    if (t && (t = e?.SequenceDataAsset?.MobileLowStreamingScale) !== undefined && (ModelManager_1.ModelManager.GameModeModel.ScaleStreamingSource(1, t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 38, "成功打开手机低内存流送");
    }
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(819, UE.KuroSequencePerformanceManager.GetPerformanceMode().toString());
    }
    this.cio = true;
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.METALFX);
    if (this.Model.GetType() === 0 && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice() && e !== undefined && e > 0) {
      this.LSl = true;
      GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(0);
    }
  }
  PreEachPlay() {
    this.uio = true;
  }
  EachStop() {
    this.uio = false;
  }
  AllStop() {
    RenderUtil_1.RenderUtil.OpenToonSceneShadow();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.EnableKuroSpotlightsShadow " + this.dio);
    if (Info_1.Info.IsLowMemoryDevice) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.Streaming.RuntimeLODBiasDeviceMappingIndices 274960");
    }
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancleSequenceFrameRateLimit();
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 1");
    }
    if (this.Model.GetType() === 0 && this.Model.PreviousMotionBlur !== 0) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount " + this.Model.PreviousMotionBlur);
    }
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(), this.mio, 1);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("PrePlaySequence");
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    ModelManager_1.ModelManager.GameModeModel.CleanScaleStreamingSource(1);
    if (PerfSightController_1.PerfSightController.IsEnable) {
      UE.PerfSightHelper.PostEvent(819, UE.KuroSequencePerformanceManager.GetPerformanceMode().toString());
    }
    this.ReleaseSeqStreamingData();
    if (this.LSl) {
      this.LSl = false;
      GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(1);
    }
    this.cio = false;
  }
  End() {
    if (this.uio) {
      this.EachStop();
    }
    if (this.cio) {
      this.AllStop();
    }
  }
  CheckSeqStreamingData() {
    let t = true;
    if (SequenceDefine_1.SequenceRenderSettings.GetTexureStreamingEnable(GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY) ?? 2)) {
      var a = this.Model.SequenceData;
      for (let e = 0; e < a.剧情资源.Num(); e++) {
        var i = a.剧情资源.Get(e);
        if (!UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(i, true)) {
          t = false;
        }
      }
      if (this.Model.SequenceData.NeedSwitchMainCharacter && this.Model.MainSeqCharacterMesh) {
        if (!UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(this.Model.MainSeqCharacterMesh)) {
          t = false;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "检查手动流送", ["是否流送完成", t]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 7, "当前画质等级不开启纹理流送");
    }
    return t;
  }
  ReleaseSeqStreamingData() {
    if (SequenceDefine_1.SequenceRenderSettings.GetTexureStreamingEnable(GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY) ?? 2)) {
      var t = this.Model.SequenceData;
      for (let e = 0; e < t.剧情资源.Num(); e++) {
        var a = t.剧情资源.Get(e);
        UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(a, false);
      }
      if (this.Model.SequenceData.NeedSwitchMainCharacter && this.Model.MainSeqCharacterMesh) {
        UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(this.Model.MainSeqCharacterMesh, false);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "关闭手动流送");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 7, "当前画质等级不开启纹理流送");
    }
  }
  SetMotionBlurState(e) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "打开动态模糊");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlurQuality 4");
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 38, "关闭动态模糊");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlurQuality 0");
    }
  }
  CmdShadowUpdate() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CacheMode3CacheUpdateIntervalsOverride 0,0,0");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.CSMMode3EnableUpdateIntervalOverride 1");
  }
}
exports.RenderAssistant = RenderAssistant;
//# sourceMappingURL=RenderAssistant.js.map