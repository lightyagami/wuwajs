"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockCookSystemCookBook = undefined;
class FbUnlockCookSystemCookBook {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.iyh = false;
    this.ryh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockCookSystemCookBook(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CookBookId() {
    if (!this.iyh) {
      this.iyh = true;
      this.ryh = this.FbDataInternal.cookBookId();
    }
    return this.ryh;
  }
}
exports.FbUnlockCookSystemCookBook = FbUnlockCookSystemCookBook;
//# sourceMappingURL=FbUnlockCookSystemCookBook.js.map