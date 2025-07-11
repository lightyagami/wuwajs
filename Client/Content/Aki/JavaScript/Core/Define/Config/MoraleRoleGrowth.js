"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleRoleGrowth = undefined;
class MoraleRoleGrowth {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
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
  static getRootAsMoraleRoleGrowth(t, r) {
    return (r || new MoraleRoleGrowth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifemaxratio() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atkratio() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  defratio() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MoraleRoleGrowth = MoraleRoleGrowth;
//# sourceMappingURL=MoraleRoleGrowth.js.map