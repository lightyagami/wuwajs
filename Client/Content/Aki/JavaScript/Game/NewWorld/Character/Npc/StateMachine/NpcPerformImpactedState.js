"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformImpactedState = undefined;
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformImpactedState extends NpcPerformBaseState_1.NpcPerformBaseState {
  OnEnter(e) {
    this.Owner.Entity.GetComponent(199)?.StopPerformMontage(3, {
      Method: 0,
      BlendOutTime: 0
    });
  }
}
exports.NpcPerformImpactedState = NpcPerformImpactedState;
//# sourceMappingURL=NpcPerformImpactedState.js.map