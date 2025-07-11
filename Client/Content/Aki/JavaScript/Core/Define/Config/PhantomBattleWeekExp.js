"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleWeekExp = undefined;
class PhantomBattleWeekExp {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MaxWeekExp() {
    return this.maxweekexp();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomBattleWeekExp(t, e) {
    return (e || new PhantomBattleWeekExp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxweekexp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleWeekExp = PhantomBattleWeekExp;
//# sourceMappingURL=PhantomBattleWeekExp.js.map