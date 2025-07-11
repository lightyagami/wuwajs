"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSplineMoveTargetHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbEntitySplineMoveTarget_1 = require("./FbEntitySplineMoveTarget");
const FbPlayerSplineMoveTarget_1 = require("./FbPlayerSplineMoveTarget");
class UnionSplineMoveTargetHelper {
  static GetUnionSplineMoveTargetObject(e) {
    switch (e) {
      case fb_action_1.UnionSplineMoveTarget.EntitySplineMoveTarget:
        return new fb_action_1.EntitySplineMoveTarget();
      case fb_action_1.UnionSplineMoveTarget.PlayerSplineMoveTarget:
        return new fb_action_1.PlayerSplineMoveTarget();
      default:
        return;
    }
  }
  static ReadUnionSplineMoveTarget(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionSplineMoveTarget.EntitySplineMoveTarget:
          return FbEntitySplineMoveTarget_1.FbEntitySplineMoveTarget.Create(t);
        case fb_action_1.UnionSplineMoveTarget.PlayerSplineMoveTarget:
          return FbPlayerSplineMoveTarget_1.FbPlayerSplineMoveTarget.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionSplineMoveTargetHelper = UnionSplineMoveTargetHelper;
//# sourceMappingURL=UnionSplineMoveTargetHelper.js.map