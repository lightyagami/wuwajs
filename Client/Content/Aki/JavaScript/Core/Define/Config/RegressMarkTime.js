"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressMarkTime = undefined;
class RegressMarkTime {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRegressMarkTime(t, s) {
    return (s || new RegressMarkTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RegressMarkTime = RegressMarkTime;
//# sourceMappingURL=RegressMarkTime.js.map