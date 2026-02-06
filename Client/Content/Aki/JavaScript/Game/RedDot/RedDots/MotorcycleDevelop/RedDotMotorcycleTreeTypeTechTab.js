"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleTreeTypeTechTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleTreeTypeTechTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasUpgradableTechNode(e);
  }
}
exports.RedDotMotorcycleTreeTypeTechTab = RedDotMotorcycleTreeTypeTechTab;
//# sourceMappingURL=RedDotMotorcycleTreeTypeTechTab.js.map