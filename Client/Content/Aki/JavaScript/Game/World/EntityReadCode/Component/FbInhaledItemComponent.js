"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhaledItemComponent = undefined;
const FbInhaledPerformance_1 = require("./FbInhaledPerformance");
const UnionInhaledPerResultTypeHelper_1 = require("./UnionInhaledPerResultTypeHelper");
class FbInhaledItemComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.sYh = false;
    this.aYh = 0;
    this.hYh = false;
    this.lYh = 0;
    this._Yh = false;
    this.cYh = undefined;
    this.uYh = false;
    this.dYh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbInhaledItemComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InhaledStrength() {
    if (!this.sYh) {
      this.sYh = true;
      this.aYh = this.FbDataInternal.inhaledStrength();
    }
    return this.aYh;
  }
  get InhaledInterruptionRecoveryTime() {
    if (!this.hYh) {
      this.hYh = true;
      this.lYh = this.FbDataInternal.inhaledInterruptionRecoveryTime();
    }
    return this.lYh;
  }
  get InhaledPerformance() {
    if (!this._Yh) {
      this._Yh = true;
      this.cYh = FbInhaledPerformance_1.FbInhaledPerformance.Create(this.FbDataInternal.inhaledPerformance());
    }
    return this.cYh;
  }
  get InhaledPerResult() {
    var e;
    var t;
    if (!this.uYh && (this.uYh = true, e = this.FbDataInternal.inhaledPerResultType(), t = UnionInhaledPerResultTypeHelper_1.UnionInhaledPerResultTypeHelper.GetUnionInhaledPerResultTypeObject(e))) {
      this.dYh = UnionInhaledPerResultTypeHelper_1.UnionInhaledPerResultTypeHelper.ReadUnionInhaledPerResultType(e, this.FbDataInternal.inhaledPerResult(t));
    }
    return this.dYh;
  }
}
exports.FbInhaledItemComponent = FbInhaledItemComponent;
//# sourceMappingURL=FbInhaledItemComponent.js.map