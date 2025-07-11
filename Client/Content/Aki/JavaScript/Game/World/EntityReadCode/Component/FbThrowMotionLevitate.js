"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbThrowMotionLevitate = undefined;
const FbRenderTrajectoryConfig_1 = require("./FbRenderTrajectoryConfig");
class FbThrowMotionLevitate {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x2h = false;
    this.R2h = 0;
    this.w2h = false;
    this.P2h = undefined;
    this.Q2h = false;
    this.K2h = 0;
    this.$2h = false;
    this.X2h = 0;
    this.O2h = false;
    this.F2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbThrowMotionLevitate(t);
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
  get MoveTime() {
    if (!this.Q2h) {
      this.Q2h = true;
      this.K2h = this.FbDataInternal.moveTime();
    }
    return this.K2h;
  }
  get RayRadius() {
    if (!this.$2h) {
      this.$2h = true;
      this.X2h = this.FbDataInternal.rayRadius();
    }
    return this.X2h;
  }
  get RenderTrajectoryConfig() {
    if (!this.O2h) {
      this.O2h = true;
      this.F2h = FbRenderTrajectoryConfig_1.FbRenderTrajectoryConfig.Create(this.FbDataInternal.renderTrajectoryConfig());
    }
    return this.F2h;
  }
}
exports.FbThrowMotionLevitate = FbThrowMotionLevitate;
//# sourceMappingURL=FbThrowMotionLevitate.js.map