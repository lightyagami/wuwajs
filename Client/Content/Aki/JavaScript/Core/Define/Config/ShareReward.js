"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ShareReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ShareType() {
    return this.sharetype();
  }
  get Reward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rewardLength(), this.rewardKey, this.rewardValue, this);
  }
  rewardKey(t) {
    return this.reward(t)?.key();
  }
  rewardValue(t) {
    return this.reward(t)?.value();
  }
  get UpdateType() {
    return this.updatetype();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsShareReward(t, e) {
    return (e || new ShareReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sharetype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardAt(t, e) {
    return this.reward(t);
  }
  reward(t, e) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewardLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  updatetype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ShareReward = ShareReward;
//# sourceMappingURL=ShareReward.js.map