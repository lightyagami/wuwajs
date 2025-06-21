"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbActorInitialState = void 0;
const FbActorInitialMontage_1 = require("./FbActorInitialMontage"),
  FbActorLookAtData_1 = require("./FbActorLookAtData");
class FbActorInitialState {
  constructor(t) {
    this.FbDataInternal = t, this.JMh = !1, this.ZMh = void 0, this.eEh = !1, this.tEh = void 0, this.EO1 = !1, this.IO1 = void 0
  }
  static Create(t) {
    if (t) return new FbActorInitialState(t)
  }
  get InitialMontage() {
    return this.JMh || (this.JMh = !0, this.ZMh = FbActorInitialMontage_1.FbActorInitialMontage.Create(this.FbDataInternal.initialMontage())), this.ZMh
  }
  get InitialLookAt() {
    return this.eEh || (this.eEh = !0, this.tEh = FbActorLookAtData_1.FbActorLookAtData.Create(this.FbDataInternal.initialLookAt())), this.tEh
  }
  get InitialEffects() {
    if (!this.EO1) {
      this.EO1 = !0, this.IO1 = new Array;
      var i = this.FbDataInternal.initialEffectsLength();
      if (i)
        for (let t = 0; t < i; ++t) this.IO1.push(this.FbDataInternal.initialEffects(t))
    }
    return this.IO1
  }
}
exports.FbActorInitialState = FbActorInitialState;
//# sourceMappingURL=FbActorInitialState.js.map