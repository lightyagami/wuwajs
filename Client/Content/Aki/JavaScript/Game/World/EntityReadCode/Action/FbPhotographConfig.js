"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhotographConfig = undefined;
class FbPhotographConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Idh = false;
    this.Tdh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPhotographConfig(t);
    }
  }
  get PhotoTargets() {
    if (!this.Idh) {
      this.Idh = true;
      this.Tdh = new Array();
      var s = this.FbDataInternal.photoTargetsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Tdh.push(this.FbDataInternal.photoTargets(t));
        }
      }
    }
    return this.Tdh;
  }
}
exports.FbPhotographConfig = FbPhotographConfig;
//# sourceMappingURL=FbPhotographConfig.js.map