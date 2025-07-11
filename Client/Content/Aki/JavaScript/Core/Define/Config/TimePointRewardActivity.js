"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePointRewardActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class TimePointRewardActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get RewardItem() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rewarditemLength(), this.rewarditemKey, this.rewarditemValue, this);
  }
  rewarditemKey(t) {
    return this.rewarditem(t)?.key();
  }
  rewarditemValue(t) {
    return this.rewarditem(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTimePointRewardActivity(t, i) {
    return (i || new TimePointRewardActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewarditemAt(t, i) {
    return this.rewarditem(t);
  }
  rewarditem(t, i) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewarditemLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TimePointRewardActivity = TimePointRewardActivity;
//# sourceMappingURL=TimePointRewardActivity.js.map