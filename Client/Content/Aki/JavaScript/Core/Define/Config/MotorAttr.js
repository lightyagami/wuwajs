"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorAttr = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorAttr {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PropertyId() {
    return this.propertyid();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get ShowMain() {
    return this.showmain();
  }
  get ShowMainOrder() {
    return this.showmainorder();
  }
  get ShowProperty() {
    return this.showproperty();
  }
  get ShowDetailOrder() {
    return this.showdetailorder();
  }
  get SpecialLevelShow() {
    return this.speciallevelshow();
  }
  get Suffix() {
    return this.suffix();
  }
  get IsPercent() {
    return this.ispercent();
  }
  get IsNumber() {
    return this.isnumber();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorAttr(t, s) {
    return (s || new MotorAttr()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyid(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  showmain() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showmainorder() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showproperty() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showdetailorder() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  speciallevelshow() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  suffix(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ispercent() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isnumber() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.MotorAttr = MotorAttr;
//# sourceMappingURL=MotorAttr.js.map