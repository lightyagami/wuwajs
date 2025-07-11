"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcAwakeShow = undefined;
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcAwakeShow {
  constructor(t) {
    this.FbDataInternal = t;
    this.j4h = false;
    this.H4h = undefined;
    this.L6h = false;
    this.A6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcAwakeShow(t);
    }
  }
  get RegisteredMontageId() {
    if (!this.j4h) {
      this.j4h = true;
      this.H4h = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.registeredMontageId());
    }
    return this.H4h;
  }
  get MaterialDa() {
    if (!this.L6h) {
      this.L6h = true;
      this.A6h = this.FbDataInternal.materialDa();
    }
    return this.A6h;
  }
}
exports.FbNpcAwakeShow = FbNpcAwakeShow;
//# sourceMappingURL=FbNpcAwakeShow.js.map