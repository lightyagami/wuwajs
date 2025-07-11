"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PORT_ID = exports.FishingRewardTargetTabData = exports.FishingRewardProgressData = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
class FishingRewardProgressData {
  constructor(t, o) {
    this.Id = t;
    this.Goal = o;
    this.State = Protocol_1.Aki.Protocol.zps.Z6n;
  }
  IsFulfilled() {
    return this.State === Protocol_1.Aki.Protocol.zps.CMs || this.State === Protocol_1.Aki.Protocol.zps.ovs;
  }
  IsReceivable() {
    return this.State === Protocol_1.Aki.Protocol.zps.CMs;
  }
  IsDone() {
    return this.State === Protocol_1.Aki.Protocol.zps.ovs;
  }
}
exports.FishingRewardProgressData = FishingRewardProgressData;
class FishingRewardTargetTabData {
  constructor() {
    this.NameTextId = undefined;
    this.Index = -1;
    this.ClickedCallback = undefined;
    this.RefreshRedDot = undefined;
  }
}
exports.FishingRewardTargetTabData = FishingRewardTargetTabData;
exports.DEFAULT_PORT_ID = 1; //# sourceMappingURL=ActivityFishingDefine.js.map