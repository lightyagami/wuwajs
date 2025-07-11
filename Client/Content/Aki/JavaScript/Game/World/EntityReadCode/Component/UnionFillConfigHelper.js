"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionFillConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDirectionFill_1 = require("./FbDirectionFill");
const FbFixedFill_1 = require("./FbFixedFill");
class UnionFillConfigHelper {
  static GetUnionFillConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionFillConfig.DirectionFill:
        return new fb_component_1.DirectionFill();
      case fb_component_1.UnionFillConfig.FixedFill:
        return new fb_component_1.FixedFill();
      default:
        return;
    }
  }
  static ReadUnionFillConfig(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionFillConfig.DirectionFill:
          return FbDirectionFill_1.FbDirectionFill.Create(n);
        case fb_component_1.UnionFillConfig.FixedFill:
          return FbFixedFill_1.FbFixedFill.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionFillConfigHelper = UnionFillConfigHelper;
//# sourceMappingURL=UnionFillConfigHelper.js.map