"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsRewardData = void 0;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class RacingBetsRewardData {
  constructor(t) {
    this.Id = void 0, this.RewardConfig = void 0, this.hTc = void 0, this.lTc = 0, this._Tc = 0, this.Id = t, this.RewardConfig = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsReward(t)
  }
  Refresh(t) {
    this.hTc = t.H6n, this.lTc = t.cqs, this._Tc = t.j6n
  }
  GetRewardType() {
    return this.RewardConfig.RewardType
  }
  GetRewardList() {
    var t, e, r = [];
    for ([t, e] of this.RewardConfig.TargetReward) r.push([{
      ItemId: t,
      IncId: 0
    }, e]);
    return r
  }
  GetRewardName() {
    return this.RewardConfig.RewardName
  }
  GetProgressText() {
    return this.hTc === Protocol_1.Aki.Protocol.$J_.Proto_Undone ? this.lTc + "/" + this._Tc : this._Tc + "/" + this._Tc
  }
  GetTaskStatus() {
    return this.hTc
  }
  CanReceiveReward() {
    return this.hTc === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish
  }
  IsTaskReceived() {
    return this.hTc === Protocol_1.Aki.Protocol.$J_.Proto_Received
  }
}
exports.RacingBetsRewardData = RacingBetsRewardData;
//# sourceMappingURL=RacingBetsRewardData.js.map