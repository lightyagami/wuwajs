"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExecRiskHarvestEffect = undefined;
class FbExecRiskHarvestEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
  }
  static Create(t) {
    if (t) {
      return new FbExecRiskHarvestEffect(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
}
exports.FbExecRiskHarvestEffect = FbExecRiskHarvestEffect;
//# sourceMappingURL=FbExecRiskHarvestEffect.js.map