"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardViewFromSource = undefined;
class RewardViewFromSource {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RewardSourceId() {
    return this.rewardsourceid();
  }
  get RewardViewId() {
    return this.rewardviewid();
  }
  get RewardNotifyNotTrick() {
    return this.rewardnotifynottrick();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRewardViewFromSource(t, r) {
    return (r || new RewardViewFromSource()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardsourceid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardviewid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardnotifynottrick() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.RewardViewFromSource = RewardViewFromSource;
//# sourceMappingURL=RewardViewFromSource.js.map