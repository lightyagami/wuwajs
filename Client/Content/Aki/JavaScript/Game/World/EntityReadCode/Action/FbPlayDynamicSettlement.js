"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayDynamicSettlement = undefined;
const UnionDynamicSettlementConfigHelper_1 = require("./UnionDynamicSettlementConfigHelper");
class FbPlayDynamicSettlement {
  constructor(e) {
    this.FbDataInternal = e;
    this.kAh = false;
    this.GAh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPlayDynamicSettlement(e);
    }
  }
  get DynamicSettlementConfig() {
    var e;
    var t;
    if (!this.kAh && (this.kAh = true, e = this.FbDataInternal.dynamicSettlementConfigType(), t = UnionDynamicSettlementConfigHelper_1.UnionDynamicSettlementConfigHelper.GetUnionDynamicSettlementConfigObject(e))) {
      this.GAh = UnionDynamicSettlementConfigHelper_1.UnionDynamicSettlementConfigHelper.ReadUnionDynamicSettlementConfig(e, this.FbDataInternal.dynamicSettlementConfig(t));
    }
    return this.GAh;
  }
}
exports.FbPlayDynamicSettlement = FbPlayDynamicSettlement;
//# sourceMappingURL=FbPlayDynamicSettlement.js.map