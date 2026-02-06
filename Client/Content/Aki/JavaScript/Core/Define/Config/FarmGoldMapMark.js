"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGoldMapMark = undefined;
class FarmGoldMapMark {
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
  get EntranceId() {
    return this.entranceid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFarmGoldMapMark(t, r) {
    return (r || new FarmGoldMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
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
  entranceid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8720;
    }
  }
}
exports.FarmGoldMapMark = FarmGoldMapMark;
//# sourceMappingURL=FarmGoldMapMark.js.map