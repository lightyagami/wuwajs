"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRogueReceiveReward = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRogueReceiveReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, s) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, s) {}
}
exports.LevelEventRogueReceiveReward = LevelEventRogueReceiveReward;
//# sourceMappingURL=LevelEventRogueReceiveReward.js.map