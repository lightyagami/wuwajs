"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformInteractState = undefined;
const puerts_1 = require("puerts");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformInteractState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(t) {
    if (this.EcologicalInterface?.IsValid()) {
      if (t === 0) {
        this.AnimalEcologicalInterface.StateMachineInitializationComplete();
      }
      this.EcologicalInterface.InteractStart();
      t = (0, puerts_1.$ref)(undefined);
      this.EcologicalInterface.GetCurrentActionTime(t);
      this.ActionTime = (0, puerts_1.$unref)(t);
    }
  }
  OnExit(t) {
    var e;
    if (this.EcologicalInterface?.IsValid()) {
      if ((e = this.Owner.GetComponent(209)).HasTag(502364103)) {
        e.RemoveTag(502364103);
        e.AddTag(1900394806);
      }
      e.RemoveTag(351576188);
      this.Owner.GetComponent(201)?.SetInteractionState(true, "AnimalPerformInteractState OnExit");
      this.EcologicalInterface.InteractEnd();
    }
  }
}
exports.AnimalPerformInteractState = AnimalPerformInteractState;
//# sourceMappingURL=AnimalPerformInteractState.js.map