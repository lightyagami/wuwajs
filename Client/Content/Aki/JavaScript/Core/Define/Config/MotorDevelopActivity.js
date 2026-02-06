"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorDevelopActivity = undefined;
class MotorDevelopActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get SkillTreeId() {
    return this.skilltreeid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorDevelopActivity(t, i) {
    return (i || new MotorDevelopActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltreeid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorDevelopActivity = MotorDevelopActivity;
//# sourceMappingURL=MotorDevelopActivity.js.map