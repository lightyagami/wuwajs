"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyStickerTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyStickerTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoUpdate, EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck() {
    return !ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreviewInAnyPart(2) && ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewStickerByAnyPart();
  }
}
exports.RedDotMotorcycleDiyStickerTab = RedDotMotorcycleDiyStickerTab;
//# sourceMappingURL=RedDotMotorcycleDiyStickerTab.js.map