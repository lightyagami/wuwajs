"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSettleStage = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GuessJokerPlotAction_1 = require("../../Data/Action/GuessJokerPlotAction");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerSettleStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  OnEnter() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetWinner() === 1;
    const s = e ? 13 : 14;
    e = e ? "GuessJokerSettleFailView" : "GuessJokerSettleWinView";
    UiManager_1.UiManager.OpenView(e, undefined, () => {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, s)]);
    });
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.SettleGameClear();
  }
}
exports.GuessJokerSettleStage = GuessJokerSettleStage;
//# sourceMappingURL=GuessJokerSettleStage.js.map