"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrowdAiController = exports.RoleBoidParams = exports.DEFAULT_ROLE_BOID_CHANGE_TIME = exports.DEFAULT_ROLE_BOID_MAX_RADIUS = exports.DEFAULT_ROLE_BOID_MIN_RADIUS = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const DEFAULT_ACTOR_SYSTEM_BOUNDS = 100000;
const BOUNDS_UPDATE_INTERVAL = 3;
const DEFAULT_DELAY_REMOVE_TIME = 10;
exports.DEFAULT_ROLE_BOID_MIN_RADIUS = 20;
exports.DEFAULT_ROLE_BOID_MAX_RADIUS = 80;
exports.DEFAULT_ROLE_BOID_CHANGE_TIME = 1;
const SUN_SPIRIT_CONFIG_PATH = "/Game/Aki/Character/NPC/GPUNPC/BP/CrowdAi/DA_SunSpiritConfig.DA_SunSpiritConfig";
class RoleBoidParams {
  constructor() {
    this.MinRadius = exports.DEFAULT_ROLE_BOID_MIN_RADIUS;
    this.MaxRadius = exports.DEFAULT_ROLE_BOID_MAX_RADIUS;
    this.MaxRadiusChangeTime = exports.DEFAULT_ROLE_BOID_CHANGE_TIME;
  }
}
exports.RoleBoidParams = RoleBoidParams;
class DelayRemoveInfo {
  constructor(t) {
    this.Counter = 0;
    this.Actor = undefined;
    this.Actor = t;
  }
}
class CrowdAiController extends ControllerBase_1.ControllerBase {
  static get IsCrowdAiEnable() {
    return !!this.CrowdAiSubsystem?.IsValid() && this.CrowdAiSwitch;
  }
  static OnInit() {
    return true;
  }
  static OnTick(t) {
    var i = t * MathUtils_1.MathUtils.MillisecondToSecond;
    this.HandleDelayRemoveActors(i);
    this.TryUpdateBoidActorSystemBounds(i);
    for (const s of this.BoidActorSystemPool) {
      s.BakedBoneMeshComp?.KuroTickComponentOutside(i);
    }
    this.ProxyActor?.KuroTickActorOutside(i);
  }
  static OnClear() {
    this.DisableCrowdAiSystem(true);
    return true;
  }
  static InitCrowdAiConfigByPath(t) {
    if (t !== "" && t !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_CrowdAiConfig_C, t => {
        if (t?.IsValid()) {
          this.InitCrowdAiConfigByAsset(t);
        }
      });
    }
  }
  static InitCrowdAiConfigByAsset(i) {
    if (i?.IsValid()) {
      this.CrowdAiSubsystem = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroCrowdAiSubsystem.StaticClass());
      this.InitCrowdAiSubsystem(i);
      this.InitRoleBoidParams(i);
      var s = i.Boid种类配置.Num();
      for (let t = 0; t < s; t++) {
        var e = i.Boid种类配置.Get(t);
        if (!this.CreateBoidActorSystemFromConfig(e)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("NPC", 50, "CrowdAiActorSystem初始化错误!", ["Index", t]);
          }
        }
      }
    }
  }
  static CreateBoidActorSystemFromConfig(t) {
    if (!this.CrowdAiSubsystem?.IsValid()) {
      return false;
    }
    if (!t.GpuNpcDa?.IsValid()) {
      return false;
    }
    this.TmpVector1.Set(DEFAULT_ACTOR_SYSTEM_BOUNDS, DEFAULT_ACTOR_SYSTEM_BOUNDS, DEFAULT_ACTOR_SYSTEM_BOUNDS);
    var i = ActorSystem_1.ActorSystem.Get(UE.BP_CrowdAiBoidActorSystemBase_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    i.SetActorTickEnabled(false);
    i.BakedBoneMeshComp?.SetComponentTickEnabled(false);
    i.BakedBoneMeshComp?.SetCustomBounds(new UE.BoxSphereBounds(this.BoundsOrigin.ToUeVectorOld(), this.TmpVector1.ToUeVectorOld(), DEFAULT_ACTOR_SYSTEM_BOUNDS));
    if (this.InitBoidActorSystem(i, t)) {
      this.BoidActorSystemPool.push(i);
      return true;
    } else {
      ActorSystem_1.ActorSystem.Put("CreateBoidActorSystemFromConfig初始化错误", i);
      return false;
    }
  }
  static InitCrowdAiSubsystem(t) {
    if (this.CrowdAiSubsystem?.IsValid()) {
      this.CrowdAiSubsystem.GroupNavigationInterval = t.组寻路间隔;
      this.CrowdAiSubsystem.GroupSplitRadius = t.分组最大距离;
      this.CrowdAiSubsystem.PauseSeekMinDist = t.停驻最小目标距离;
      this.CrowdAiSubsystem.PauseSeekMaxTime = t.停驻计时时间;
      this.CrowdAiSubsystem.PauseSeekMaxSpeed = t.停驻最大速度;
      this.CrowdAiSubsystem.bEnableTeleport = t.启用传送;
      this.CrowdAiSubsystem.TeleportMinPlanarDist = t.触发传送最小水平距离;
      this.CrowdAiSubsystem.TeleportMinVerticalDist = t.触发传送最小垂直距离;
      this.CrowdAiSubsystem.PauseTeleportMaxPlanarSpeed = t.暂停传送最大水平速度;
      this.CrowdAiSubsystem.TeleportMinTime = t.传送最小计数时间;
      this.CrowdAiSubsystem.TeleportMaxTime = t.传送最大计数时间;
      this.CrowdAiSubsystem.TeleportTargetMaxRadius = t.传送目标最大半径;
      this.CrowdAiSubsystem.TeleportTargetMinRadius = t.传送目标最小半径;
      this.CrowdAiSubsystem.TeleportTryCount = t.最大尝试寻点次数;
      this.CrowdAiSubsystem.bEnableFollowLimitation = t.启用跟随区域限制;
      this.CrowdAiSubsystem.FanWingEdgesAngle = t.跟随扇形区域夹角;
      this.CrowdAiSubsystem.FanWingEdgesLen = t.跟随扇形区域两边长度;
      this.CrowdAiSubsystem.FanBottomEdgeHalfLen = t.跟随扇形区域底边半长;
      this.CrowdAiSubsystem.FanBottomEdgeDistToWatchingBoid = t.跟随扇形区域底边距离;
      this.CrowdAiSubsystem.bStickToGround = t.启用Navmesh贴地修正;
      this.CrowdAiSubsystem.BornDelayMaxTime = t.出生最大随机延迟时间;
      this.CrowdAiSubsystem.DestroyDelayMaxTime = t.销毁最大随机延迟时间;
      this.ProxyActor = this.GetNewProxyActor();
      this.ProxyActor.SetActorTickEnabled(false);
      this.ProxyActor.SetEnableParallelUpdate(CrowdAiController.UseParallelUpdate);
    }
  }
  static InitRoleBoidParams(t) {
    this.RoleParams = new RoleBoidParams();
    this.RoleParams.MinRadius = t.玩家移动半径;
    this.RoleParams.MaxRadius = t.玩家待机半径;
    this.RoleParams.MaxRadiusChangeTime = t.玩家半径变化时间;
  }
  static InitBoidActorSystem(t, i) {
    t.Radius = i.半径;
    t.HalfHeight = i.半高;
    t.RelativeTrans = i.相对变换;
    t.MaxSpeed = i.最大速度;
    t.MaxAccel = i.最大加速度;
    t.GroundFriction = i.地面转向摩擦力;
    t.MovingRadiusFactor = i.移动半径缩放系数;
    t.TurnThresholdSpeed = i.转向触发阈值速度;
    t.TurnInterpSpeed = i.转向插值速度;
    t.IdlePerformMinCD = i.待机表演最小冷却时间;
    t.IdlePerformMaxCD = i.待机表演最大冷却时间;
    t.IdlePerformMaxPortion = i.待机表演最大比例;
    t.FleeRadius = i.斥力额外半径;
    t.MovingFleeRadiusFactor = i.移动斥力额外半径缩放系数;
    t.ArrivalRadius = i.临近目标减速距离;
    t.MinDistToNavEdge = i.边界空气墙距离;
    t.ExtraQueryOffset = i.额外探测距离;
    t.AnimSequenceConfig = i.动画配置;
    t.AnimStateConfig = i.状态配置;
    t.MaterialEffectWithTextureConfig = i.材质贴图DA配置;
    t.Data = i.GpuNpcDa;
    return t.InitGpuNpc();
  }
  static EnableCrowdAiSystemByConfigPath(t = SUN_SPIRIT_CONFIG_PATH) {
    if (!this.CrowdAiSwitch) {
      this.CrowdAiSwitch = true;
      this.BoundsOrigin.Reset();
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        this.BoundsOrigin.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
        this.ToWorldRelativeLocation(this.BoundsOrigin);
      }
      this.InitCrowdAiConfigByPath(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 启用CrowdAiSystem");
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnableCrowdAiSystem, true);
    }
  }
  static EnableCrowdAiSystemByConfigAsset(t) {
    if (!this.CrowdAiSwitch) {
      this.CrowdAiSwitch = true;
      this.BoundsOrigin.Reset();
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        this.BoundsOrigin.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
        this.ToWorldRelativeLocation(this.BoundsOrigin);
      }
      this.InitCrowdAiConfigByAsset(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 启用CrowdAiSystem");
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnableCrowdAiSystem, true);
    }
  }
  static DisableCrowdAiSystem(t = false) {
    if (this.CrowdAiSwitch) {
      this.CrowdAiSwitch = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 关闭CrowdAiSystem");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnableCrowdAiSystem, false);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
      for (const i of this.CrowdAiBoidIdSet) {
        this.DestroyCrowdAiBoid(i, t);
      }
      this.CrowdAiBoidIdSet.clear();
      if (t) {
        ActorSystem_1.ActorSystem.Put("DisableCrowdAiSystem", this.ProxyActor);
        for (const s of this.BoidActorSystemPool) {
          ActorSystem_1.ActorSystem.Put("DisableCrowdAiSystem", s);
        }
        for (const e of this.DelayRemovedItemSet) {
          ActorSystem_1.ActorSystem.Put("OnWorldDone", e.Actor);
        }
        this.DelayRemovedItemSet.clear();
        this.DelayRemovedProxyActorInfo = undefined;
      } else {
        this.DelayRemovedProxyActorInfo = new DelayRemoveInfo(this.ProxyActor);
        this.DelayRemovedItemSet.add(this.DelayRemovedProxyActorInfo);
        for (const o of this.BoidActorSystemPool) {
          this.DelayRemovedItemSet.add(new DelayRemoveInfo(o));
        }
      }
      this.CurPlayerEntityId = 0;
      this.ProxyActor = undefined;
      this.BoidActorSystemPool.length = 0;
    }
  }
  static SpawnCrowdAiBoid(t, i, s = true) {
    if (this.IsCrowdAiEnable && !(t >= this.BoidActorSystemPool.length) && (t = this.BoidActorSystemPool[t].SpawnBoidActor(i.ToUeTransformOld(), s) ?? 0)) {
      this.CrowdAiBoidIdSet.add(t);
      if (Global_1.Global.BaseCharacter?.IsValid() && (s = (i = Global_1.Global.BaseCharacter.CharacterActorComponent)?.Entity.GetComponent(333)?.BoidComponent?.BoidId ?? 0)) {
        this.CurPlayerEntityId = i.Entity.Id;
        this.CrowdAiSubsystem?.SetWatchingBoidAndJoinGroup(t, s);
      }
      return t;
    } else {
      return 0;
    }
  }
  static GetRandomExistBoidId() {
    var t;
    if (this.CrowdAiSubsystem?.IsValid()) {
      t = [...this.CrowdAiBoidIdSet];
      return MathUtils_1.MathUtils.GetRandomItem(t) ?? 0;
    } else {
      return 0;
    }
  }
  static DestroyCrowdAiBoid(t, i = false) {
    return !!this.CrowdAiSubsystem?.IsValid() && !!this.CrowdAiBoidIdSet.has(t) && (this.CrowdAiSubsystem.RemoveBoid(t, i), this.CrowdAiBoidIdSet.delete(t), true);
  }
  static HasCrowdAiBoid(t) {
    return !!this.CrowdAiSubsystem?.IsValid() && this.CrowdAiBoidIdSet.has(t);
  }
  static NotifyBoidsAround() {
    if (this.CrowdAiSubsystem) {
      this.CrowdAiSubsystem.NotifyBoidsAround();
    }
  }
  static NotifyBoidsMoveTo(t) {
    if (this.CrowdAiSubsystem) {
      this.CrowdAiSubsystem.NotifyBoidsMoveTo(t.ToUeVectorOld());
    }
  }
  static EnableParallelUpdateCrowdAi(t) {
    if (this.UseParallelUpdate !== t) {
      this.UseParallelUpdate = t;
      this.ProxyActor?.SetEnableParallelUpdate(t);
    }
  }
  static EnableCrowdAiDebugMode(t) {
    this.CrowdAiSubsystem?.EnableDebugMode(t);
  }
  static UpdateDebugNavMeshEdges(t) {
    var i;
    var s = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (s) {
      s = s.ActorLocationProxy;
      i = Vector_1.Vector.Create(s);
      s = Vector_1.Vector.Create(s);
      t = Vector_1.Vector.Create(t, t, 500);
      i.AdditionEqual(t);
      s.SubtractionEqual(t);
      (t = new UE.Box()).Min = s.ToUeVectorOld();
      t.Max = i.ToUeVectorOld();
      t.IsValid = 1;
      this.CrowdAiSubsystem?.UpdateDebugNavMeshEdges(t);
    }
  }
  static ToWorldRelativeLocation(t) {
    var i = UE.GameplayStatics.GetWorldOriginLocation(GlobalData_1.GlobalData.World.GetWorld());
    t.X -= i.X;
    t.Y -= i.Y;
    t.Z -= i.Z;
  }
  static TryUpdateBoidActorSystemBounds(t) {
    if (this.BoidActorSystemPool.length) {
      if (Global_1.Global.BaseCharacter?.IsValid() && (this.BoundsUpdateCounter += t, this.BoundsUpdateCounter > BOUNDS_UPDATE_INTERVAL)) {
        this.BoundsUpdateCounter = 0;
        this.BoundsOrigin.DeepCopy(Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy);
        this.ToWorldRelativeLocation(this.BoundsOrigin);
        this.TmpVector1.Set(DEFAULT_ACTOR_SYSTEM_BOUNDS, DEFAULT_ACTOR_SYSTEM_BOUNDS, DEFAULT_ACTOR_SYSTEM_BOUNDS);
        for (const i of this.BoidActorSystemPool) {
          i.BakedBoneMeshComp?.SetCustomBounds(new UE.BoxSphereBounds(this.BoundsOrigin.ToUeVectorOld(), this.TmpVector1.ToUeVectorOld(), DEFAULT_ACTOR_SYSTEM_BOUNDS));
        }
      }
    } else {
      this.BoundsUpdateCounter = 0;
    }
  }
  static GetNewProxyActor() {
    var t;
    if (this.DelayRemovedProxyActorInfo?.Actor?.IsValid()) {
      t = this.DelayRemovedProxyActorInfo.Actor;
      this.DelayRemovedItemSet.delete(this.DelayRemovedProxyActorInfo);
      this.DelayRemovedProxyActorInfo = undefined;
      return t;
    } else {
      return ActorSystem_1.ActorSystem.Get(UE.KuroCrowdAiManagerProxyActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    }
  }
  static HandleDelayRemoveActors(t) {
    if (this.DelayRemovedItemSet.size) {
      var i = [];
      for (const s of this.DelayRemovedItemSet) {
        s.Counter += t;
        if (!s.Actor?.IsValid() || s.Counter > DEFAULT_DELAY_REMOVE_TIME) {
          ActorSystem_1.ActorSystem.Put("HandleDelayRemoveActors", s.Actor);
          i.push(s);
        } else if (s !== this.DelayRemovedProxyActorInfo) {
          s.Actor?.BakedBoneMeshComp?.KuroTickComponentOutside(t);
        }
      }
      for (const e of i) {
        if (e === this.DelayRemovedProxyActorInfo) {
          this.DelayRemovedProxyActorInfo = undefined;
        }
        this.DelayRemovedItemSet.delete(e);
      }
      this.DelayRemovedProxyActorInfo?.Actor?.KuroTickActorOutside(t);
    }
  }
}
exports.CrowdAiController = CrowdAiController;
(_a = CrowdAiController).CrowdAiSubsystem = undefined;
CrowdAiController.UseParallelUpdate = false;
CrowdAiController.ProxyActor = undefined;
CrowdAiController.BoidActorSystemPool = new Array();
CrowdAiController.CrowdAiBoidIdSet = new Set();
CrowdAiController.CrowdAiSwitch = false;
CrowdAiController.RoleParams = undefined;
CrowdAiController.CurPlayerEntityId = 0;
CrowdAiController.BoundsUpdateCounter = 0;
CrowdAiController.BoundsOrigin = Vector_1.Vector.Create();
CrowdAiController.DelayRemovedProxyActorInfo = undefined;
CrowdAiController.DelayRemovedItemSet = new Set();
CrowdAiController.TmpVector1 = Vector_1.Vector.Create();
CrowdAiController.OnChangeRole = (t, i) => {
  if (_a.IsCrowdAiEnable && _a.CrowdAiBoidIdSet.size) {
    var s = t.Entity?.GetComponent(333)?.BoidComponent;
    if (s) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 切换玩家实体，更换跟随对象", ["oldEntityId", i?.Id], ["newEntityId", t.Id]);
      }
      _a.CurPlayerEntityId = t.Id;
      var e = s.BoidId;
      var i = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
      _a.CrowdAiSubsystem?.GetAllGroupIds(i);
      var o = (0, puerts_1.$unref)(i);
      var r = o.Num();
      for (let t = 0; t < r; t++) {
        _a.CrowdAiSubsystem.ChangeGroupWatchingBoid(o.Get(t), e);
      }
      for (const h of _a.CrowdAiBoidIdSet) {
        if (!_a.CrowdAiSubsystem.GetBoidGroupId(h)) {
          _a.CrowdAiSubsystem.SetWatchingBoidAndJoinGroup(h, e);
        }
      }
    }
  }
};
CrowdAiController.OnRemoveEntity = (t, i) => {
  if (_a.IsCrowdAiEnable && _a.CrowdAiBoidIdSet.size && _a.CurPlayerEntityId === i.Id) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 玩家实体销毁，取消所有Boid跟随", ["EntityId", i.Id]);
    }
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
    _a.CrowdAiSubsystem?.GetAllGroupIds(i);
    var s = (0, puerts_1.$unref)(i);
    var e = s.Num();
    for (let t = 0; t < e; t++) {
      _a.CrowdAiSubsystem.ChangeGroupWatchingBoid(s.Get(t), 0);
    }
  }
};
CrowdAiController.OnClearWorld = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("NPC", 50, "[KuroCrowdAi] 切换地图清空数据");
  }
  _a.CrowdAiSubsystem = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroCrowdAiSubsystem.StaticClass());
  _a.DisableCrowdAiSystem(true);
  _a.CurPlayerEntityId = 0;
  _a.ProxyActor = undefined;
  _a.BoidActorSystemPool.length = 0;
  _a.DelayRemovedItemSet.clear();
  _a.DelayRemovedProxyActorInfo = undefined;
}; //# sourceMappingURL=CrowdAiController.js.map