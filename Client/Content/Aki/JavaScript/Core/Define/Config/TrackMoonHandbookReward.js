"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMoonHandbookReward = undefined;
class TrackMoonHandbookReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Goal() {
    return this.goal();
  }
  get RewardInfo() {
    return this.rewardinfo();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTrackMoonHandbookReward(t, r) {
    return (r || new TrackMoonHandbookReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  goal() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardinfo() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrackMoonHandbookReward = TrackMoonHandbookReward;
//# sourceMappingURL=TrackMoonHandbookReward.js.map