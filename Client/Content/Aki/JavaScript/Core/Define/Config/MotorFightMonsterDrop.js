"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightMonsterDrop = undefined;
class MotorFightMonsterDrop {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get DropId() {
    return this.dropid();
  }
  get GroupId() {
    return this.groupid();
  }
  get Weight() {
    return this.weight();
  }
  get BuffGateId() {
    return this.buffgateid();
  }
  get BuffId() {
    return this.buffid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorFightMonsterDrop(t, r) {
    return (r || new MotorFightMonsterDrop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  dropid() {
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
  weight() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffgateid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorFightMonsterDrop = MotorFightMonsterDrop;
//# sourceMappingURL=MotorFightMonsterDrop.js.map