"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterPerformConfig = undefined;
const UnionMonsterShowOnDeathConfigHelper_1 = require("./UnionMonsterShowOnDeathConfigHelper");
class FbMonsterPerformConfig {
  constructor(e) {
    this.FbDataInternal = e;
    this.g8h = false;
    this.f8h = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbMonsterPerformConfig(e);
    }
  }
  get ShowOnDeath() {
    var e;
    var t;
    if (!this.g8h && (this.g8h = true, e = this.FbDataInternal.showOnDeathType(), t = UnionMonsterShowOnDeathConfigHelper_1.UnionMonsterShowOnDeathConfigHelper.GetUnionMonsterShowOnDeathConfigObject(e))) {
      this.f8h = UnionMonsterShowOnDeathConfigHelper_1.UnionMonsterShowOnDeathConfigHelper.ReadUnionMonsterShowOnDeathConfig(e, this.FbDataInternal.showOnDeath(t));
    }
    return this.f8h;
  }
}
exports.FbMonsterPerformConfig = FbMonsterPerformConfig;
//# sourceMappingURL=FbMonsterPerformConfig.js.map