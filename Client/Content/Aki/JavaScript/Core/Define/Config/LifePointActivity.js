"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointActivity = undefined;
class LifePointActivity {
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
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLifePointActivity(t, i) {
    return (i || new LifePointActivity()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.LifePointActivity = LifePointActivity;
//# sourceMappingURL=LifePointActivity.js.map