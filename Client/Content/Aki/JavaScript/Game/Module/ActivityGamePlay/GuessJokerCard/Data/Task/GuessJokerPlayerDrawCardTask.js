"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPlayerDrawCardTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerCollectCardsAction_1 = require("../Action/GuessJokerCollectCardsAction");
const GuessJokerGroupAction_1 = require("../Action/GuessJokerGroupAction");
const GuessJokerMoveCardsAction_1 = require("../Action/GuessJokerMoveCardsAction");
const GuessJokerNpcPerformAction_1 = require("../Action/GuessJokerNpcPerformAction");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerRoundStartTipAction_1 = require("../Action/GuessJokerRoundStartTipAction");
const GuessJokerShowCardsAction_1 = require("../Action/GuessJokerShowCardsAction");
const GuessJokerUpCardsAction_1 = require("../Action/GuessJokerUpCardsAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerPlayerDrawCardTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor() {
    super();
    this.L8g = false;
    this.TaskType = 1;
  }
  OnExecute() {
    const o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    var e;
    if (o) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(true);
      o.UpdateCurrentPlayer(0);
      o.SetPlayerCardClickCallback((e, o, s) => {
        if (this.IsFinished()) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("GuessJokerCard", 78, "任务已完成，忽略点击");
          }
        } else if (s) {
          this.w8g(e);
        } else {
          this.P8g(e, o);
        }
      });
      (e = []).push(new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(1, 5));
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber >= 1) {
        e.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(0));
      }
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        o.ShowPlayerDrawCardTip(true, e);
      }), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        var e = o.GetPositionPanel(5);
        if (e) {
          e.SetCardsClickableExcept(true);
        }
      }));
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(e);
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetHandCardsByPlayer(1).length > 1) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 3)]);
      }
    } else {
      this.FinishTask();
    }
  }
  P8g(e, o) {
    if (this.L8g) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GuessJokerCard", 78, "已经抽过牌，忽略选牌操作");
      }
    } else {
      var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
      if (s) {
        const r = s.GetPositionPanel(5);
        if (r && (s.SetCardChoose(e, true), (s = []).push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          r.SetCardsClickableExcept(false);
        }), new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(1, e, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerUpCardTime")), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([e], true), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([o], false)]), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          r.SetCardsClickableExcept(true);
        })), ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(s), ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetHandCardsByPlayer(1).length > 1)) {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 4)]);
        }
      }
    }
  }
  w8g(n) {
    if (this.L8g) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GuessJokerCard", 78, "已经抽过牌，忽略重复点击");
      }
    } else if (this.CanSendRequest()) {
      const a = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
      if (a) {
        const i = a.GetPositionPanel(5);
        if (i) {
          this.SetRequestFinished(true);
          this.L8g = true;
          a.GetCardItemById(n)?.SetToggleState(true);
          ControllerHolder_1.ControllerHolder.GuessJokerController.RequestJokerGuessDrawCard(n, e => {
            let o = n;
            if (e !== n) {
              i.SwapCardPositionsSilently(n, e);
              o = e;
            }
            var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetCardDataById(o);
            var s = e?.IsJoker() ?? false;
            var e = e?.IsBlank() ?? false;
            ModelManager_1.ModelManager.GuessJokerGamePlayModel?.UpdateCardBelongPlayerType([o], 0);
            const r = GuessJokerUtils_1.GuessJokerUtils.GetPlayerGetCardState(o);
            ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetPlayerDrawnCard(o);
            i.SetCardsClickableExcept(false, o);
            a.ClearChooseCard();
            a.GetCardItemById(o)?.SetClickEnable(false);
            var t = [];
            t.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
              a.SetCardsSelect(o, () => {
                e();
              });
            }), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
              a.ShowPlayerDrawCardTip(false, e);
            }));
            t.push(new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerShowCardsAction_1.GuessJokerShowCardsAction([o], true), new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(2, o, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerNpcDrawCardTime")), new GuessJokerMoveCardsAction_1.GuessJokerMoveCardsAction([o], 7), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
              ModelManager_1.ModelManager.GuessJokerGamePlayModel?.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(0, r)]);
            }), new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(1, 2)]));
            if (s) {
              t.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
                a.ShowDrawSpecialTip(true, false, 0, e);
              }), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
                a.ShowDrawSpecialTip(false, false, 0, e);
              }), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerDrawJoker");
              }));
            } else if (e) {
              t.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
                a.ShowDrawSpecialTip(true, true, 0, e);
              }), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
                a.ShowDrawSpecialTip(false, true, 0, e);
              }), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerDrawChange");
              }));
            }
            t.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerAfterDraw");
            }), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
              a.HidePlayerButtons();
              ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateNpcIdleState();
              this.FinishTask();
            }));
            ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(t);
          });
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GuessJokerCard", 78, "抽卡请求进行中，忽略重复点击");
    }
  }
  OnComplete() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(false);
  }
}
exports.GuessJokerPlayerDrawCardTask = GuessJokerPlayerDrawCardTask;
//# sourceMappingURL=GuessJokerPlayerDrawCardTask.js.map