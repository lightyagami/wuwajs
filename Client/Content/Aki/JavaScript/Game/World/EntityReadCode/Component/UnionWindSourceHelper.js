"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionWindSourceHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbWindDirectional_1 = require("./FbWindDirectional");
class UnionWindSourceHelper {
  static GetUnionWindSourceObject(e) {
    if (e === fb_component_1.UnionWindSource.WindDirectional) {
      return new fb_component_1.WindDirectional();
    }
  }
  static ReadUnionWindSource(e, n) {
    if (n !== undefined && e === fb_component_1.UnionWindSource.WindDirectional) {
      return FbWindDirectional_1.FbWindDirectional.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionWindSourceHelper = UnionWindSourceHelper;
//# sourceMappingURL=UnionWindSourceHelper.js.map