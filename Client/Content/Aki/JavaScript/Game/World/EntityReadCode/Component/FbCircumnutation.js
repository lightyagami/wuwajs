"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCircumnutation = undefined;
const FbRenderTrajectoryConfig_1 = require("./FbRenderTrajectoryConfig");
class FbCircumnutation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x2h = false;
    this.R2h = 0;
    this.w2h = false;
    this.P2h = undefined;
    this.tdh = false;
    this.idh = undefined;
    this.U2h = false;
    this.D2h = 0;
    this.B2h = false;
    this.q2h = 0;
    this.k2h = false;
    this.G2h = undefined;
    this.O2h = false;
    this.F2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCircumnutation(t);
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
  get Direction() {
    if (!this.tdh) {
      this.tdh = true;
      this.idh = this.FbDataInternal.direction();
    }
    return this.idh;
  }
  get AngularVelocity() {
    if (!this.U2h) {
      this.U2h = true;
      this.D2h = this.FbDataInternal.angularVelocity();
    }
    return this.D2h;
  }
  get RotationSpeed() {
    if (!this.B2h) {
      this.B2h = true;
      this.q2h = this.FbDataInternal.rotationSpeed();
    }
    return this.q2h;
  }
  get AngularVelocityCurve() {
    if (!this.k2h) {
      this.k2h = true;
      this.G2h = this.FbDataInternal.angularVelocityCurve();
    }
    return this.G2h;
  }
  get RenderTrajectoryConfig() {
    if (!this.O2h) {
      this.O2h = true;
      this.F2h = FbRenderTrajectoryConfig_1.FbRenderTrajectoryConfig.Create(this.FbDataInternal.renderTrajectoryConfig());
    }
    return this.F2h;
  }
}
exports.FbCircumnutation = FbCircumnutation;
//# sourceMappingURL=FbCircumnutation.js.map