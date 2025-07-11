"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleNewJoinView = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const GachaDefine_1 = require("../../Gacha/GachaDefine");
const GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const RoleController_1 = require("../RoleController");
class RoleNewJoinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.SPe = undefined;
    this.UiCameraHandleData = undefined;
    this.b2t = undefined;
    this.eKt = undefined;
    this.tKt = undefined;
    this.iKt = undefined;
    this.oKt = undefined;
    this.exe = undefined;
    this.hKt = undefined;
    this.$be = undefined;
    this.ENn = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue;
    this.lKt = 0;
    this.l0o = false;
    this.C4_ = false;
    this.P9c = 0;
    this.OnSequenceEventByStringParam = e => {
      switch (e) {
        case "Flash1":
          this.eKt.NiagaraComponent.ReinitializeSystem();
          break;
        case "Flash2":
          if (this.lKt === 5) {
            this.tKt.SetActorHiddenInGame(false);
            this.tKt?.NiagaraComponent.ReinitializeSystem();
          } else if (this.lKt === 4) {
            this.iKt.SetActorHiddenInGame(false);
            this.iKt?.NiagaraComponent.ReinitializeSystem();
          } else if (this.lKt === 3) {
            this.oKt.SetActorHiddenInGame(false);
            this.oKt?.NiagaraComponent.ReinitializeSystem();
          }
      }
    };
    this.CloseViewEvent = () => {
      this.wKt();
    };
    this.wKt = () => {
      this.BKt(true);
    };
    this.BKt = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Gacha", 27, "GachaScene被关闭");
      }
      if (e) {
        if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
          this.CloseMe();
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterCloseGachaScene);
      }
    };
    this._0o = () => {
      this.$ne();
    };
    this.Cho = () => {
      if (!this.l0o) {
        this.l0o = true;
        this.u0o();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIHorizontalLayout], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Cho], [7, this._0o]];
  }
  OnBeforeCreate() {
    this.dFe = this.OpenParam;
    this.lKt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe).QualityId;
  }
  async OnCreateAsync() {
    await Promise.all([ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence([this.dFe]), BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "RoleNewJoinView")]);
  }
  async OnBeforeStartAsync() {
    this.C4_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.SkyBlending.AllowSettingLerpPerFrame") === 0;
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 1");
    }
    if (Info_1.Info.IsLowMemoryDevice && (this.P9c = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.DepthOfFieldQuality"), this.P9c !== 0)) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality 0");
    }
    await this.yNn();
  }
  async yNn() {
    var e = this.dFe;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(e.ShowSequence);
    var e = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(e.SequencePath);
    UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e);
    this.b2t = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined, false);
    this.b2t.SetSequence(e);
    var i = UE.NewArray(UE.SkeletalMesh);
    const t = new CustomPromise_1.CustomPromise();
    var s = this.b2t.GetBindingByTagInTemplate(GachaScanView_1.SCENE_ROLE_TAG, true);
    for (let e = 0; e < s.Num(); e++) {
      var r = s.Get(e);
      if (r) {
        var a = r.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
        for (let e = 0; e < a.Num(); e++) {
          var o = a.Get(e);
          i.Add(o.SkeletalMesh);
        }
      }
    }
    if (!(i.Num() <= 0)) {
      this.ENn = UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(i, undefined, () => {
        t.SetResult();
      });
      await t.Promise;
    }
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(4));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
  }
  OnAfterShow() {
    this.l0o = false;
    this.bl();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.OnSequenceEventByStringParam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.UiCameraHandleData, GachaDefine_1.GACHA_BLEND_CAMERA);
    if (this.ENn === UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue) {
      UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(this.ENn);
      this.ENn = UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue;
    }
    this.DKt();
    this.hKt?.EndGachaScene();
    ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
    UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode();
    if (this.C4_) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 0");
    }
    if (Info_1.Info.IsLowMemoryDevice && this.P9c !== 0) {
      UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.DepthOfFieldQuality " + this.P9c);
    }
  }
  OnHandleLoadScene() {
    this.exe = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0);
    this.eKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"), 0);
    this.tKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"), 0);
    this.iKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"), 0);
    this.oKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"), 0);
    this.hKt = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
    this.hKt.SetTickableWhenPaused(true);
    this.eKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.tKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.iKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    this.oKt.K2_AttachToActor(this.exe, undefined, 2, 2, 2, false);
    var e = new UE.VectorDouble(200, 0, 0);
    var i = new UE.VectorDouble(60, 0, 0);
    var t = new UE.Rotator(0, 90, 0);
    this.eKt.D_K2_SetActorRelativeLocation(i, false, undefined, false);
    this.tKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.iKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.oKt.D_K2_SetActorRelativeLocation(e, false, undefined, false);
    this.eKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.tKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.iKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.oKt.K2_SetActorRelativeRotation(t, false, undefined, false);
    this.UiCameraHandleData = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(GachaDefine_1.GACHA_WEAPON_CAMERA, true, true, GachaDefine_1.GACHA_BLEND_CAMERA);
  }
  bl() {
    this.yKt();
    this.Og();
    this.RefreshModel();
    this.UiViewSequence.StopPrevSequence(false);
    this.UiViewSequence.PlaySequence("Show", true);
  }
  Og() {
    var e;
    var i = this.dFe;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i);
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(i.ElementId);
    if (t) {
      this.GetTexture(3).SetColor(UE.Color.FromHex(t.ElementColor));
      e = this.GetTexture(2);
      this.SetTextureByPath(t.Icon, e);
      t = UE.Color.FromHex(t.ElementColor);
      e.SetColor(t);
    }
    this.GetText(0).ShowTextNew(i.Name);
    this.GetText(5).ShowTextNew(i.Introduction);
    this.$be.RebuildLayout(this.lKt);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "RoleNewJoinView");
  }
  RefreshModel() {
    var e;
    var i = this.dFe;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(i);
    CameraController_1.CameraController.SetViewTarget(this.exe, "RoleNewJoinView.RefreshModel");
    var t = new UE.MovieSceneSequencePlaybackSettings();
    t.bRestoreState = true;
    t.bPauseAtEnd = true;
    this.b2t.PlaybackSettings = t;
    this.b2t.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.exe);
    this.SPe = this.b2t.SequencePlayer;
    if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow) {
      if (i.BindPoint?.length > 0) {
        this.b2t.bOverrideInstanceData = true;
        this.b2t.DefaultInstanceData.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint), 1);
      } else {
        this.b2t.bOverrideInstanceData = true;
        t = this.b2t.DefaultInstanceData;
        e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
        e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(e.D_GetTransform());
        t.TransformOrigin = e;
      }
    } else if (i.BindPoint?.length > 0) {
      this.b2t.bOverrideInstanceData = true;
      this.b2t.DefaultInstanceData.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint), 1);
    }
    this.SPe.PlayTo(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, "A", 2, 0));
    this.RKt();
  }
  RKt() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe);
    if (e.Id === 1302) {
      this.hKt?.Yinlin();
    } else if (e.Id === 1404) {
      this.hKt?.Jiyan();
    } else if (e.Id === 1203) {
      this.hKt?.Anke();
    } else if (e.Id === 1503) {
      this.hKt?.Jueyuan();
    } else if (e.Id === 1301) {
      this.hKt?.Kakaluo();
    } else if (e.Id === 1603) {
      this.hKt?.Chun();
    } else if (e.Id === 1104) {
      this.hKt?.Awu();
    } else if (e.QualityId === 5) {
      this.hKt?.CharacterGolden();
    } else if (e.QualityId === 4) {
      this.hKt?.CharacterPurple();
    }
  }
  yKt() {
    this.tKt.SetActorHiddenInGame(true);
    this.iKt.SetActorHiddenInGame(true);
    this.oKt.SetActorHiddenInGame(true);
    this.tKt.NiagaraComponent?.Deactivate();
    this.iKt.NiagaraComponent?.Deactivate();
    this.oKt.NiagaraComponent?.Deactivate();
  }
  DKt() {
    if (this.SPe) {
      this.SPe.OnStop.Clear();
      this.SPe.Stop();
      this.SPe = undefined;
    }
    if (this.b2t?.IsValid()) {
      const e = this.b2t;
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("RoleNewJoinView.DestroySequence", e);
      });
      this.b2t = undefined;
    }
  }
  $ne() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseGachaSceneView);
  }
  async u0o() {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "RoleNewJoinView");
    var e = [this.dFe];
    RoleController_1.RoleController.CloseAndOpenRoleMainView(this.Info.Name, 0, this.dFe, e, undefined, () => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "RoleNewJoinView");
      this.$ne();
    });
  }
}
exports.RoleNewJoinView = RoleNewJoinView;
//# sourceMappingURL=RoleNewJoinView.js.map