"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerSeason = undefined;
class TowerSeason {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RewardGroup() {
    return this.rewardgroup();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTowerSeason(t, s) {
    return (s || new TowerSeason()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardgroup() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TowerSeason = TowerSeason;
//# sourceMappingURL=TowerSeason.js.map