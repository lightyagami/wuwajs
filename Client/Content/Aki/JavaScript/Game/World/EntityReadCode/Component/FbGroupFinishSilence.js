"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGroupFinishSilence = undefined;
const FbEntityState_1 = require("./FbEntityState");
class FbGroupFinishSilence {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$Oh = false;
    this.XOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGroupFinishSilence(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SwitchSpecifiedStatus() {
    if (!this.$Oh) {
      this.$Oh = true;
      this.XOh = FbEntityState_1.FbEntityState.Create(this.FbDataInternal.switchSpecifiedStatus());
    }
    return this.XOh;
  }
}
exports.FbGroupFinishSilence = FbGroupFinishSilence;
//# sourceMappingURL=FbGroupFinishSilence.js.map