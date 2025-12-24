"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleLevelTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleLevelTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasLevelUpReward();
  }
}
exports.RedDotMotorcycleLevelTab = RedDotMotorcycleLevelTab;
//# sourceMappingURL=RedDotMotorcycleLevelTab.js.map