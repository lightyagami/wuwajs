"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBlackBoardString = undefined;
class FbBlackBoardString {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ubh = false;
    this.dbh = undefined;
    this.kmh = false;
    this.Gmh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBlackBoardString(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Key() {
    if (!this.ubh) {
      this.ubh = true;
      this.dbh = this.FbDataInternal.key();
    }
    return this.dbh;
  }
  get Value() {
    if (!this.kmh) {
      this.kmh = true;
      this.Gmh = this.FbDataInternal.value();
    }
    return this.Gmh;
  }
}
exports.FbBlackBoardString = FbBlackBoardString;
//# sourceMappingURL=FbBlackBoardString.js.map