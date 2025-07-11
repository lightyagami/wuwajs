"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEffectAreaConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbBuffArea_1 = require("./FbBuffArea");
class UnionEffectAreaConfigHelper {
  static GetUnionEffectAreaConfigObject(e) {
    if (e === fb_component_1.UnionEffectAreaConfig.BuffArea) {
      return new fb_component_1.BuffArea();
    }
  }
  static ReadUnionEffectAreaConfig(e, n) {
    if (n !== undefined && e === fb_component_1.UnionEffectAreaConfig.BuffArea) {
      return FbBuffArea_1.FbBuffArea.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionEffectAreaConfigHelper = UnionEffectAreaConfigHelper;
//# sourceMappingURL=UnionEffectAreaConfigHelper.js.map