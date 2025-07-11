"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotWeeklyRogueScoreReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotWeeklyRogueScoreReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.HasScoreRewardEnable() ?? false;
  }
}
exports.RedDotWeeklyRogueScoreReward = RedDotWeeklyRogueScoreReward;
//# sourceMappingURL=RedDotWeeklyRogueScoreReward.js.map