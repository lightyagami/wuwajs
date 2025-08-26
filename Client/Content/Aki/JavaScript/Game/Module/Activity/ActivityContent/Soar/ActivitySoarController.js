"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySoarController = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySoarData_1 = require("./ActivitySoarData");
const ActivitySoarSubView_1 = require("./View/ActivitySoarSubView");
class ActivitySoarController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivitySoar";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySoarSubView_1.ActivitySoarSubView();
  }
  OnCreateActivityData(e) {
    return new ActivitySoarData_1.ActivitySoarData();
  }
  OnActivityFirstUnlock(e) {
    e = e.GetQuestId();
    if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e) && !ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(e)) {
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e, true, 2);
    }
  }
}
exports.ActivitySoarController = ActivitySoarController;
//# sourceMappingURL=ActivitySoarController.js.map