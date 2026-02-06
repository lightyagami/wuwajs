"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMotorcycleDiyStickerPrePartTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMotorcycleDiyStickerPrePartTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MotorDiyInfoRedDotUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotIsPreview(2, e);
  }
}
exports.RedDotMotorcycleDiyStickerPrePartTab = RedDotMotorcycleDiyStickerPrePartTab;
//# sourceMappingURL=RedDotMotorcycleDiyStickerPrePartTab.js.map