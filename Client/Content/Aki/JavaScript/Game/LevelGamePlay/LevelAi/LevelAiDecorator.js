"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecorator = undefined;
const LevelAiNode_1 = require("./LevelAiNode");
class LevelAiDecorator extends LevelAiNode_1.LevelAiNode {
  constructor() {
    super(...arguments);
    this.InverseCondition = false;
    this.NotifyExecutionStart = true;
    this.NotifyExecutionFinish = true;
    this.CheckConditionOnPlanEnter = true;
    this.CheckConditionOnPlanRecheck = true;
    this.CheckConditionOnTick = false;
    this.Params = undefined;
    this.pIe = 1;
  }
  Serialize(t, e, i, s) {
    super.Serialize(t, e, i);
    this.Params = s;
  }
  GetWorldStateProxy(t) {
    if (t === 0) {
      return this.CharacterPlanComponent.WorldStateProxy;
    } else {
      return this.CharacterPlanComponent.WorldState;
    }
  }
  WrappedExecutionStart() {
    if (this.NotifyExecutionStart) {
      this.OnExecutionStart();
    }
  }
  WrappedExecutionFinish(t) {
    if (this.NotifyExecutionFinish) {
      this.OnExecutionFinish(t);
    }
  }
  WrappedCheckCondition(t) {
    let e = 1;
    var i;
    if (this.vIe(t)) {
      i = this.CheckCondition(t);
      i = this.InverseCondition ? !i : i;
      e = i ? 1 : 0;
      this.pIe = e;
      this.PrintDescription("Check Condition", ["CheckResult", e]);
    } else if (t === 2) {
      e = this.pIe;
    }
    return e;
  }
  vIe(t) {
    switch (t) {
      case 0:
        return this.CheckConditionOnPlanEnter;
      case 1:
        return this.CheckConditionOnPlanRecheck;
      case 2:
        return this.CheckConditionOnTick;
      default:
        return false;
    }
  }
  NotifyEventBasedCondition(t) {
    var t = this.InverseCondition ? !t : t;
    this.pIe = t ? 1 : 0;
    var e = this.CharacterPlanComponent.FindActiveDecoratorInfo(this);
    return !!e && e.PlanInstance.NotifyEventBasedDecoratorCondition(this, t);
  }
  OnExecutionStart() {}
  OnExecutionFinish(t) {}
  CheckCondition(t) {
    return true;
  }
}
exports.LevelAiDecorator = LevelAiDecorator;
//# sourceMappingURL=LevelAiDecorator.js.map