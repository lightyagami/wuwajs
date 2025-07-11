"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoonChasingReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingRewardAndShop";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.TakenRewardTargetData, EventDefine_1.EEventName.RefreshRewardTargetData];
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnCheck() {
    ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(true);
  }
}
exports.RedDotMoonChasingReward = RedDotMoonChasingReward;
//# sourceMappingURL=RedDotMoonChasingReward.js.map