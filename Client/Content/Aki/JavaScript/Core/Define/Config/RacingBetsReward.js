"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RacingBetsReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get Index() {
    return this.index();
  }
  get RewardName() {
    return this.rewardname();
  }
  get ResetType() {
    return this.resettype();
  }
  get RewardType() {
    return this.rewardtype();
  }
  get TargetReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.targetrewardLength(), this.targetrewardKey, this.targetrewardValue, this);
  }
  targetrewardKey(t) {
    return this.targetreward(t)?.key();
  }
  targetrewardValue(t) {
    return this.targetreward(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRacingBetsReward(t, e) {
    return (e || new RacingBetsReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardname(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  resettype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardtype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargetrewardAt(t, e) {
    return this.targetreward(t);
  }
  targetreward(t, e) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  targetrewardLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetsReward = RacingBetsReward;
//# sourceMappingURL=RacingBetsReward.js.map