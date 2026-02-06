"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAiSkillTriggerTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerCallbackAction_1 = require("../Action/GuessJokerCallbackAction");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerRoundStartTipAction_1 = require("../Action/GuessJokerRoundStartTipAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerAiSkillTriggerTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.wmo = 0;
    this.sLf = 0;
    this.b8g = false;
    this.$$f = 0;
    this.wmo = e.wXm;
    this.sLf = e.AXm;
  }
  OnExecute() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, `Ai技能触发：${this.wmo} 剩余次数：${this.sLf}`);
    }
    var e = [];
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (s && (s.UpdateCurrentPlayer(1), this.wmo !== GuessJokerDefine_1.GUESS_JOKER_JIABEI_SKILL_ID && this.wmo !== GuessJokerDefine_1.GUESS_JOKER_LUHESI_SKILL_ID || e.push(new GuessJokerRoundStartTipAction_1.GuessJokerRoundStartTipAction(1)), ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShouldPlaySkillEffect(this.wmo) && (e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
      this.b8g = true;
      this.FinishTime = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerAiSkillConsiderTime");
      s.SetSkillProgress(1, 0);
      s.ShowAiSkillProgress(true);
      s.SetPositionPanelCardsDark(3, true);
    })), ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 8)])), e.length > 0)) {
      if (!ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShouldPlaySkillEffect(this.wmo)) {
        e.push(new GuessJokerCallbackAction_1.GuessJokerCallbackAction(() => {
          this.FinishTask();
        }));
      }
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushActions(e);
    } else {
      this.FinishTask();
    }
  }
  OnTick(e) {
    var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (!!s && !(this.FinishTime <= 0) && !!this.b8g) {
      this.$$f += e;
      e = this.$$f / this.FinishTime;
      s.SetSkillProgress(1, e);
    }
  }
  OnComplete() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (e) {
      e.ShowAiSkillProgress(false);
      e.SetPositionPanelCardsDark(3, false);
    }
  }
}
exports.GuessJokerAiSkillTriggerTask = GuessJokerAiSkillTriggerTask;
//# sourceMappingURL=GuessJokerAiSkillTriggerTask.js.map