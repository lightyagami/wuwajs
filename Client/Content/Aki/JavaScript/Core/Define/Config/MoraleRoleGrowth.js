"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleRoleGrowth = void 0;
class MoraleRoleGrowth {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Level() {
    return this.level()
  }
  get LifeMaxRatio() {
    return this.lifemaxratio()
  }
  get AtkRatio() {
    return this.atkratio()
  }
  get DefRatio() {
    return this.defratio()
  }
  __init(t, r) {
    return this.z7 = t, this.J7 = r, this
  }
  static getRootAsMoraleRoleGrowth(t, r) {
    return (r || new MoraleRoleGrowth).__init(t.readInt32(t.position()) + t.position(), t)
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  lifemaxratio() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  atkratio() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  defratio() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.MoraleRoleGrowth = MoraleRoleGrowth;
//# sourceMappingURL=MoraleRoleGrowth.js.map