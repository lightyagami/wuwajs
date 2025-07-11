"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomPrefabConfig = undefined;
class FbRandomPrefabConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hAh = false;
    this.lAh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRandomPrefabConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RandomPrefabId() {
    if (!this.hAh) {
      this.hAh = true;
      this.lAh = this.FbDataInternal.randomPrefabId();
    }
    return this.lAh;
  }
}
exports.FbRandomPrefabConfig = FbRandomPrefabConfig;
//# sourceMappingURL=FbRandomPrefabConfig.js.map