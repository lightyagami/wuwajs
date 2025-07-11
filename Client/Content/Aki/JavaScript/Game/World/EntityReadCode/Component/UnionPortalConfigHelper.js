"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPortalConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDynamicPortal_1 = require("./FbDynamicPortal");
const FbStaticPortal_1 = require("./FbStaticPortal");
class UnionPortalConfigHelper {
  static GetUnionPortalConfigObject(t) {
    switch (t) {
      case fb_component_1.UnionPortalConfig.DynamicPortal:
        return new fb_component_1.DynamicPortal();
      case fb_component_1.UnionPortalConfig.StaticPortal:
        return new fb_component_1.StaticPortal();
      default:
        return;
    }
  }
  static ReadUnionPortalConfig(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_component_1.UnionPortalConfig.DynamicPortal:
          return FbDynamicPortal_1.FbDynamicPortal.Create(e);
        case fb_component_1.UnionPortalConfig.StaticPortal:
          return FbStaticPortal_1.FbStaticPortal.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionPortalConfigHelper = UnionPortalConfigHelper;
//# sourceMappingURL=UnionPortalConfigHelper.js.map