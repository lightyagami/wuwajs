"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionMontageTimeElapsing = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionMontageTimeElapsing extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Ql = -0;
    this.fne = undefined;
    this.FTu = t => {
      this.ResultSelf = true;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionMontageTimeElapsing", this.Node?.Name);
    };
  }
  RegisterEvents() {
    return !!super.RegisterEvents() && !!this.fne && !EventSystem_1.EventSystem.HasWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.FTu) && !(EventSystem_1.EventSystem.AddWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.FTu), 0);
  }
  UnregisterEvents() {
    return !!super.UnregisterEvents() && !!this.fne && !!EventSystem_1.EventSystem.HasWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.FTu) && (EventSystem_1.EventSystem.RemoveWithTarget(this.fne, EventDefine_1.EEventName.OnMontageRemain, this.FTu), true);
  }
  NTu() {
    var t;
    if (this.fne) {
      t = (t = this.fne.GetTimeLength()) > 0 && t >= this.fne.GetTimeElapsing() ? t - this.fne.GetTimeElapsing() : -1;
      this.fne.RemainedTrigger = t;
      this.RegisterEvents();
    }
  }
  OnInit(t) {
    this.HasTaskFinishCondition = true;
    this.Ql = t.CondMontageTimeElapsing.Time * 0.001;
    if (this.Node.Task?.Type !== 102 && this.Node.Task?.Type !== 3 && this.Node.Task?.Type !== 105) {
      this.Node.Owner.PushErrorMessage(`初始化条件[动画播放时间]失败，node[${this.Node.Name}|${this.Node.Uuid}], to:${this.Transition.To}`);
    } else {
      this.fne = this.Node.Task;
      this.NTu();
    }
    return true;
  }
  OnEnter() {
    if (this.fne?.HasResource) {
      if (this.Node.TaskFinished) {
        this.ResultSelf = true;
      } else if (this.fne?.Playing) {
        this.ResultSelf = this.fne.GetTimeElapsing() >= this.Ql;
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
        this.ResultSelf = this.fne.GetTimeElapsing() >= this.Ql;
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
    t.Append(`动画播放时间大于 [${this.Ql.toFixed(1)}
`);
  }
}
exports.AiStateMachineConditionMontageTimeElapsing = AiStateMachineConditionMontageTimeElapsing;
//# sourceMappingURL=AiStateMachineConditionMontageTimeElapsing.js.map