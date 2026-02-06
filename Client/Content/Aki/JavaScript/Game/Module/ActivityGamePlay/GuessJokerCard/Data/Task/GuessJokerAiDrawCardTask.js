"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAiDrawCardTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerCollectCardsAction_1 = require("../Action/GuessJokerCollectCardsAction");
const GuessJokerGroupAction_1 = require("../Action/GuessJokerGroupAction");
const GuessJokerMoveCardsAction_1 = require("../Action/GuessJokerMoveCardsAction");
const GuessJokerNpcPerformAction_1 = require("../Action/GuessJokerNpcPerformAction");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerRoundStartTipAction_1 = require("../Action/GuessJokerRoundStartTipAction");
const GuessJokerShuffleCardsAction_1 = require("../Action/GuessJokerShuffleCardsAction");
const GuessJokerUpCardsAction_1 = require("../Action/GuessJokerUpCardsAction");
const GuessJokerWaitAction_1 = require("../Action/GuessJokerWaitAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerAiDrawCardTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.nY1 = 0;
    this.wmo = 0;
    this.nY1 = e.ivf;
    this.wmo = e.UHf;
  }
  OnExecute() {
    var e;
    var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (s) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, `【task】Ai抽牌：${this.nY1}，技能ID：${this.wmo}`);
      }
      if (this.wmo === 0) {
        s.UpdateCurrentPlayer(1);
      }
      s = [];
      e = this.N$f();
      s.push(...e);
      e = this.Dag();
      s.push(...e);
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(s);
    } else {
      this.FinishTask();
    }
  }
  N$f() {
    if (this.wmo === GuessJokerDefine_1.GUESS_JOKER_LUHESI_SKILL_ID) {
      return this.j$f();
    } else if (this.wmo === GuessJokerDefine_1.GUESS_JOKER_PLAYER_SKILL_ID || this.wmo === GuessJokerDefine_1.GUESS_JOKER_JINXI_SKILL_ID) {
      return this.k6g();
    } else {
      return this.V$f();
    }
  }
  V$f() {
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    var e = [];
    e.push(new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 6));
    var o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    if (o >= 1 && this.wmo === 0) {
      e.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(1));
    }
    e.push(new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(3, this.nY1), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      s.ShowAiSelectCardTip(true, () => {
        e();
      });
    }), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([this.nY1], true), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      s.SetCardsSelect(this.nY1, () => {
        e();
      });
    }));
    return e;
  }
  k6g() {
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    var e = [];
    e.push(new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 6));
    e.push(new GuessJokerShuffleCardsAction_1.GuessJokerShuffleCardsAction(6));
    var o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    if (o >= 1 && this.wmo === 0) {
      e.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(1));
    }
    e.push(new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(3, this.nY1), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      s.ShowAiSelectCardTip(true, () => {
        e();
      });
    }), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([this.nY1], true), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      s.SetCardsSelect(this.nY1, () => {
        e();
      });
    }));
    return e;
  }
  j$f() {
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetJokerCardId();
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetCardDataById(s)?.GetBelongPlayerType() === 1) {
      return this.V$f();
    }
    const o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    return [new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 6), new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(3, this.nY1), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      o.ShowAiSelectCardTip(true, () => {
        e();
      });
    }), new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      o.SetCardsSelect(s, () => {
        e();
      });
    }), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([s], true)]), new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 9, this.wmo)]);
    }), new GuessJokerWaitAction_1.GuessJokerWaitAction(500), new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      o.SetCardsSelect(this.nY1, () => {
        e();
      });
    }), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([s], false), new GuessJokerUpCardsAction_1.GuessJokerUpCardsAction([this.nY1], true)])];
  }
  Dag() {
    var e = [];
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    var o = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetCardDataById(this.nY1);
    var r = o?.IsJoker() ?? false;
    var o = o?.IsBlank() ?? false;
    e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel?.UpdateCardBelongPlayerType([this.nY1], 1);
      ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetAiDrawnCard(this.nY1);
    }), new GuessJokerGroupAction_1.GuessJokerGroupAction([new GuessJokerMoveCardsAction_1.GuessJokerMoveCardsAction([this.nY1], 7), new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 3), new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
      s.ShowAiSelectCardTip(false, () => {
        e();
      });
    })]));
    if (r) {
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        s.ShowDrawSpecialTip(true, false, 1, e);
      }));
    } else if (o) {
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        s.ShowDrawSpecialTip(true, true, 1, e);
      }));
    }
    e.push(new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(4, this.nY1, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerNpcDrawCardTime")));
    if (r) {
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        s.ShowDrawSpecialTip(false, false, 1, e);
      }));
    } else if (o) {
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        s.ShowDrawSpecialTip(false, true, 1, e);
      }));
    }
    e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateNpcIdleState();
      this.FinishTask();
    }));
    return e;
  }
}
exports.GuessJokerAiDrawCardTask = GuessJokerAiDrawCardTask;
//# sourceMappingURL=GuessJokerAiDrawCardTask.js.map