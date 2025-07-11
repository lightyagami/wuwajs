"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBoxAkEvent = undefined;
class FbBoxAkEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.G8h = false;
    this.O8h = undefined;
    this.NIh = false;
    this.cui = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBoxAkEvent(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AudioType() {
    if (!this.G8h) {
      this.G8h = true;
      this.O8h = this.FbDataInternal.audioType();
    }
    return this.O8h;
  }
  get Priority() {
    if (!this.NIh) {
      this.NIh = true;
      this.cui = this.FbDataInternal.priority();
    }
    return this.cui;
  }
}
exports.FbBoxAkEvent = FbBoxAkEvent;
//# sourceMappingURL=FbBoxAkEvent.js.map