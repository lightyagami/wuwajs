"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyAdventurePoint = undefined;
class DailyAdventurePoint {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NeedPt() {
    return this.needpt();
  }
  get Drop() {
    return this.drop();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDailyAdventurePoint(t, i) {
    return (i || new DailyAdventurePoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needpt() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  drop() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DailyAdventurePoint = DailyAdventurePoint;
//# sourceMappingURL=DailyAdventurePoint.js.map