"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSplineOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAirPassageSpline_1 = require("./FbAirPassageSpline");
const FbButterflySpline_1 = require("./FbButterflySpline");
const FbCommonSpline_1 = require("./FbCommonSpline");
const FbContinuesVariableSpeedMovementSpline_1 = require("./FbContinuesVariableSpeedMovementSpline");
const FbEffectSpline_1 = require("./FbEffectSpline");
const FbLevelAISpline_1 = require("./FbLevelAISpline");
const FbParkourSpline_1 = require("./FbParkourSpline");
const FbPatrolSpline_1 = require("./FbPatrolSpline");
const FbTimePatrolSpline_1 = require("./FbTimePatrolSpline");
class UnionSplineOptionHelper {
  static GetUnionSplineOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionSplineOption.AirPassageSpline:
        return new fb_component_1.AirPassageSpline();
      case fb_component_1.UnionSplineOption.ButterflySpline:
        return new fb_component_1.ButterflySpline();
      case fb_component_1.UnionSplineOption.CommonSpline:
        return new fb_component_1.CommonSpline();
      case fb_component_1.UnionSplineOption.ContinuesVariableSpeedMovementSpline:
        return new fb_component_1.ContinuesVariableSpeedMovementSpline();
      case fb_component_1.UnionSplineOption.EffectSpline:
        return new fb_component_1.EffectSpline();
      case fb_component_1.UnionSplineOption.LevelAISpline:
        return new fb_component_1.LevelAISpline();
      case fb_component_1.UnionSplineOption.ParkourSpline:
        return new fb_component_1.ParkourSpline();
      case fb_component_1.UnionSplineOption.PatrolSpline:
        return new fb_component_1.PatrolSpline();
      case fb_component_1.UnionSplineOption.TimePatrolSpline:
        return new fb_component_1.TimePatrolSpline();
      default:
        return;
    }
  }
  static ReadUnionSplineOption(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionSplineOption.AirPassageSpline:
          return FbAirPassageSpline_1.FbAirPassageSpline.Create(n);
        case fb_component_1.UnionSplineOption.ButterflySpline:
          return FbButterflySpline_1.FbButterflySpline.Create(n);
        case fb_component_1.UnionSplineOption.CommonSpline:
          return FbCommonSpline_1.FbCommonSpline.Create(n);
        case fb_component_1.UnionSplineOption.ContinuesVariableSpeedMovementSpline:
          return FbContinuesVariableSpeedMovementSpline_1.FbContinuesVariableSpeedMovementSpline.Create(n);
        case fb_component_1.UnionSplineOption.EffectSpline:
          return FbEffectSpline_1.FbEffectSpline.Create(n);
        case fb_component_1.UnionSplineOption.LevelAISpline:
          return FbLevelAISpline_1.FbLevelAISpline.Create(n);
        case fb_component_1.UnionSplineOption.ParkourSpline:
          return FbParkourSpline_1.FbParkourSpline.Create(n);
        case fb_component_1.UnionSplineOption.PatrolSpline:
          return FbPatrolSpline_1.FbPatrolSpline.Create(n);
        case fb_component_1.UnionSplineOption.TimePatrolSpline:
          return FbTimePatrolSpline_1.FbTimePatrolSpline.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionSplineOptionHelper = UnionSplineOptionHelper;
//# sourceMappingURL=UnionSplineOptionHelper.js.map