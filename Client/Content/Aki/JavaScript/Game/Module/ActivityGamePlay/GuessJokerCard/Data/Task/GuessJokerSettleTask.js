"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSettleTask = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerSettleTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetWinner(e);
  }
  OnExecute() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.ChangeState(5);
    this.FinishTask();
  }
}
exports.GuessJokerSettleTask = GuessJokerSettleTask;
//# sourceMappingURL=GuessJokerSettleTask.js.map