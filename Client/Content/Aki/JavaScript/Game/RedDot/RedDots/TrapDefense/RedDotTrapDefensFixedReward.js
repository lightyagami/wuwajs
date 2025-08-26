"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseFixedReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseFixedReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefense";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseFixedReward];
  }
  OnCheck() {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.RewardData.RedDotFixedReward();
  }
}
exports.RedDotTrapDefenseFixedReward = RedDotTrapDefenseFixedReward;
//# sourceMappingURL=RedDotTrapDefensFixedReward.js.map