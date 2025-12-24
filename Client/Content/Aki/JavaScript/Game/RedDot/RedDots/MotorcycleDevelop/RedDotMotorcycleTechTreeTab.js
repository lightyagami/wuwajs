"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleTechTreeTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleTechTreeTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate, EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate];
  }
  OnCheck(e) {
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasAnyNewTechTree();
    var n = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasUpgradableTechNode();
    return t || n;
  }
}
exports.RedDotMotorcycleTechTreeTab = RedDotMotorcycleTechTreeTab;
//# sourceMappingURL=RedDotMotorcycleTechTreeTab.js.map