"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVector2 = undefined;
class FbVector2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.Luh = false;
    this.Auh = 0;
    this.xuh = false;
    this.Ruh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVector2(t);
    }
  }
  get X() {
    if (!this.Luh) {
      this.Luh = true;
      this.Auh = this.FbDataInternal.x();
    }
    return this.Auh;
  }
  get Y() {
    if (!this.xuh) {
      this.xuh = true;
      this.Ruh = this.FbDataInternal.y();
    }
    return this.Ruh;
  }
}
exports.FbVector2 = FbVector2;
//# sourceMappingURL=FbVector2.js.map