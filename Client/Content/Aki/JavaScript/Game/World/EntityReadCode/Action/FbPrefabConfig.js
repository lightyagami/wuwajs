"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPrefabConfig = undefined;
class FbPrefabConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sAh = false;
    this.aAh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPrefabConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PrefabId() {
    if (!this.sAh) {
      this.sAh = true;
      this.aAh = this.FbDataInternal.prefabId();
    }
    return this.aAh;
  }
}
exports.FbPrefabConfig = FbPrefabConfig;
//# sourceMappingURL=FbPrefabConfig.js.map