"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleTaskTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleTaskTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotCanGetTaskReward();
  }
}
exports.RedDotMotorcycleTaskTab = RedDotMotorcycleTaskTab;
//# sourceMappingURL=RedDotMotorcycleTaskTab.js.map