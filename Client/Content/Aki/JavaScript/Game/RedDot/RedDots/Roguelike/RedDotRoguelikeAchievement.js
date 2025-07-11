"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoguelikeAchievement = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityRogueController_1 = require("../../../Module/Activity/ActivityContent/RougeActivity/ActivityRogueController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeAchievement extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAchievementRedPoint];
  }
  OnCheck() {
    ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeAchievementRedDot();
  }
}
exports.RedDotRoguelikeAchievement = RedDotRoguelikeAchievement;
//# sourceMappingURL=RedDotRoguelikeAchievement.js.map