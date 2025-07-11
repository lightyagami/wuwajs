"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionHitConfig = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionHitConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.ich = false;
    this.rch = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConditionHitConfig(t);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.conditions());
    }
    return this.rch;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbConditionHitConfig = FbConditionHitConfig;
//# sourceMappingURL=FbConditionHitConfig.js.map