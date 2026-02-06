"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class FeedbackRedDot extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.FeedbackRewardRefresh];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.FeedbackRewardModel.CheckRedDot();
  }
}
exports.FeedbackRedDot = FeedbackRedDot;
//# sourceMappingURL=FeedbackRewardRedDot.js.map