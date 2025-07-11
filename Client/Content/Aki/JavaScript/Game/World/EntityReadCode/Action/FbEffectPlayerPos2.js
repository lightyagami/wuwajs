"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEffectPlayerPos2 = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEffectPlayerPos2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Kdh = false;
    this.$dh = undefined;
    this.Z11 = false;
    this.ec1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEffectPlayerPos2(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
  get AttachSocket() {
    if (!this.Z11) {
      this.Z11 = true;
      this.ec1 = this.FbDataInternal.attachSocket();
    }
    return this.ec1;
  }
}
exports.FbEffectPlayerPos2 = FbEffectPlayerPos2;
//# sourceMappingURL=FbEffectPlayerPos2.js.map