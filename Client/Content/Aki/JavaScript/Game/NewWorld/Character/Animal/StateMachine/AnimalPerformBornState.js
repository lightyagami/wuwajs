"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformBornState = undefined;
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformBornState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnStart() {
    var t = this.Owner.GetComponent(0);
    WaitEntityTask_1.WaitEntityTask.Create("AnimalPerformBornState.OnStart", t.GetCreatureDataId(), t => {
      if (t && ObjectSystem_1.ObjectSystem.IsValid(this.Owner)) {
        this.Owner.GetComponent(205).AddTag(1900394806);
        this.StateMachine.Switch(1);
      }
    });
  }
}
exports.AnimalPerformBornState = AnimalPerformBornState;
//# sourceMappingURL=AnimalPerformBornState.js.map