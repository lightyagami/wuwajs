"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyTaskCountryUnlock = undefined;
class DailyTaskCountryUnlock {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDailyTaskCountryUnlock(t, s) {
    return (s || new DailyTaskCountryUnlock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DailyTaskCountryUnlock = DailyTaskCountryUnlock;
//# sourceMappingURL=DailyTaskCountryUnlock.js.map