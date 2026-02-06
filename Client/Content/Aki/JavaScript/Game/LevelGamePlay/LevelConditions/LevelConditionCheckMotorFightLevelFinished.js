"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckMotorFightLevelFinished = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckMotorFightLevelFinished extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a;
    var l;
    return !!e.LimitParams && (a = Number(e.LimitParams.get("ActivityId")), e = Number(e.LimitParams.get("LevelId")), !!a && !!e && !!(a = ModelManager_1.ModelManager.ActivityModel.GetActivityById(a)) && !!(l = a.GetLevelDataById(e))) && l.IsFinished;
  }
}
exports.LevelConditionCheckMotorFightLevelFinished = LevelConditionCheckMotorFightLevelFinished;
//# sourceMappingURL=LevelConditionCheckMotorFightLevelFinished.js.map