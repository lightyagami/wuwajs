"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponPropertyGrowth = undefined;
class WeaponPropertyGrowth {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CurveId() {
    return this.curveid();
  }
  get Level() {
    return this.level();
  }
  get BreachLevel() {
    return this.breachlevel();
  }
  get CurveValue() {
    return this.curvevalue();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsWeaponPropertyGrowth(t, r) {
    return (r || new WeaponPropertyGrowth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  curveid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachlevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  curvevalue() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.WeaponPropertyGrowth = WeaponPropertyGrowth;
//# sourceMappingURL=WeaponPropertyGrowth.js.map