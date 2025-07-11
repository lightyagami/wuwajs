"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckLevelPlayState = undefined;
class FbCheckLevelPlayState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Ezh = false;
    this.Izh = 0;
    this._ch = false;
    this.cch = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckLevelPlayState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LevelId() {
    if (!this.Ezh) {
      this.Ezh = true;
      this.Izh = this.FbDataInternal.levelId();
    }
    return this.Izh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbCheckLevelPlayState = FbCheckLevelPlayState;
//# sourceMappingURL=FbCheckLevelPlayState.js.map