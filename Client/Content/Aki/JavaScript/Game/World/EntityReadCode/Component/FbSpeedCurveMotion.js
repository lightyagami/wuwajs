"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpeedCurveMotion = undefined;
class FbSpeedCurveMotion {
  constructor(e) {
    this.FbDataInternal = e;
    this.W2h = false;
    this.j8o = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSpeedCurveMotion(e);
    }
  }
  get SpeedCurve() {
    if (!this.W2h) {
      this.W2h = true;
      this.j8o = this.FbDataInternal.speedCurve();
    }
    return this.j8o;
  }
}
exports.FbSpeedCurveMotion = FbSpeedCurveMotion;
//# sourceMappingURL=FbSpeedCurveMotion.js.map