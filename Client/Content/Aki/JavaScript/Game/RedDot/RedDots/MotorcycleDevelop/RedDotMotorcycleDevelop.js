"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDevelop = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDevelop extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionMotorDevelop";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, EventDefine_1.EEventName.MotorDevelopTaskUpdate, EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate, EventDefine_1.EEventName.MotorDiyInfoUpdate, EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasLevelUpReward() || ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasAnyNewTechTree() || ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasUpgradableTechNode() || ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotCanGetTaskReward() || ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasAnyNewItem();
  }
}
exports.RedDotMotorcycleDevelop = RedDotMotorcycleDevelop;
//# sourceMappingURL=RedDotMotorcycleDevelop.js.map