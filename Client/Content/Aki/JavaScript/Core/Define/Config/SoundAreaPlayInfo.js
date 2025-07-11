"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundAreaPlayInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SoundAreaPlayInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffTitle() {
    return this.bufftitle();
  }
  get MaxCountType() {
    return this.maxcounttype();
  }
  get BuffDescription() {
    return this.buffdescription();
  }
  get ShowTitle() {
    return this.showtitle();
  }
  get Time() {
    return this.time();
  }
  get MaxCount() {
    return this.maxcount();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSoundAreaPlayInfo(t, i) {
    return (i || new SoundAreaPlayInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufftitle(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  maxcounttype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffdescription(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showtitle() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  time() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SoundAreaPlayInfo = SoundAreaPlayInfo;
//# sourceMappingURL=SoundAreaPlayInfo.js.map