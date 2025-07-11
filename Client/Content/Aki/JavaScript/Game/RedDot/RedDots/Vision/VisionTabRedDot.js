"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionTabRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class VisionTabRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshVisionEquipRedPoint];
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.VisionRecommendModel.CheckVisionOneKeyEquipRedDot(e) || ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionGroupFirstOpenState();
  }
}
exports.VisionTabRedDot = VisionTabRedDot;
//# sourceMappingURL=VisionTabRedDot.js.map