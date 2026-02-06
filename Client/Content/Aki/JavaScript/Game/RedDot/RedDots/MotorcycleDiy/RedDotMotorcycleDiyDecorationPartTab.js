"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyDecorationPartTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyDecorationPartTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoUpdate, EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck(e) {
    return !ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreview(3, e) && ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewDecorationByPart(e);
  }
}
exports.RedDotMotorcycleDiyDecorationPartTab = RedDotMotorcycleDiyDecorationPartTab;
//# sourceMappingURL=RedDotMotorcycleDiyDecorationPartTab.js.map