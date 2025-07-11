"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEffectEntityPos2 = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEffectEntityPos2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.Kdh = false;
    this.$dh = undefined;
    this.Z11 = false;
    this.ec1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEffectEntityPos2(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
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
exports.FbEffectEntityPos2 = FbEffectEntityPos2;
//# sourceMappingURL=FbEffectEntityPos2.js.map