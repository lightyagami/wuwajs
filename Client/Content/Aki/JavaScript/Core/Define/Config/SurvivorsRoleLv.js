"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleLv = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SurvivorsRoleLv {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get Level() {
    return this.level();
  }
  get Effect() {
    return this.effect();
  }
  get BuffCategoryType() {
    return this.buffcategorytype();
  }
  get Quality() {
    return this.quality();
  }
  get Describe() {
    return this.describe();
  }
  get PropertyId() {
    return this.propertyid();
  }
  get PropertyValue() {
    return this.propertyvalue();
  }
  get IsPercent() {
    return this.ispercent();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsSurvivorsRoleLv(t, r) {
    return (r || new SurvivorsRoleLv()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
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
  effect() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffcategorytype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  describe(t) {
    var r = this.J7.__offset(this.z7, 16);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  propertyid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyvalue() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ispercent() {
    var t = this.J7.__offset(this.z7, 22);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SurvivorsRoleLv = SurvivorsRoleLv;
//# sourceMappingURL=SurvivorsRoleLv.js.map