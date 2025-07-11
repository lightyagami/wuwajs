"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionThrowMotionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCircumnutation_1 = require("./FbCircumnutation");
const FbProjectileMotion_1 = require("./FbProjectileMotion");
const FbThrowMotionLevitate_1 = require("./FbThrowMotionLevitate");
const FbThrowMotionTrackTarget_1 = require("./FbThrowMotionTrackTarget");
class UnionThrowMotionHelper {
  static GetUnionThrowMotionObject(o) {
    switch (o) {
      case fb_component_1.UnionThrowMotion.Circumnutation:
        return new fb_component_1.Circumnutation();
      case fb_component_1.UnionThrowMotion.ProjectileMotion:
        return new fb_component_1.ProjectileMotion();
      case fb_component_1.UnionThrowMotion.ThrowMotionLevitate:
        return new fb_component_1.ThrowMotionLevitate();
      case fb_component_1.UnionThrowMotion.ThrowMotionTrackTarget:
        return new fb_component_1.ThrowMotionTrackTarget();
      default:
        return;
    }
  }
  static ReadUnionThrowMotion(o, e) {
    if (e !== undefined) {
      switch (o) {
        case fb_component_1.UnionThrowMotion.Circumnutation:
          return FbCircumnutation_1.FbCircumnutation.Create(e);
        case fb_component_1.UnionThrowMotion.ProjectileMotion:
          return FbProjectileMotion_1.FbProjectileMotion.Create(e);
        case fb_component_1.UnionThrowMotion.ThrowMotionLevitate:
          return FbThrowMotionLevitate_1.FbThrowMotionLevitate.Create(e);
        case fb_component_1.UnionThrowMotion.ThrowMotionTrackTarget:
          return FbThrowMotionTrackTarget_1.FbThrowMotionTrackTarget.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionThrowMotionHelper = UnionThrowMotionHelper;
//# sourceMappingURL=UnionThrowMotionHelper.js.map