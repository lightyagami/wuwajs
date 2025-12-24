"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformBaseState = undefined;
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
class NpcPerformBaseState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.CreatureDataComp = undefined;
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.PerformComp = undefined;
    this.ConfigId = 0;
    this.InteractRequestWaiting = false;
    this.TmpTrans = Transform_1.Transform.Create();
    this.TmpVector = Vector_1.Vector.Create();
  }
  get TurnActionController() {
    return this.PerformComp?.TurnActionController;
  }
  OnCreate(t) {
    this.CreatureDataComp = this.Owner.Entity.GetComponent(0);
    this.ActorComp = this.Owner.Entity.GetComponent(2);
    this.PerformComp = this.Owner.Entity.GetComponent(197);
    this.ConfigId = this.CreatureDataComp.GetPbDataId();
    this.AnimComp = this.Owner.Entity.GetComponent(45);
  }
  OnPlayerInteractTurnActionStart() {}
  OnPlayerInteractTurnActionEnd() {}
  PlayMontage(t) {
    this.PerformComp.PlayPerformMontage(3, t);
  }
  StopMontage(t) {
    this.PerformComp.StopPerformMontage(3, t);
  }
}
exports.NpcPerformBaseState = NpcPerformBaseState;
//# sourceMappingURL=NpcPerformBaseState.js.map