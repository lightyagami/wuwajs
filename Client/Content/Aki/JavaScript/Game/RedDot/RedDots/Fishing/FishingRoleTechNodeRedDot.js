"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoleTechNodeRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class FishingRoleTechNodeRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnFishingTechNodeRefresh, EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(e);
  }
}
exports.FishingRoleTechNodeRedDot = FishingRoleTechNodeRedDot;
//# sourceMappingURL=FishingRoleTechNodeRedDot.js.map