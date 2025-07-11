"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHoldCfg = undefined;
const FbHoldingTrackTarget_1 = require("./FbHoldingTrackTarget");
class FbHoldCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this.I2h = false;
    this.$8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHoldCfg(t);
    }
  }
  get TrackTarget() {
    if (!this.I2h) {
      this.I2h = true;
      this.$8o = FbHoldingTrackTarget_1.FbHoldingTrackTarget.Create(this.FbDataInternal.trackTarget());
    }
    return this.$8o;
  }
}
exports.FbHoldCfg = FbHoldCfg;
//# sourceMappingURL=FbHoldCfg.js.map