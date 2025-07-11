"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPostAkEventGlobal = undefined;
class FbPostAkEventGlobal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.zfh = false;
    this.Jfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPostAkEventGlobal(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AkEvent() {
    if (!this.zfh) {
      this.zfh = true;
      this.Jfh = this.FbDataInternal.akEvent();
    }
    return this.Jfh;
  }
}
exports.FbPostAkEventGlobal = FbPostAkEventGlobal;
//# sourceMappingURL=FbPostAkEventGlobal.js.map