"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionExitVehicleTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbExitVehicleLaunch_1 = require("./FbExitVehicleLaunch");
const FbExitVehicleStandUp_1 = require("./FbExitVehicleStandUp");
const FbExitVehicleTeleport_1 = require("./FbExitVehicleTeleport");
class UnionExitVehicleTypeHelper {
  static GetUnionExitVehicleTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionExitVehicleType.ExitVehicleLaunch:
        return new fb_action_1.ExitVehicleLaunch();
      case fb_action_1.UnionExitVehicleType.ExitVehicleStandUp:
        return new fb_action_1.ExitVehicleStandUp();
      case fb_action_1.UnionExitVehicleType.ExitVehicleTeleport:
        return new fb_action_1.ExitVehicleTeleport();
      default:
        return;
    }
  }
  static ReadUnionExitVehicleType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionExitVehicleType.ExitVehicleLaunch:
          return FbExitVehicleLaunch_1.FbExitVehicleLaunch.Create(t);
        case fb_action_1.UnionExitVehicleType.ExitVehicleStandUp:
          return FbExitVehicleStandUp_1.FbExitVehicleStandUp.Create(t);
        case fb_action_1.UnionExitVehicleType.ExitVehicleTeleport:
          return FbExitVehicleTeleport_1.FbExitVehicleTeleport.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionExitVehicleTypeHelper = UnionExitVehicleTypeHelper;
//# sourceMappingURL=UnionExitVehicleTypeHelper.js.map