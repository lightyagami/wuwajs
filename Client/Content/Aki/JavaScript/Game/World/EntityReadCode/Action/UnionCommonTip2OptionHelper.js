"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCommonTip2OptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCommonTip2PrepareCountdown_1 = require("./FbCommonTip2PrepareCountdown");
class UnionCommonTip2OptionHelper {
  static GetUnionCommonTip2OptionObject(o) {
    if (o === fb_action_1.UnionCommonTip2Option.CommonTip2PrepareCountdown) {
      return new fb_action_1.CommonTip2PrepareCountdown();
    }
  }
  static ReadUnionCommonTip2Option(o, n) {
    if (n !== undefined && o === fb_action_1.UnionCommonTip2Option.CommonTip2PrepareCountdown) {
      return FbCommonTip2PrepareCountdown_1.FbCommonTip2PrepareCountdown.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionCommonTip2OptionHelper = UnionCommonTip2OptionHelper;
//# sourceMappingURL=UnionCommonTip2OptionHelper.js.map