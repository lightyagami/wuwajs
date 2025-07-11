"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionMovementModeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSplineMove_1 = require("./FbSplineMove");
class UnionMovementModeHelper {
  static GetUnionMovementModeObject(e) {
    if (e === fb_component_1.UnionMovementMode.SplineMove) {
      return new fb_component_1.SplineMove();
    }
  }
  static ReadUnionMovementMode(e, o) {
    if (o !== undefined && e === fb_component_1.UnionMovementMode.SplineMove) {
      return FbSplineMove_1.FbSplineMove.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionMovementModeHelper = UnionMovementModeHelper;
//# sourceMappingURL=UnionMovementModeHelper.js.map