"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderDataManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const WeatherModel_1 = require("../../Module/Weather/WeatherModel");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const RenderConfig_1 = require("../Config/RenderConfig");
const RenderModuleConfig_1 = require("../Manager/RenderModuleConfig");
class RenderDataManager {
  constructor() {
    this.Valid = false;
    this.GlobalShaderParameters = undefined;
    this.SceneInteractionMaterialParameterCollection = undefined;
    this.UiShowBrightnessMaterialParameterCollection = undefined;
    this.UiShowColorSettingMaterialParameterCollection = undefined;
    this.EyesParameterMaterialParameterCollection = undefined;
    this.GroundFogMaskMaterialParameterCollection = undefined;
    this.GlobalLensFlareConfig = undefined;
    this.GlobalDecalShadowConfig = undefined;
    this.PreviousCharacterPosition = undefined;
    this.CurrentCharacterPosition = undefined;
    this.PreviousCharacterPositionWithOffset = undefined;
    this.CurrentCharacterPositionWithOffset = undefined;
    this.CurrentCharacterForward = undefined;
    this.CurrentCameraPosition = undefined;
    this.CurrentCameraPositionWithOffset = undefined;
    this.CurrentCameraForward = undefined;
    this.CurrentPlayerMoveState = undefined;
    this.SceneTime = -0;
    this.TempColor = undefined;
    this.WriteTimeToCollection = false;
    this.IsInUiScene = false;
    this.GlobalFootstepMaterial = undefined;
    this.PlayerInGrass = false;
    this.EmptyMaterial = undefined;
    this.PlayerInCave = false;
    this.PlayerVoxelStateDirty = true;
    this.ForbidWeather = false;
    this.CachedGravityDirect = Vector_1.Vector.Create(0, 0, -1);
    this.xDa = t => {
      this.GlobalFootstepMaterial = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGlobalFootstepMaterialChange, t);
    };
    this.H5l = t => {
      this.ForbidWeather = t;
      WeatherModel_1.WeatherModel.GetWorldWeatherActor().SetWeatherForbidden(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnForbidWeatherStateChange, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 25, "随机天气状态变化", ["状态", t ? "禁用" : "启用"]);
      }
    };
    this.Xlr = 60;
    this.$lr = 1;
    this.Ylr = 0;
    this.ySl = 0;
    this.ESl = 0;
    this.ISl = 0;
  }
  static Get() {
    if (!this.Instance) {
      this.Instance = new RenderDataManager();
      this.Instance.Init();
    }
    return this.Instance;
  }
  Init() {
    this.Valid = false;
    this.LoadAssets();
    this.PreviousCharacterPosition = Vector_1.Vector.Create();
    this.CurrentCharacterPosition = Vector_1.Vector.Create();
    this.PreviousCharacterPositionWithOffset = Vector_1.Vector.Create();
    this.CurrentCharacterPositionWithOffset = Vector_1.Vector.Create();
    this.CurrentCharacterForward = Vector_1.Vector.Create();
    this.CurrentCameraPosition = Vector_1.Vector.Create();
    this.CurrentCameraPositionWithOffset = Vector_1.Vector.Create();
    this.CurrentCameraForward = Vector_1.Vector.Create();
    this.TempColor = new UE.LinearColor();
    this.WriteTimeToCollection = true;
    UE.KuroGlobalGI.BindEventGlobalFootstepMaterialUpdate((0, puerts_1.toManualReleaseDelegate)(this.xDa));
    UE.KuroGlobalGI.BindEventForbidWeatherStateChanged((0, puerts_1.toManualReleaseDelegate)(this.H5l));
  }
  GetRainIntensity() {
    if (GlobalData_1.GlobalData.World && this.GlobalShaderParameters) {
      return UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalRainIntensity);
    } else {
      return 0;
    }
  }
  GetSnowIntensity() {
    if (GlobalData_1.GlobalData.World && this.GlobalShaderParameters) {
      return UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalSnowIntensity);
    } else {
      return 0;
    }
  }
  GetWindIntensity() {
    if (GlobalData_1.GlobalData.World && this.GlobalShaderParameters) {
      return UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.World, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalWindSpeed);
    } else {
      return 0;
    }
  }
  SetGrassAo(t) {
    if (GlobalData_1.GlobalData.World && this.GlobalShaderParameters) {
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalGrassAO, t);
    }
  }
  GetMainLightVector(t = undefined) {
    var t = t || GlobalData_1.GlobalData.World;
    if (t && this.GlobalShaderParameters) {
      t = UE.KismetMaterialLibrary.GetVectorParameterValue(t, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalMainLightVector);
      return Vector_1.Vector.Create(t.R, t.G, t.B);
    }
  }
  GetGlobalLensFlareConfig() {
    if (this.Valid) {
      return this.GlobalLensFlareConfig;
    } else {
      return undefined;
    }
  }
  GetGlobalDecalShadowConfig() {
    if (this.Valid) {
      return this.GlobalDecalShadowConfig;
    } else {
      return undefined;
    }
  }
  GetCurrentCharacterPosition() {
    return this.CurrentCharacterPosition;
  }
  GetPreviousCharacterPosition() {
    return this.PreviousCharacterPosition;
  }
  GetCurrentCharacterPositionWithOffset() {
    return this.CurrentCharacterPositionWithOffset;
  }
  GetPreviousCharacterPositionWithOffset() {
    return this.PreviousCharacterPositionWithOffset;
  }
  GetCurrentCharacterForward() {
    return this.CurrentCharacterForward;
  }
  GetCurrentCameraPosition() {
    return this.CurrentCameraPosition;
  }
  GetCurrentCameraPositionWithOffset() {
    return this.CurrentCameraPosition;
  }
  GetCurrentCameraForward() {
    return this.CurrentCameraForward;
  }
  GetGlobalShaderParameters() {
    return this.GlobalShaderParameters;
  }
  GetSceneInteractionMaterialParameterCollection() {
    return this.SceneInteractionMaterialParameterCollection;
  }
  GetUiShowBrightnessMaterialParameterCollection() {
    return this.UiShowBrightnessMaterialParameterCollection;
  }
  GetUiShowColorSettingMaterialParameterCollection() {
    return this.UiShowColorSettingMaterialParameterCollection;
  }
  GetEyesParameterMaterialParameterCollection() {
    return this.EyesParameterMaterialParameterCollection;
  }
  GetGroundFogMaskMaterialParameterCollection() {
    return this.GroundFogMaskMaterialParameterCollection;
  }
  GetPlayerInGrass() {
    this.Brh();
    return this.PlayerInGrass;
  }
  GetPlayerInCave() {
    this.Brh();
    return this.PlayerInCave;
  }
  Brh() {
    var t;
    if (this.PlayerVoxelStateDirty) {
      t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGlobalGIActor(GlobalData_1.GlobalData.World);
      this.PlayerInGrass = t?.bPlayerInGrass;
      this.PlayerInCave = t?.bPlayerInCave;
      this.PlayerVoxelStateDirty = false;
    }
  }
  GetSceneTime() {
    return this.SceneTime;
  }
  GetGlobalFootstepMaterial() {
    return this.GlobalFootstepMaterial;
  }
  GetEmptyMaterial() {
    return this.EmptyMaterial;
  }
  SetWriteTime(t) {
    this.WriteTimeToCollection = t;
  }
  TickForce(t) {
    var e;
    var i;
    var r;
    var s;
    if (this.Valid) {
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start();
      this.PlayerVoxelStateDirty = true;
      e = GlobalData_1.GlobalData.World;
      if ((r = Global_1.Global.CharacterCameraManager) && r.IsValid() && (s = r.D_K2_GetActorLocation(), i = r.K2_GetActorLocation(), r = r.GetActorForwardVector(), this.CurrentCameraPosition.FromUeVector(s), this.CurrentCameraPositionWithOffset.FromUeVector(i), this.CurrentCameraForward.FromUeVector(r), UE.KismetMaterialLibrary.SetVectorParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalCameraPosAndRadius, new UE.LinearColor(i.X, i.Y, i.Z, 0)), (s = Info_1.Info.IsGameRunning() && (GlobalData_1.GlobalData.IsUiSceneOpen || GlobalData_1.GlobalData.IsUiSceneLoading)) !== this.IsInUiScene)) {
        this.IsInUiScene = s;
        this.MPn();
      }
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop();
    }
  }
  Tick(t) {
    var e;
    var i;
    var r;
    var s;
    if (this.Valid) {
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Start();
      t = t * TimeUtil_1.TimeUtil.Millisecond;
      e = GlobalData_1.GlobalData.World;
      if ((i = Global_1.Global.PawnOrSpectator) && i.IsValid()) {
        r = i.D_K2_GetActorLocation();
        s = i.K2_GetActorLocation();
        i = i.GetActorForwardVector();
        this.PreviousCharacterPosition.Set(this.CurrentCharacterPosition.X, this.CurrentCharacterPosition.Y, this.CurrentCharacterPosition.Z);
        this.PreviousCharacterPositionWithOffset.Set(this.CurrentCharacterPositionWithOffset.X, this.CurrentCharacterPositionWithOffset.Y, this.CurrentCharacterPositionWithOffset.Z);
        this.CurrentCharacterPosition.FromUeVector(r);
        this.CurrentCharacterPositionWithOffset.FromUeVector(s);
        this.CurrentCharacterForward.FromUeVector(i);
        r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(176);
        this.CurrentPlayerMoveState = r?.MoveState;
        s = this.CurrentPlayerMoveState && this.CurrentPlayerMoveState < CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb;
        UE.KismetMaterialLibrary.SetScalarParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalCharacterOnGround, s ? 1 : 0);
        this.Jlr(this.PreviousCharacterPositionWithOffset);
        UE.KismetMaterialLibrary.SetVectorParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalCharacterPreviousWP, this.TempColor);
        this.Jlr(this.CurrentCharacterPositionWithOffset);
        UE.KismetMaterialLibrary.SetVectorParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalCharacterWorldPosition, this.TempColor);
        this.Jlr(this.CurrentCharacterForward);
        UE.KismetMaterialLibrary.SetVectorParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalCharacterWorldForwardDirection, this.TempColor);
        if (ModelManager_1.ModelManager.GameModeModel.InstanceType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance) {
          this.SceneTime = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute;
        }
        if (this.WriteTimeToCollection) {
          i = Math.floor(this.SceneTime / this.Xlr);
          UE.KismetMaterialLibrary.SetScalarParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalTimeHour, i);
          UE.KismetMaterialLibrary.SetScalarParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GlobalTimeMinutes, this.SceneTime - i * this.Xlr);
        }
        if ((r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(45)) && !(s = r.GravityDirect).Equals(this.CachedGravityDirect)) {
          this.Jlr(s);
          UE.KismetMaterialLibrary.SetVectorParameterValue(e, this.GlobalShaderParameters, RenderConfig_1.RenderConfig.GravityDirection, this.TempColor);
          this.CachedGravityDirect.DeepCopy(s);
        }
        this.SetAudioParameters(t);
      }
      RenderModuleConfig_1.RenderStats.StatRenderDataManagerTick.Stop();
    }
  }
  LoadAssets() {
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Render/Data/DA_GlobalRenderDataReference.DA_GlobalRenderDataReference", UE.PDA_GlobalRenderDataReference_C, t => {
      if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
        this.Valid = true;
        this.GlobalShaderParameters = t.GlobalShaderParameters;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.GlobalShaderParameters)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "缺失全局材质参数文件");
          }
        }
        this.SceneInteractionMaterialParameterCollection = t.SceneInteractionShaderParameters;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.SceneInteractionMaterialParameterCollection)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "缺失交互物着色器参数文件");
          }
        }
        this.GlobalLensFlareConfig = t.GlobalLensFlareConfig;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.GlobalLensFlareConfig)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "缺失LensFlare配置文件");
          }
        }
        this.UiShowBrightnessMaterialParameterCollection = t.MPC_ShowBrightness;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.UiShowBrightnessMaterialParameterCollection)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "缺失UI_ShowBrightness配置文件");
          }
        }
        this.UiShowColorSettingMaterialParameterCollection = t.MPC_ShowColorSetting;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.UiShowColorSettingMaterialParameterCollection)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 74, "缺失UI_ShowColorSetting配置文件");
          }
        }
        this.GlobalDecalShadowConfig = t.DefaultDecalShadow;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.GlobalDecalShadowConfig)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 25, "缺失DecalShadow配置文件");
          }
        }
        this.EyesParameterMaterialParameterCollection = t.EyesParameters;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.EyesParameterMaterialParameterCollection)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 25, "缺失EyesParameters配置文件");
          }
        }
        this.GroundFogMaskMaterialParameterCollection = t.MPC_GroundFogMask;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.GroundFogMaskMaterialParameterCollection)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 39, "缺失GroundFogMask配置文件");
          }
        }
        this.EmptyMaterial = t.EmptyMaterial;
        if (!ObjectUtils_1.ObjectUtils.IsValid(this.EmptyMaterial)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 25, "缺失EmptyMaterial");
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Render", 25, "RenderDataManager缺失全局配置文件");
      }
    });
  }
  Destroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.xDa);
    (0, puerts_1.releaseManualReleaseDelegate)(this.H5l);
  }
  SetAudioParameters(t) {
    var e;
    var i;
    this.Ylr -= t;
    if (!(this.Ylr > 0)) {
      this.Ylr = this.$lr;
      t = this.GetRainIntensity();
      e = this.GetSnowIntensity();
      i = this.GetWindIntensity();
      if (this.ySl !== t) {
        AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPCRAININTENSITY, t / 5);
        this.ySl = t;
      }
      if (this.ESl !== e) {
        AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPCSNOWINTENSITY, e / 5);
        this.ESl = e;
      }
      if (this.ISl !== i) {
        AudioSystem_1.AudioSystem.SetRtpcValue(AudioDefine_1.RTPCWINDINTENSITY, i / 10);
        this.ISl = i;
      }
    }
  }
  Jlr(t) {
    this.TempColor.R = t.X;
    this.TempColor.G = t.Y;
    this.TempColor.B = t.Z;
  }
  MPn() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetClusteredStuffVisible(GlobalData_1.GlobalData.World, !this.IsInUiScene);
  }
}
(exports.RenderDataManager = RenderDataManager).Instance = undefined;
//# sourceMappingURL=RenderDataManager.js.map