"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbParkourPointLayerConfig = undefined;
class FbParkourPointLayerConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.V9h = false;
    this.j9h = 0;
    this.H9h = false;
    this.W9h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbParkourPointLayerConfig(t);
    }
  }
  get Width() {
    if (!this.V9h) {
      this.V9h = true;
      this.j9h = this.FbDataInternal.width();
    }
    return this.j9h;
  }
  get Length() {
    if (!this.H9h) {
      this.H9h = true;
      this.W9h = this.FbDataInternal.length();
    }
    return this.W9h;
  }
}
exports.FbParkourPointLayerConfig = FbParkourPointLayerConfig;
//# sourceMappingURL=FbParkourPointLayerConfig.js.map