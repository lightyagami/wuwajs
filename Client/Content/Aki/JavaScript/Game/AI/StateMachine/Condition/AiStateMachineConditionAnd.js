"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionAnd = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionAnd extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Conditions = undefined;
  }
  OnInit(i) {
    var s = i.CondAnd.Conditions.length;
    if (s > 0) {
      this.Conditions = [];
      for (let t = 0; t < s; t++) {
        var e = i.CondAnd.Conditions[t];
        var n = this.Transition.ConditionDatas[e];
        var n = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(this.Transition, n, e, this);
        this.HasTaskFinishCondition ||= n.HasTaskFinishCondition;
        this.Conditions.push(n);
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
    this.ResultSelf = true;
    for (const t of this.Conditions) {
      t.Tick();
      this.ResultSelf &&= t.Result;
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
    this.ResultSelf = true;
    for (const t of this.Conditions) {
      this.ResultSelf &&= t.Result;
    }
    this.Signaled();
  }
  ToString(i, s = 0) {
    super.ToString(i, s);
    i.Append(`与
`);
    var e = this.Conditions.length;
    for (let t = 0; t < e; t++) {
      this.Conditions[t].ToString(i, s + 1);
    }
  }
}
exports.AiStateMachineConditionAnd = AiStateMachineConditionAnd;
//# sourceMappingURL=AiStateMachineConditionAnd.js.map