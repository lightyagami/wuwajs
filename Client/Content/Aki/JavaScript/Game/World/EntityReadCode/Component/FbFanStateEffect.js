"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFanStateEffect = undefined;
const FbFanEffectConfig_1 = require("./FbFanEffectConfig");
class FbFanStateEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this._vh = false;
    this.cvh = undefined;
    this.hQh = false;
    this.lQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFanStateEffect(t);
    }
  }
  get EntityState() {
    if (!this._vh) {
      this._vh = true;
      this.cvh = this.FbDataInternal.entityState();
    }
    return this.cvh;
  }
  get EffectConfig() {
    if (!this.hQh) {
      this.hQh = true;
      this.lQh = FbFanEffectConfig_1.FbFanEffectConfig.Create(this.FbDataInternal.effectConfig());
    }
    return this.lQh;
  }
}
exports.FbFanStateEffect = FbFanStateEffect;
//# sourceMappingURL=FbFanStateEffect.js.map