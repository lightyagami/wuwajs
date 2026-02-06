"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTrafficBlocked = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const VehicleStreamDefine_1 = require("../../Module/VehicleStream/VehicleStreamDefine");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTrafficBlocked extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var i = e;
    if (!i) {
      return false;
    }
    let a = undefined;
    switch (i.Target.Type) {
      case "Target":
        a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i.Target.EntityId);
        break;
      case "Self":
        a = ActorUtils_1.ActorUtils.GetEntityByActor(r);
    }
    return !!a && !!a.Entity?.Valid && !!(e = (e = a.Entity.GetComponent(340)) && e.GetVehicleTeamMember()) && ((e = e.GetBlockTarget()) !== undefined && (i.MatchTarget === undefined || (0, VehicleStreamDefine_1.checkObstacleDetectionTypeMatch)(i.MatchTarget, e)) ? i.IsBlocked : !i.IsBlocked);
  }
}
exports.LevelConditionCheckTrafficBlocked = LevelConditionCheckTrafficBlocked;
//# sourceMappingURL=LevelConditionCheckTrafficBlocked.js.map