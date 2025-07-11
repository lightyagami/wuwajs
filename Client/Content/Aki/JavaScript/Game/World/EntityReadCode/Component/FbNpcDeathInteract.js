"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcDeathInteract = undefined;
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcDeathInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.mgh = false;
    this.Cgh = undefined;
    this.L6h = false;
    this.A6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcDeathInteract(t);
    }
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montage());
    }
    return this.Cgh;
  }
  get MaterialDa() {
    if (!this.L6h) {
      this.L6h = true;
      this.A6h = this.FbDataInternal.materialDa();
    }
    return this.A6h;
  }
}
exports.FbNpcDeathInteract = FbNpcDeathInteract;
//# sourceMappingURL=FbNpcDeathInteract.js.map