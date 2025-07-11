"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashAndTowerReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SlashAndTowerReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BelongToSeason() {
    return this.belongtoseason();
  }
  get SumScore() {
    return this.sumscore();
  }
  get RewardId() {
    return this.rewardid();
  }
  get Desc() {
    return this.desc();
  }
  get EndLessReward() {
    return this.endlessreward();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSlashAndTowerReward(t, s) {
    return (s || new SlashAndTowerReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  belongtoseason() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sumscore() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  endlessreward() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SlashAndTowerReward = SlashAndTowerReward;
//# sourceMappingURL=SlashAndTowerReward.js.map