"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyDecorationPreTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyDecorationPreTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreviewInAnyPart(3);
  }
}
exports.RedDotMotorcycleDiyDecorationPreTab = RedDotMotorcycleDiyDecorationPreTab;
//# sourceMappingURL=RedDotMotorcycleDiyDecorationPreTab.js.map