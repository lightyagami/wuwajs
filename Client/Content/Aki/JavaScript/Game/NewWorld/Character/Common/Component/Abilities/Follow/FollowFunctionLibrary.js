"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowFunctionLibrary = undefined;
const IComponent_1 = require("../../../../../../../UniverseEditor/Interface/IComponent");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const IFollow_1 = require("./IFollow");
class FollowFunctionLibrary {
  static GetPlayerFollowHandler(o, r) {
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(o)?.GetComponent(237)?.GetOrCreateHandler(r);
  }
  static GetPlayerFollowShooter(o) {
    return FollowFunctionLibrary.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.GetFollowShooter();
  }
  static SetPlayerFollowShooterEnable(o, r) {
    FollowFunctionLibrary.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.SetFollowShooterEnable(r, "FollowFunctionLibrary");
  }
  static IsFollowShooterEnable(o) {
    return !!FollowFunctionLibrary.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.FollowShooter)?.IsFollowShooterEnable();
  }
  static GetPlayerFollowVehicle(o, r) {
    o = FollowFunctionLibrary.GetPlayerFollowHandler(o, IFollow_1.EPlayerFollowerHandlerType.Vehicle)?.GetPlayerFollowVehicle(r);
    if (o) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    }
  }
  static IsFollowingPlayer(o, r) {
    for (const e in IFollow_1.EPlayerFollowerHandlerType) {
      if (!isNaN(Number(e))) {
        var l = Number(e);
        if (FollowFunctionLibrary.GetPlayerFollowHandler(r, l)?.HasFollower(o)) {
          return true;
        }
      }
    }
    return false;
  }
  static IsFollowShooter(o) {
    if (o.Entity) {
      return !!o.Entity?.GetComponent(234);
    } else {
      return !!(o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o.PbDataId)) && !!(0, IComponent_1.getComponent)(o.ComponentsData, "FollowShooterComponent");
    }
  }
}
exports.FollowFunctionLibrary = FollowFunctionLibrary;
//# sourceMappingURL=FollowFunctionLibrary.js.map