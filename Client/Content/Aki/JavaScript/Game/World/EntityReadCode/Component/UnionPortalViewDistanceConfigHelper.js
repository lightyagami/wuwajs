"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPortalViewDistanceConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCustomViewDistance_1 = require("./FbCustomViewDistance");
const FbHighViewDistance_1 = require("./FbHighViewDistance");
const FbLowViewDistance_1 = require("./FbLowViewDistance");
const FbMidViewDistance_1 = require("./FbMidViewDistance");
class UnionPortalViewDistanceConfigHelper {
  static GetUnionPortalViewDistanceConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionPortalViewDistanceConfig.CustomViewDistance:
        return new fb_component_1.CustomViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.HighViewDistance:
        return new fb_component_1.HighViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.LowViewDistance:
        return new fb_component_1.LowViewDistance();
      case fb_component_1.UnionPortalViewDistanceConfig.MidViewDistance:
        return new fb_component_1.MidViewDistance();
      default:
        return;
    }
  }
  static ReadUnionPortalViewDistanceConfig(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionPortalViewDistanceConfig.CustomViewDistance:
          return FbCustomViewDistance_1.FbCustomViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.HighViewDistance:
          return FbHighViewDistance_1.FbHighViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.LowViewDistance:
          return FbLowViewDistance_1.FbLowViewDistance.Create(n);
        case fb_component_1.UnionPortalViewDistanceConfig.MidViewDistance:
          return FbMidViewDistance_1.FbMidViewDistance.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionPortalViewDistanceConfigHelper = UnionPortalViewDistanceConfigHelper;
//# sourceMappingURL=UnionPortalViewDistanceConfigHelper.js.map