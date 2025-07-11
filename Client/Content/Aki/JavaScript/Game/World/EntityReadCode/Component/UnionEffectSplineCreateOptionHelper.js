"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEffectSplineCreateOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEffectSplineEquidistantPointMode_1 = require("./FbEffectSplineEquidistantPointMode");
const FbEffectSplineWholeLineMode_1 = require("./FbEffectSplineWholeLineMode");
class UnionEffectSplineCreateOptionHelper {
  static GetUnionEffectSplineCreateOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionEffectSplineCreateOption.EffectSplineEquidistantPointMode:
        return new fb_component_1.EffectSplineEquidistantPointMode();
      case fb_component_1.UnionEffectSplineCreateOption.EffectSplineWholeLineMode:
        return new fb_component_1.EffectSplineWholeLineMode();
      default:
        return;
    }
  }
  static ReadUnionEffectSplineCreateOption(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionEffectSplineCreateOption.EffectSplineEquidistantPointMode:
          return FbEffectSplineEquidistantPointMode_1.FbEffectSplineEquidistantPointMode.Create(t);
        case fb_component_1.UnionEffectSplineCreateOption.EffectSplineWholeLineMode:
          return FbEffectSplineWholeLineMode_1.FbEffectSplineWholeLineMode.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionEffectSplineCreateOptionHelper = UnionEffectSplineCreateOptionHelper;
//# sourceMappingURL=UnionEffectSplineCreateOptionHelper.js.map