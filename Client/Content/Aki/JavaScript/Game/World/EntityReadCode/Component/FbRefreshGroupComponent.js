"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRefreshGroupComponent = undefined;
const FbStateChangeConfig_1 = require("./FbStateChangeConfig");
const UnionRefreshContentHelper_1 = require("./UnionRefreshContentHelper");
const UnionRefreshRuleHelper_1 = require("./UnionRefreshRuleHelper");
class FbRefreshGroupComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.V1h = false;
    this.j1h = undefined;
    this.SBh = false;
    this.MBh = undefined;
    this.KDh = false;
    this.$Dh = undefined;
    this.EBh = false;
    this.IBh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRefreshGroupComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var t = this.FbDataInternal.entityIdsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          this.j1h.push(this.FbDataInternal.entityIds(e));
        }
      }
    }
    return this.j1h;
  }
  get RefreshContent() {
    var e;
    var t;
    if (!this.SBh && (this.SBh = true, e = this.FbDataInternal.refreshContentType(), t = UnionRefreshContentHelper_1.UnionRefreshContentHelper.GetUnionRefreshContentObject(e))) {
      this.MBh = UnionRefreshContentHelper_1.UnionRefreshContentHelper.ReadUnionRefreshContent(e, this.FbDataInternal.refreshContent(t));
    }
    return this.MBh;
  }
  get RefreshRule() {
    var e;
    var t;
    if (!this.KDh && (this.KDh = true, e = this.FbDataInternal.refreshRuleType(), t = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.GetUnionRefreshRuleObject(e))) {
      this.$Dh = UnionRefreshRuleHelper_1.UnionRefreshRuleHelper.ReadUnionRefreshRule(e, this.FbDataInternal.refreshRule(t));
    }
    return this.$Dh;
  }
  get StateChangeConfig() {
    if (!this.EBh) {
      this.EBh = true;
      this.IBh = FbStateChangeConfig_1.FbStateChangeConfig.Create(this.FbDataInternal.stateChangeConfig());
    }
    return this.IBh;
  }
}
exports.FbRefreshGroupComponent = FbRefreshGroupComponent;
//# sourceMappingURL=FbRefreshGroupComponent.js.map