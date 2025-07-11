"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleWaterfallClimbGravityConfig = undefined;
class FbVehicleWaterfallClimbGravityConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.tic = false;
    this.iic = 0;
    this.yUh = false;
    this.SUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleWaterfallClimbGravityConfig(t);
    }
  }
  get SafePositionEntityId() {
    if (!this.tic) {
      this.tic = true;
      this.iic = this.FbDataInternal.safePositionEntityId();
    }
    return this.iic;
  }
  get GravityDirection() {
    if (!this.yUh) {
      this.yUh = true;
      this.SUh = this.FbDataInternal.gravityDirection();
    }
    return this.SUh;
  }
}
exports.FbVehicleWaterfallClimbGravityConfig = FbVehicleWaterfallClimbGravityConfig;
//# sourceMappingURL=FbVehicleWaterfallClimbGravityConfig.js.map