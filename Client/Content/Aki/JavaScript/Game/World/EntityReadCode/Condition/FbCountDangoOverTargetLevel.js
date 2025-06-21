"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbCountDangoOverTargetLevel = void 0;
class FbCountDangoOverTargetLevel {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.jC1 = !1, this.HC1 = 0, this.$C1 = !1, this.WC1 = 0
  }
  static Create(t) {
    if (t) return new FbCountDangoOverTargetLevel(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get TargetNumber() {
    return this.jC1 || (this.jC1 = !0, this.HC1 = this.FbDataInternal.targetNumber()), this.HC1
  }
  get TargetLevel() {
    return this.$C1 || (this.$C1 = !0, this.WC1 = this.FbDataInternal.targetLevel()), this.WC1
  }
}
exports.FbCountDangoOverTargetLevel = FbCountDangoOverTargetLevel;
//# sourceMappingURL=FbCountDangoOverTargetLevel.js.map