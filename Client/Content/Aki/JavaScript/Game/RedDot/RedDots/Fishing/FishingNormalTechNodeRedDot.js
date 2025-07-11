"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingNormalTechNodeRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class FishingNormalTechNodeRedDot extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FishingNormalTech";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnFishingTechNodeRefresh, EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh];
  }
  OnCheck(e) {
    var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
    return n.Type !== 4 && n.Type !== 5 && ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(e);
  }
}
exports.FishingNormalTechNodeRedDot = FishingNormalTechNodeRedDot;
//# sourceMappingURL=FishingNormalTechNodeRedDot.js.map