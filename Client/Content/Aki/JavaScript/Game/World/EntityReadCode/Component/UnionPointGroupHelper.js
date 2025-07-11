"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPointGroupHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPointGroupByLayer_1 = require("./FbPointGroupByLayer");
class UnionPointGroupHelper {
  static GetUnionPointGroupObject(o) {
    if (o === fb_component_1.UnionPointGroup.PointGroupByLayer) {
      return new fb_component_1.PointGroupByLayer();
    }
  }
  static ReadUnionPointGroup(o, e) {
    if (e !== undefined && o === fb_component_1.UnionPointGroup.PointGroupByLayer) {
      return FbPointGroupByLayer_1.FbPointGroupByLayer.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionPointGroupHelper = UnionPointGroupHelper;
//# sourceMappingURL=UnionPointGroupHelper.js.map