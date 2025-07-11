"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformStateBase = undefined;
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
class AnimalPerformStateBase extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.EcologicalInterface = undefined;
    this.ActionTime = -0;
  }
  get AnimalEcologicalInterface() {
    return this.EcologicalInterface;
  }
  set AnimalEcologicalInterface(e) {
    this.EcologicalInterface = e;
  }
  OnCreate(e) {
    this.EcologicalInterface = e;
  }
  OnDestroy() {
    this.AnimalEcologicalInterface = undefined;
    this.StateMachine = undefined;
  }
  GetActionTime() {
    return this.ActionTime ?? 0;
  }
}
exports.AnimalPerformStateBase = AnimalPerformStateBase;
//# sourceMappingURL=AnimalPerformStateBase.js.map