"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckSystemState = undefined;
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityEncircleController_1 = require("../../Module/Activity/ActivityContent/Encircle/ActivityEncircleController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSystemState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var t = e.Config;
    switch (t.Type) {
      case ICondition_1.ECheckSystemStateType.TrackMoonBuilding:
        var n = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(t.BuildingId);
        return t.IsBuilt === n.IsBuild;
      case ICondition_1.ECheckSystemStateType.EncircleLevelComplete:
        n = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
        if (n) {
          return t.IsCompleted === n.CheckChallengeComplete(t.EncircleLevelId);
        } else {
          return false;
        }
      case ICondition_1.ECheckSystemStateType.SpringFestivalAtmosphereLevel:
        return ModelManager_1.ModelManager.SpringManorModel.GetAtmosphereLevel() >= t.AtmosphereLevel;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckSystemState = LevelConditionCheckSystemState;
//# sourceMappingURL=LevelConditionCheckSystemState.js.map