"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRacingBetsActivityInternalReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRacingBetsActivityInternalReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRacingBetsRewardRefresh, EventDefine_1.EEventName.OnRacingBetsDataRefresh];
  }
  OnCheck(e) {
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return !!t && t.GetGroupRewardData(2).CanReceiveRewards();
  }
}
exports.RedDotRacingBetsActivityInternalReward = RedDotRacingBetsActivityInternalReward;
//# sourceMappingURL=RedDotRacingBetsActivityInternalReward.js.map