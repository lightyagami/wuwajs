"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRacingBetsActivityReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRacingBetsActivityReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRacingBetsRewardRefresh, EventDefine_1.EEventName.OnRacingBetsDataRefresh];
  }
  OnCheck(e) {
    var t;
    var n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return !!n && (t = n.GetGroupRewardData(1), n = n.GetGroupRewardData(3), t.CanReceiveRewards() || n.CanReceiveRewards());
  }
}
exports.RedDotRacingBetsActivityReward = RedDotRacingBetsActivityReward;
//# sourceMappingURL=RedDotRacingBetsActivityReward.js.map