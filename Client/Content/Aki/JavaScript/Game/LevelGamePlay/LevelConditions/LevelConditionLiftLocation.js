"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionLiftLocation = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionLiftLocation extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    let t = undefined;
    if (e.IsSelf) {
      if (r) {
        t = ActorUtils_1.ActorUtils.GetEntityByActor(r);
      }
    } else {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
    }
    return !!t?.Valid && !!(r = t.Entity.GetComponent(140)) && (r = r.CurLiftFloor === e.Location, e.Compare === "Eq" ? r : !r);
  }
}
exports.LevelConditionLiftLocation = LevelConditionLiftLocation;
//# sourceMappingURL=LevelConditionLiftLocation.js.map