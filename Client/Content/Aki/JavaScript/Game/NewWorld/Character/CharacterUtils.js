"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CalabashMeshById_1 = require("../../../Core/Define/ConfigQuery/CalabashMeshById");
const MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const MonsterBattleConfByRoleId_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfByRoleId");
const MonsterPerformanceConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterPerformanceConfById");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CustomMovementDefine_1 = require("./Common/Component/Move/CustomMovementDefine");
class CharacterUtils {
  static IsCharacterMonsterOrSummoned(e) {
    return !!e?.Valid && !!(e = e.Entity.GetComponent(0))?.Valid && (!!e.IsCharacterMonster() || !!e.IsSummonByCharacterMonster());
  }
  static CanCharacterMonsterOrSummonedDisplayEffect(e) {
    var r;
    return !!e?.Valid && !!(r = e.Entity.GetComponent(0))?.Valid && (r.IsCharacterMonster() ? this.Jil(e) : !r.IsSummonByCharacterMonster() || (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.GetSummonerId()), this.Jil(e)));
  }
  static Jil(r) {
    if (r?.Valid) {
      var t = r.Entity.GetComponent(0);
      var n = r.Entity.GetComponent(43);
      var M = r.Entity.GetComponent(217);
      let e = undefined;
      r = t.GetMonsterComponent()?.FightConfigId;
      if (r) {
        e = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(r);
      }
      r = t.GetRoleId();
      t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r);
      if (e = t ? MonsterBattleConfByRoleId_1.configMonsterBattleConfByRoleId.GetConfig(t) : e) {
        var r = MonsterPerformanceConfById_1.configMonsterPerformanceConfById.GetConfigList(e.MonsterPerformanceId);
        var o = n.CurrentSkill?.SkillId ?? 0;
        for (const s of r ?? []) {
          if (s.SkillIds.includes(o)) {
            var a = s.Tag;
            if (!a) {
              return true;
            }
            a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
            if (a && M.HasTag(a)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  static SetActorHiddenInGame(e, r, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 67, "CharacterUtils.SetActorHiddenInGame", ["Actor", e.GetName()], ["IsHidden", r], ["Reason", t]);
    }
    e.SetActorHiddenInGame(r);
  }
  static GetHuluModelId(e) {
    var r = CalabashMeshById_1.configCalabashMeshById.GetConfig(e);
    if (r) {
      return r.MeshId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 28, "势力.xlsx里没有配葫芦模型ID", ["partyId", e]);
      }
      return 0;
    }
  }
  static GetMovementModeName(e) {
    switch (e) {
      case 0:
        return "MOVE_None";
      case 1:
        return "MOVE_Walking";
      case 2:
        return "MOVE_NavWalking";
      case 3:
        return "MOVE_Falling";
      case 4:
        return "MOVE_Swimming";
      case 5:
        return "MOVE_Flying";
      case 6:
        return "MOVE_Custom";
      case 7:
        return "MOVE_WalkingOnAir";
      default:
        return "请补充运动模式定义";
    }
  }
  static GetCustomMovementModeName(e) {
    switch (e) {
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
        return "CUSTOM_MOVEMENTMODE_CLIMB";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
        return "CUSTOM_MOVEMENTMODE_SWIM";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
        return "CUSTOM_MOVEMENTMODE_GLIDE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_PENDULUM:
        return "CUSTOM_MOVEMENTMODE_PENDULUM";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
        return "CUSTOM_MOVEMENTMODE_SLIDE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
        return "CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
        return "CUSTOM_MOVEMENTMODE_LEISURE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
        return "CUSTOM_MOVEMENTMODE_SOAR";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
        return "CUSTOM_MOVEMENTMODE_SKI";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL:
        return "CUSTOM_MOVEMENTMODE_ROLL";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE:
        return "CUSTOM_MOVEMENTMODE_KITE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE:
        return "CUSTOM_MOVEMENTMODE_RIDE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE:
        return "CUSTOM_MOVEMENTMODE_RAIL_SLIDE";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SPLINE_CLIMB:
        return "CUSTOM_MOVEMENTMODE_SPLINE_CLIMB";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING:
        return "CUSTOM_MOVEMENTMODE_SWING";
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_FLOATING:
        return "CUSTOM_MOVEMENTMODE_FLOATING";
      default:
        return "请补充自定义运动模式定义";
    }
  }
}
exports.CharacterUtils = CharacterUtils;
//# sourceMappingURL=CharacterUtils.js.map