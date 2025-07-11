"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerMatchConfig = undefined;
const UnionEntityMatchHelper_1 = require("./UnionEntityMatchHelper");
class FbTriggerMatchConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.gFh = false;
    this.fFh = undefined;
    this.iXh = false;
    this.rXh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerMatchConfig(t);
    }
  }
  get EntityMatch() {
    var t;
    var i;
    if (!this.gFh && (this.gFh = true, t = this.FbDataInternal.entityMatchType(), i = UnionEntityMatchHelper_1.UnionEntityMatchHelper.GetUnionEntityMatchObject(t))) {
      this.fFh = UnionEntityMatchHelper_1.UnionEntityMatchHelper.ReadUnionEntityMatch(t, this.FbDataInternal.entityMatch(i));
    }
    return this.fFh;
  }
  get EntityMatchCount() {
    if (!this.iXh) {
      this.iXh = true;
      this.rXh = this.FbDataInternal.entityMatchCount();
    }
    return this.rXh;
  }
}
exports.FbTriggerMatchConfig = FbTriggerMatchConfig;
//# sourceMappingURL=FbTriggerMatchConfig.js.map