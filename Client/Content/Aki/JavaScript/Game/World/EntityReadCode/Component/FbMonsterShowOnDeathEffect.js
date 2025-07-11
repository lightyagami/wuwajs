"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterShowOnDeathEffect = undefined;
class FbMonsterShowOnDeathEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.J6l = false;
    this.Z6l = 0;
  }
  static Create(t) {
    if (t) {
      return new FbMonsterShowOnDeathEffect(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EffectId() {
    if (!this.J6l) {
      this.J6l = true;
      this.Z6l = this.FbDataInternal.effectId();
    }
    return this.Z6l;
  }
}
exports.FbMonsterShowOnDeathEffect = FbMonsterShowOnDeathEffect;
//# sourceMappingURL=FbMonsterShowOnDeathEffect.js.map