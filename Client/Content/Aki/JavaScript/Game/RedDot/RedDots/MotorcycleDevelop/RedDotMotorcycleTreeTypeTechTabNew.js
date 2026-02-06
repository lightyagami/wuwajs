"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleTreeTypeTechTabNew = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleTreeTypeTechTabNew extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDevelopInfoUpdate, EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(e);
  }
}
exports.RedDotMotorcycleTreeTypeTechTabNew = RedDotMotorcycleTreeTypeTechTabNew;
//# sourceMappingURL=RedDotMotorcycleTreeTypeTechTabNew.js.map