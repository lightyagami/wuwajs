"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharRenderingComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EffectEnvironment_1 = require("../../../../Core/Effect/EffectEnvironment");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WorldModel_1 = require("../../../World/Model/WorldModel");
const RenderConfig_1 = require("../../Config/RenderConfig");
const RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
const RenderModuleController_1 = require("../../Manager/RenderModuleController");
const RenderUtil_1 = require("../../Utils/RenderUtil");
const CharBodyEffect_1 = require("../Components/Components/CharBodyEffect");
const CharRuntimeMaterialControllerGroupInfo_1 = require("../Components/MaterialController/CharRuntimeMaterialControllerGroupInfo");
class CharRenderingComponent extends UE.KuroCharRenderingComponent {
  constructor() {
    super(...arguments);
    this.RenderType = undefined;
    this.InteractionConfig = undefined;
    this.DecalShadowConfig = undefined;
    this.AllRenderComps = undefined;
    this.AllRenderCompsMap = undefined;
    this.IsInit = false;
    this.IsStartInvoke = false;
    this.DeltaTime = 0;
    this.IsOnMobile = false;
    this.AllMaterialControlRuntimeDataGroupMap = undefined;
    this.IndexCount = 0;
    this.TempRemoveList = undefined;
    this.SequenceHandleIds = undefined;
    this.IsDebug = false;
    this.CachedOwner = undefined;
    this.CachedOwnerName = "";
    this.CachedOwnerEntity = undefined;
    this.LogicOwner = undefined;
    this.IsLogicOwnerTsEffectActor = false;
    this.IsUiUpdate = false;
    this.MonsterUseBodyEffect = false;
    this.UseMaterialContainerV2 = true;
    this.CanUpdate = true;
    this.UseProxy = false;
    this.ProxyMaterialsOverride = undefined;
    this.ProxyRenderInMainPass = false;
    this.ProxyRenderShadow = false;
    this.ProxyRenderTrail = false;
    this.Proxy = undefined;
    this.DitherRemap = 0;
    this.DisableFightDither = false;
    this.FightDitherRateCache = 1;
    this.OnRoleGoDownFinishEventAdded = false;
    this.RemoveInteractionOnRoleGoDownFinish = undefined;
    this.IsInDebugModeInternal = false;
    this.IsRecordInternal = false;
  }
  Constructor() {
    this.RenderType = undefined;
    this.AllRenderComps = undefined;
    this.AllRenderCompsMap = undefined;
    this.IsInit = false;
    this.IsStartInvoke = false;
    this.DeltaTime = 0;
    this.IsOnMobile = false;
    this.AllMaterialControlRuntimeDataGroupMap = undefined;
    this.IndexCount = 0;
    this.TempRemoveList = undefined;
    this.SequenceHandleIds = undefined;
    this.IsDebug = false;
    this.CachedOwner = undefined;
    this.CachedOwnerName = "";
    this.CachedOwnerEntity = undefined;
    this.LogicOwner = undefined;
    this.IsLogicOwnerTsEffectActor = false;
    this.IsUiUpdate = false;
    this.UseMaterialContainerV2 = true;
    this.CanUpdate = true;
    this.Proxy = undefined;
    this.DisableFightDither = false;
    this.FightDitherRateCache = 1;
    this.OnRoleGoDownFinishEventAdded = false;
    this.RemoveInteractionOnRoleGoDownFinish = undefined;
    this.IsInDebugModeInternal = false;
    this.IsRecordInternal = false;
  }
  QuickInitAndAddData(e, t = undefined) {
    RenderModuleConfig_1.RenderStats.Init();
    if (!this.CheckInit()) {
      this.Init(6);
    }
    if (!(this.GetOwner() instanceof UE.TsBaseCharacter_C)) {
      if (t) {
        this.AddComponentByCase(0, t.SkeletalMeshComponent);
      }
    }
    t = this.AddMaterialControllerData(e);
    this.SequenceHandleIds.push(t);
    return t;
  }
  QuickInitAndAddDataWithMeshComponent(e, t = undefined) {
    RenderModuleConfig_1.RenderStats.Init();
    if (!this.CheckInit()) {
      this.Init(6);
    }
    if (!(this.GetOwner() instanceof UE.TsBaseCharacter_C)) {
      if (t) {
        this.AddComponentByCase(0, t);
      }
    }
    t = this.AddMaterialControllerData(e);
    this.SequenceHandleIds.push(t);
    return t;
  }
  QuickInitAndAddDataGroup(e, t = undefined) {
    RenderModuleConfig_1.RenderStats.Init();
    if (!this.CheckInit()) {
      this.Init(6);
    }
    if (!(this.GetOwner() instanceof UE.TsBaseCharacter_C)) {
      if (t) {
        this.AddComponentByCase(0, t.SkeletalMeshComponent);
      }
    }
    t = this.AddMaterialControllerDataGroup(e);
    this.SequenceHandleIds.push(t);
    return t;
  }
  QuickInitAndAddDataGroupWithMeshComponent(e, t = undefined) {
    RenderModuleConfig_1.RenderStats.Init();
    if (!this.CheckInit()) {
      this.Init(6);
    }
    if (!(this.GetOwner() instanceof UE.TsBaseCharacter_C)) {
      if (t) {
        this.AddComponentByCase(0, t);
      }
    }
    t = this.AddMaterialControllerDataGroup(e);
    this.SequenceHandleIds.push(t);
    return t;
  }
  Init(t) {
    if (this.IsValid()) {
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentInit?.Start();
      let e = false;
      this.CachedOwner = this.GetOwner();
      this.CachedOwnerName = this.CachedOwner.GetName().toString();
      if (this.CachedOwner instanceof TsBaseCharacter_1.default) {
        this.CachedOwnerEntity = this.CachedOwner.GetEntityNoBlueprint();
      }
      if (this.IsInit) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderCharacter", 13, "材质控制器已初始化", ["Actor", this.CachedOwnerName]);
        }
        e = true;
      }
      if (t === 9) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 13, "错误：初始化参数错误. 初始化类型不应为Error", ["Actor", this.CachedOwnerName]);
        }
        e = true;
      }
      if (!e) {
        if (t === 8) {
          this.IsUiUpdate = GlobalData_1.GlobalData.IsUiSceneOpen;
        }
        if (t === 3 && this.CachedOwner instanceof TsBaseCharacter_1.default && this.CachedOwner.Mesh) {
          this.CachedOwner.Mesh.IsSpecialForLocalLightShadow = true;
        }
        this.DeltaTime = 0;
        this.IsOnMobile = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(GlobalData_1.GlobalData.World) === 0;
        this.AllRenderComps = new Array();
        this.AllRenderCompsMap = new Map();
        this.IsInit = false;
        this.IsStartInvoke = false;
        this.RenderType = t;
        this.TempRemoveList = [];
        this.SequenceHandleIds = [];
        this.IsDebug = false;
        for (const i of this.GetRenderComps()) {
          if (this.AllRenderCompsMap.has(i.GetComponentId())) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RenderCharacter", 13, "错误:重复添加渲染模块 ID", ["Actor", this.CachedOwnerName], ["渲染模块ID", i.GetComponentId()]);
            }
          } else {
            this.AllRenderCompsMap.set(i.GetComponentId(), i);
            this.AllRenderComps.push(i);
            i.Awake(this);
          }
        }
        this.IsInit = true;
        this.IsStartInvoke = false;
        this.IndexCount = 0;
        this.AllMaterialControlRuntimeDataGroupMap = new Map();
        this.InvokeStart();
      }
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentInit?.Stop();
    }
  }
  AddRenderCompDynamic(e) {
    if (this.AllRenderCompsMap.has(e.GetComponentId())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 13, "错误:动态重复添加渲染模块 ID", ["Actor", this.CachedOwnerName], ["渲染模块ID", e.GetComponentId()]);
      }
    } else {
      e.Awake(this);
      this.AllRenderCompsMap.set(e.GetComponentId(), e);
      this.AllRenderComps.push(e);
      try {
        e.Start();
      } catch {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "错误:动态添加组件初始化错误:", ["Actor", this.GetOwner().GetName()], ["组件ID", e.GetComponentId()]);
        }
        return;
      }
      if (e.GetIsInitSuc()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderCharacter", 25, "动态添加渲染模块 ID", ["Actor", this.CachedOwnerName], ["渲染模块ID", e.GetComponentId()]);
        }
        return e;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 25, "错误:动态添加组件初始化错误:", ["Actor", this.GetOwner().GetName()], ["组件ID", e.GetComponentId()]);
      }
    }
  }
  SetLogicOwner(e) {
    this.LogicOwner = e;
    if (this.LogicOwner) {
      if (EffectEnvironment_1.EffectEnvironment.OpenCppOptimize) {
        this.IsLogicOwnerTsEffectActor = this.LogicOwner.IsA(UE.EffectSystemActor.StaticClass());
      } else {
        this.IsLogicOwnerTsEffectActor = this.LogicOwner.IsA(UE.TsEffectActor_C.StaticClass());
      }
    }
  }
  AddComponent(e, t) {
    if (this.IsInDebugMode && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderCharacter", 40, "【DEPRECATED】请使用AddComponentByCase接口");
    }
    this.AddComponentInner(e, t, false);
  }
  AddComponentWithEmptyMaterial(e, t) {
    this.AddComponentInner(e, t, true);
  }
  RemoveComponent(e) {
    if (this.IsInDebugMode && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderCharacter", 40, "【DEPRECATED】请使用RemoveComponentByCase接口");
    }
    this.RemoveComponentInner(e);
  }
  AddComponentByCase(e, t) {
    if (t) {
      if (e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e]) {
        this.AddComponentInner(e, t, false);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderCharacter", 13, "添加的MeshComponent是失效的", ["Actor", this.CachedOwner.GetName()]);
    }
  }
  RemoveComponentByCase(e) {
    e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e];
    if (e) {
      this.RemoveComponentInner(e);
    }
  }
  AddComponentInner(t, i, r) {
    if (this.UseMaterialContainerV2) {
      this.AddComponentInnerV2(t, i, r);
    } else {
      var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
      var o = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
      let e = false;
      if (o) {
        o.RemoveSkeletalMeshMaterialControllerData(t);
      }
      if (n) {
        n.RemoveSkeletalComponent(t);
        e = n.AddSkeletalComponent(i, t, r);
      }
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderCharacter", 13, "添加的MeshComponent是失效的!", ["Actor", this.CachedOwner.GetName()]);
        }
      }
    }
    this.AddComponentForDecalShadow(t, i);
  }
  AddComponentInnerV2(e, t, i) {
    var r = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (r) {
      r.RemoveSkeletalComponent(e);
      r.AddSkeletalComponent(t, e, i);
    }
  }
  RemoveComponentInner(e) {
    var t;
    var i;
    if (this.UseMaterialContainerV2) {
      this.RemoveComponentInnerV2(e);
    } else {
      t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
      if (i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)) {
        i.RemoveSkeletalMeshMaterialControllerData(e);
      }
      if (t && !t.RemoveSkeletalComponent(e) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderCharacter", 13, "无法找到要删除的MeshComponent", ["Actor", this.GetOwner().GetName()]);
      }
    }
    this.RemoveComponentFromDecalShadow(e);
  }
  RemoveComponentInnerV2(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (t) {
      t.RemoveSkeletalComponent(e);
    }
  }
  GetSkeletalMeshComponent(e) {
    if (this.UseMaterialContainerV2) {
      var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
      if (t) {
        return t.GetSkeletalComponent(e);
      }
    } else {
      t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
      if (t) {
        return t.AllBodyInfoList.get(e)?.SkeletalComp;
      }
    }
  }
  GetSkeletalMeshComponentBodyName(e) {
    if (this.UseMaterialContainerV2) {
      var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
      if (t) {
        return t.GetSkeletalMeshComponentBodyName(e);
      }
    }
  }
  CheckInit() {
    return this.IsInit;
  }
  SetDebug(e) {
    this.IsDebug = e;
  }
  GetDebugInfo() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    if (e) {
      if (this.IsDebug) {
        e.EnableDebug = true;
        return e.DebugInfo;
      } else {
        e.EnableDebug = false;
        return;
      }
    }
  }
  GetComponent(e) {
    if (this.IsInit && this.AllRenderCompsMap.has(e)) {
      return this.AllRenderCompsMap.get(e);
    }
  }
  Tick(e) {
    this.Update(e);
  }
  ReceiveEndPlay(e) {
    if (e !== 2) {
      this.Destroy();
    }
  }
  GetDeltaTime() {
    return this.DeltaTime;
  }
  GetTimeDilation() {
    let e = RenderModuleController_1.RenderModuleController.IsGamePaused ? 0 : RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
    var t;
    if (e === 0) {
      return 0;
    } else {
      if (this.LogicOwner && this.IsLogicOwnerTsEffectActor) {
        if (EffectEnvironment_1.EffectEnvironment.OpenCppOptimize) {
          t = this.LogicOwner;
          e *= t.GetTimeScale();
        } else {
          t = this.LogicOwner;
          e *= t.GetTimeScale();
        }
      } else if ((t = this.CachedOwnerEntity?.GetComponent(188)) && (t = this.CachedOwnerEntity.TimeDilation * t.CurrentTimeScale) > 1) {
        e *= t;
      }
      return e;
    }
  }
  GetInWater(e = 2) {
    return this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction)?.GetInWater(e);
  }
  GetWaterHitLocationZ() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
    if (e) {
      return e.GetWaterHitLocationZ();
    } else {
      return 0;
    }
  }
  GetInAudioShr() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
    return !!e && e.GetInAudioShr();
  }
  GetAudioShrTag() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
    if (e) {
      return e.GetAudioShrTag();
    } else {
      return FNameUtil_1.FNameUtil.NONE;
    }
  }
  GetRenderType() {
    return this.RenderType;
  }
  ResetAllRenderingState() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderCharacter", 25, "材质控制器 ResetAllRenderingState:", ["Actor", this.CachedOwnerName]);
    }
    for (const e of this.AllRenderComps) {
      if (e.GetIsInitSuc()) {
        e.OnResetRenderState();
      }
    }
    for (const t of this.AllMaterialControlRuntimeDataGroupMap.keys()) {
      EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, t);
    }
    this.AllMaterialControlRuntimeDataGroupMap?.clear();
  }
  ResetAllRenderingStateForDebug() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    if (e && e.AllMaterialControlRuntimeDataMap.size > 0) {
      e.PrintCurrentInfo();
      this.ResetAllRenderingState();
    }
  }
  AddMaterialControllerDataGroup(e) {
    return this.AddMaterialControllerDataGroupWithAnimObject(e);
  }
  AddMaterialControllerDataGroupWithAnimObject(e, t) {
    var i = e;
    if (!i) {
      return -1;
    }
    var r = ++this.IndexCount;
    let n = 0;
    if ((n = this.UseMaterialContainerV2 ? this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2).GetEffectCount() : this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController).AllMaterialControlRuntimeDataMap.size) > RenderConfig_1.RenderConfig.RefErrorCount && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 13, "材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间", ["Actor", this.GetOwner().GetName()], ["添加的材质控制器名称", e.GetName()], ["ID", r]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderCharacter", 40, "添加材质控制器组", ["Actor", this.GetOwner().GetName()], ["添加的材质控制器名称", e.GetName()], ["ID", r]);
    }
    if (i.CleanOriginEffect) {
      this.CleanOriginEffect();
    }
    var o = new CharRuntimeMaterialControllerGroupInfo_1.CharMaterialControlRuntimeDataGroup();
    o.Init(this, i, t);
    this.AllMaterialControlRuntimeDataGroupMap.set(r, o);
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnAddMaterialControllerGroup, e, r);
    return r;
  }
  CleanOriginEffect() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2);
    if (e) {
      e.CleanOriginEffectByOtherData();
    }
  }
  RemoveMaterialControllerDataGroup(e) {
    e = this.AllMaterialControlRuntimeDataGroupMap.get(e);
    if (e) {
      e.EndState();
    }
  }
  RemoveMaterialControllerDataGroupWithEnding(e) {
    e = this.AllMaterialControlRuntimeDataGroupMap.get(e);
    if (e) {
      e.EndStateWithEnding();
    }
  }
  GetCachedOwner() {
    return this.CachedOwner;
  }
  GetCachedOwnerName() {
    return this.CachedOwnerName;
  }
  GetCachedOwnerEntity() {
    return this.CachedOwnerEntity;
  }
  AddMaterialControllerDataInner(e, t, i) {
    if (!e) {
      return -1;
    }
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Start();
    if (e.CleanOriginEffect) {
      this.CleanOriginEffect();
    }
    let r = -1;
    if (this.UseMaterialContainerV2) {
      r = this.AddMaterialControllerDataInnerV2(e, t, i);
    } else {
      i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
      if (!i) {
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop();
        return -1;
      }
      if (CharRenderingComponent.DisableForDebug) {
        this.ResetAllRenderingStateForDebug();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderCharacter", 40, "【DEBUG】材质控制已关闭", ["Actor", this.GetOwner().GetName()], ["材质控制器", e.GetName()]);
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop();
        return -1;
      }
      r = i.AddMaterialControllerData(e, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderCharacter", 25, "添加材质控制器", ["Actor", this.GetOwner().GetName()], ["材质控制器", e.GetName()], ["handle", r], ["CleanOriginEffect", e.CleanOriginEffect]);
      }
    }
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnAddMaterialController, e, t, r);
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop();
    return r;
  }
  OnRemoveMaterialController(e) {}
  AddMaterialControllerDataInnerV2(e, t, i) {
    var r = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2);
    if (r) {
      return r.AddMaterialControllerData(e, t, i);
    } else {
      return -1;
    }
  }
  AddMaterialControllerDataWithUserData(e, t) {
    return this.AddMaterialControllerDataInner(e, t);
  }
  AddMaterialControllerDataWithAnimObject(e, t, i) {
    return this.AddMaterialControllerDataInner(e, i, t);
  }
  AddMaterialControllerData(e) {
    return this.AddMaterialControllerDataInner(e, undefined);
  }
  RemoveMaterialControllerData(e) {
    var t;
    if (this.UseMaterialContainerV2) {
      if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2)) {
        t.RemoveMaterialControllerData(e);
      }
    } else if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)) {
      t.RemoveMaterialControllerData(e);
    }
  }
  RemoveAllUnloopedEffects() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (e) {
      e.RemoveAllUnloopedEffects();
    }
  }
  UpdateMaterialEffectsOnly() {
    var e;
    if (this.UseMaterialContainerV2 && (e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2))) {
      e.UpdateEffectsOnly();
    }
  }
  SetEffectPause(e, t) {
    var i;
    if (this.UseMaterialContainerV2 && (i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2))) {
      i.SetEffectPause(e, t);
    }
  }
  RemoveMaterialControllerDataWithEnding(e) {
    var t;
    if (this.UseMaterialContainerV2) {
      if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2)) {
        t.RemoveMaterialControllerDataWithEnding(e);
      }
    } else if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)) {
      t.RemoveMaterialControllerDataWithEnding(e);
    }
  }
  UpdateNpcDitherComponent() {
    var e;
    if (this.IsInit) {
      if (this.RenderType !== 3) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 11, "NPC更新不是NPC类型");
        }
      } else if (e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect)) {
        e.UpdateNpcDitherComponent();
      }
    }
  }
  SetDitherEffect(t, i) {
    var r = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (r) {
      let e = t;
      if (i === 1) {
        this.FightDitherRateCache = t;
        e = this.DisableFightDither ? 1 : t;
      }
      e = CharRenderingComponent.GlobalDisableDitherEffect ? 1 : e;
      e = MathUtils_1.MathUtils.Clamp(e / (1 - this.DitherRemap), 0, 1);
      try {
        r.SetDitherEffect(e, i);
        this.SetBodyEffectOpacity(r.GetDitherRate());
        this.SetDecalShadowOpacity(r.GetDitherRate());
        this.SetRealTimeShadowOpacity(r.GetDitherRate());
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Render", 25, "CharacterRenderingComponent.SetDitherEffect执行异常", e, ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 25, "CharacterRenderingComponent.SetDitherEffect执行异常", ["error", e]);
        }
      }
    }
  }
  SetDisableFightDither(e) {
    this.DisableFightDither = e;
    this.SetDitherEffect(this.FightDitherRateCache, 1);
  }
  SetDitherApplyAll() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (e) {
      e.SetDitherMask([], false);
    }
  }
  SetDitherApplyHeadsOnly() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (e) {
      e.SetDitherMask(RenderConfig_1.RenderConfig.MeshPartsHeadArray, true);
    }
  }
  SetDitherUseHeadMaskHideEffect(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (t) {
      t.EnableTickGetHeadPosInAllMeshes(e);
      if (e) {
        t.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseHeadMaskHideEffect, 1, 0, 0, 17);
        t.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherUseInRayTracing, 0, 0, 0, 17);
        for (const i of RenderConfig_1.RenderConfig.MeshPartsHeadArray) {
          t.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseHeadMaskHideEffect, 0, 0, 0, i);
        }
      } else {
        t.RemoveFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseHeadMaskHideEffect, 0, 0, 17);
        t.RemoveFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherUseInRayTracing, 0, 0, 17);
      }
    }
  }
  TempRemoveDither() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (e) {
      e.TempRemoveDither();
    }
  }
  TempRecoverDither() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (e) {
      e.TempRecoverDither();
    }
  }
  RegisterBodyEffect(e) {
    let t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    if (t = t || this.AddRenderCompDynamic(new CharBodyEffect_1.CharBodyEffect())) {
      t.RegisterEffect(e);
    }
  }
  UnregisterBodyEffect(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    if (t) {
      t.UnregisterEffect(e);
    }
  }
  SetBodyEffectOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    if (t) {
      t.SetOpacity(e);
    }
  }
  GetOpacityConsiderVisibility() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    if (e) {
      return e.GetOpacityConsiderVisibility();
    } else {
      return 1;
    }
  }
  AddInteraction(e, t = 1) {
    var i;
    if (e && ((i = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction)) && !i.GetIsPossed() && i.PossCharacter(e, t), (i = this.GetComponent(RenderConfig_1.RenderConfig.IdGrassInteraction)) && i.SetConfig(e), !this.OnRoleGoDownFinishEventAdded) && this.CachedOwnerEntity) {
      this.RemoveInteractionOnRoleGoDownFinish = () => {
        this.RemoveInteraction();
      };
      EventSystem_1.EventSystem.AddWithTarget(this.CachedOwnerEntity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.RemoveInteractionOnRoleGoDownFinish);
      this.OnRoleGoDownFinishEventAdded = true;
    }
  }
  RemoveInteraction() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction);
    if (e) {
      e.UnpossCharacter();
    }
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdGrassInteraction);
    if (e) {
      e.SetEnabled(false);
    }
  }
  SetMaterialPropertyFloat(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
    if (o) {
      o.SetPropertyFloat(e, t, i, FNameUtil_1.FNameUtil.GetDynamicFName(r), n);
    }
  }
  SetMaterialPropertyColor(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
    if (o) {
      o.SetPropertyColor(e, t, i, FNameUtil_1.FNameUtil.GetDynamicFName(r), n);
    }
  }
  SetMaterialPropertyFloatV2(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (o) {
      o.SetFloatUpdateParamPermanent(e, t, i, r, n);
    }
  }
  AddFloatUpdateParamPermanentByIndexV2(e, t, i, r) {
    var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (n) {
      n.AddFloatUpdateParamPermanentByIndex(e, t, i, r);
    }
  }
  SetMaterialPropertyColorV2(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (o) {
      o.SetColorUpdateParamPermanent(e, t, i, r, n);
    }
  }
  SetMaterialReplaceV2(e, t, i, r) {
    var n = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (n) {
      n.SetExternalMaterialReplace(e, t, i, r);
    }
  }
  RemoveExternalMaterialReplaceV2(e, t, i) {
    var r = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    if (r) {
      r.RemoveExternalMaterialReplace(e, t, i);
    }
  }
  SetStarScarEnergy(e) {
    var t;
    if (this.UseMaterialContainerV2) {
      if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2)) {
        t.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.StarScarEnergyControl, e, 1, 2, 11);
      }
    } else if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer)) {
      t.SetStarScarEnergy(e);
    }
  }
  SetNoWater(e) {
    var t;
    if (this.UseMaterialContainerV2) {
      if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2)) {
        t.SetNoWater(e);
      }
    } else if (t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer)) {
      t.SetNoWater(e);
    }
  }
  SetCapsuleDither(e) {}
  SetDecalShadowEnabled(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      if (e) {
        t.EnableDecalShadow();
      } else {
        t.DisableDecalShadow();
      }
    }
  }
  SetRealTimeShadowEnabled(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      if (e) {
        t.EnableRealTimeShadow();
      } else {
        t.DisableRealTimeShadow();
      }
    }
  }
  DisableAllShadowByDecalShadowComponent() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (e) {
      e.DisableAllShadow();
    }
  }
  AddComponentForDecalShadow(e, t) {
    var i = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (i) {
      i.AddPrimitiveComponent(e, t);
    }
  }
  RemoveComponentFromDecalShadow(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      t.RemovePrimitiveComponent(e);
    }
  }
  SetDecalShadowOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      t.SetDecalShadowOpacity(e);
    }
  }
  SetRealTimeShadowOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      t.SetRealTimeShadowOpacity(e);
    }
  }
  SetShouldCastShadow(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    if (t) {
      t.SetShouldCastShadow(e);
    }
  }
  Update(e) {
    if (this.CanUpdate && this.IsValid()) {
      if (CharRenderingComponent.DisableForDebug) {
        this.ResetAllRenderingStateForDebug();
      }
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdate?.Start();
      this.DeltaTime = e;
      if (this.IsInit) {
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupBeforeUpdate?.Start();
        for (const t of this.AllMaterialControlRuntimeDataGroupMap.values()) {
          if (!t.IsDead) {
            t.BeforeUpdateState(e, this.GetTimeDilation());
          }
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupBeforeUpdate?.Stop();
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdateInner?.Start();
        for (const i of this.AllRenderComps) {
          i.GetRenderStat().Start();
          if (i.GetIsInitSuc()) {
            i.Update();
          }
          i.GetRenderStat().Stop();
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdateInner?.Stop();
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentLateUpdate?.Start();
        for (const r of this.AllRenderComps) {
          r.GetRenderStat().Start();
          if (r.GetIsInitSuc()) {
            r.LateUpdate();
          }
          r.GetRenderStat().Stop();
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentLateUpdate?.Stop();
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupAfterUpdate?.Start();
        this.DataGroupAfterUpdate(e);
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupAfterUpdate?.Stop();
      }
      this.UpdateHitMesh(e);
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdate?.Stop();
    }
  }
  DataGroupAfterUpdate(e) {
    for (const r of this.AllMaterialControlRuntimeDataGroupMap.keys()) {
      var t = this.AllMaterialControlRuntimeDataGroupMap.get(r);
      t.AfterUpdateState(e);
      if (t.IsDead) {
        this.TempRemoveList.push(r);
      }
    }
    if (this.TempRemoveList?.length) {
      for (let e = 0; e < this.TempRemoveList.length; e++) {
        var i = this.TempRemoveList[e];
        this.AllMaterialControlRuntimeDataGroupMap.delete(i);
        GlobalData_1.GlobalData.BpEventManager.材质播放结束时.Broadcast(i);
        EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, i);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderCharacter", 40, "移除材质控制器组:", ["Actor", this.GetOwner().GetName()], ["ID", i]);
        }
      }
      this.TempRemoveList.length = 0;
    }
  }
  SetEffectProgress(e, t) {
    var i;
    if (this.UseMaterialContainerV2) {
      if (i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2)) {
        i.SetEffectProgress(e, t);
      }
    } else if (i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)) {
      i.SetEffectProgress(e, t);
    }
  }
  SetEffectGroupProgress(e, t) {
    t = this.AllMaterialControlRuntimeDataGroupMap.get(t);
    if (t) {
      t.SetEffectProgress(e);
    }
  }
  RefreshMaterialController() {
    var e;
    if (this.UseMaterialContainerV2 && (e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2))) {
      e.ForceUpdateOnce();
    }
  }
  IsMaterialControllerDataValid(e) {
    if (this.UseMaterialContainerV2) {
      const t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialControllerV2);
      if (t) {
        return t.GetRuntimeMaterialControllerValid(e);
      } else {
        return false;
      }
    }
    const t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    return !!t && t.GetRuntimeMaterialControllerValid(e);
  }
  Destroy() {
    if (this.IsInit) {
      this.ResetAllRenderingState();
      for (const e of this.AllRenderComps) {
        e.Destroy();
      }
      this.AllRenderComps = new Array();
      this.AllRenderCompsMap.clear();
      this.IsInit = false;
      this.IsStartInvoke = false;
      this.RenderType = 9;
      if (this.CachedOwnerEntity) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.CachedOwnerEntity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.RemoveInteractionOnRoleGoDownFinish);
        this.OnRoleGoDownFinishEventAdded = false;
      }
      if (RenderModuleController_1.RenderModuleController.RemoveCharRenderShell(this)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderCharacter", 13, "材质控制器已正常销毁", ["Actor", this.GetOwner().GetName()]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderCharacter", 13, "材质控制器销毁失败", ["Actor", this.GetOwner().GetName()]);
      }
    }
  }
  OnFinalizedLevelSequence() {
    for (const t of this.SequenceHandleIds.values()) {
      this.RemoveMaterialControllerData(t);
      this.RemoveMaterialControllerDataGroup(t);
    }
    this.SequenceHandleIds = [];
    var e = this.GetOwner().Mesh;
    e.SetCustomPrimitiveDataFloat(0, 0);
    e.SetCustomPrimitiveDataFloat(1, 0);
    e.ExposeToCinematicsCustomLightFactor = 0;
    e.ExposeToCinematicsCustomLightYaw = 0;
  }
  GetRenderComps() {
    this.UseMaterialContainerV2 = RenderConfig_1.RenderConfig.UseMaterialContainerV2;
    return RenderUtil_1.RenderUtil.GetRenderComps(this.RenderType, this.UseMaterialContainerV2, this.MonsterUseBodyEffect);
  }
  InvokeStart() {
    if (!this.IsStartInvoke) {
      this.IsStartInvoke = true;
      for (const e of this.AllRenderComps) {
        try {
          e.Start();
        } catch {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderCharacter", 25, "错误:组件初始化错误:", ["Actor", this.GetOwner().GetName()], ["组件ID", e.GetComponentId()]);
          }
        }
      }
      for (const t of this.AllRenderComps) {
        if (!t.GetIsInitSuc()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderCharacter", 13, "错误:组件初始化错误:", ["Actor", this.GetOwner().GetName()], ["组件ID", t.GetComponentId()]);
          }
        }
      }
      if (!this.IsRecord && Info_1.Info.IsGameRunning()) {
        RenderModuleController_1.RenderModuleController.AddCharRenderShell(this);
      }
      if (this.UseProxy && this.CachedOwner instanceof TsBaseCharacter_1.default && this.CachedOwner.Mesh) {
        this.AddProxy(this.CachedOwner.Mesh);
      }
    }
  }
  AddProxy(e) {
    if (this.CachedOwner) {
      this.Proxy = this.CachedOwner.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, undefined, false, new UE.FName("Proxy"));
      this.Proxy.SetSkeletalMesh(e.SkeletalMesh);
      this.Proxy.SetMasterPoseComponent(e, false);
      this.Proxy.bUseBoundsFromMasterPoseComponent = true;
      this.Proxy.SetRenderInMainPass(this.ProxyRenderInMainPass);
      this.Proxy.SetCastShadow(this.ProxyRenderShadow);
      this.Proxy.SetRenderKuroTrail(this.ProxyRenderTrail);
      this.Proxy.K2_AttachToComponent(e, undefined, 2, 2, 0, true);
      for (let e = 0, t = this.ProxyMaterialsOverride.Num(); e < t; ++e) {
        this.Proxy.SetMaterial(e, this.ProxyMaterialsOverride.Get(e));
      }
    }
  }
  ShouldTickAfterGoDown() {
    if (this.UseMaterialContainerV2) {
      var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
      if (e) {
        return e.GetAnyUnloopEffect();
      }
    }
    return false;
  }
  get IsInDebugMode() {
    if (Info_1.Info.IsGameRunning()) {
      if (this.IsInDebugModeInternal === undefined) {
        this.IsInDebugModeInternal = ModelManager_1.ModelManager.GameModeModel.IsSilentLogin || WorldModel_1.WorldModel.IsStandalone || this.IsRecord || GlobalData_1.GlobalData.IsPlayInEditor;
      }
    } else {
      this.IsInDebugModeInternal = WorldModel_1.WorldModel.IsStandalone || this.IsRecord || GlobalData_1.GlobalData.IsPlayInEditor;
    }
    return this.IsInDebugModeInternal;
  }
  get IsRecord() {
    if (this.IsRecordInternal === undefined) {
      this.IsRecordInternal = this.GetOwner() instanceof UE.KuroRecordCharacter;
    }
    return this.IsRecordInternal;
  }
  ReceiveBeginPlay() {
    this.SetComponentTickEnabled(this.IsRecord);
  }
  ReceiveTick(e) {
    if (this.IsRecord) {
      this.Update(e);
    }
  }
  ReceiveSeqTick(e) {
    if (!Info_1.Info.IsGameRunning()) {
      this.Update(e);
    }
  }
  AddHitMeshInfoByPath(e, t, i, r) {
    const n = UE.KismetMathLibrary.MakeTransformDouble(i.ToUeVector(true), r.ToUeRotator(), Vector_1.Vector.OneVector);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PDA_HitMeshData_C, e => {
      if (e) {
        this.AddHitMeshOnSocket(e.HitSkeletalMesh, n, t, e.LastTime, e.HitSkeletalMeshTransform);
      }
    });
  }
}
(exports.CharRenderingComponent = CharRenderingComponent).MotionVelocitySquared = [40000, 250000];
CharRenderingComponent.MotionMeshShadingRate = [3, 6];
CharRenderingComponent.DisableForDebug = false;
CharRenderingComponent.GlobalDisableDitherEffect = false;
exports.default = CharRenderingComponent; //# sourceMappingURL=CharRenderingComponent.js.map