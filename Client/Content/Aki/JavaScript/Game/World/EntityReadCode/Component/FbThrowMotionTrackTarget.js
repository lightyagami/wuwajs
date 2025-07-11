"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbThrowMotionTrackTarget = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbThrowMotionTrackTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x2h = false;
    this.R2h = 0;
    this.w2h = false;
    this.P2h = undefined;
    this.Y2h = false;
    this.z2h = undefined;
    this.U2h = false;
    this.D2h = 0;
    this.k2h = false;
    this.G2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbThrowMotionTrackTarget(t);
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
  get VelocityCurve() {
    if (!this.w2h) {
      this.w2h = true;
      this.P2h = this.FbDataInternal.velocityCurve();
    }
    return this.P2h;
  }
  get VelocityOffset() {
    if (!this.Y2h) {
      this.Y2h = true;
      this.z2h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.velocityOffset());
    }
    return this.z2h;
  }
  get AngularVelocity() {
    if (!this.U2h) {
      this.U2h = true;
      this.D2h = this.FbDataInternal.angularVelocity();
    }
    return this.D2h;
  }
  get AngularVelocityCurve() {
    if (!this.k2h) {
      this.k2h = true;
      this.G2h = this.FbDataInternal.angularVelocityCurve();
    }
    return this.G2h;
  }
}
exports.FbThrowMotionTrackTarget = FbThrowMotionTrackTarget;
//# sourceMappingURL=FbThrowMotionTrackTarget.js.map