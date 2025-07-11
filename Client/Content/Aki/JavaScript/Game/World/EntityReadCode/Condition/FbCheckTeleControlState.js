"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckTeleControlState = undefined;
class FbCheckTeleControlState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.OJh = false;
    this.FJh = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckTeleControlState(t);
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
  get CompareType() {
    if (!this.OJh) {
      this.OJh = true;
      this.FJh = this.FbDataInternal.compareType();
    }
    return this.FJh;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbCheckTeleControlState = FbCheckTeleControlState;
//# sourceMappingURL=FbCheckTeleControlState.js.map