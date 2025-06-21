"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSetupMoraleSystem = void 0;
class FbSetupMoraleSystem {
  constructor(t) {
    this.FbDataInternal = t, this.ER1 = !1, this.IR1 = 0, this.pb1 = !1, this.vb1 = !1
  }
  static Create(t) {
    if (t) return new FbSetupMoraleSystem(t)
  }
  get MoralePlayId() {
    return this.ER1 || (this.ER1 = !0, this.IR1 = this.FbDataInternal.moralePlayId()), this.IR1
  }
  get IsOn() {
    return this.pb1 || (this.pb1 = !0, this.vb1 = this.FbDataInternal.isOn()), this.vb1
  }
}
exports.FbSetupMoraleSystem = FbSetupMoraleSystem;
//# sourceMappingURL=FbSetupMoraleSystem.js.map