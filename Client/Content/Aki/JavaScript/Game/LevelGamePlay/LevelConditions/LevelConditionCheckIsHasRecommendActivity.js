"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsHasRecommendRecActivity = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class LevelConditionCheckIsHasRecommendRecActivity extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return ModelManager_1.ModelManager.ActivityModel.IsHasShowingRecommendRecActivity();
  }
}
exports.LevelConditionCheckIsHasRecommendRecActivity = LevelConditionCheckIsHasRecommendRecActivity;
//# sourceMappingURL=LevelConditionCheckIsHasRecommendActivity.js.map