"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFanEffectConfig = undefined;
class FbFanEffectConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.xEh = false;
    this.REh = undefined;
    this.mQh = false;
    this.CQh = 0;
    this.gQh = false;
    this.fQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFanEffectConfig(t);
    }
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get DefaultEffectLength() {
    if (!this.mQh) {
      this.mQh = true;
      this.CQh = this.FbDataInternal.defaultEffectLength();
    }
    return this.CQh;
  }
  get HitEffectPath() {
    if (!this.gQh) {
      this.gQh = true;
      this.fQh = this.FbDataInternal.hitEffectPath();
    }
    return this.fQh;
  }
}
exports.FbFanEffectConfig = FbFanEffectConfig;
//# sourceMappingURL=FbFanEffectConfig.js.map