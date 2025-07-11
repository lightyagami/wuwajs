"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattlePassReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattlePass";
  }
  OnCheck() {
    return ModelManager_1.ModelManager.BattlePassModel.CheckHasRewardWaitTake();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.GetBattlePassRewardEvent, EventDefine_1.EEventName.ReceiveBattlePassDataEvent, EventDefine_1.EEventName.OnBattlePassLevelUpEvent];
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotBattlePassReward = RedDotBattlePassReward;
//# sourceMappingURL=RedDotBattlePassReward.js.map