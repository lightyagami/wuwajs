"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSyncVarToActorState = undefined;
class FbSyncVarToActorState {
  constructor(t) {
    this.FbDataInternal = t;
    this.qph = false;
    this.kph = undefined;
    this.Gph = false;
    this.Oph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSyncVarToActorState(t);
    }
  }
  get VarName() {
    if (!this.qph) {
      this.qph = true;
      this.kph = this.FbDataInternal.varName();
    }
    return this.kph;
  }
  get StateKey() {
    if (!this.Gph) {
      this.Gph = true;
      this.Oph = this.FbDataInternal.stateKey();
    }
    return this.Oph;
  }
}
exports.FbSyncVarToActorState = FbSyncVarToActorState;
//# sourceMappingURL=FbSyncVarToActorState.js.map