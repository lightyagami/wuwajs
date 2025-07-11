"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoonChasingBranchTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingBranchTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingAllQuest";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MoonChasingRefreshQuestRedDot];
  }
  OnCheck() {
    ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.MoonChasingModel.CheckBranchRedDot();
  }
}
exports.RedDotMoonChasingBranchTab = RedDotMoonChasingBranchTab;
//# sourceMappingURL=RedDotMoonChasingBranchTab.js.map