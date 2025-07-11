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
  __init(r, t) {
    this.z7 = r;
    this.J7 = t;
    return this;
  }
  static getRootAsRewardViewFromSource(r, t) {
    return (t || new RewardViewFromSource()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  id() {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  rewardsourceid() {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  rewardviewid() {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
}
exports.RewardViewFromSource = RewardViewFromSource;
//# sourceMappingURL=RewardViewFromSource.js.map