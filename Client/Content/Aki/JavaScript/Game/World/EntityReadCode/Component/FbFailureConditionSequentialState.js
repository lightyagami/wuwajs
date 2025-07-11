"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFailureConditionSequentialState = undefined;
class FbFailureConditionSequentialState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.FOh = false;
    this.NOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFailureConditionSequentialState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Order() {
    if (!this.FOh) {
      this.FOh = true;
      this.NOh = new Array();
      var i = this.FbDataInternal.orderLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.NOh.push(this.FbDataInternal.order(t));
        }
      }
    }
    return this.NOh;
  }
}
exports.FbFailureConditionSequentialState = FbFailureConditionSequentialState;
//# sourceMappingURL=FbFailureConditionSequentialState.js.map