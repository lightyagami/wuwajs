"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnRollBlockDifficultyChanged = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnRollBlockDifficultyChanged extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l, ...i) {
    var e = e.LimitParams.get("Difficulty");
    return e !== undefined && (e = Number(e), !isNaN(e)) && i[0] === e;
  }
}
exports.LevelConditionOnRollBlockDifficultyChanged = LevelConditionOnRollBlockDifficultyChanged;
//# sourceMappingURL=LevelConditionOnRollBlockDifficultyChanged.js.map