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
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GachaScanView_1 = require("../../Module/Gacha/GachaResultView/GachaScanView");
const PersonalDefine_1 = require("../../Module/Personal/Model/PersonalDefine");
const PersonalUtil_1 = require("../../Module/Personal/Model/PersonalUtil");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const UiLayer_1 = require("../UiLayer");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
class UiBehaviorGachaSequence {
  constructor() {
    this.C4_ = false;
    this.NHu = 0;
    this.RoleShowSequence = undefined;
    this.Hha = undefined;
    this.Kma = undefined;
    this.Qma = undefined;
    this.cVi = new Map();
    this.Fpd = new Map();
  }
  OnAfterUiStart() {
    this.C4_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.SkyBlending.AllowSettingLerpPerFrame") === 0;
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 1");
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 0");
    }
    if (Info_1.Info.IsLowMemoryDevice && (this.NHu = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.DepthOfFieldQuality"), this.NHu !== 0)) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality 0");
    }
    ControllerHolder_1.ControllerHolder.MenuController.CloseAllFilter();
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
    var r = [];
    for (const a of e) {
      if (a > 0 && !this.cVi.has(a)) {
        r.push(this.PreLoadLevelSequence(a));
      }
    }
    await Promise.all(r);
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
      await PersonalUtil_1.PersonalUtil.PreloadRoleSequence(e, this.cVi, this.Fpd);
    }
  }
  PlayRoleSequence(r) {
    if (r && !(r <= 0)) {
      const a = this.cVi.get(r);
      if (a) {
        if (this.RoleShowSequence) {
          UiLayer_1.UiLayer.SetShowMaskLayer("PersonalRootView", true);
          AudioSystem_1.AudioSystem.PostEvent(PersonalDefine_1.STOP_AUDIO_EVENT_NAME, undefined, {
            CallbackMask: 1,
            CallbackHandler: e => {
              if (e === 0) {
                this.RoleShowSequence?.Pause();
                this.RoleShowSequence?.GoToEndAndStop(0);
                TimerSystem_1.GameplayTimerSystem.Next(() => {
                  this.jQc(r, a);
                  UiLayer_1.UiLayer.SetShowMaskLayer("PersonalRootView", false);
                });
              }
            }
          });
        } else {
          this.jQc(r, a);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GachaSequencePlayer", 58, "UiBehaviorGachaSequence 未找到SequenceActor", ["roleId", r]);
      }
    }
  }
  jQc(e, r) {
    if (this.Qma) {
      var a = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (a) {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("PlaySequence");
        var i = r.GetSequence();
        UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
        UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(i);
        CameraController_1.CameraController.SetViewTarget(this.Qma, "UiBehaviorGachaSequence");
        r.bOverrideInstanceData = true;
        r.SetTickableWhenPaused(!ModelManager_1.ModelManager.GameModeModel.IsMulti);
        r.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.Qma, false, true);
        var i = r.DefaultInstanceData;
        const o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
        i.TransformOrigin = o;
        if (a.BindPoint?.length > 0) {
          i.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(a.BindPoint), 1);
        } else {
          a = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
          const o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(a.D_GetTransform());
          i.TransformOrigin = o;
        }
        a = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
        this.Hha?.UpdateGachaShowItem(e, a.QualityId);
        this.RoleShowSequence = r.SequencePlayer;
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
  SetSequencePlayBackSetting(e, r) {
    var a = this.cVi.get(e);
    if (a) {
      a.PlaybackSettings = r;
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
    for (const r of this.Fpd.values()) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(r);
    }
    this.Fpd.clear();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("PlaySequence");
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 0");
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 1");
    }
    if (Info_1.Info.IsLowMemoryDevice && this.NHu !== 0) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality " + this.NHu);
    }
    ControllerHolder_1.ControllerHolder.MenuController.OpenAllFilter();
  }
}
exports.UiBehaviorGachaSequence = UiBehaviorGachaSequence;
//# sourceMappingURL=UiBehaviorGachaSequence.js.map