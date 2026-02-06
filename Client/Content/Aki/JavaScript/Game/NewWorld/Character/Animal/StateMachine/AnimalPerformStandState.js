"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformStandState = undefined;
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformStandState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(t) {
    if (this.EcologicalInterface?.IsValid()) {
      this.EcologicalInterface.NoneStateStart();
    }
  }
  OnExit(t) {
    if (this.EcologicalInterface?.IsValid()) {
      this.Owner.GetComponent(209)?.SetInteractionState(false, "AnimalPerformStandState OnExit");
      this.EcologicalInterface.NoneStateEnd();
    }
  }
}
exports.AnimalPerformStandState = AnimalPerformStandState;
//# sourceMappingURL=AnimalPerformStandState.js.map