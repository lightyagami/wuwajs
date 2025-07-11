"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRewardRefreshConfig = undefined;
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRewardRefreshConfig {
  constructor(e) {
    this.FbDataInternal = e;
    this.cxc = false;
    this.uxc = undefined;
    this.dxc = false;
    this.mxc = 0;
  }
  static Create(e) {
    if (e) {
      return new FbRewardRefreshConfig(e);
    }
  }
  get RefreshType() {
    var e;
    var s;
    if (!this.cxc && (this.cxc = true, e = this.FbDataInternal.refreshTypeType(), s = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(e))) {
      this.uxc = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(e, this.FbDataInternal.refreshType(s));
    }
    return this.uxc;
  }
  get MaxCount() {
    if (!this.dxc) {
      this.dxc = true;
      this.mxc = this.FbDataInternal.maxCount();
    }
    return this.mxc;
  }
}
exports.FbRewardRefreshConfig = FbRewardRefreshConfig;
//# sourceMappingURL=FbRewardRefreshConfig.js.map