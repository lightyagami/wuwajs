"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckClientEvent = undefined;
class FbCheckClientEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Nuc = false;
    this.Vuc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckClientEvent(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EventName() {
    if (!this.Nuc) {
      this.Nuc = true;
      this.Vuc = this.FbDataInternal.eventName();
    }
    return this.Vuc;
  }
}
exports.FbCheckClientEvent = FbCheckClientEvent;
//# sourceMappingURL=FbCheckClientEvent.js.map