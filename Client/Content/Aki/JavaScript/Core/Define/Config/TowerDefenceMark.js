"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenceMark = undefined;
class TowerDefenceMark {
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
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTowerDefenceMark(t, e) {
    return (e || new TowerDefenceMark()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.TowerDefenceMark = TowerDefenceMark;
//# sourceMappingURL=TowerDefenceMark.js.map