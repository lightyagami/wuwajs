"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetupMoraleSystem = undefined;
class FbSetupMoraleSystem {
  constructor(t) {
    this.FbDataInternal = t;
    this.XR1 = false;
    this.YR1 = 0;
    this.Wb1 = false;
    this.Qb1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetupMoraleSystem(t);
    }
  }
  get MoralePlayId() {
    if (!this.XR1) {
      this.XR1 = true;
      this.YR1 = this.FbDataInternal.moralePlayId();
    }
    return this.YR1;
  }
  get IsOn() {
    if (!this.Wb1) {
      this.Wb1 = true;
      this.Qb1 = this.FbDataInternal.isOn();
    }
    return this.Qb1;
  }
}
exports.FbSetupMoraleSystem = FbSetupMoraleSystem;
//# sourceMappingURL=FbSetupMoraleSystem.js.map