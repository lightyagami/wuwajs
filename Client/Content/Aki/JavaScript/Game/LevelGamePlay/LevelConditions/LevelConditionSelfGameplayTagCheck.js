"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionSelfGameplayTagCheck = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfGameplayTagCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return !!e.LimitParams && !!a && !!(e = e.LimitParams.get("GamePlayTag")) && a instanceof TsBaseCharacter_1.default && (a.CharacterActorComponent?.Entity?.GetComponent(205)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) ?? false);
  }
}
exports.LevelConditionSelfGameplayTagCheck = LevelConditionSelfGameplayTagCheck;
//# sourceMappingURL=LevelConditionSelfGameplayTagCheck.js.map