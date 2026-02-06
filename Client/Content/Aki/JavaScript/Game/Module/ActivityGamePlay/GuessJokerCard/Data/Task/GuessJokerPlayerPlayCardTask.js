"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPlayerPlayCardTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerController_1 = require("../../GuessJokerController");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerCollectCardsAction_1 = require("../Action/GuessJokerCollectCardsAction");
const GuessJokerGroupAction_1 = require("../Action/GuessJokerGroupAction");
const GuessJokerMoveCardsAction_1 = require("../Action/GuessJokerMoveCardsAction");
const GuessJokerRemoveMiddleCardsAction_1 = require("../Action/GuessJokerRemoveMiddleCardsAction");
const GuessJokerRoundStartTipAction_1 = require("../Action/GuessJokerRoundStartTipAction");
const GuessJokerShuffleCardsAction_1 = require("../Action/GuessJokerShuffleCardsAction");
const GuessJokerUpCardsAction_1 = require("../Action/GuessJokerUpCardsAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerPlayerPlayCardTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor() {
    super();
    this.TaskType = 1;
  }
  OnExecute() {
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (s) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "【task】玩家出牌");
      }
      var o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerPlayCardIdList();
      const r = [];
      let e = 0;
      for (const a of o) {
        r.push(...a.CardIdList);
        e++;
      }
      if (e === 0) {
        const n = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
        if (n !== 0 || !!ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowInitialNoPairTip) {
          GuessJokerController_1.GuessJokerController.OpenGuessJokerFloatTipsView("GuessJoker_Player_NoPlayCard");
        }
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions([new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 3), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          this.SetRequestFinished(true);
          ControllerHolder_1.ControllerHolder.GuessJokerController.RequestJokerGuessPlayCard([], () => {
            this.ROg();
          });
        })]);
      } else {
        s.SetPlayerPlayCardInteractiveCallback(r => {
          if (this.CanSendRequest()) {
            this.SetRequestFinished(true);
            ControllerHolder_1.ControllerHolder.GuessJokerController.RequestJokerGuessPlayCard(r, () => {
              if (r.length === 0) {
                ControllerHolder_1.ControllerHolder.GuessJokerController.OpenGuessJokerFloatTipsView("GuessJoker_Player_GiveUpPlayCard");
              }
              ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateCardBelongPlayerType(r);
              var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetHandCardsByPlayer(0).length === 0;
              var o = [];
              o.push(new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerMoveCardsAction_1.GuessJokerMoveCardsAction(r, 7), new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 3)]));
              if (e) {
                o.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
                  s.ShowWinLoseReasonTip(0, "GuessJoker_PlayAllCardsTipText", true, () => {
                    e();
                    this.FinishTask();
                  });
                }));
              } else {
                o.push(new GuessJokerRemoveMiddleCardsAction_1.GuessJokerRemoveMiddleCardsAction());
                o.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
                  s.SetPositionPanelCardsDark(3, false);
                  ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateNpcIdleState();
                  s.SetPlayerCardClickCallback(undefined);
                  this.ROg();
                }));
              }
              ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(o);
            });
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("GuessJokerCard", 78, "出牌请求进行中，忽略重复点击");
          }
        });
        const n = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
        o = [];
        if (n === 0) {
          s.UpdateCurrentPlayer(0);
          o.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(0));
        }
        o.push(new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 4), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          s.SetPositionPanelCardsDark(4, true, r);
        }), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction(r, true), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          s.ShowPlayerButtons(e);
        }));
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(o);
      }
    } else {
      this.FinishTask();
    }
  }
  ROg() {
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.HasPlayerNewCardInHand()) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions([new GuessJokerShuffleCardsAction_1.GuessJokerShuffleCardsAction(3), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.ClearPlayerDrawnCard();
        this.FinishTask();
      })]);
    } else {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ClearPlayerDrawnCard();
      this.FinishTask();
    }
  }
  OnComplete() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(false);
  }
}
exports.GuessJokerPlayerPlayCardTask = GuessJokerPlayerPlayCardTask;
//# sourceMappingURL=GuessJokerPlayerPlayCardTask.js.map