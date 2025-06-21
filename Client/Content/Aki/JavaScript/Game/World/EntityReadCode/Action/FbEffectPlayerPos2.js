"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbEffectPlayerPos2 = void 0;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEffectPlayerPos2 {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Kdh = !1, this.$dh = void 0, this.U11 = !1, this.D11 = void 0
  }
  static Create(t) {
    if (t) return new FbEffectPlayerPos2(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get Offset() {
    return this.Kdh || (this.Kdh = !0, this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset())), this.$dh
  }
  get AttachSocket() {
    return this.U11 || (this.U11 = !0, this.D11 = this.FbDataInternal.attachSocket()), this.D11
  }
}
exports.FbEffectPlayerPos2 = FbEffectPlayerPos2;
//# sourceMappingURL=FbEffectPlayerPos2.js.map