"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckAiState = undefined;
class FbCheckAiState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.fzh = false;
    this.pzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckAiState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get StateType() {
    if (!this.fzh) {
      this.fzh = true;
      this.pzh = this.FbDataInternal.stateType();
    }
    return this.pzh;
  }
}
exports.FbCheckAiState = FbCheckAiState;
//# sourceMappingURL=FbCheckAiState.js.map