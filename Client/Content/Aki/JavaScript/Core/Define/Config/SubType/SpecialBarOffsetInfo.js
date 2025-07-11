"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialBarOffsetInfo = undefined;
class SpecialBarOffsetInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MinPercent() {
    return this.minpercent();
  }
  get MaxPercent() {
    return this.maxpercent();
  }
  get MinOffsetX() {
    return this.minoffsetx();
  }
  get MinOffsetY() {
    return this.minoffsety();
  }
  get MaxOffsetX() {
    return this.maxoffsetx();
  }
  get MaxOffsetY() {
    return this.maxoffsety();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSpecialBarOffsetInfo(t, s) {
    return (s || new SpecialBarOffsetInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  minpercent() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxpercent() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minoffsetx() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minoffsety() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxoffsetx() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxoffsety() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SpecialBarOffsetInfo = SpecialBarOffsetInfo;
//# sourceMappingURL=SpecialBarOffsetInfo.js.map