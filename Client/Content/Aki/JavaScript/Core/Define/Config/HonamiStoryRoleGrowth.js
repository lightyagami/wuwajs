"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRoleGrowth = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryRoleGrowth {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Level() {
    return this.level();
  }
  get AddPro() {
    return GameUtils_1.GameUtils.ConvertToMap(this.addproLength(), this.addproKey, this.addproValue, this);
  }
  addproKey(t) {
    return this.addpro(t)?.key();
  }
  addproValue(t) {
    return this.addpro(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryRoleGrowth(t, i) {
    return (i || new HonamiStoryRoleGrowth()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
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
  GetAddproAt(t, i) {
    return this.addpro(t);
  }
  addpro(t, i) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  addproLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryRoleGrowth = HonamiStoryRoleGrowth;
//# sourceMappingURL=HonamiStoryRoleGrowth.js.map