"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionControlTrackingTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbControlTrackingOther_1 = require("./FbControlTrackingOther");
const FbControlTrackingSelf_1 = require("./FbControlTrackingSelf");
class UnionControlTrackingTypeHelper {
  static GetUnionControlTrackingTypeObject(r) {
    switch (r) {
      case fb_action_1.UnionControlTrackingType.ControlTrackingOther:
        return new fb_action_1.ControlTrackingOther();
      case fb_action_1.UnionControlTrackingType.ControlTrackingSelf:
        return new fb_action_1.ControlTrackingSelf();
      default:
        return;
    }
  }
  static ReadUnionControlTrackingType(r, e) {
    if (e !== undefined) {
      switch (r) {
        case fb_action_1.UnionControlTrackingType.ControlTrackingOther:
          return FbControlTrackingOther_1.FbControlTrackingOther.Create(e);
        case fb_action_1.UnionControlTrackingType.ControlTrackingSelf:
          return FbControlTrackingSelf_1.FbControlTrackingSelf.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionControlTrackingTypeHelper = UnionControlTrackingTypeHelper;
//# sourceMappingURL=UnionControlTrackingTypeHelper.js.map