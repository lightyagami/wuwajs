"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAngularConstraintMotionHelper = undefined;
const fb_physics_1 = require("../../../../Game/World/EntityFb/fb-physics");
const FbAcmFree_1 = require("./FbAcmFree");
const FbAcmLimited_1 = require("./FbAcmLimited");
const FbAcmLocked_1 = require("./FbAcmLocked");
class UnionAngularConstraintMotionHelper {
  static GetUnionAngularConstraintMotionObject(e) {
    switch (e) {
      case fb_physics_1.UnionAngularConstraintMotion.AcmFree:
        return new fb_physics_1.AcmFree();
      case fb_physics_1.UnionAngularConstraintMotion.AcmLimited:
        return new fb_physics_1.AcmLimited();
      case fb_physics_1.UnionAngularConstraintMotion.AcmLocked:
        return new fb_physics_1.AcmLocked();
      default:
        return;
    }
  }
  static ReadUnionAngularConstraintMotion(e, s) {
    if (s !== undefined) {
      switch (e) {
        case fb_physics_1.UnionAngularConstraintMotion.AcmFree:
          return FbAcmFree_1.FbAcmFree.Create(s);
        case fb_physics_1.UnionAngularConstraintMotion.AcmLimited:
          return FbAcmLimited_1.FbAcmLimited.Create(s);
        case fb_physics_1.UnionAngularConstraintMotion.AcmLocked:
          return FbAcmLocked_1.FbAcmLocked.Create(s);
        default:
          return;
      }
    }
  }
}
exports.UnionAngularConstraintMotionHelper = UnionAngularConstraintMotionHelper;
//# sourceMappingURL=UnionAngularConstraintMotionHelper.js.map