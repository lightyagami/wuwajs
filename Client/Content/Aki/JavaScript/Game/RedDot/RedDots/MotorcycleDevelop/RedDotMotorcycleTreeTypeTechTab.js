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
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate, EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate];
  }
  OnCheck(e) {
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(e);
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasUpgradableTechNode(e);
    return t || e;
  }
}
exports.RedDotMotorcycleTreeTypeTechTab = RedDotMotorcycleTreeTypeTechTab;
//# sourceMappingURL=RedDotMotorcycleTreeTypeTechTab.js.map