"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionMoveStateCheck = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const Global_1 = require("../../Global");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionMoveStateCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams || !r) {
      return false;
    }
    r = Global_1.Global.BaseCharacter;
    if (!r) {
      return false;
    }
    r = r.CharacterActorComponent.Entity.GetComponent(176);
    if (!r) {
      return false;
    }
    switch (r.PositionState) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        if (e.LimitParams.get("Glide") === StringUtils_1.ONE_STRING) {
          break;
        }
        return false;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        if (e.LimitParams.get("Climb") === StringUtils_1.ONE_STRING) {
          break;
        }
        return false;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        if (e.LimitParams.get("Swim") === StringUtils_1.ONE_STRING) {
          break;
        }
        return false;
    }
    return true;
  }
}
exports.LevelConditionMoveStateCheck = LevelConditionMoveStateCheck;
//# sourceMappingURL=LevelConditionMoveStateCheck.js.map