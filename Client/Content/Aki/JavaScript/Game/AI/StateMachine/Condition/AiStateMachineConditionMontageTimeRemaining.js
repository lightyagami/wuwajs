"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionMontageTimeRemaining = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionMontageTimeRemaining extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Ql = -0;
    this.fne = undefined;
    this.sbu = t => {
      this.ResultSelf = true;
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionMontageTimeRemaining", this.Node.Name);
      }
    };
  }
  RegisterEvents() {
    return !!super.RegisterEvents() && !!this.fne && !EventSystem_1.EventSystem.HasWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.sbu) && !(EventSystem_1.EventSystem.AddWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.sbu), 0);
  }
  UnregisterEvents() {
    return !!super.UnregisterEvents() && !!this.fne && !!EventSystem_1.EventSystem.HasWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.sbu) && (EventSystem_1.EventSystem.RemoveWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.sbu), true);
  }
  abu() {
    if (this.fne) {
      this.fne.RemainedTrigger = this.Ql;
      this.RegisterEvents();
    }
  }
  OnInit(t) {
    this.HasTaskFinishCondition = true;
    this.Ql = t.CondMontageTimeRemaining.Time * 0.001;
    if (this.Node.Task?.Type !== 102 && this.Node.Task?.Type !== 3 && this.Node.Task?.Type !== 105) {
      this.Node.Owner.PushErrorMessage(`初始化条件[动画剩余时间]失败，node[${this.Node.Name}|${this.Node.Uuid}], to:${this.Transition.To}`);
    } else {
      this.fne = this.Node.Task;
      this.abu();
    }
    return true;
  }
  OnEnter() {
    if (this.fne?.HasResource) {
      if (this.Node.TaskFinished) {
        this.ResultSelf = true;
      } else if (this.fne?.Playing) {
        this.ResultSelf = this.fne.GetTimeRemaining() <= this.Ql;
      }
    } else {
      this.ResultSelf = false;
    }
  }
  OnTick() {
    if (this.fne?.HasResource) {
      if (this.Node.TaskFinished) {
        this.ResultSelf = true;
      } else if (this.fne?.Playing) {
        this.ResultSelf = this.fne.GetTimeRemaining() <= this.Ql;
      }
    } else {
      this.ResultSelf = false;
    }
  }
  OnExit() {
    this.ResultSelf = false;
  }
  OnClear() {
    this.UnregisterEvents();
    this.fne = undefined;
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append(`动画剩余时间小于 [${this.Ql.toFixed(1)}
`);
  }
}
exports.AiStateMachineConditionMontageTimeRemaining = AiStateMachineConditionMontageTimeRemaining;
//# sourceMappingURL=AiStateMachineConditionMontageTimeRemaining.js.map