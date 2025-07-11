"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCombinationTriggerShapeHelper = undefined;
const fb_shape_1 = require("../../../../Game/World/EntityFb/fb-shape");
const FbBoxTriggerShape_1 = require("./FbBoxTriggerShape");
const FbSphereTriggerShape_1 = require("./FbSphereTriggerShape");
class UnionCombinationTriggerShapeHelper {
  static GetUnionCombinationTriggerShapeObject(e) {
    switch (e) {
      case fb_shape_1.UnionCombinationTriggerShape.BoxTriggerShape:
        return new fb_shape_1.BoxTriggerShape();
      case fb_shape_1.UnionCombinationTriggerShape.SphereTriggerShape:
        return new fb_shape_1.SphereTriggerShape();
      default:
        return;
    }
  }
  static ReadUnionCombinationTriggerShape(e, r) {
    if (r !== undefined) {
      switch (e) {
        case fb_shape_1.UnionCombinationTriggerShape.BoxTriggerShape:
          return FbBoxTriggerShape_1.FbBoxTriggerShape.Create(r);
        case fb_shape_1.UnionCombinationTriggerShape.SphereTriggerShape:
          return FbSphereTriggerShape_1.FbSphereTriggerShape.Create(r);
        default:
          return;
      }
    }
  }
}
exports.UnionCombinationTriggerShapeHelper = UnionCombinationTriggerShapeHelper;
//# sourceMappingURL=UnionCombinationTriggerShapeHelper.js.map