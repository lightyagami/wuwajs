"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTeleportToAndEnterVehicleTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbTeleportToAndEnterFishingBoat_1 = require("./FbTeleportToAndEnterFishingBoat");
class UnionTeleportToAndEnterVehicleTypeHelper {
  static GetUnionTeleportToAndEnterVehicleTypeObject(e) {
    if (e === fb_action_1.UnionTeleportToAndEnterVehicleType.TeleportToAndEnterFishingBoat) {
      return new fb_action_1.TeleportToAndEnterFishingBoat();
    }
  }
  static ReadUnionTeleportToAndEnterVehicleType(e, t) {
    if (t !== undefined && e === fb_action_1.UnionTeleportToAndEnterVehicleType.TeleportToAndEnterFishingBoat) {
      return FbTeleportToAndEnterFishingBoat_1.FbTeleportToAndEnterFishingBoat.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionTeleportToAndEnterVehicleTypeHelper = UnionTeleportToAndEnterVehicleTypeHelper;
//# sourceMappingURL=UnionTeleportToAndEnterVehicleTypeHelper.js.map