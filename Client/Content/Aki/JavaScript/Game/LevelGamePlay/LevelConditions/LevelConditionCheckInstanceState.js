"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckInstanceState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    if (!e.LimitParams) {
      return false;
    }
    var r = e.LimitParams.get("InstanceId");
    if (!r) {
      return false;
    }
    var t = parseInt(r);
    var r = e.LimitParams.get("State");
    switch (r ? parseInt(r) : 0) {
      case 1:
        return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(t);
      case 2:
        return !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(t);
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckInstanceState = LevelConditionCheckInstanceState;
//# sourceMappingURL=LevelConditionCheckInstanceState.js.map