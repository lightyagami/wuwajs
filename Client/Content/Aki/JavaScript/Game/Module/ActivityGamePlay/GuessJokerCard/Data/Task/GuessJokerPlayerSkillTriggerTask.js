"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPlayerSkillTriggerTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerPlayerSkillTriggerTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.wmo = 0;
    this.sLf = 0;
    this.W$f = false;
    this.A8g = false;
    this.$$f = 0;
    this.TaskType = 1;
    this.wmo = e.wXm;
    this.sLf = e.AXm;
    this.W$f = false;
    this.FinishTime = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerPlayerSkillConsiderTime");
  }
  OnExecute() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, `玩家技能触发：${this.wmo} 剩余次数：${this.sLf}`);
    }
    const s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (s) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(true);
      s.SetCurrentSkillInfo(this.wmo, this.sLf);
      s.ShowSkillInteractivePanel(true);
      s.SetSkillProgress(0, 0);
      const r = ControllerHolder_1.ControllerHolder.GuessJokerController;
      s.SetPlayerSkillRequestCallback(e => {
        if (this.IsFinished() || this.A8g) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("GuessJokerCard", 78, "任务已完成或正在自动放弃，忽略玩家点击");
          }
        } else if (this.CanSendRequest()) {
          this.SetRequestFinished(true);
          r.JokerGuessUseSkillRequest(this.wmo, e, () => {
            this.W$f = true;
            s.ShowSkillInteractivePanel(false);
            this.FinishTask();
          });
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GuessJokerCard", 78, "技能请求进行中，忽略重复点击");
        }
      });
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(0, 8)]);
    } else {
      this.FinishTask();
    }
  }
  OnTick(e) {
    var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (!!s && !(this.FinishTime <= 0)) {
      this.$$f += e;
      e = Math.min(1, this.$$f / this.FinishTime);
      s.SetSkillProgress(0, e);
    }
  }
  OnComplete() {
    const e = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (e) {
      this.A8g = true;
      if (this.W$f) {
        e.ShowSkillInteractivePanel(false);
        e.SetSkillProgress(0, 0);
      } else {
        ControllerHolder_1.ControllerHolder.GuessJokerController.JokerGuessUseSkillRequest(this.wmo, false, () => {
          e.ShowSkillInteractivePanel(false);
          e.SetSkillProgress(0, 0);
        });
      }
    }
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcEnterInteractiveStage(false);
  }
}
exports.GuessJokerPlayerSkillTriggerTask = GuessJokerPlayerSkillTriggerTask;
//# sourceMappingURL=GuessJokerPlayerSkillTriggerTask.js.map