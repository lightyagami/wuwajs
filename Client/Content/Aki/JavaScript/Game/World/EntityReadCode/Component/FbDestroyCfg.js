"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyCfg = undefined;
const UnionTeleControlDestroyConditionHelper_1 = require("./UnionTeleControlDestroyConditionHelper");
class FbDestroyCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDestroyCfg(t);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var e = this.FbDataInternal.conditionsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.conditionsType(t);
          var i = UnionTeleControlDestroyConditionHelper_1.UnionTeleControlDestroyConditionHelper.GetUnionTeleControlDestroyConditionObject(o);
          if (i && (o = UnionTeleControlDestroyConditionHelper_1.UnionTeleControlDestroyConditionHelper.ReadUnionTeleControlDestroyCondition(o, this.FbDataInternal.conditions(t, i))) !== undefined) {
            this.rch.push(o);
          }
        }
      }
    }
    return this.rch;
  }
}
exports.FbDestroyCfg = FbDestroyCfg;
//# sourceMappingURL=FbDestroyCfg.js.map