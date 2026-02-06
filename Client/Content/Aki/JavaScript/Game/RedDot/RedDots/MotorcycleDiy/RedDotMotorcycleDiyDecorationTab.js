"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyDecorationTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyDecorationTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoUpdate, EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return !ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreviewInAnyPart(3) && ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewDecorationByAnyPart();
  }
}
exports.RedDotMotorcycleDiyDecorationTab = RedDotMotorcycleDiyDecorationTab;
//# sourceMappingURL=RedDotMotorcycleDiyDecorationTab.js.map