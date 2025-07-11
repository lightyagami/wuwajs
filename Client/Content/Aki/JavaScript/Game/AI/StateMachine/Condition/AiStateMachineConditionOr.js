"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionOr = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionOr extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Conditions = undefined;
  }
  OnInit(i) {
    var s = i.CondOr.Conditions.length;
    if (s > 0) {
      this.Conditions = [];
      for (let t = 0; t < s; t++) {
        var e = i.CondOr.Conditions[t];
        var o = this.Transition.ConditionDatas[e];
        var o = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(this.Transition, o, e, this);
        this.HasTaskFinishCondition ||= o.HasTaskFinishCondition;
        this.Conditions.push(o);
      }
    }
    return true;
  }
  OnEnter() {
    this.HasSignaled = false;
    for (const t of this.Conditions) {
      t.Enter();
    }
  }
  OnExit() {
    this.HasSignaled = false;
    for (const t of this.Conditions) {
      t.Exit();
    }
  }
  OnTick() {
    this.ResultSelf = false;
    for (const t of this.Conditions) {
      t.Tick();
      this.ResultSelf ||= t.Result;
    }
  }
  OnClear() {
    this.HasSignaled = false;
    for (const t of this.Conditions) {
      t.Clear();
    }
    this.Conditions.length = 0;
  }
  HandleServerDebugInfo(i) {
    this.ResultServer = i[this.Index];
    var s = this.Conditions.length;
    for (let t = 0; t < s; t++) {
      this.Conditions[t].HandleServerDebugInfo(i);
    }
  }
  OnSignaled() {
    this.ResultSelf = false;
    for (const t of this.Conditions) {
      this.ResultSelf ||= t.Result;
    }
    this.Signaled();
  }
  ToString(i, s = 0) {
    super.ToString(i, s);
    i.Append(`或
`);
    var e = this.Conditions.length;
    for (let t = 0; t < e; t++) {
      this.Conditions[t].ToString(i, s + 1);
    }
  }
}
exports.AiStateMachineConditionOr = AiStateMachineConditionOr;
//# sourceMappingURL=AiStateMachineConditionOr.js.map