"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeRandomState = undefined;
class FbChangeRandomState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Vch = false;
    this.jch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeRandomState(t);
    }
  }
  get StateIds() {
    if (!this.Vch) {
      this.Vch = true;
      this.jch = new Array();
      var e = this.FbDataInternal.stateIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.jch.push(this.FbDataInternal.stateIds(t));
        }
      }
    }
    return this.jch;
  }
}
exports.FbChangeRandomState = FbChangeRandomState;
//# sourceMappingURL=FbChangeRandomState.js.map