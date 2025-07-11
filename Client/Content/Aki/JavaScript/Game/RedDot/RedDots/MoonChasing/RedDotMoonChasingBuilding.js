"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoonChasingBuilding = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingBuilding extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.TrackMoonHandbookUpdate, EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot];
  }
  OnCheck() {
    ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckAllBuildingRedDotState();
  }
}
exports.RedDotMoonChasingBuilding = RedDotMoonChasingBuilding;
//# sourceMappingURL=RedDotMoonChasingBuilding.js.map