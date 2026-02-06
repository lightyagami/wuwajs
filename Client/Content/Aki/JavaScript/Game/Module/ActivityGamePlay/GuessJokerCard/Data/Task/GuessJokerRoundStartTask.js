"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerRoundStartTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerRoundStartTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.aLf = 0;
    this.hLf = 0;
    this.aLf = e.Zg1;
    this.hLf = e.LXm;
  }
  OnExecute() {
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (s) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, `回合开始：${this.aLf} 白板变化：${this.hLf}`);
      }
      const o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetBlankCardData() !== undefined;
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.NextRound();
      if (this.hLf > 0 && o && (e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetBlankCardData())) {
        e.ChangeBlankValue(this.hLf);
      }
      var e = [];
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber === 1) {
        e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
          s.ShowInitialRoundTip(false, e);
        }));
        e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(o => {
          s.ShowOfficialRoundStartTip(() => {
            o();
            var e = [];
            if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.FirstPlayerTurn === 1) {
              e.push(new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 1), new GuessJokerPlotAction_1.GuessJokerPlotAction(0, 2));
            } else {
              e.push(new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 2), new GuessJokerPlotAction_1.GuessJokerPlotAction(0, 1));
            }
            ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions(e);
          });
        }));
      }
      e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        s.ClearAllCardsChecking();
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateNpcIdleState();
        if (o) {
          s.BlankCardAnimPlay();
          s.PlayGamePlayViewSequence("LevelChange", () => {
            this.FinishTask();
          });
        } else {
          s.UpdateRoundNumber();
          this.FinishTask();
        }
      }));
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(e);
    } else {
      this.FinishTask();
    }
  }
}
exports.GuessJokerRoundStartTask = GuessJokerRoundStartTask;
//# sourceMappingURL=GuessJokerRoundStartTask.js.map