"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbRewardRefreshConfig = void 0;
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRewardRefreshConfig {
  constructor(e) {
    this.FbDataInternal = e, this.cxc = !1, this.uxc = void 0, this.dxc = !1, this.mxc = 0
  }
  static Create(e) {
    if (e) return new FbRewardRefreshConfig(e)
  }
  get RefreshType() {
    var e, s;
    return !this.cxc && (this.cxc = !0, e = this.FbDataInternal.refreshTypeType(), s = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(e)) && (this.uxc = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(e, this.FbDataInternal.refreshType(s))), this.uxc
  }
  get MaxCount() {
    return this.dxc || (this.dxc = !0, this.mxc = this.FbDataInternal.maxCount()), this.mxc
  }
}
exports.FbRewardRefreshConfig = FbRewardRefreshConfig;
//# sourceMappingURL=FbRewardRefreshConfig.js.map