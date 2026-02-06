"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAiCheckCardTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCheckCardAction_1 = require("../Action/GuessJokerCheckCardAction");
const GuessJokerCollectCardsAction_1 = require("../Action/GuessJokerCollectCardsAction");
const GuessJokerNpcPerformAction_1 = require("../Action/GuessJokerNpcPerformAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerAiCheckCardTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.nY1 = 0;
    this.nY1 = e.J7n;
  }
  OnExecute() {
    var e;
    var r;
    var s;
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView()) {
      e = this.Aag();
      r = this.nY1;
      (s = []).push(new GuessJokerCollectCardsAction_1.GuessJokerCollectCardsAction(0, 6));
      s.push(new GuessJokerNpcPerformAction_1.GuessJokerNpcPerformAction(3, r));
      s.push(new GuessJokerCheckCardAction_1.GuessJokerCheckCardAction(e));
      s.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
        this.FinishTask();
      }));
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(s);
    } else {
      this.FinishTask();
    }
  }
  Aag() {
    var r = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetHandCardsByPlayer(0);
    const s = this.nY1;
    var o = r.findIndex(e => e.Id === s);
    if (o === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, `检查卡牌：${s}不存在`);
      }
      return [];
    }
    var e = r.length;
    var t = Math.min(GuessJokerDefine_1.GUESS_JOKER_AI_CHECK_CARD_MAX_LENGTH, e);
    var t = Math.floor(Math.random() * t) + GuessJokerDefine_1.GUESS_JOKER_AI_CHECK_CARD_MIN_LENGTH;
    var a = o - (t - 1);
    var t = o + (t - 1);
    var i = a >= 0;
    var e = t < e;
    let n = 0;
    let u = false;
    if (i && e) {
      u = Math.random() < 0.5;
      n = u ? a : t;
    } else if (i) {
      u = true;
      n = a;
    } else {
      if (!e) {
        return [s];
      }
      u = false;
      n = t;
    }
    var c = [];
    if (u) {
      for (let e = n; e <= o; e++) {
        c.push(r[e].Id);
      }
    } else {
      for (let e = n; e >= o; e--) {
        c.push(r[e].Id);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, "Ai检查卡牌：" + c.join(","));
    }
    return c;
  }
}
exports.GuessJokerAiCheckCardTask = GuessJokerAiCheckCardTask;
//# sourceMappingURL=GuessJokerAiCheckCardTask.js.map