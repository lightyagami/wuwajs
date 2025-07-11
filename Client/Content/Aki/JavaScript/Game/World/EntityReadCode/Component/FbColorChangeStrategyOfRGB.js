"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbColorChangeStrategyOfRGB = undefined;
class FbColorChangeStrategyOfRGB {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.D5h = false;
    this.B5h = undefined;
    this.q5h = false;
    this.k5h = undefined;
    this.G5h = false;
    this.O5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbColorChangeStrategyOfRGB(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BlueState() {
    if (!this.D5h) {
      this.D5h = true;
      this.B5h = this.FbDataInternal.blueState();
    }
    return this.B5h;
  }
  get YellowState() {
    if (!this.q5h) {
      this.q5h = true;
      this.k5h = this.FbDataInternal.yellowState();
    }
    return this.k5h;
  }
  get RedState() {
    if (!this.G5h) {
      this.G5h = true;
      this.O5h = this.FbDataInternal.redState();
    }
    return this.O5h;
  }
}
exports.FbColorChangeStrategyOfRGB = FbColorChangeStrategyOfRGB;
//# sourceMappingURL=FbColorChangeStrategyOfRGB.js.map