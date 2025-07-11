"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionColorChangeStrategyOfSplineEffectHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbColorChangeStrategyOfRGB_1 = require("./FbColorChangeStrategyOfRGB");
class UnionColorChangeStrategyOfSplineEffectHelper {
  static GetUnionColorChangeStrategyOfSplineEffectObject(e) {
    if (e === fb_component_1.UnionColorChangeStrategyOfSplineEffect.ColorChangeStrategyOfRGB) {
      return new fb_component_1.ColorChangeStrategyOfRGB();
    }
  }
  static ReadUnionColorChangeStrategyOfSplineEffect(e, t) {
    if (t !== undefined && e === fb_component_1.UnionColorChangeStrategyOfSplineEffect.ColorChangeStrategyOfRGB) {
      return FbColorChangeStrategyOfRGB_1.FbColorChangeStrategyOfRGB.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionColorChangeStrategyOfSplineEffectHelper = UnionColorChangeStrategyOfSplineEffectHelper;
//# sourceMappingURL=UnionColorChangeStrategyOfSplineEffectHelper.js.map