"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorInitialState = undefined;
const FbActorInitialMontage_1 = require("./FbActorInitialMontage");
const FbActorLookAtData_1 = require("./FbActorLookAtData");
class FbActorInitialState {
  constructor(t) {
    this.FbDataInternal = t;
    this.JMh = false;
    this.ZMh = undefined;
    this.eEh = false;
    this.tEh = undefined;
    this.eq1 = false;
    this.tq1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorInitialState(t);
    }
  }
  get InitialMontage() {
    if (!this.JMh) {
      this.JMh = true;
      this.ZMh = FbActorInitialMontage_1.FbActorInitialMontage.Create(this.FbDataInternal.initialMontage());
    }
    return this.ZMh;
  }
  get InitialLookAt() {
    if (!this.eEh) {
      this.eEh = true;
      this.tEh = FbActorLookAtData_1.FbActorLookAtData.Create(this.FbDataInternal.initialLookAt());
    }
    return this.tEh;
  }
  get InitialEffects() {
    if (!this.eq1) {
      this.eq1 = true;
      this.tq1 = new Array();
      var i = this.FbDataInternal.initialEffectsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.tq1.push(this.FbDataInternal.initialEffects(t));
        }
      }
    }
    return this.tq1;
  }
}
exports.FbActorInitialState = FbActorInitialState;
//# sourceMappingURL=FbActorInitialState.js.map