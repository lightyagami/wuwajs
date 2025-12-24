"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCharacterVehicleTagByEvent = undefined;
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCharacterVehicleTagByEvent extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a, ...r) {
    var l;
    return !(r[2] >= r[3]) && !!(l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && ((r = r[0]) === l.Id || !!(l = Global_1.Global.BaseCharacter?.CharacterActorComponent) && !!(l = l.Entity.CheckGetComponent(242)) && r === l.VehicleEntity?.Id);
  }
}
exports.LevelConditionCheckCharacterVehicleTagByEvent = LevelConditionCheckCharacterVehicleTagByEvent;
//# sourceMappingURL=LevelConditionCheckCharacterVehicleTagByEvent.js.map