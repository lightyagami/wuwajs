"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightAttrShow = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorFightAttrShow {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AttriId() {
    return this.attriid();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get ShowInMainGun() {
    return this.showinmaingun();
  }
  get ShowInWingman() {
    return this.showinwingman();
  }
  get ShowInCommon() {
    return this.showincommon();
  }
  get SortId() {
    return this.sortid();
  }
  get Ratio() {
    return this.ratio();
  }
  get IsNeedPercentSign() {
    return this.isneedpercentsign();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorFightAttrShow(t, i) {
    return (i || new MotorFightAttrShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attriid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showinmaingun() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showinwingman() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showincommon() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ratio() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  isneedpercentsign() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.MotorFightAttrShow = MotorFightAttrShow;
//# sourceMappingURL=MotorFightAttrShow.js.map