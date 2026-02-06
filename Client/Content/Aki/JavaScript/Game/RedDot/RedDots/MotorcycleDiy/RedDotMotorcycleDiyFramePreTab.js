"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyFramePreTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyFramePreTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreview(1);
  }
}
exports.RedDotMotorcycleDiyFramePreTab = RedDotMotorcycleDiyFramePreTab;
//# sourceMappingURL=RedDotMotorcycleDiyFramePreTab.js.map