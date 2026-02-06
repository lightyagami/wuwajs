"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAiPlayCardTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerController_1 = require("../../GuessJokerController");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerCollectCardsAction_1 = require("../Action/GuessJokerCollectCardsAction");
const GuessJokerGroupAction_1 = require("../Action/GuessJokerGroupAction");
const GuessJokerMoveCardsAction_1 = require("../Action/GuessJokerMoveCardsAction");
const GuessJokerRemoveMiddleCardsAction_1 = require("../Action/GuessJokerRemoveMiddleCardsAction");
const GuessJokerRoundStartTipAction_1 = require("../Action/GuessJokerRoundStartTipAction");
const GuessJokerShowCardsAction_1 = require("../Action/GuessJokerShowCardsAction");
const GuessJokerShuffleCardsAction_1 = require("../Action/GuessJokerShuffleCardsAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerAiPlayCardTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.CardIdList = [];
    this.CardIdList = e.OXm.Yru;
  }
  OnExecute() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    if (this.CardIdList.length === 0) {
      if (e !== 0 || !!ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowInitialNoPairTip) {
        GuessJokerController_1.GuessJokerController.OpenGuessJokerFloatTipsView("GuessJoker_Ai_NoPlayCard");
      }
      this.ROg();
    } else {
      const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "Ai出牌：" + this.CardIdList.toString());
      }
      var o = [];
      if (e === 0) {
        s.UpdateCurrentPlayer(1);
        o.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(1));
      }
      ModelManager_1.ModelManager.GuessJokerGamePlayModel?.UpdateCardBelongPlayerType(this.CardIdList);
      var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetHandCardsByPlayer(1).length;
      var e = e === 0;
      o.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        s.SetPositionPanelCardsDark(3, true);
      }), new GuessJokerShowCardsAction_1.GuessJokerShowCardsAction(this.CardIdList, true), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {}), new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerMoveCardsAction_1.GuessJokerMoveCardsAction(this.CardIdList, 7), new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(1, 2)]));
      if (e) {
        o.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
          s.ShowWinLoseReasonTip(1, "GuessJoker_PlayAllCardsTipText", true, () => {
            e();
            this.FinishTask();
          });
        }));
      } else {
        o.push(new GuessJokerRemoveMiddleCardsAction_1.GuessJokerRemoveMiddleCardsAction());
        o.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          s.SetPositionPanelCardsDark(3, false);
        }));
        o.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateNpcIdleState();
          this.ROg();
        }));
      }
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(o);
    }
  }
  ROg() {
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.HasAiNewCardInHand()) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions([new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(1, 2), new GuessJokerShuffleCardsAction_1.GuessJokerShuffleCardsAction(2), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.ClearAiDrawnCard();
        this.FinishTask();
      })]);
    } else {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ClearAiDrawnCard();
      this.FinishTask();
    }
  }
}
exports.GuessJokerAiPlayCardTask = GuessJokerAiPlayCardTask;
//# sourceMappingURL=GuessJokerAiPlayCardTask.js.map