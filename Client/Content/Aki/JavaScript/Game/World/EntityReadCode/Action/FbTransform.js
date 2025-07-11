"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTransform = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTransform {
  constructor(t) {
    this.FbDataInternal = t;
    this.uch = false;
    this.dch = undefined;
    this.Aph = false;
    this.xph = undefined;
    this.Rph = false;
    this.wph = undefined;
    this.ogh = false;
    this.ngh = false;
  }
  static Create(t) {
    if (t) {
      return new FbTransform(t);
    }
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get Rot() {
    if (!this.Aph) {
      this.Aph = true;
      this.xph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rot());
    }
    return this.xph;
  }
  get Scale() {
    if (!this.Rph) {
      this.Rph = true;
      this.wph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.scale());
    }
    return this.wph;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
}
exports.FbTransform = FbTransform;
//# sourceMappingURL=FbTransform.js.map