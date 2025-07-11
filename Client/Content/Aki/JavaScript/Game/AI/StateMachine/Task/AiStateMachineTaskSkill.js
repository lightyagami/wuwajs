"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskSkill = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../Utils/CombatLog");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskSkill extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.SkillName = "";
    this.SkillId = 0;
    this.Timeout = 0;
    this.Done = false;
    this.NZ1 = false;
    this.PreExecution = false;
    this.IsAsyncTask = true;
  }
  OnInit(t) {
    var i;
    if (this.Node.SkillId) {
      this.Node.Owner.PushErrorMessage(`状态节点配置错误，重复配置技能，节点[${this.Node.Name}]]`);
      return false;
    } else {
      if (t.TaskSkillByName) {
        this.SkillName = t.TaskSkillByName.SkillName;
        i = this.Node.Entity.GetComponent(40).GetSkillIdByName(this.SkillName);
        this.SkillId = i || 0;
        this.Node.SkillId = this.SkillId;
      } else if (t.TaskSkill) {
        this.SkillId = t.TaskSkill.SkillId;
        this.Node.SkillId = t.TaskSkill.SkillId;
      } else {
        this.Node.Owner.PushErrorMessage(`状态节点配置错误，技能为空，节点[${this.Node.Name}]]`);
      }
      return true;
    }
  }
  OnEnter(i) {
    var t;
    if (this.SkillId) {
      this.PreExecution = this.Node.RootNode.WaitSwitchState;
      this.Done = false;
      if (this.SkillId && (this.Node.ActorComponent.IsAutonomousProxy || this.PreExecution)) {
        this.Node.SkillComponent.StopAllSkills("AiStateMachineTaskSkill.OnEnter");
        t = this.Node.AiController.AiHateList.GetCurrentTarget();
        this.Node.SkillComponent.BeginSkillAsync(this.SkillId, {
          Target: t?.Entity,
          ContextId: i,
          Reason: "AiStateMachineTaskSkill.OnEnter"
        }).then(t => {
          this.NZ1 = false;
          this.Done = t;
          CombatMessage_1.CombatNet.RemovePendingCall(i);
        });
        this.NZ1 = true;
      }
    } else {
      CombatLog_1.CombatLog.Error("StateMachineNew", this.Node.Entity, `状态节点执行技能失败，技能查询失败，节点[${this.Node.Name}]，技能名[${this.SkillName}]`);
    }
  }
  OnTick(t, i) {
    var s;
    if (!this.NZ1 && !this.Done && (!!this.Node.ActorComponent.IsAutonomousProxy || !!this.PreExecution)) {
      if (this.Node.ElapseTime < this.Timeout) {
        this.Node.SkillComponent.BeginSkillAsync(this.SkillId, {
          ContextId: i,
          Reason: "AiStateMachineTaskSkill.OnTick"
        }).then(t => {
          this.Done = t;
        });
      } else {
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Node.Entity, `状态机技能释放失败 节点[${this.Node.Name}]，技能名[${this.SkillName}]`);
        (s = Protocol_1.Aki.Protocol.we_.create()).r5n = this.SkillId;
        CombatMessage_1.CombatNet.Send(26683, this.Node.Entity, s, i);
        this.Node.TaskFinished = true;
        this.Done = true;
      }
    }
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineTaskSkill = AiStateMachineTaskSkill;
//# sourceMappingURL=AiStateMachineTaskSkill.js.map