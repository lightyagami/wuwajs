"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNewSplineMoveTargetHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbNpcNewSplineMoveTarget_1 = require("./FbNpcNewSplineMoveTarget");
const FbPlayerNewSplineMoveTarget_1 = require("./FbPlayerNewSplineMoveTarget");
const FbSceneItemNewSplineMoveTarget_1 = require("./FbSceneItemNewSplineMoveTarget");
const FbVehicleNewSplineMoveTarget_1 = require("./FbVehicleNewSplineMoveTarget");
class UnionNewSplineMoveTargetHelper {
  static GetUnionNewSplineMoveTargetObject(e) {
    switch (e) {
      case fb_action_1.UnionNewSplineMoveTarget.NpcNewSplineMoveTarget:
        return new fb_action_1.NpcNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.PlayerNewSplineMoveTarget:
        return new fb_action_1.PlayerNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.SceneItemNewSplineMoveTarget:
        return new fb_action_1.SceneItemNewSplineMoveTarget();
      case fb_action_1.UnionNewSplineMoveTarget.VehicleNewSplineMoveTarget:
        return new fb_action_1.VehicleNewSplineMoveTarget();
      default:
        return;
    }
  }
  static ReadUnionNewSplineMoveTarget(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionNewSplineMoveTarget.NpcNewSplineMoveTarget:
          return FbNpcNewSplineMoveTarget_1.FbNpcNewSplineMoveTarget.Create(t);
        case fb_action_1.UnionNewSplineMoveTarget.PlayerNewSplineMoveTarget:
          return FbPlayerNewSplineMoveTarget_1.FbPlayerNewSplineMoveTarget.Create(t);
        case fb_action_1.UnionNewSplineMoveTarget.SceneItemNewSplineMoveTarget:
          return FbSceneItemNewSplineMoveTarget_1.FbSceneItemNewSplineMoveTarget.Create(t);
        case fb_action_1.UnionNewSplineMoveTarget.VehicleNewSplineMoveTarget:
          return FbVehicleNewSplineMoveTarget_1.FbVehicleNewSplineMoveTarget.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionNewSplineMoveTargetHelper = UnionNewSplineMoveTargetHelper;
//# sourceMappingURL=UnionNewSplineMoveTargetHelper.js.map