"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoUpdate, EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasAnyNewItem();
  }
}
exports.RedDotMotorcycleDiyTab = RedDotMotorcycleDiyTab;
//# sourceMappingURL=RedDotMotorcycleDiyTab.js.map