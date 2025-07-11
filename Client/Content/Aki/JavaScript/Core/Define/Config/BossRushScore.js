"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushScore = undefined;
class BossRushScore {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Score() {
    return this.score();
  }
  get RewardId() {
    return this.rewardid();
  }
  __init(s, t) {
    this.z7 = s;
    this.J7 = t;
    return this;
  }
  static getRootAsBossRushScore(s, t) {
    return (t || new BossRushScore()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  id() {
    var s = this.J7.__offset(this.z7, 4);
    if (s) {
      return this.J7.readInt32(this.z7 + s);
    } else {
      return 0;
    }
  }
  score() {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.z7 + s);
    } else {
      return 0;
    }
  }
  rewardid() {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.z7 + s);
    } else {
      return 0;
    }
  }
}
exports.BossRushScore = BossRushScore;
//# sourceMappingURL=BossRushScore.js.map