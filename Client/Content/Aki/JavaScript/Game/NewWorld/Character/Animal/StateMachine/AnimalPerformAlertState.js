"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformAlertState = undefined;
const puerts_1 = require("puerts");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformAlertState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(e) {
    if (this.EcologicalInterface?.IsValid()) {
      if (e === 0) {
        this.AnimalEcologicalInterface.StateMachineInitializationComplete();
      }
      this.EcologicalInterface.AlertStart();
      e = (0, puerts_1.$ref)(undefined);
      this.EcologicalInterface.GetCurrentActionTime(e);
      this.ActionTime = (0, puerts_1.$unref)(e);
    }
  }
  OnUpdate(e) {}
  OnExit(e) {
    if (this.EcologicalInterface?.IsValid()) {
      this.EcologicalInterface.AlertEnd();
    }
  }
}
exports.AnimalPerformAlertState = AnimalPerformAlertState;
//# sourceMappingURL=AnimalPerformAlertState.js.map