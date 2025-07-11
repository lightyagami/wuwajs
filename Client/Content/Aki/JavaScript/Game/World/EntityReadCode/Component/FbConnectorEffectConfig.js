"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConnectorEffectConfig = undefined;
class FbConnectorEffectConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.xEh = false;
    this.REh = undefined;
    this.p$h = false;
    this.v$h = undefined;
    this.y$h = false;
    this.S$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConnectorEffectConfig(t);
    }
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get StartPoint() {
    if (!this.p$h) {
      this.p$h = true;
      this.v$h = this.FbDataInternal.startPoint();
    }
    return this.v$h;
  }
  get EndPoint() {
    if (!this.y$h) {
      this.y$h = true;
      this.S$h = this.FbDataInternal.endPoint();
    }
    return this.S$h;
  }
}
exports.FbConnectorEffectConfig = FbConnectorEffectConfig;
//# sourceMappingURL=FbConnectorEffectConfig.js.map