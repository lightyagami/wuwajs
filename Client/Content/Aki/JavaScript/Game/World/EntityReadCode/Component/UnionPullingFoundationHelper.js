"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPullingFoundationHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPullingCategoryMatchingFoundation_1 = require("./FbPullingCategoryMatchingFoundation");
class UnionPullingFoundationHelper {
  static GetUnionPullingFoundationObject(n) {
    if (n === fb_component_1.UnionPullingFoundation.PullingCategoryMatchingFoundation) {
      return new fb_component_1.PullingCategoryMatchingFoundation();
    }
  }
  static ReadUnionPullingFoundation(n, o) {
    if (o !== undefined && n === fb_component_1.UnionPullingFoundation.PullingCategoryMatchingFoundation) {
      return FbPullingCategoryMatchingFoundation_1.FbPullingCategoryMatchingFoundation.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionPullingFoundationHelper = UnionPullingFoundationHelper;
//# sourceMappingURL=UnionPullingFoundationHelper.js.map