"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPostAkEventTargeted = undefined;
class FbPostAkEventTargeted {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.zfh = false;
    this.Jfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPostAkEventTargeted(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get AkEvent() {
    if (!this.zfh) {
      this.zfh = true;
      this.Jfh = this.FbDataInternal.akEvent();
    }
    return this.Jfh;
  }
}
exports.FbPostAkEventTargeted = FbPostAkEventTargeted;
//# sourceMappingURL=FbPostAkEventTargeted.js.map