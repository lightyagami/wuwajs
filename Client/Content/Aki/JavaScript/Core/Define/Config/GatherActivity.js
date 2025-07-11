"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GatherActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class GatherActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PlayTask() {
    return this.playtask();
  }
  get TaskClue() {
    return this.taskclue();
  }
  get SubmitItem() {
    return GameUtils_1.GameUtils.ConvertToMap(this.submititemLength(), this.submititemKey, this.submititemValue, this);
  }
  submititemKey(t) {
    return this.submititem(t)?.key();
  }
  submititemValue(t) {
    return this.submititem(t)?.value();
  }
  get Reward() {
    return this.reward();
  }
  get LocationEntityConfigId() {
    return this.locationentityconfigid();
  }
  get MarkId() {
    return this.markid();
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
  static getRootAsGatherActivity(t, i) {
    return (i || new GatherActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  playtask() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskclue(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSubmititemAt(t, i) {
    return this.submititem(t);
  }
  submititem(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  submititemLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  locationentityconfigid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 16);
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
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewarditemLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GatherActivity = GatherActivity;
//# sourceMappingURL=GatherActivity.js.map