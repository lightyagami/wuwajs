"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyDecorationPrePartTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyDecorationPrePartTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreview(3, e);
  }
}
exports.RedDotMotorcycleDiyDecorationPrePartTab = RedDotMotorcycleDiyDecorationPrePartTab;
//# sourceMappingURL=RedDotMotorcycleDiyDecorationPrePartTab.js.map