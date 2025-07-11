"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckJigsawItemMove = undefined;
class FbCheckJigsawItemMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gAh = false;
    this.fAh = 0;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckJigsawItemMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ItemEntityId() {
    if (!this.gAh) {
      this.gAh = true;
      this.fAh = this.FbDataInternal.itemEntityId();
    }
    return this.fAh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCheckJigsawItemMove = FbCheckJigsawItemMove;
//# sourceMappingURL=FbCheckJigsawItemMove.js.map