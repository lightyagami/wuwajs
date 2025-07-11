"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionItemGetUiConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbItemGetUiConfigSpecialQuest_1 = require("./FbItemGetUiConfigSpecialQuest");
class UnionItemGetUiConfigHelper {
  static GetUnionItemGetUiConfigObject(e) {
    if (e === fb_action_1.UnionItemGetUiConfig.ItemGetUiConfigSpecialQuest) {
      return new fb_action_1.ItemGetUiConfigSpecialQuest();
    }
  }
  static ReadUnionItemGetUiConfig(e, t) {
    if (t !== undefined && e === fb_action_1.UnionItemGetUiConfig.ItemGetUiConfigSpecialQuest) {
      return FbItemGetUiConfigSpecialQuest_1.FbItemGetUiConfigSpecialQuest.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionItemGetUiConfigHelper = UnionItemGetUiConfigHelper;
//# sourceMappingURL=UnionItemGetUiConfigHelper.js.map