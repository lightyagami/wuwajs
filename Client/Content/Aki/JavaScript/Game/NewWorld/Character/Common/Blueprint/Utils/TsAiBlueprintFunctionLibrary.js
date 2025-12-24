"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../../Global");
const LevelGamePlayUtils_1 = require("../../../../../LevelGamePlay/LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsAiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetQuestState(t, e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e) {
      return e.Status;
    } else {
      return 4;
    }
  }
  static GetDistanceByPlayer(t) {
    var e = Global_1.Global.BaseCharacter;
    if (e && (t = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid) {
      t = t.ActorLocationProxy;
      e = e.CharacterActorComponent.ActorLocationProxy;
      return Vector_1.Vector.Dist(t, e);
    } else {
      return Number.MAX_VALUE;
    }
  }
  static CheckPlayerGameplayTag(t, e) {
    var a = Global_1.Global.BaseCharacter;
    return !!a && !!(a = a.CharacterActorComponent.Entity.GetComponent(215)) && a.HasTag(e?.TagId);
  }
  static RestartBehaviorTree(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    if (t) {
      t.RestartBehaviorTree();
    }
  }
  static SetAiEnabled(t, e, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    if (t) {
      a = "EcologicalBridge_" + a;
      if (e) {
        t.EnableAi(a);
      } else {
        t.DisableAi(a);
      }
    }
  }
  static NeedCheckPlayerImpact(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    return !!t && !!(t = t.TsAiController.AiController.NpcDecision) && t.CheckPlayerImpact;
  }
  static NeedCheckPlayerAttack(t) {
    return TsAiBlueprintFunctionLibrary.NeedCheckPlayerAttackNoBlueprint(t);
  }
  static NeedCheckPlayerAttackNoBlueprint(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    return !!t && !!(t = t.TsAiController.AiController.NpcDecision) && t.CheckPlayerAttack;
  }
  static UpdateInteractionComponent(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 127);
    if (t) {
      t.ForceUpdate();
    }
  }
  static OnPlayerAttack(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerAttack();
    }
  }
  static OnPlayerImpact(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerImpact();
    }
  }
  static OnPlayerAttackBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerAttackBegin();
    }
  }
  static OnPlayerImpactBegin(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerImpactBegin();
    }
  }
  static OnPlayerAttackEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerAttackEnd();
    }
  }
  static OnPlayerImpactEnd(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      t.OnPlayerImpactEnd();
    }
  }
  static UpdateNpcPerformData(t, e, a, r, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      (0, puerts_1.$set)(e, t.IsBeingAttacked);
      (0, puerts_1.$set)(a, t.IsBeingImpacted);
      (0, puerts_1.$set)(r, t.CollisionDirection);
      (0, puerts_1.$set)(i, t.CollisionStrength);
    }
  }
  static UpdateNpcStateData(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    if (t) {
      (0, puerts_1.$set)(e, t.CurAnimState);
    }
  }
  static GetAndResetNoTransitionSwitch(t) {
    var e;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 196);
    return !!t && (e = t.IsNoTransitionSwitch, t.IsNoTransitionSwitch = false, e);
  }
  static IsAiDriver(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    return !!t && t.IsAiDriver;
  }
  static GetRoleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 59)?.GetRoleActor();
  }
  static SetFollowData(t, e, a) {}
  static GetFollowActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 59)?.GetFollowActor();
  }
  static Reset(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 59)?.Reset(e);
  }
  static GetToRoleDistance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 59)?.GetToRoleDistance();
  }
  static GetSummonType(t) {
    return 0;
  }
  static TsLogInfo(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, t);
    }
  }
  static GetLevelBoolVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    t.Type = "Boolean";
    return LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e);
  }
  static GetLevelIntVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    t.Type = "Int";
    return LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e);
  }
  static GetLevelStringVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    t.Type = "String";
    return LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e);
  }
  static GetLevelFloatVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    t.Type = "Float";
    return LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e);
  }
  static GetLevelPosVar(t) {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(t.Id);
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarRefFormAiLevelVar(t);
    t.Type = "Transform";
    var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, e);
    return new UE.Vector(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
  }
}
exports.default = TsAiBlueprintFunctionLibrary;
//# sourceMappingURL=TsAiBlueprintFunctionLibrary.js.map