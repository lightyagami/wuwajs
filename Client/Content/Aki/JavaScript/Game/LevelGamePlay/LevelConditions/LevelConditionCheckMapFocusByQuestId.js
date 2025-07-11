"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckMapFocusByQuestId = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckMapFocusByQuestId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...t) {
    return !!e.LimitParams && !(t.length < 1) && Number(e.LimitParams.get("QuestId")) === Number(t[0]);
  }
}
exports.LevelConditionCheckMapFocusByQuestId = LevelConditionCheckMapFocusByQuestId;
//# sourceMappingURL=LevelConditionCheckMapFocusByQuestId.js.map