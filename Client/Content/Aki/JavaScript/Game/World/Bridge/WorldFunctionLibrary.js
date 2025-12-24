"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldFunctionLibrary = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const TemplateConfigAll_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const CollisionUtils_1 = require("../../../Core/Utils/CollisionUtils");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GlobalData_1 = require("../../GlobalData");
const GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const TowerDefenseEventController_1 = require("../../Module/TowerDefenseEvent/TowerDefenseEventController");
const UiCameraAnimationManager_1 = require("../../Module/UiCameraAnimation/UiCameraAnimationManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const FollowFunctionLibrary_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/FollowFunctionLibrary");
const IFollow_1 = require("../../NewWorld/Character/Common/Component/Abilities/Follow/IFollow");
const BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const BlackboardController_1 = require("../Controller/BlackboardController");
const TsEntityDebugInfoManager_1 = require("../Debug/TsEntityDebugInfoManager");
const WorldModel_1 = require("../Model/WorldModel");
const WorldGlobal_1 = require("../WorldGlobal");
const zero = 0n;
class WorldFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetChangeFootStep(t) {
    WorldFunctionLibrary.IsChangeFootStep = t;
  }
  static GetChangeFootStep() {
    return WorldFunctionLibrary.IsChangeFootStep;
  }
  static SetChangeFootStepMaterialId(t) {
    WorldFunctionLibrary.ChangeFootStepMaterialId = t;
  }
  static GetChangeFootStepMaterialId() {
    return WorldFunctionLibrary.ChangeFootStepMaterialId;
  }
  static CheckConfigIdByActor(t, e) {
    t = ActorUtils_1.ActorUtils.GetEntityByActor(t).Entity.GetComponent(0);
    return !!t && t.GetPbDataId() === e;
  }
  static ActorHasSceneItemTag(t, e) {
    return ActorUtils_1.ActorUtils.GetEntityByActor(t).Entity.GetComponent(206).HasTag(e);
  }
  static GetControlVisionEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole);
      if (e) {
        return e.Id;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 28, "无法找到拥有者实体", ["ownerEntityId", t]);
    }
    return 0;
  }
  static GetVisionEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
      if (e) {
        return e.Id;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", ["ownerEntityId", t]);
    }
    return 0;
  }
  static GetVisionEntityIdList(t) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0);
    var e = [];
    if (t) {
      for (const o of t.VisionServerEntityIds) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        if (r) {
          e.push(r.Id);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 28, "无法找到幻象实体", ["serverId", o]);
        }
      }
    }
    t = UE.NewArray(UE.BuiltinInt);
    WorldGlobal_1.WorldGlobal.ToUeInt32Array(e, t);
    return t;
  }
  static SetVisionEnable(t, e) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    if (r) {
      PhantomUtil_1.PhantomUtil.SetVisionEnable(r, e, "WorldFunctionLibrary.SetVisionEnable");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", ["ownerEntityId", t]);
    }
  }
  static GetCustomEntityId(t, e) {
    return ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(t, e);
  }
  static SetCustomEntityEnable(t, e, r, o, a) {
    var l;
    var n;
    if (o?.IsValid()) {
      o = `[蓝图:${o.GetName()}] ${a}`;
      if (l = EntitySystem_1.EntitySystem.Get(t)) {
        if (e > (l = l.GetComponent(0).CustomServerEntityIds).length || e === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 4, "pos不合法！", ["pos", e], ["serverEntityIds", l], ["Reason", o]);
          }
        } else if (n = ModelManager_1.ModelManager.CreatureModel.GetEntity(l[e - 1])) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n.Entity, r, "WorldFunctionLibrary.SetCustomEntityEnable", true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 4, "设置伴生物状态", ["ownerEntityId", t], ["customServerEntityIds", l], ["customEntity", n.Id], ["enable", r], ["Reason", o]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "无法找到伴生物实体", ["ownerEntityId", t], ["pos", e], ["customServerEntityIds", l]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "无法找到幻象拥有者实体", ["ownerEntityId", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 3, "callObject为空，请传递callObject", ["Reason", a]);
    }
  }
  static GetSummonerEntityId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e?.Valid) {
      e = e.GetComponent(0);
      return ModelManager_1.ModelManager.CreatureModel.GetEntityId(e.GetSummonerId());
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 28, "幻象实体已销毁！", ["visionEntityId", t]);
      }
      return 0;
    }
  }
  static GetVisionId(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e?.Valid) {
      return e.GetComponent(0).GetVisionComponent()?.VisionId ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 28, "幻象实体已销毁！", ["visionEntityId", t]);
      }
      return 0;
    }
  }
  static SetVisionPos(t, e) {
    EntitySystem_1.EntitySystem.Get(t)?.GetComponent(44)?.SetCurrentPosition(e);
  }
  static GetVisionPos(t) {
    return EntitySystem_1.EntitySystem.Get(t)?.GetComponent(44)?.GetCurrentPosition() ?? 0;
  }
  static GetSummonEntityIds(t) {
    var e;
    var r = EntitySystem_1.EntitySystem.Get(t);
    if (r) {
      r = r.GetComponent(0);
      e = UE.NewArray(UE.BuiltinInt);
      WorldGlobal_1.WorldGlobal.ToUeInt32Array(r.SummonEntityIds.map(t => ModelManager_1.ModelManager.CreatureModel.GetEntityId(t)), e);
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 28, "无法找到拥有者实体", ["ownerEntityId", t]);
      }
      return UE.NewArray(UE.BuiltinInt);
    }
  }
  static SummonRequest(t, e, r, o, a) {
    t = ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(t, e, r, o, a);
    if (t) {
      return BigInt(t);
    } else {
      return 0n;
    }
  }
  static SummonRandomRequest(t, e, r, o, a) {
    ControllerHolder_1.ControllerHolder.CreatureController.SummonRandomRequest(t, e, r, o, a);
  }
  static GetSummonRandomEntity(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t = t && t.GetComponent(0)) {
      t = t.GetSummonRandomEntityId(e);
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Id ?? 0;
    } else {
      return 0;
    }
  }
  static GetServerIdByEntityId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t = t.GetComponent(0)?.GetCreatureDataId();
      return BigInt(t ?? 0);
    } else {
      return 0n;
    }
  }
  static RemoveSummonEntityRequest(t, e, r) {
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityRequest(t, e, r);
  }
  static EntityIsInit(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.IsInit;
  }
  static GetEntityEnable(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.Active;
  }
  static IsNeedPostEffect(t) {
    if (t && t instanceof TsBaseCharacter_1.default) {
      var t = EntitySystem_1.EntitySystem.Get(t.GetEntityIdNoBlueprint());
      var e = t?.GetComponent(0);
      if (e) {
        if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !t.GetComponent(3).IsAutonomousProxy) {
          return false;
        }
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(e.GetSummonerId());
        e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0);
        if (e && e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !t.GetComponent(3).IsAutonomousProxy) {
          return false;
        }
      }
    }
    return true;
  }
  static GetEntityTypeByEntity(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t = t && t.GetComponent(0)) {
      return t.GetEntityType().valueOf();
    } else {
      return -1;
    }
  }
  static GetEntityTypeByActor(t) {
    if (t?.IsValid() && UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) && (t = t, (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) && (t = t.GetComponent(0))?.Valid) {
      return t.GetEntityType().valueOf();
    } else {
      return -1;
    }
  }
  static GetMonsterType(t) {
    if (t?.IsValid() && UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) && (t = t, (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) && (t = t.GetComponent(0))?.Valid && (t = t.GetBaseInfo())) {
      return t.Category.MonsterMatchType;
    } else {
      return -1;
    }
  }
  static GetConfigIdByActor(t) {
    if (t?.IsValid() && UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) && (t = t, (t = EntitySystem_1.EntitySystem.Get(t.GetEntityId()))?.Valid) && (t = t.GetComponent(0))?.Valid) {
      return t.GetPbDataId();
    } else {
      return -1;
    }
  }
  static GetEntityActorByChildActor(t) {
    return ModelManager_1.ModelManager.CreatureModel?.GetEntityActorByChildActor(t);
  }
  static GetEntityDestructible(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (e) {
      return e.GetComponent(110) !== undefined;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 39, "无法找到实体", ["entityId", t]);
      }
      return false;
    }
  }
  static AddPrivateTags(t, e) {
    var e = (0, puerts_1.$unref)(e);
    var r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r);
    ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(t, r);
  }
  static RemovePrivateTags(t, e) {
    var e = (0, puerts_1.$unref)(e);
    var r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r);
    ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(t, r);
  }
  static AddPublicTags(t, e) {
    var e = (0, puerts_1.$unref)(e);
    var r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r);
    ControllerHolder_1.ControllerHolder.CreatureController.AddPublicTags(t, r);
  }
  static RemovePublicTags(t, e) {
    var e = (0, puerts_1.$unref)(e);
    var r = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(e, r);
    ControllerHolder_1.ControllerHolder.CreatureController.RemovePublicTags(t, r);
  }
  static GetIntValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetIntValueByEntity(t, e);
    return t || 0;
  }
  static GetIntValueByEntityWithCharacter(t, e) {
    return t && BlackboardController_1.BlackboardController.GetIntValueByEntity(t.GetEntityIdNoBlueprint(), e) || 0;
  }
  static SetIntValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetIntValueByEntity(t, e, r);
  }
  static SetIntValueByEntityWithCharacter(t, e, r) {
    if (t) {
      BlackboardController_1.BlackboardController.SetIntValueByEntity(t.GetEntityIdNoBlueprint(), e, r);
    }
  }
  static GetIntValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetIntValuesByEntity(t, e);
    if (t) {
      e = UE.NewArray(UE.BuiltinInt);
      WorldGlobal_1.WorldGlobal.ToUeInt32Array(t, e);
      return e;
    } else {
      return UE.NewArray(UE.BuiltinInt);
    }
  }
  static SetIntValuesByEntity(t, e, r) {
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o);
    BlackboardController_1.BlackboardController.SetIntValuesByEntity(t, e, o);
  }
  static GetLongValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetLongValueByEntity(t, e);
    return t || 0n;
  }
  static SetLongValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetLongValueByEntity(t, e, r);
  }
  static GetLongValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetLongValuesByEntity(t, e);
    if (t) {
      e = UE.NewArray(UE.BuiltinInt64);
      WorldGlobal_1.WorldGlobal.ToUeInt64Array(t, e);
      return e;
    } else {
      return UE.NewArray(UE.BuiltinInt64);
    }
  }
  static SetLongValuesByEntity(t, e, r) {
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o);
    BlackboardController_1.BlackboardController.SetLongValuesByEntity(t, e, o);
  }
  static GetBooleanValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetBooleanValueByEntity(t, e);
    return t || false;
  }
  static SetBooleanValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetBooleanValueByEntity(t, e, r);
  }
  static GetFloatValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetFloatValueByEntity(t, e);
    return t || 0;
  }
  static SetFloatValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetFloatValueByEntity(t, e, r);
  }
  static GetFloatValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetFloatValuesByEntity(t, e);
    if (t) {
      e = UE.NewArray(UE.BuiltinFloat);
      WorldGlobal_1.WorldGlobal.ToUeFloatArray(t, e);
      return e;
    } else {
      return UE.NewArray(UE.BuiltinFloat);
    }
  }
  static SetFloatValuesByEntity(t, e, r) {
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o);
    BlackboardController_1.BlackboardController.SetFloatValuesByEntity(t, e, o);
  }
  static GetStringValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetStringValueByEntity(t, e);
    return t || "";
  }
  static SetStringValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetStringValueByEntity(t, e, r);
  }
  static GetStringValuesByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetStringValuesByEntity(t, e);
    if (!t) {
      UE.NewArray(UE.BuiltinString);
    }
    e = UE.NewArray(UE.BuiltinString);
    WorldGlobal_1.WorldGlobal.ToUeStringArray(t, e);
    return e;
  }
  static SetStringValuesByEntity(t, e, r) {
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o);
    BlackboardController_1.BlackboardController.SetStringValuesByEntity(t, e, o);
  }
  static RemoveValueByEntity(t, e) {
    BlackboardController_1.BlackboardController.RemoveValueByEntity(t, e);
  }
  static HasValueByEntity(t, e) {
    return BlackboardController_1.BlackboardController.HasValueByEntity(t, e);
  }
  static GetVectorValueByEntity(t, e) {
    var r = new UE.VectorDouble();
    var t = BlackboardController_1.BlackboardController.GetVectorValueByEntity(t, e);
    if (t) {
      r.X = t.X;
      r.Y = t.Y;
      r.Z = t.Z;
    }
    return r;
  }
  static SetVectorValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetVectorValueByEntity(t, e, r.X, r.Y, r.Z);
  }
  static GetVectorValuesByEntity(t, e) {
    var r = UE.NewArray(UE.VectorDouble);
    var t = BlackboardController_1.BlackboardController.GetVectorValuesByEntity(t, e);
    if (t) {
      for (const a of t) {
        var o = WorldGlobal_1.WorldGlobal.ToUeVector(a);
        r.Add(o);
      }
    }
    return r;
  }
  static SetVectorValuesByEntity(t, e, r) {
    var o = new Array();
    var a = (0, puerts_1.$unref)(r);
    for (let t = 0; t < a.Num(); ++t) {
      var l = a.Get(t);
      var l = WorldGlobal_1.WorldGlobal.ToTsVector(l);
      o.push(l);
    }
    BlackboardController_1.BlackboardController.SetVectorValuesByEntity(t, e, o);
  }
  static GetRotatorValueByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetRotatorValueByEntity(t, e);
    if (t) {
      return WorldGlobal_1.WorldGlobal.ToUeRotator(t);
    } else {
      return new UE.Rotator();
    }
  }
  static SetRotatorValueByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetRotatorValueByEntity(t, e, r.Pitch, r.Roll, r.Yaw);
  }
  static GetRotatorValuesByEntity(t, e) {
    var r = UE.NewArray(UE.Rotator);
    var t = BlackboardController_1.BlackboardController.GetRotatorValuesByEntity(t, e);
    if (t) {
      for (const a of t) {
        var o = WorldGlobal_1.WorldGlobal.ToUeRotator(a);
        r.Add(o);
      }
    }
    return r;
  }
  static SetRotatorValuesByEntity(t, e, r) {
    var o = new Array();
    var a = (0, puerts_1.$unref)(r);
    for (let t = 0; t < a.Num(); ++t) {
      var l = a.Get(t);
      var l = WorldGlobal_1.WorldGlobal.ToTsRotator(l);
      o.push(l);
    }
    BlackboardController_1.BlackboardController.SetRotatorValuesByEntity(t, e, o);
  }
  static GetEntityIdByEntity(t, e) {
    return BlackboardController_1.BlackboardController.GetEntityIdByEntity(t, e);
  }
  static SetEntityIdByEntity(t, e, r) {
    BlackboardController_1.BlackboardController.SetEntityIdByEntity(t, e, r);
  }
  static GetEntityIdsByEntity(t, e) {
    t = BlackboardController_1.BlackboardController.GetEntityIdsByEntity(t, e);
    e = UE.NewArray(UE.BuiltinInt);
    WorldGlobal_1.WorldGlobal.ToUeInt32Array(t, e);
    return e;
  }
  static SetEntityIdsByEntity(t, e, r) {
    var o = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray((0, puerts_1.$unref)(r), o);
    BlackboardController_1.BlackboardController.SetEntityIdsByEntity(t, e, o);
  }
  static GetBlackboardInfosByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return t.GetComponent(0).GetBlackboard().ToString();
    } else {
      return "";
    }
  }
  static RemoveStandaloneEntity(t, e) {
    ControllerHolder_1.ControllerHolder.CreatureController.RemoveStandaloneEntity(t, e);
  }
  static GetDynamicEntity(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t);
    if (t?.Valid) {
      return ControllerHolder_1.ControllerHolder.CharacterController.GetActor(t);
    }
  }
  static GetWorldOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
  }
  static GenUniqueId() {
    return BigInt(ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId());
  }
  static GetEntityIdByCreature(t) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(Number(t))?.Id ?? 0;
  }
  static GetCreatureDataIdByEntity(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(t);
    if (t) {
      return BigInt(t);
    } else {
      return 0n;
    }
  }
  static GetPlayerIdByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t.Valid) {
      return t.GetComponent(0).GetPlayerId();
    } else {
      return 0;
    }
  }
  static GetRoleElementId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid && (t = t.GetComponent(0).GetRoleConfig())) {
      return t.ElementId;
    } else {
      return 0;
    }
  }
  static GetRoleId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid && (t = t.GetComponent(0)).Valid) {
      return t.GetRoleId();
    } else {
      return 0;
    }
  }
  static GetRoleIdIgnoreTrial(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid && (t = t.GetComponent(0))?.Valid) {
      if ((t = t.GetRoleId()) > RoleDefine_1.ROBOT_DATA_MIN_ID) {
        return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t).ParentId;
      } else {
        return t;
      }
    } else {
      return 0;
    }
  }
  static GetOwnerIdByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t?.Valid && t.GetComponent(0).GetOwnerId() || zero;
  }
  static JumpToMarkLevelSequence(t, e) {
    if (UE.KismetSystemLibrary.IsValid(t) && UE.KismetSystemLibrary.IsValid(t.Player)) {
      t.Player.JumpToMarkedFrame(e);
    }
  }
  static GetWuYinQuDebugInfo() {
    return RenderModuleController_1.RenderModuleController.GetWuYinQuBattleDebugInfo();
  }
  static ChangeBattleState(t, e, r) {
    if (UE.KismetSystemLibrary.IsValid(t) && UE.KismetSystemLibrary.IsValid(t.Player)) {
      RenderModuleController_1.RenderModuleController.SetBattleState(e, r);
    }
  }
  static SetNewUiSceneDebugOpen(t) {
    RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow = t;
  }
  static AiChangeBattleState(t, e) {
    RenderModuleController_1.RenderModuleController.SetBattleState(t, e);
  }
  static PlayWuYinLevelSequence(t, e, r) {
    if (ModelManager_1.ModelManager.WuYinAreaModel.GetWuYinLevelSequenceState(r) === 0) {
      r = new UE.FrameNumber(t);
      t = new UE.FrameTime(r, 0);
      r = new UE.MovieSceneSequencePlaybackParams(t, 0, "", 0, 0);
      e.Player.SetPlaybackPosition(r);
    }
  }
  static PlayWuYinSequence(t) {
    ModelManager_1.ModelManager.WuYinAreaModel.PlayWuYinSequence(t, "Play");
  }
  static StartStandalone() {
    WorldModel_1.WorldModel.IsStandalone = true;
  }
  static GetEntityBindGroup(t) {
    var e = UE.NewArray(UE.BuiltinInt);
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    if (ControllerHolder_1.ControllerHolder.CreatureGroupController.HasBindGroup(t)) {
      t = ControllerHolder_1.ControllerHolder.CreatureGroupController.GetBindGroup(t);
      if (t && t.length > 0) {
        for (const r of t) {
          e.Add(r);
        }
      }
    }
    return e;
  }
  static IsOpenWorld() {
    return ModelManager_1.ModelManager.GameModeModel.InstanceType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
  }
  static GetBattleMode() {
    var t = Protocol_1.Aki.Protocol.B4s.nAs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchBattleMode() {
    var t = Protocol_1.Aki.Protocol.B4s.nAs;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(t, !BattleSetting_1.BattleSetting.IsModuleClientControl(t));
  }
  static GetBuffSyncMode() {
    return false;
  }
  static SwitchBuffSyncMode() {}
  static GetServerLogMode() {
    var t = Protocol_1.Aki.Protocol.B4s.PAs;
    return BattleSetting_1.BattleSetting.IsModuleClientControl(t);
  }
  static SwitchServerLogMode() {
    var t = Protocol_1.Aki.Protocol.B4s.PAs;
    BattleSetting_1.BattleSetting.RequestSetModuleNetworkState(t, !BattleSetting_1.BattleSetting.IsModuleClientControl(t));
  }
  static GetCurrentDayState() {
    return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
  }
  static GetCurrentWeatherState() {
    return 0;
  }
  static ChangeEntityState(t, e, r, o) {
    t = {
      EntityId: t,
      State: e
    };
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestChangeEntityState(t, LevelGeneralContextDefine_1.EntityContext.Create(o));
  }
  static TestSpawnTemplateEntityPush(t, e, r, o, a) {
    var l = Protocol_1.Aki.Protocol.hes.create();
    l.s5n = MathUtils_1.MathUtils.NumberToLong(Number(t));
    l.F6n = r;
    l.v9n = e;
    l.l8n = WorldGlobal_1.WorldGlobal.ToTsVector(o.GetLocation());
    l._8n = WorldGlobal_1.WorldGlobal.ToTsRotator(o.GetRotation().Rotator());
    l.mKn = a;
    Net_1.Net.Send(15253, l);
  }
  static GetTestSpawnTemplateEntityString() {
    var t = UE.NewArray(UE.BuiltinString);
    let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.TemplateConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.TemplateConfigPath);
    }
    let r = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.BlueprintConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      r = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.BlueprintConfigPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(e) && UE.BlueprintPathsLibrary.FileExists(r)) {
      var o = new Map();
      var a = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(a, e);
      a = (0, puerts_1.$unref)(a);
      var a = JSON.parse(a);
      for (const i of a.Templates) {
        o.set(i.BlueprintType, i.Id);
      }
      var l;
      var n;
      var a = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(a, r);
      a = (0, puerts_1.$unref)(a);
      var a = JSON.parse(a);
      for ([l, n] of Object.entries(a.BlueprintConfig)) {
        t.Add(n.Name + "|" + o.get(l));
      }
    } else {
      for (const s of TemplateConfigAll_1.configTemplateConfigAll.GetConfigList()) {
        t.Add(s.Name + "|" + s.Id);
      }
    }
    return t;
  }
  static GetEntityDebugInfoManager() {
    return TsEntityDebugInfoManager_1.default.GetInstance();
  }
  static ChangeSubLevel(t, e, r, o, a) {
    var t = (0, puerts_1.$unref)(t);
    var e = (0, puerts_1.$unref)(e);
    var l = new Array();
    var n = new Array();
    WorldGlobal_1.WorldGlobal.ToTsArray(t, l);
    WorldGlobal_1.WorldGlobal.ToTsArray(e, n);
    var t = Vector_1.Vector.Create(o);
    ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(l, n, r, t, a);
  }
  static GetActorByCreatureDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(Number(t));
    if (t?.IsInit) {
      return t.Entity.GetComponent(1)?.Owner;
    }
  }
  static SetEntityLocation(t, e, r = true, o = false) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(1);
    if (t) {
      if (o) {
        t.SetActorLocation(e, "SetEntityLocation", r);
      } else {
        (o = Vector_1.Vector.Create(e)).SubtractionEqual(t.ActorLocationProxy);
        t.AddActorWorldOffset(o.ToUeVector(), "SetEntityLocation", r);
      }
    }
  }
  static SetEntityRotation(t, e, r = true) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t.GetComponent(1)?.SetActorRotation(e, "SetEntityRotation", r);
    }
  }
  static SetEntityLocationAndRotation(t, e, r, o = false) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t.GetComponent(1)?.SetActorLocationAndRotation(e, r, "SetEntityLocationAndRotation", o);
    }
  }
  static GetActorByPbDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    if (t?.IsInit) {
      return t.Entity.GetComponent(1)?.Owner;
    }
  }
  static GetActorByEntityId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.IsInit) {
      return t.GetComponent(1)?.Owner;
    }
  }
  static GetActorsByPbDataIdArray(t) {
    var e;
    var r = (0, puerts_1.$unref)(t);
    var o = UE.NewArray(UE.Actor);
    for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (a?.IsInit && (e = a.Entity.GetComponent(0).GetPbDataId()) && r.Contains(e) && (e = a.Entity.GetComponent(1))) {
        o.Add(e.Owner);
      }
    }
    return o;
  }
  static MonsterBoomRequest(t, e) {
    ControllerHolder_1.ControllerHolder.CreatureController.MonsterBoomRequest(Number(t), e);
  }
  static EvalScript(t) {
    return CombatDebugController_1.CombatDebugController.EvalScript(t);
  }
  static GetInitPositionByEntity(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return WorldGlobal_1.WorldGlobal.ToUeVector(t.GetComponent(0).GetInitLocation());
    } else {
      return new UE.VectorDouble();
    }
  }
  static DisableCreatureActor(t, e, r) {
    var o;
    if (e?.IsValid()) {
      o = `[蓝图:${e.GetName()}] ${r}`;
      if (t?.IsValid()) {
        if (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
          t = t;
          return EntitySystem_1.EntitySystem.Get(t.GetEntityId()).GetComponent(1).DisableActor(o);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface", ["Reason", o]);
          }
          return -1;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效, DisableCreatureActor失败。", ["CallObject", e?.GetName()], ["Reason", o]);
        }
        return -1;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, DisableCreatureActor失败。", ["Reason", r]);
      }
      return -1;
    }
  }
  static EnableCreatureActor(t, e, r) {
    if (e?.IsValid()) {
      if (t?.IsValid()) {
        if (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
          t = t;
          return EntitySystem_1.EntitySystem.Get(t.GetEntityId()).GetComponent(1).EnableActor(r);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface");
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效, EnableCreatureActor失败。", ["CallObject", e?.GetName()], ["handle", r]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, EnableCreatureActor失败。", ["Handle", r]);
      }
      return false;
    }
  }
  static DisableCreatureCollision(t, e, r) {
    var o;
    if (e?.IsValid()) {
      o = `[蓝图:${e.GetName()}] ${r}`;
      if (t?.IsValid()) {
        if (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
          t = t;
          return EntitySystem_1.EntitySystem.Get(t.GetEntityId()).GetComponent(1).DisableCollision(o);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface", ["Reason", o]);
          }
          return -1;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效, DisableCreatureCollision失败。", ["CallObject", e?.GetName()], ["Reason", o]);
        }
        return -1;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, DisableCreatureCollision失败。", ["Reason", r]);
      }
      return -1;
    }
  }
  static EnableCreatureCollision(t, e, r) {
    if (e?.IsValid()) {
      if (t?.IsValid()) {
        if (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
          t = t;
          return EntitySystem_1.EntitySystem.Get(t.GetEntityId()).GetComponent(1).EnableCollision(r);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "Actor未实现接口CreatureInterface");
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "actor无效, EnableCreatureCollision失败。", ["CallObject", e?.GetName()], ["handle", r]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, EnableCreatureCollision失败。", ["Handle", r]);
      }
      return false;
    }
  }
  static SetCameraShakeModify(t) {
    ModelManager_1.ModelManager.CameraModel.SetCameraShakeModify(t);
  }
  static GetFormationAllEntityId() {
    var t = UE.NewMap(UE.BuiltinInt, UE.BuiltinBool);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = r.EntityHandle;
      if (e?.Valid) {
        t.Add(e.Id, r.IsMyRole());
      }
    }
    return t;
  }
  static GetFormationControlledRoles() {
    var t;
    var e = UE.NewArray(UE.Actor);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      if (r.IsControl() && (t = r.EntityHandle)?.Valid && (t = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(t))) {
        e.Add(t);
      }
    }
    return e;
  }
  static GetFormationActors() {
    var t = UE.NewArray(UE.Actor);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = r.EntityHandle;
      if (e?.Valid && (e = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(e))) {
        t.Add(e);
      }
    }
    return t;
  }
  static IsGameRunning() {
    return Info_1.Info.IsGameRunning();
  }
  static SetCollisionResponseToPawn(t, e, r) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(t.CapsuleComponent, e, r);
  }
  static ShowCharacterCollision(t, e) {
    e = EntitySystem_1.EntitySystem.Get(e);
    if (e) {
      e.GetComponent(22).EnableCollisionDebugDraw = t;
    }
  }
  static GetEnableCollisionDebug(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && t.GetComponent(22).EnableCollisionDebugDraw;
  }
  static ChangeRole(t) {}
  static ChangeRoleInExitSkill(t, e) {}
  static InitGameSplineBySplineEntity(t, e) {
    return GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(t, e);
  }
  static UiCameraAnimationDisablePlayerActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
  }
  static UiCameraAnimationEnablePlayerActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
  }
  static UiCameraAnimationDisableCustomCreatureActor(t) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisableCustomCreatureActor(t);
  }
  static UiCameraAnimationEnableCustomCreatureActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnableCustomCreatureActor();
  }
  static UiCameraAnimationBroadSequenceEvent(t) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.BroadUiCameraSequenceEvent(t);
  }
  static SetTimeDilation(t) {
    UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.GameInstance, ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation * t);
    var e = Protocol_1.Aki.Protocol.GCs.create();
    e.dKn = t;
    Net_1.Net.Send(16566, e);
  }
  static GetTimeDilation() {
    if (GlobalData_1.GlobalData.GameInstance) {
      return UE.GameplayStatics.GetGlobalTimeDilation(GlobalData_1.GlobalData.GameInstance);
    } else {
      return 1;
    }
  }
  static GetEntitiesInRange(t, e) {
    var r = [];
    var o = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(t, 248, r);
    for (const l of r) {
      var a = l.Entity.GetComponent(0).GetEntityCamp();
      if (CampUtils_1.CampUtils.GetCampRelationship(a, 0) === e) {
        o.push(l.Entity.Id);
      }
    }
    t = UE.NewArray(UE.BuiltinInt);
    WorldGlobal_1.WorldGlobal.ToUeInt32Array(o, t);
    return t;
  }
  static AttachToActor(t, e, r, o, a, l, n, i, s, c, _) {
    if (t?.IsValid()) {
      t = `[蓝图:${t.GetName()}] ${a}`;
      return ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(e, r, o, t, l, n, i, s, c, _);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", ["Reason", a]);
      }
      return false;
    }
  }
  static AttachToComponent(t, e, r, o, a, l, n, i, s, c, _) {
    if (t?.IsValid()) {
      t = `[蓝图:${t.GetName()}] ${a}`;
      return ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToComponent(e, r, o, t, l, n, i, s, c, _);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, AttachToActor失败。", ["Reason", a]);
      }
      return false;
    }
  }
  static DetachActor(t, e, r, o, a, l, n) {
    if (t?.IsValid()) {
      t = `[蓝图:${t.GetName()}] ${o}`;
      return ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(e, r, t, a, l, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "callObject无效, DetachActor失败。", ["Reason", o]);
      }
      return false;
    }
  }
  static GetPlayerFollower() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var t = FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowShooter(t)?.Entity?.Id;
    return t || 0;
  }
  static IsPlayerFollowerEnable() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(237)?.GetOrCreateHandler(IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.IsFollowShooterEnable() ?? false;
  }
  static SetPlayerFollowerEnable(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(237)?.GetOrCreateHandler(IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.SetFollowShooterEnable(t, "WorldFunctionLibrary.SetPlayerFollowerEnable");
  }
  static SetPlayerFollowerCustomEntityId(t, e) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(r)?.GetComponent(237)?.GetOrCreateHandler(IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.AddFollowShooterCustomEntityId(t, e);
  }
  static RemovePlayerFollowerCustomEntityId(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(237)?.GetOrCreateHandler(IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.RemoveFollowShooterCustomEntityId(t);
  }
  static GetFollowerShooterConfig(t) {
    return EntitySystem_1.EntitySystem.Get(t)?.CheckGetComponent(234)?.FollowShooterConfig;
  }
  static GetPlayerFollowerMotor() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowVehicle(t, "Motorcycle")?.Entity?.Id ?? 0;
  }
  static IsPlayerFollowerMotorEnable() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var e = FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowVehicle(t, "Motorcycle");
    if (e?.Entity) {
      return e?.Entity?.Active;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Entity", 72, "玩家没有跟随的摩托车 ", ["PlayerId", t]);
      }
      return false;
    }
  }
  static SetPlayerFollowerMotorEnable(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var r = FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowVehicle(e, "Motorcycle");
    if (r?.Entity) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r.Entity, t, "WorldFunctionLibrary.SetPlayerFollowerMotorEnable", true);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Entity", 72, "玩家没有跟随的摩托车", ["PlayerId", e]);
    }
  }
  static IsPlayerFollowerNeedInput(t, e) {
    return false;
  }
  static GetGameplayTagOriginName(t) {
    return FNameUtil_1.FNameUtil.GetDynamicFName(t?.OriginalTagName);
  }
  static RegisterToBpActorController(t, e) {
    ControllerHolder_1.ControllerHolder.BpActorController.RegisterBpActor(t, e);
  }
  static UnregisterToBpActorController(t, e) {
    ControllerHolder_1.ControllerHolder.BpActorController.UnregisterBpActor(t, e);
  }
  static RegisterDayNightBpToBpActorController(t) {
    ControllerHolder_1.ControllerHolder.BpActorController?.RegisterDayNightActor(t);
  }
  static UnregisterDayNightBpToBpActorController(t) {
    ControllerHolder_1.ControllerHolder.BpActorController?.UnregisterDayNightActor(t);
  }
  static GetTrapDefenseUseBpUsing() {
    return TowerDefenseEventController_1.TowerDefenseEventController.TestBpUsing;
  }
  static DisableAllRoleWithoutControl(t) {
    ControllerHolder_1.ControllerHolder.SceneTeamController.DisableAllRoleWithoutControl(undefined, undefined, t);
  }
  static PlayerEntityId() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t);
    if (t?.Valid) {
      return t.Id;
    } else {
      return 0;
    }
  }
  static CurrentFrontRoleEntityId() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid && t.Entity?.Valid) {
      return t.Entity.Id;
    } else {
      return 0;
    }
  }
  static ShowTipsByTextId(t) {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(t);
  }
}
(exports.WorldFunctionLibrary = WorldFunctionLibrary).IsChangeFootStep = false;
WorldFunctionLibrary.ChangeFootStepMaterialId = 0;
exports.default = WorldFunctionLibrary; //# sourceMappingURL=WorldFunctionLibrary.js.map