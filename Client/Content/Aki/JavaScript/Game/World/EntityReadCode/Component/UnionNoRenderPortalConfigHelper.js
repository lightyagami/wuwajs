"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNoRenderPortalConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbStaticNoRenderPortal_1 = require("./FbStaticNoRenderPortal");
class UnionNoRenderPortalConfigHelper {
  static GetUnionNoRenderPortalConfigObject(e) {
    if (e === fb_component_1.UnionNoRenderPortalConfig.StaticNoRenderPortal) {
      return new fb_component_1.StaticNoRenderPortal();
    }
  }
  static ReadUnionNoRenderPortalConfig(e, o) {
    if (o !== undefined && e === fb_component_1.UnionNoRenderPortalConfig.StaticNoRenderPortal) {
      return FbStaticNoRenderPortal_1.FbStaticNoRenderPortal.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionNoRenderPortalConfigHelper = UnionNoRenderPortalConfigHelper;
//# sourceMappingURL=UnionNoRenderPortalConfigHelper.js.map