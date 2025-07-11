"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionGridRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class VisionGridRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshVisionEquipRedPoint];
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.VisionRecommendModel.CheckVisionOneKeyEquipRedDot(e);
  }
}
exports.VisionGridRedDot = VisionGridRedDot;
//# sourceMappingURL=VisionGridRedDot.js.map