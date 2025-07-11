"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionCheckState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this._ne = undefined;
    this.une = undefined;
    this.cne = undefined;
    this.pwu = t => {
      this.ResultSelf = t;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionCheckState", this.Node?.Name);
    };
  }
  RegisterEvents() {
    if (super.RegisterEvents()) {
      var t = this.vwu();
      if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnStateActivated, this.pwu)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnStateActivated, this.pwu);
        return true;
      }
    }
    return false;
  }
  UnregisterEvents() {
    if (super.UnregisterEvents()) {
      var t = this.vwu();
      if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnStateActivated, this.pwu)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnStateActivated, this.pwu);
        return true;
      }
    }
    return false;
  }
  OnInit(t) {
    if (t.CondCheckState) {
      this.une = t.CondCheckState.TargetState;
    } else if (t.CondCheckStateByName) {
      this._ne = t.CondCheckStateByName.TargetStateName;
    }
    return true;
  }
  vwu() {
    let t = undefined;
    if (this.une !== undefined) {
      t = this.Node.Owner.GetNodeByUuid(this.une);
    } else if (this._ne !== undefined) {
      t = this.Node.Owner.GetNodeByName(this._ne);
    }
    return t;
  }
  OnTick() {
    this.cne ||= this.vwu();
    this.ResultSelf = this.cne?.Activated ?? false;
  }
  ToString(t, e = 0) {
    super.ToString(t, e);
    if (this.cne) {
      t.Append(`检查节点状态 [${this.cne.Name}]
`);
    } else {
      t.Append(`检查节点状态 [${this._ne}] 目标节点不存在`);
    }
  }
}
exports.AiStateMachineConditionCheckState = AiStateMachineConditionCheckState;
//# sourceMappingURL=AiStateMachineConditionCheckState.js.map