"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerSeasonReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class TowerSeasonReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get RewardGroup() {
    return this.rewardgroup();
  }
  get Reward() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardLength(), this.reward, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTowerSeasonReward(t, r) {
    return (r || new TowerSeasonReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardgroup() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardAt(t, r) {
    return this.reward(t);
  }
  reward(t, r) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (r || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewardLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TowerSeasonReward = TowerSeasonReward;
//# sourceMappingURL=TowerSeasonReward.js.map