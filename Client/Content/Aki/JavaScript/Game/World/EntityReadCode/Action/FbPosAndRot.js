"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPosAndRot = undefined;
class FbPosAndRot {
  constructor(t) {
    this.FbDataInternal = t;
    this.Luh = false;
    this.Auh = 0;
    this.xuh = false;
    this.Ruh = 0;
    this.wuh = false;
    this.Puh = 0;
    this.Uuh = false;
    this.Duh = 0;
    this.L7_ = false;
    this.w7_ = 0;
    this.R7_ = false;
    this.A7_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPosAndRot(t);
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
  get A() {
    if (!this.Uuh) {
      this.Uuh = true;
      this.Duh = this.FbDataInternal.a();
    }
    return this.Duh;
  }
  get Roll() {
    if (!this.L7_) {
      this.L7_ = true;
      this.w7_ = this.FbDataInternal.roll();
    }
    return this.w7_;
  }
  get Pitch() {
    if (!this.R7_) {
      this.R7_ = true;
      this.A7_ = this.FbDataInternal.pitch();
    }
    return this.A7_;
  }
}
exports.FbPosAndRot = FbPosAndRot;
//# sourceMappingURL=FbPosAndRot.js.map