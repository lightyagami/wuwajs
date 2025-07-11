"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionMontageConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbMontageAsset_1 = require("./FbMontageAsset");
const FbMontageRegistered_1 = require("./FbMontageRegistered");
class UnionMontageConfigHelper {
  static GetUnionMontageConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionMontageConfig.MontageAsset:
        return new fb_action_1.MontageAsset();
      case fb_action_1.UnionMontageConfig.MontageRegistered:
        return new fb_action_1.MontageRegistered();
      default:
        return;
    }
  }
  static ReadUnionMontageConfig(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionMontageConfig.MontageAsset:
          return FbMontageAsset_1.FbMontageAsset.Create(t);
        case fb_action_1.UnionMontageConfig.MontageRegistered:
          return FbMontageRegistered_1.FbMontageRegistered.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionMontageConfigHelper = UnionMontageConfigHelper;
//# sourceMappingURL=UnionMontageConfigHelper.js.map