"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolePropertyGrowth = undefined;
class RolePropertyGrowth {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get BreachLevel() {
    return this.breachlevel();
  }
  get LifeMaxRatio() {
    return this.lifemaxratio();
  }
  get AtkRatio() {
    return this.atkratio();
  }
  get DefRatio() {
    return this.defratio();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRolePropertyGrowth(t, r) {
    return (r || new RolePropertyGrowth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  breachlevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifemaxratio() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atkratio() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  defratio() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RolePropertyGrowth = RolePropertyGrowth;
//# sourceMappingURL=RolePropertyGrowth.js.map