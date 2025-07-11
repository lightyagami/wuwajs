"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthDay = undefined;
class BirthDay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LimitYear() {
    return this.limityear();
  }
  get BirthDayCardItemId() {
    return this.birthdaycarditemid();
  }
  get BirthDayReward() {
    return this.birthdayreward();
  }
  get ValidDay() {
    return this.validday();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBirthDay(t, i) {
    return (i || new BirthDay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limityear() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  birthdaycarditemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  birthdayreward() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  validday() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BirthDay = BirthDay;
//# sourceMappingURL=BirthDay.js.map