"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionRefreshRuleHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCdRefreshRule_1 = require("./FbCdRefreshRule");
const FbFixedDateTimeRefreshRule_1 = require("./FbFixedDateTimeRefreshRule");
const FbRandomNpcRule_1 = require("./FbRandomNpcRule");
class UnionRefreshRuleHelper {
  static GetUnionRefreshRuleObject(e) {
    switch (e) {
      case fb_component_1.UnionRefreshRule.CdRefreshRule:
        return new fb_component_1.CdRefreshRule();
      case fb_component_1.UnionRefreshRule.FixedDateTimeRefreshRule:
        return new fb_component_1.FixedDateTimeRefreshRule();
      case fb_component_1.UnionRefreshRule.RandomNpcRule:
        return new fb_component_1.RandomNpcRule();
      default:
        return;
    }
  }
  static ReadUnionRefreshRule(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionRefreshRule.CdRefreshRule:
          return FbCdRefreshRule_1.FbCdRefreshRule.Create(n);
        case fb_component_1.UnionRefreshRule.FixedDateTimeRefreshRule:
          return FbFixedDateTimeRefreshRule_1.FbFixedDateTimeRefreshRule.Create(n);
        case fb_component_1.UnionRefreshRule.RandomNpcRule:
          return FbRandomNpcRule_1.FbRandomNpcRule.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionRefreshRuleHelper = UnionRefreshRuleHelper;
//# sourceMappingURL=UnionRefreshRuleHelper.js.map