"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshRatio = undefined;
class RefreshRatio {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Count() {
    return this.count();
  }
  get DecRatio() {
    return this.decratio();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRefreshRatio(t, s) {
    return (s || new RefreshRatio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  count() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  decratio() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RefreshRatio = RefreshRatio;
//# sourceMappingURL=RefreshRatio.js.map