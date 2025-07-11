"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTurntableControllerHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFixedAngleTurntable_1 = require("./FbFixedAngleTurntable");
const FbFreeAngleTurntable_1 = require("./FbFreeAngleTurntable");
class UnionTurntableControllerHelper {
  static GetUnionTurntableControllerObject(e) {
    switch (e) {
      case fb_component_1.UnionTurntableController.FixedAngleTurntable:
        return new fb_component_1.FixedAngleTurntable();
      case fb_component_1.UnionTurntableController.FreeAngleTurntable:
        return new fb_component_1.FreeAngleTurntable();
      default:
        return;
    }
  }
  static ReadUnionTurntableController(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionTurntableController.FixedAngleTurntable:
          return FbFixedAngleTurntable_1.FbFixedAngleTurntable.Create(n);
        case fb_component_1.UnionTurntableController.FreeAngleTurntable:
          return FbFreeAngleTurntable_1.FbFreeAngleTurntable.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionTurntableControllerHelper = UnionTurntableControllerHelper;
//# sourceMappingURL=UnionTurntableControllerHelper.js.map