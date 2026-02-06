"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerUpdateHpTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerCallbackWithCompleteAction_1 = require("../Action/GuessJokerCallbackWithCompleteAction");
const GuessJokerUpdateHpAction_1 = require("../Action/GuessJokerUpdateHpAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerUpdateHpTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.PlayerType = 1;
    this.Hp = 0;
    this.PlayerType = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.l6n);
    this.Hp = e.rvf;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, `GuessJoker更新血量任务：${this.PlayerType}，${this.Hp}`);
    }
  }
  OnExecute() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateHp(this.PlayerType, this.Hp);
    var e = [];
    e.push(new GuessJokerUpdateHpAction_1.GuessJokerUpdateHpAction(this.PlayerType, this.Hp));
    if (this.Hp === 0) {
      const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
      e.push(new GuessJokerCallbackWithCompleteAction_1.GuessJokerCallbackWithCompleteAction(e => {
        s.ShowWinLoseReasonTip(this.PlayerType, "GuessJoker_HpZeroTipText", false, e);
      }));
    }
    e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
      this.FinishTask();
    }));
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(e);
  }
}
exports.GuessJokerUpdateHpTask = GuessJokerUpdateHpTask;
//# sourceMappingURL=GuessJokerUpdateHpTask.js.map