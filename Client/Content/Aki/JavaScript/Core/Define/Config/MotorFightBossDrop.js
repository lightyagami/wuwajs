"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightBossDrop = undefined;
class MotorFightBossDrop {
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
  get CollectionGroup1() {
    return this.collectiongroup1();
  }
  get CollectionGroup2() {
    return this.collectiongroup2();
  }
  get CollectionGroup3() {
    return this.collectiongroup3();
  }
  get UpperLimitItemGroup() {
    return this.upperlimititemgroup();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorFightBossDrop(t, r) {
    return (r || new MotorFightBossDrop()).__init(t.readInt32(t.position()) + t.position(), t);
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
  collectiongroup1() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  collectiongroup2() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  collectiongroup3() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upperlimititemgroup() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorFightBossDrop = MotorFightBossDrop;
//# sourceMappingURL=MotorFightBossDrop.js.map