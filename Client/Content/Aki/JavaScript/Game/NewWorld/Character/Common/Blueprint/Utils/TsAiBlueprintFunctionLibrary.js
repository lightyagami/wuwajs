"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../../../Global"),
  LevelGamePlayUtils_1 = require("../../../../../LevelGamePlay/LevelGamePlayUtils"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsAiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetQuestState(t, e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    return e ? e.Status : 4
  }
  static GetDistanceByPlayer(t) {
    var e = Global_1.Global.BaseCharacter;
    return e && (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid ? (t = t.ActorLocationProxy, e = e.CharacterActorComponent.ActorLocationProxy, Vector_1.Vector.Dist(t, e)) : Number.MAX_VALUE
  }
  static CheckPlayerGameplayTag(t, e) {
    var a = Global_1.Global.BaseCharacter;
    return !!a && !!(a = a.CharacterActorComponent.Entity.GetComponent(205)) && a.HasTag(e?.TagId)
  }
  static RestartBehaviorTree(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    t && t.RestartBehaviorTree()
  }
  static SetAiEnabled(t, e, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    t && (a = "EcologicalBridge_" + a, e ? t.EnableAi(a) : t.DisableAi(a))
  }
  static NeedCheckPlayerImpact(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    return !!t && !!(t = t.TsAiController.AiController.NpcDecision) && t.CheckPlayerImpact
  }
  static NeedCheckPlayerAttack(t) {
    return TsAiBlueprintFunctionLibrary.NeedCheckPlayerAttackNoBlueprint(t)
  }
  static NeedCheckPlayerAttackNoBlueprint(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    return !!t && !!(t = t.TsAiController.AiController.NpcDecision) && t.CheckPlayerAttack
  }
  static UpdateInteractionComponent(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 118);
    t && t.ForceUpdate()
  }
  static OnPlayerAttack(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerAttack()
  }
  static OnPlayerImpact(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerImpact()
  }
  static OnPlayerAttackBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerAttackBegin()
  }
  static OnPlayerImpactBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerImpactBegin()
  }
  static OnPlayerAttackEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerAttackEnd()
  }
  static OnPlayerImpactEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && t.OnPlayerImpactEnd()
  }
  static UpdateNpcPerformData(t, e, a, r, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && ((0, puerts_1.$set)(e, t.IsBeingAttacked), (0, puerts_1.$set)(a, t.IsBeingImpacted), (0, puerts_1.$set)(r, t.CollisionDirection), (0, puerts_1.$set)(i, t.CollisionStrength))
  }
  static UpdateNpcStateData(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    t && (0, puerts_1.$set)(e, t.CurAnimState)
  }
  static GetAndResetNoTransitionSwitch(t) {
    var e, t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    return !!t && (e = t.IsNoTransitionSwitch, t.IsNoTransitionSwitch = !1, e)
  }
  static IsAiDriver(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    return !!t && t.IsAiDriver
  }
  static GetRoleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 56)?.GetRoleActor()
  }
  static SetFollowData(t, e, a) {}
  static GetFollowActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 56)?.GetFollowActor()
  }
  static Reset(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 56)?.Reset(e)
  }
  static GetToRoleDistance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 56)?.GetToRoleDistance()
  }
  static GetSummonType(t) {
    return 0
  }
  static TsLogInfo(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, t)
  }
  static GetLevelBoolVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    return t.Type = "Boolean", LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e)
  }
  static GetLevelIntVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    return t.Type = "Int", LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e)
  }
  static GetLevelStringVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    return t.Type = "String", LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e)
  }
  static GetLevelFloatVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    return t.Type = "Float", LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e)
  }
  static GetLevelPosVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id),
      t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t),
      t = (t.Type = "Transform", LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e));
    return new UE.Vector(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)
  }
}
exports.default = TsAiBlueprintFunctionLibrary;
//# sourceMappingURL=TsAiBlueprintFunctionLibrary.js.map