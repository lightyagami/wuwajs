"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVectorInfo = undefined;
class FbVectorInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.Luh = false;
    this.Auh = 0;
    this.xuh = false;
    this.Ruh = 0;
    this.wuh = false;
    this.Puh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVectorInfo(t);
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
  get Z() {
    if (!this.wuh) {
      this.wuh = true;
      this.Puh = this.FbDataInternal.z();
    }
    return this.Puh;
  }
}
exports.FbVectorInfo = FbVectorInfo;
//# sourceMappingURL=FbVectorInfo.js.map