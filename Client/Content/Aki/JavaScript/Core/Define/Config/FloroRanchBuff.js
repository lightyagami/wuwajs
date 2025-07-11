"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FloroRanchBuff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get Time() {
    return this.time();
  }
  get Superposition() {
    return this.superposition();
  }
  get RefreshTime() {
    return this.refreshtime();
  }
  get FollowRemove() {
    return this.followremove();
  }
  get Caculagraph() {
    return this.caculagraph();
  }
  get IsShowOnTip() {
    return this.isshowontip();
  }
  get IsShowEffect() {
    return this.isshoweffect();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFloroRanchBuff(t, s) {
    return (s || new FloroRanchBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  time() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  superposition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  refreshtime() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  followremove() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  caculagraph() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshowontip() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isshoweffect() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.FloroRanchBuff = FloroRanchBuff;
//# sourceMappingURL=FloroRanchBuff.js.map