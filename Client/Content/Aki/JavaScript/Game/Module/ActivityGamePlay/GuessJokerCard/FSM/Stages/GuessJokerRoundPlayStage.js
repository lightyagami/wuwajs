"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerRoundPlayStage = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerAiCheckCardTask_1 = require("../../Data/Task/GuessJokerAiCheckCardTask");
const GuessJokerAiDrawCardTask_1 = require("../../Data/Task/GuessJokerAiDrawCardTask");
const GuessJokerAiPlayCardTask_1 = require("../../Data/Task/GuessJokerAiPlayCardTask");
const GuessJokerAiSkillTriggerTask_1 = require("../../Data/Task/GuessJokerAiSkillTriggerTask");
const GuessJokerPlayerDrawCardTask_1 = require("../../Data/Task/GuessJokerPlayerDrawCardTask");
const GuessJokerPlayerPlayCardTask_1 = require("../../Data/Task/GuessJokerPlayerPlayCardTask");
const GuessJokerPlayerSkillTriggerTask_1 = require("../../Data/Task/GuessJokerPlayerSkillTriggerTask");
const GuessJokerRoundStartTask_1 = require("../../Data/Task/GuessJokerRoundStartTask");
const GuessJokerSettleTask_1 = require("../../Data/Task/GuessJokerSettleTask");
const GuessJokerSkillExecuteTask_1 = require("../../Data/Task/GuessJokerSkillExecuteTask");
const GuessJokerUpdateHpTask_1 = require("../../Data/Task/GuessJokerUpdateHpTask");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerRoundPlayStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  constructor() {
    super(...arguments);
    this.TaskList = [];
    this.CurrentTask = undefined;
    this.uLf = () => {
      this.coc();
      this.g_u();
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuessJokerCardUpdateTaskData, this.uLf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuessJokerCardUpdateTaskData, this.uLf);
  }
  OnEnter() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, "RoundPlay Stage OnEnter");
    }
    this.cLf();
    this.g_u();
  }
  OnTick(e) {
    if (this.CurrentTask && (this.CurrentTask.Tick(e), this.CurrentTask.IsFinished())) {
      this.TaskList.shift();
      this.CurrentTask = undefined;
      this.g_u();
    }
  }
  cLf() {
    this.coc();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, "RoundPlay Stage InitTaskList: " + this.TaskList.length);
    }
  }
  coc() {
    for (const s of ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetTaskDataList()) {
      var e = this.CreateTaskData(s);
      if (e) {
        this.TaskList.push(e);
      }
    }
  }
  g_u() {
    var e;
    if (!this.CurrentTask) {
      if (this.TaskList.length === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("GuessJokerCard", 78, "RoundPlay Stage TryExecuteTask: No task");
        }
      } else {
        this.CurrentTask = this.TaskList[0];
        this.CurrentTask.Execute();
        e = this.TaskList.map(e => e.constructor.name);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "猜鬼牌待执行Task列表: " + e.join(", "));
        }
      }
    }
  }
  CreateTaskData(e) {
    let s = undefined;
    switch (e.nKn) {
      case Protocol_1.Aki.Protocol.cvf.Proto_EnterNewRound:
        s = new GuessJokerRoundStartTask_1.GuessJokerRoundStartTask(e.avf);
        break;
      case Protocol_1.Aki.Protocol.cvf.ivf:
        s = this.dLf(e.nvf);
        break;
      case Protocol_1.Aki.Protocol.cvf.OXm:
        s = this.mLf(e.svf);
        break;
      case Protocol_1.Aki.Protocol.cvf.Proto_TriggerSkill:
        s = this.fLf(e.hvf);
        break;
      case Protocol_1.Aki.Protocol.cvf.Proto_ExecSkill:
        s = new GuessJokerSkillExecuteTask_1.GuessJokerSkillExecuteTask(e.lvf);
        break;
      case Protocol_1.Aki.Protocol.cvf.Proto_HealthHpRefresh:
        s = new GuessJokerUpdateHpTask_1.GuessJokerUpdateHpTask(e._vf);
        break;
      case Protocol_1.Aki.Protocol.cvf.Proto_SettleResult:
        s = new GuessJokerSettleTask_1.GuessJokerSettleTask(e.qI_);
        break;
      case Protocol_1.Aki.Protocol.cvf.Proto_DisPlayCard:
        s = new GuessJokerAiCheckCardTask_1.GuessJokerAiCheckCardTask(e.zrg);
    }
    return s;
  }
  dLf(e) {
    let s = undefined;
    var r = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.tvf);
    return s = r === 0 ? new GuessJokerPlayerDrawCardTask_1.GuessJokerPlayerDrawCardTask() : new GuessJokerAiDrawCardTask_1.GuessJokerAiDrawCardTask(e);
  }
  mLf(e) {
    let s = undefined;
    var r = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.evf);
    return s = r === 0 ? new GuessJokerPlayerPlayCardTask_1.GuessJokerPlayerPlayCardTask() : new GuessJokerAiPlayCardTask_1.GuessJokerAiPlayCardTask(e);
  }
  fLf(e) {
    let s = undefined;
    var r = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.PXm);
    return s = new (r === 0 ? GuessJokerPlayerSkillTriggerTask_1.GuessJokerPlayerSkillTriggerTask : GuessJokerAiSkillTriggerTask_1.GuessJokerAiSkillTriggerTask)(e);
  }
}
exports.GuessJokerRoundPlayStage = GuessJokerRoundPlayStage;
//# sourceMappingURL=GuessJokerRoundPlayStage.js.map