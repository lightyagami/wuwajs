"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushMapMark = undefined;
class BossRushMapMark {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get MarkId() {
    return this.markid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBossRushMapMark(t, s) {
    return (s || new BossRushMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BossRushMapMark = BossRushMapMark;
//# sourceMappingURL=BossRushMapMark.js.map