"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckLordGymFinishCondition = undefined;
class FbCheckLordGymFinishCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Kzh = false;
    this.$zh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckLordGymFinishCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LordGymId() {
    if (!this.Kzh) {
      this.Kzh = true;
      this.$zh = this.FbDataInternal.lordGymId();
    }
    return this.$zh;
  }
}
exports.FbCheckLordGymFinishCondition = FbCheckLordGymFinishCondition;
//# sourceMappingURL=FbCheckLordGymFinishCondition.js.map