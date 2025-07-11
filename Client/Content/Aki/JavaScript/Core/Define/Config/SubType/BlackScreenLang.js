"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenLang = undefined;
class BlackScreenLang {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ShowAnimName() {
    return this.showanimname();
  }
  get HideAnimName() {
    return this.hideanimname();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsBlackScreenLang(t, e) {
    return (e || new BlackScreenLang()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  showanimname() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hideanimname() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BlackScreenLang = BlackScreenLang;
//# sourceMappingURL=BlackScreenLang.js.map