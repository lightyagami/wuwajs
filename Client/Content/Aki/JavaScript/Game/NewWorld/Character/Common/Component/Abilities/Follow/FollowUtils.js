"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowUtils = undefined;
const IComponent_1 = require("../../../../../../../UniverseEditor/Interface/IComponent");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const IFollow_1 = require("./IFollow");
class FollowUtils {
  static GetPlayerFollowHandler(o, l) {
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(o)?.GetComponent(237)?.GetOrCreateHandler(l);
  }
  static GetPlayerFollowShooter(o) {
    return FollowUtils.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.GetFollowShooter();
  }
  static SetPlayerFollowShooterEnable(o, l, e = 1, r = "") {
    o = FollowUtils.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter);
    return !!o && o.SetFollowShooterEnable(l, e, "FollowUtils: " + r);
  }
  static IsFollowShooterEnable(o) {
    return !!FollowUtils.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.IsFollowShooterEnable();
  }
  static GetPlayerFollowVehicle(o, l) {
    o = FollowUtils.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.Vehicle)?.GetPlayerFollowVehicle(l);
    if (o) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    }
  }
  static IsFollowingPlayer(o, l) {
    for (const r in IFollow_1.EPlayerFollowerHandlerType) {
      if (!isNaN(Number(r))) {
        var e = Number(r);
        if (FollowUtils.GetPlayerFollowHandler(l, e)?.HasFollower(o)) {
          return true;
        }
      }
    }
    return false;
  }
  static IsFollowShooter(o) {
    if (o.Entity) {
      return !!o.Entity?.GetComponent(235);
    } else {
      return !!(o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o.PbDataId)) && !!(0, IComponent_1.getComponent)(o.ComponentsData, "FollowShooterComponent");
    }
  }
}
exports.FollowUtils = FollowUtils;
//# sourceMappingURL=FollowUtils.js.map