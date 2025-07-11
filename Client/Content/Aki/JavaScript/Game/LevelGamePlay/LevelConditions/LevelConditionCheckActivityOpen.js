"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckActivityOpen = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckActivityOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return !!e.LimitParams && !!(e = Number(e.LimitParams.get("ActivityId"))) && (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) !== undefined && !e.CheckIfClose();
  }
}
exports.LevelConditionCheckActivityOpen = LevelConditionCheckActivityOpen;
//# sourceMappingURL=LevelConditionCheckActivityOpen.js.map