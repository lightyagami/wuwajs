"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckCalabashDevelopRewardCondition = undefined;
class FbCheckCalabashDevelopRewardCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Xzh = false;
    this.Yzh = 0;
    this.zzh = false;
    this.Jzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckCalabashDevelopRewardCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MonsterId() {
    if (!this.Xzh) {
      this.Xzh = true;
      this.Yzh = this.FbDataInternal.monsterId();
    }
    return this.Yzh;
  }
  get Develop() {
    if (!this.zzh) {
      this.zzh = true;
      this.Jzh = this.FbDataInternal.develop();
    }
    return this.Jzh;
  }
}
exports.FbCheckCalabashDevelopRewardCondition = FbCheckCalabashDevelopRewardCondition;
//# sourceMappingURL=FbCheckCalabashDevelopRewardCondition.js.map