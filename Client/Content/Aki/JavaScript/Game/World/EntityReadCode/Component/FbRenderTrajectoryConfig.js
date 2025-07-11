"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenderTrajectoryConfig = undefined;
class FbRenderTrajectoryConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Fph = false;
    this.Nph = 0;
    this.sUh = false;
    this.aUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRenderTrajectoryConfig(t);
    }
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get Effect() {
    if (!this.sUh) {
      this.sUh = true;
      this.aUh = this.FbDataInternal.effect();
    }
    return this.aUh;
  }
}
exports.FbRenderTrajectoryConfig = FbRenderTrajectoryConfig;
//# sourceMappingURL=FbRenderTrajectoryConfig.js.map