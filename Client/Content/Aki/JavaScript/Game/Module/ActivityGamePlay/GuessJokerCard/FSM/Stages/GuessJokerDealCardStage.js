"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerDealCardStage = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerDealCardStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  OnEnter() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      e.DealCards(() => {
        if (!ModelManager_1.ModelManager.GuessJokerGamePlayModel?.IsExit) {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.ChangeState(3);
        }
      });
    }
  }
}
exports.GuessJokerDealCardStage = GuessJokerDealCardStage;
//# sourceMappingURL=GuessJokerDealCardStage.js.map