"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbListenEntitySelfEventCondition = undefined;
class FbListenEntitySelfEventCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.lmh = false;
    this._mh = undefined;
    this.TJh = false;
    this.bJh = false;
  }
  static Create(t) {
    if (t) {
      return new FbListenEntitySelfEventCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EventKey() {
    if (!this.lmh) {
      this.lmh = true;
      this._mh = this.FbDataInternal.eventKey();
    }
    return this._mh;
  }
  get ResetAfterConditionMet() {
    if (!this.TJh) {
      this.TJh = true;
      this.bJh = this.FbDataInternal.resetAfterConditionMet();
    }
    return this.bJh;
  }
}
exports.FbListenEntitySelfEventCondition = FbListenEntitySelfEventCondition;
//# sourceMappingURL=FbListenEntitySelfEventCondition.js.map