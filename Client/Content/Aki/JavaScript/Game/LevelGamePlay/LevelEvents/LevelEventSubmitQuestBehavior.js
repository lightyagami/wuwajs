"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSubmitQuestBehavior = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSubmitQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, s) {
    if (e && e.Callback) {
      e.Callback();
    }
  }
}
exports.LevelEventSubmitQuestBehavior = LevelEventSubmitQuestBehavior;
//# sourceMappingURL=LevelEventSubmitQuestBehavior.js.map