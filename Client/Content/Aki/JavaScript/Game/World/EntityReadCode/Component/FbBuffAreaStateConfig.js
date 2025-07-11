"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBuffAreaStateConfig = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbBuffAreaStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.Vph = false;
    this.jph = undefined;
    this.f_h = false;
    this.X6o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBuffAreaStateConfig(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var i = this.FbDataInternal.buffIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
        }
      }
    }
    return this.jph;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
}
exports.FbBuffAreaStateConfig = FbBuffAreaStateConfig;
//# sourceMappingURL=FbBuffAreaStateConfig.js.map