"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorGachaSequence = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const CameraController_1 = require("../../Camera/CameraController");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GachaScanView_1 = require("../../Module/Gacha/GachaResultView/GachaScanView");
const PersonalDefine_1 = require("../../Module/Personal/Model/PersonalDefine");
const PersonalUtil_1 = require("../../Module/Personal/Model/PersonalUtil");
const UiModelResourcesManager_1 = require("../../Module/UiComponent/UiModelResourcesManager");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const UiLayer_1 = require("../UiLayer");
class UiBehaviorGachaSequence {
  constructor() {
    this.C4_ = false;
    this.oXu = 0;
    this.RoleShowSequence = undefined;
    this.Hha = undefined;
    this.Kma = undefined;
    this.Qma = undefined;
    this.cVi = new Map();
    this.Vha = new Map();
  }
  OnAfterUiStart() {
    this.C4_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.SkyBlending.AllowSettingLerpPerFrame") === 0;
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 1");
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 0");
    }
    if (Info_1.Info.IsLowMemoryDevice && (this.oXu = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.DepthOfFieldQuality"), this.oXu !== 0)) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality 0");
    }
  }
  BindUpdateInteractBp(e) {
    this.Hha = e;
    this.Hha.SetTickableWhenPaused(true);
  }
  BindSceneSequenceCamera(e) {
    this.Qma = e;
  }
  BindEmptySequenceCamera(e) {
    this.Kma = e;
  }
  async PreloadLevelSequenceList(e) {
    var a = [];
    for (const r of e) {
      if (r > 0 && !this.cVi.has(r)) {
        a.push(this.PreLoadLevelSequence(r));
      }
    }
    await Promise.all(a);
  }
  async PreLoadLevelSequence(e) {
    if (e <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GachaSequencePlayer", 58, "Invalid roleId", ["roleId", e]);
      }
    } else if (this.cVi.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GachaSequencePlayer", 58, "LevelSequenceActor already cached", ["roleId", e]);
      }
    } else {
      await PersonalUtil_1.PersonalUtil.PreloadRoleSequence(e, this.cVi, this.Vha);
    }
  }
  PlayRoleSequence(a) {
    if (a && !(a <= 0)) {
      const r = this.cVi.get(a);
      if (r) {
        if (this.RoleShowSequence) {
          UiLayer_1.UiLayer.SetShowMaskLayer("PersonalRootView", true);
          AudioSystem_1.AudioSystem.PostEvent(PersonalDefine_1.STOP_AUDIO_EVENT_NAME, undefined, {
            CallbackMask: 1,
            CallbackHandler: e => {
              if (e === 0) {
                this.RoleShowSequence?.Pause();
                this.RoleShowSequence?.GoToEndAndStop(0);
                TimerSystem_1.GameplayTimerSystem.Next(() => {
                  this.JQc(a, r);
                  UiLayer_1.UiLayer.SetShowMaskLayer("PersonalRootView", false);
                });
              }
            }
          });
        } else {
          this.JQc(a, r);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GachaSequencePlayer", 58, "UiBehaviorGachaSequence 未找到SequenceActor", ["roleId", a]);
      }
    }
  }
  JQc(e, a) {
    if (this.Qma) {
      var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (r) {
        var i = a.GetSequence();
        UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
        UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(i);
        CameraController_1.CameraController.SetViewTarget(this.Qma, "UiBehaviorGachaSequence");
        a.bOverrideInstanceData = true;
        a.SetTickableWhenPaused(!ModelManager_1.ModelManager.GameModeModel.IsMulti);
        a.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.Qma, false, true);
        var i = a.DefaultInstanceData;
        const o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
        i.TransformOrigin = o;
        if (r.BindPoint?.length > 0) {
          i.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(r.BindPoint), 1);
        } else {
          r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
          const o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r.D_GetTransform());
          i.TransformOrigin = o;
        }
        r = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
        this.Hha?.UpdateGachaShowItem(e, r.QualityId);
        this.RoleShowSequence = a.SequencePlayer;
        i = this.RoleShowSequence.GetStartTime().Time;
        this.RoleShowSequence.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 1));
        this.RoleShowSequence.PlayTo(new UE.MovieSceneSequencePlaybackParams(i, 0, "A", 2, 0));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GachaSequencePlayer", 58, "未设置SceneSequenceCamera");
    }
  }
  PlayEmptySequence() {
    if (this.Kma) {
      this.StopCurrentSequence();
      this.Hha?.UpdateGachaShowItem(3, 4);
      CameraController_1.CameraController.SetViewTarget(this.Kma, "RoleNewJoinView.SceneEmptyCamera");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GachaSequencePlayer", 58, "未设置SceneEmptyCamera");
    }
  }
  StopCurrentSequence() {
    if (this.RoleShowSequence) {
      this.RoleShowSequence.Pause();
      this.RoleShowSequence.GoToEndAndStop(0);
      AudioSystem_1.AudioSystem.PostEvent(PersonalDefine_1.STOP_AUDIO_EVENT_NAME);
    }
  }
  SetSequencePlayBackSetting(e, a) {
    var r = this.cVi.get(e);
    if (r) {
      r.PlaybackSettings = a;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GachaSequencePlayer", 58, "UiBehaviorGachaSequence 未找到SequenceActor", ["roleId", e]);
    }
  }
  OnBeforeDestroy() {
    this.StopCurrentSequence();
    this.Hha?.EndGachaScene();
    for (const e of this.cVi.values()) {
      UE.KuroActorManager.DestroyActor(e);
    }
    this.cVi.clear();
    for (const a of this.Vha.values()) {
      UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(a);
    }
    this.Vha.clear();
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 0");
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 1");
    }
    if (Info_1.Info.IsLowMemoryDevice && this.oXu !== 0) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality " + this.oXu);
    }
  }
}
exports.UiBehaviorGachaSequence = UiBehaviorGachaSequence;
//# sourceMappingURL=UiBehaviorGachaSequence.js.map