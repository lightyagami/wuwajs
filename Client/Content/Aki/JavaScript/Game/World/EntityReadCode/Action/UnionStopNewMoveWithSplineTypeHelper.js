"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionStopNewMoveWithSplineTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbStopNewMoveWithSplineAtCurrentPos_1 = require("./FbStopNewMoveWithSplineAtCurrentPos");
const FbStopNewMoveWithSplineAtEndPoint_1 = require("./FbStopNewMoveWithSplineAtEndPoint");
const FbStopNewMoveWithSplineAtStartPoint_1 = require("./FbStopNewMoveWithSplineAtStartPoint");
const FbStopNewMoveWithSplineAtTargetPoint_1 = require("./FbStopNewMoveWithSplineAtTargetPoint");
class UnionStopNewMoveWithSplineTypeHelper {
  static GetUnionStopNewMoveWithSplineTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtCurrentPos:
        return new fb_action_1.StopNewMoveWithSplineAtCurrentPos();
      case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtEndPoint:
        return new fb_action_1.StopNewMoveWithSplineAtEndPoint();
      case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtStartPoint:
        return new fb_action_1.StopNewMoveWithSplineAtStartPoint();
      case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtTargetPoint:
        return new fb_action_1.StopNewMoveWithSplineAtTargetPoint();
      default:
        return;
    }
  }
  static ReadUnionStopNewMoveWithSplineType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtCurrentPos:
          return FbStopNewMoveWithSplineAtCurrentPos_1.FbStopNewMoveWithSplineAtCurrentPos.Create(t);
        case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtEndPoint:
          return FbStopNewMoveWithSplineAtEndPoint_1.FbStopNewMoveWithSplineAtEndPoint.Create(t);
        case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtStartPoint:
          return FbStopNewMoveWithSplineAtStartPoint_1.FbStopNewMoveWithSplineAtStartPoint.Create(t);
        case fb_action_1.UnionStopNewMoveWithSplineType.StopNewMoveWithSplineAtTargetPoint:
          return FbStopNewMoveWithSplineAtTargetPoint_1.FbStopNewMoveWithSplineAtTargetPoint.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionStopNewMoveWithSplineTypeHelper = UnionStopNewMoveWithSplineTypeHelper;
//# sourceMappingURL=UnionStopNewMoveWithSplineTypeHelper.js.map