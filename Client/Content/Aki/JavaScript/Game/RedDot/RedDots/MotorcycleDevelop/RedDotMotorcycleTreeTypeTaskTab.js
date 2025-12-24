"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleTreeTypeTaskTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleTreeTypeTaskTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotCanGetTaskReward(e);
  }
}
exports.RedDotMotorcycleTreeTypeTaskTab = RedDotMotorcycleTreeTypeTaskTab;
//# sourceMappingURL=RedDotMotorcycleTreeTypeTaskTab.js.map