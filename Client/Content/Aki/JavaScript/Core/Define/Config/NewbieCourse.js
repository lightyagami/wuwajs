"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewbieCourse = undefined;
class NewbieCourse {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Reward() {
    return this.reward();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsNewbieCourse(t, e) {
    return (e || new NewbieCourse()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.NewbieCourse = NewbieCourse;
//# sourceMappingURL=NewbieCourse.js.map