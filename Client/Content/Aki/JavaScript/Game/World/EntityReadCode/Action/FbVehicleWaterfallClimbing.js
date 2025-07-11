"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleWaterfallClimbing = undefined;
const FbVehicleWaterfallClimbGravityConfig_1 = require("./FbVehicleWaterfallClimbGravityConfig");
class FbVehicleWaterfallClimbing {
  constructor(i) {
    this.FbDataInternal = i;
    this.kuh = false;
    this.Guh = 0;
    this.fX_ = false;
    this.gX_ = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbVehicleWaterfallClimbing(i);
    }
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get ChangeGravity() {
    if (!this.fX_) {
      this.fX_ = true;
      this.gX_ = FbVehicleWaterfallClimbGravityConfig_1.FbVehicleWaterfallClimbGravityConfig.Create(this.FbDataInternal.changeGravity());
    }
    return this.gX_;
  }
}
exports.FbVehicleWaterfallClimbing = FbVehicleWaterfallClimbing;
//# sourceMappingURL=FbVehicleWaterfallClimbing.js.map