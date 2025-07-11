"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEndState = undefined;
class FbEndState {
  constructor(t) {
    this.FbDataInternal = t;
    this.q1_ = false;
    this.k1_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEndState(t);
    }
  }
  get StayFlowMontageActors() {
    if (!this.q1_) {
      this.q1_ = true;
      this.k1_ = new Array();
      var s = this.FbDataInternal.stayFlowMontageActorsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.k1_.push(this.FbDataInternal.stayFlowMontageActors(t));
        }
      }
    }
    return this.k1_;
  }
}
exports.FbEndState = FbEndState;
//# sourceMappingURL=FbEndState.js.map