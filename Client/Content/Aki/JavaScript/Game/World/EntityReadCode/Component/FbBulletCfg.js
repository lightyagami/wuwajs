"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBulletCfg = undefined;
const UnionBulletCreateConditionHelper_1 = require("./UnionBulletCreateConditionHelper");
class FbBulletCfg {
  constructor(t) {
    this.FbDataInternal = t;
    this.g2h = false;
    this.f2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBulletCfg(t);
    }
  }
  get CreateConditions() {
    if (!this.g2h) {
      this.g2h = true;
      this.f2h = new Array();
      var e = this.FbDataInternal.createConditionsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.createConditionsType(t);
          var r = UnionBulletCreateConditionHelper_1.UnionBulletCreateConditionHelper.GetUnionBulletCreateConditionObject(i);
          if (r && (i = UnionBulletCreateConditionHelper_1.UnionBulletCreateConditionHelper.ReadUnionBulletCreateCondition(i, this.FbDataInternal.createConditions(t, r))) !== undefined) {
            this.f2h.push(i);
          }
        }
      }
    }
    return this.f2h;
  }
}
exports.FbBulletCfg = FbBulletCfg;
//# sourceMappingURL=FbBulletCfg.js.map