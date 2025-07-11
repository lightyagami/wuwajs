"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRefreshComponent = undefined;
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRefreshComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.KDh = false;
    this.$Dh = undefined;
    this.XDh = false;
    this.YDh = false;
  }
  static Create(e) {
    if (e) {
      return new FbRefreshComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get RefreshRule() {
    var e;
    var s;
    if (!this.KDh && (this.KDh = true, e = this.FbDataInternal.refreshRuleType(), s = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(e))) {
      this.$Dh = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(e, this.FbDataInternal.refreshRule(s));
    }
    return this.$Dh;
  }
  get IsDisableRefreshAfterDroppingReward() {
    if (!this.XDh) {
      this.XDh = true;
      this.YDh = this.FbDataInternal.isDisableRefreshAfterDroppingReward();
    }
    return this.YDh;
  }
}
exports.FbRefreshComponent = FbRefreshComponent;
//# sourceMappingURL=FbRefreshComponent.js.map