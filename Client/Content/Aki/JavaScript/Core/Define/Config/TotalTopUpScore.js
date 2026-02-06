"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpScore = undefined;
class TotalTopUpScore {
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
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTotalTopUpScore(t, i) {
    return (i || new TotalTopUpScore()).__init(t.readInt32(t.position()) + t.position(), t);
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
}
exports.TotalTopUpScore = TotalTopUpScore;
//# sourceMappingURL=TotalTopUpScore.js.map