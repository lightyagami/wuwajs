"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityRegressBpReward = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressBpReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "ActivityRegressBp";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.CheckRegressScoreRewardReached() ?? false;
  }
}
exports.RedDotActivityRegressBpReward = RedDotActivityRegressBpReward;
//# sourceMappingURL=RedDotActivityRegressBpReward.js.map