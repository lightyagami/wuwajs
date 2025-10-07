"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskMontage = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const CombatLog_1 = require("../../../Utils/CombatLog");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskMontage extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.ise = "";
    this.Ine = false;
    this.ose = 0;
    this.Rne = undefined;
    this.rse = undefined;
    this.Dne = false;
    this.Playing = false;
    this.RemainedTrigger = -1;
    this.Une = () => {
      this.Dne = false;
      if (this.Node.Activated) {
        if (this.Ine && this.Rne) {
          this.Node.ActorComponent.EnableActor(this.Rne);
          this.Rne = undefined;
        }
        this.Node.MoveComponent.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      }
    };
    this.nse = t => {
      this.Node.TaskFinished = true;
      this.rse = undefined;
    };
    this.sbu = t => {
      CombatLog_1.CombatLog.Info("StateMachineNew", this.Node?.Entity, "Montage Task OnMontageRemain", ["montage", this.GetNameByCurrentHandle()], ["remain time", t], ["remained trigger", this.RemainedTrigger]);
      EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnMontageRemain, t);
    };
  }
  get HasResource() {
    return !!this.rse || this.Node.TaskFinished;
  }
  OnInit(t) {
    this.ise = t.TaskMontage.MontageName;
    this.Ine = t.TaskMontage.HideOnLoading;
    this.ose = t.TaskMontage.BlendInTime * 0.001;
    return true;
  }
  OnEnter(t) {
    var i;
    if (!this.Node.TagComponent.HasTag(1008164187) && (this.Node.SkillComponent.StopGroup1Skill("AiStateMachineTaskMontage.OnEnter"), this.Node.TaskFinished = false, this.Dne = true, this.Playing = false, i = this.Node.MontageComponent, this.rse || (this.Ine && !this.Rne && (this.Rne = this.Node.ActorComponent.DisableActor("状态机加载动作")), this.rse = i.CreateTaskWithName(this.ise, this.Une, this.nse, this.ose), this.rse && i.SetMontageTaskRemainCb(this.rse, this.sbu)), this.rse)) {
      this.Playing = true;
      i.PlayMontageTaskWhenReady(this.rse, this.Node.ElapseTime * TimeUtil_1.TimeUtil.Millisecond, t, this.RemainedTrigger);
    } else {
      this.Node.TaskFinished = true;
    }
  }
  OnExit(t) {
    if (this.Ine && this.Dne && this.Rne) {
      this.Node.ActorComponent.EnableActor(this.Rne);
      this.Rne = undefined;
    }
    this.Node.MontageComponent.EndMontageTask(this.rse);
    this.rse = undefined;
    this.Node.TaskFinished = false;
    this.Playing = false;
  }
  OnTick() {
    this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  OnClear() {
    if (this.rse) {
      this.Node.MontageComponent.EndMontageTask(this.rse);
    }
    this.rse = undefined;
  }
  GetTimeRemaining() {
    return this.Node.MontageComponent.GetMontageTimeRemaining(this.rse);
  }
  GetTimeElapsing() {
    return this.Node.MontageComponent.GetMontageTimeElapsing(this.rse);
  }
  GetTimeLength() {
    return this.Node.MontageComponent.GetMontageTimeLength(this.rse);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
  hbu(t) {
    return this.Node.MontageComponent.GetMontageTaskNameByHandle(t);
  }
  GetNameByCurrentHandle() {
    if (this.rse) {
      return this.hbu(this.rse);
    }
  }
}
exports.AiStateMachineTaskMontage = AiStateMachineTaskMontage;
//# sourceMappingURL=AiStateMachineTaskMontage.js.map