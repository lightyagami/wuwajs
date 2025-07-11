"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialBarSizeInfo = undefined;
class SpecialBarSizeInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Index() {
    return this.index();
  }
  get SizeX() {
    return this.sizex();
  }
  get SizeY() {
    return this.sizey();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSpecialBarSizeInfo(t, i) {
    return (i || new SpecialBarSizeInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  index() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sizex() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sizey() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SpecialBarSizeInfo = SpecialBarSizeInfo;
//# sourceMappingURL=SpecialBarSizeInfo.js.map