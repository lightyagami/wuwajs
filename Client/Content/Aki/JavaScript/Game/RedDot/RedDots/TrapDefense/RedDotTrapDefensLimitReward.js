"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseLimitReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseLimitReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefense";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward];
  }
  OnCheck() {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.RewardData.RedDotLimitReward();
  }
}
exports.RedDotTrapDefenseLimitReward = RedDotTrapDefenseLimitReward;
//# sourceMappingURL=RedDotTrapDefensLimitReward.js.map