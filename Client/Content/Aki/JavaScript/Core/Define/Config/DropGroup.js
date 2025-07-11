"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropGroup = undefined;
class DropGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get UnitId() {
    return this.unitid();
  }
  get GroupId() {
    return this.groupid();
  }
  get MinNum() {
    return this.minnum();
  }
  get MaxNum() {
    return this.maxnum();
  }
  get Interval() {
    return this.interval();
  }
  get DropShowPlan() {
    return this.dropshowplan();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDropGroup(t, r) {
    return (r || new DropGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  unitid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minnum() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxnum() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  interval() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropshowplan() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.DropGroup = DropGroup;
//# sourceMappingURL=DropGroup.js.map