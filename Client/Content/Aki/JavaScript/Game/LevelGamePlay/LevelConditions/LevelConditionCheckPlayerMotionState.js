"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerMotionState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerMotionState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    if (!e) {
      return false;
    }
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 7, "[CheckPlayerMotionState]无法获取当前角色");
      }
      return false;
    }
    var r = t.Entity.GetComponent(179);
    if (!r) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 7, "[CheckPlayerMotionState]无法获取当前角色UnifiedState组件");
      }
      return false;
    }
    let i = false;
    let n = false;
    switch (e.MotionState) {
      case "Ground":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && r.PositionSubState === CharacterUnifiedStateTypes_1.ECharPositionSubState.None;
        break;
      case "Air":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air;
        break;
      case "Climb":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
        break;
      case "OnClimbing":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb && (r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other || r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb || r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb);
        break;
      case "Water":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water;
        break;
      case "WalkOnWater":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && r.PositionSubState === CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface;
        break;
      case "GlideInAir":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide;
        break;
      case "FallInAir":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other;
        break;
      case "Soaring":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar;
        break;
      case "Gongduola":
        i = r.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ride && r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Gongduola;
        break;
      default:
        n = true;
    }
    if (n) {
      var s = t.Entity.GetComponent(209);
      if (!s) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelCondition", 7, "[CheckPlayerMotionState]无法获取当前角色CharacterGameplayTag组件");
        }
        return false;
      }
      switch (e.MotionState) {
        case "SwitchSkill":
          i = s.HasTag(1674960297);
          break;
        case "UltimateDodge":
          i = s.HasTag(-1221493771);
          break;
        case "UltimateSkill":
          i = s.HasTag(1733479717);
      }
    }
    switch (e.Compare) {
      case "Eq":
        return i;
      case "Ne":
        return !i;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckPlayerMotionState = LevelConditionCheckPlayerMotionState;
//# sourceMappingURL=LevelConditionCheckPlayerMotionState.js.map