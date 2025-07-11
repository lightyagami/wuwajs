"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDynamicPortalCreateHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDynamicPortalByBullet_1 = require("./FbDynamicPortalByBullet");
class UnionDynamicPortalCreateHelper {
  static GetUnionDynamicPortalCreateObject(e) {
    if (e === fb_component_1.UnionDynamicPortalCreate.DynamicPortalByBullet) {
      return new fb_component_1.DynamicPortalByBullet();
    }
  }
  static ReadUnionDynamicPortalCreate(e, t) {
    if (t !== undefined && e === fb_component_1.UnionDynamicPortalCreate.DynamicPortalByBullet) {
      return FbDynamicPortalByBullet_1.FbDynamicPortalByBullet.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionDynamicPortalCreateHelper = UnionDynamicPortalCreateHelper;
//# sourceMappingURL=UnionDynamicPortalCreateHelper.js.map