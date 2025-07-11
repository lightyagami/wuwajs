"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAreaState = undefined;
class FbSetAreaState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Yph = false;
    this.zph = 0;
    this.Bch = false;
    this.Cbo = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetAreaState(t);
    }
  }
  get AreaId() {
    if (!this.Yph) {
      this.Yph = true;
      this.zph = this.FbDataInternal.areaId();
    }
    return this.zph;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbSetAreaState = FbSetAreaState;
//# sourceMappingURL=FbSetAreaState.js.map