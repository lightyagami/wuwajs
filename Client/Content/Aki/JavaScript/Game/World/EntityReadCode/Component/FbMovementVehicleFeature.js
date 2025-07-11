"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMovementVehicleFeature = undefined;
const FbMovementPerformConfig_1 = require("./FbMovementPerformConfig");
class FbMovementVehicleFeature {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.nHl = false;
    this.sHl = 0;
    this.n7l = false;
    this.s7l = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbMovementVehicleFeature(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MoveSpline() {
    if (!this.nHl) {
      this.nHl = true;
      this.sHl = this.FbDataInternal.moveSpline();
    }
    return this.sHl;
  }
  get MovePerformConfig() {
    if (!this.n7l) {
      this.n7l = true;
      this.s7l = FbMovementPerformConfig_1.FbMovementPerformConfig.Create(this.FbDataInternal.movePerformConfig());
    }
    return this.s7l;
  }
}
exports.FbMovementVehicleFeature = FbMovementVehicleFeature;
//# sourceMappingURL=FbMovementVehicleFeature.js.map