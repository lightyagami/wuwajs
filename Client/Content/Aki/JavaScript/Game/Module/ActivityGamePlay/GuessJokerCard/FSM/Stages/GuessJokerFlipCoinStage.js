"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerFlipCoinStage = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerFlipCoinStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  OnEnter() {
    const e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      e.ShowFlipCoinEffect(true, () => {
        e.SetFlipCoinClickEnable();
      });
    }
  }
}
exports.GuessJokerFlipCoinStage = GuessJokerFlipCoinStage;
//# sourceMappingURL=GuessJokerFlipCoinStage.js.map