"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbInteractPointIconConfig = void 0;
class FbInteractPointIconConfig {
  constructor(t) {
    this.FbDataInternal = t, this.xB1 = !1, this.DB1 = 0
  }
  static Create(t) {
    if (t) return new FbInteractPointIconConfig(t)
  }
  get MaxShowDistance() {
    return this.xB1 || (this.xB1 = !0, this.DB1 = this.FbDataInternal.maxShowDistance()), this.DB1
  }
}
exports.FbInteractPointIconConfig = FbInteractPointIconConfig;
//# sourceMappingURL=FbInteractPointIconConfig.js.map