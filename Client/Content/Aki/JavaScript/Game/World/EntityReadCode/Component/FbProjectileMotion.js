"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbProjectileMotion = undefined;
const FbSpeedCurveMotion_1 = require("./FbSpeedCurveMotion");
class FbProjectileMotion {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x2h = false;
    this.R2h = 0;
    this.U2h = false;
    this.D2h = 0;
    this.N2h = false;
    this.V2h = undefined;
    this.j2h = false;
    this.H2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbProjectileMotion(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Velocity() {
    if (!this.x2h) {
      this.x2h = true;
      this.R2h = this.FbDataInternal.velocity();
    }
    return this.R2h;
  }
  get AngularVelocity() {
    if (!this.U2h) {
      this.U2h = true;
      this.D2h = this.FbDataInternal.angularVelocity();
    }
    return this.D2h;
  }
  get CameraShake() {
    if (!this.N2h) {
      this.N2h = true;
      this.V2h = this.FbDataInternal.cameraShake();
    }
    return this.V2h;
  }
  get MatchSpeedCurve() {
    if (!this.j2h) {
      this.j2h = true;
      this.H2h = FbSpeedCurveMotion_1.FbSpeedCurveMotion.Create(this.FbDataInternal.matchSpeedCurve());
    }
    return this.H2h;
  }
}
exports.FbProjectileMotion = FbProjectileMotion;
//# sourceMappingURL=FbProjectileMotion.js.map