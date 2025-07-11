"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayerPos2 = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPlayerPos2 {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Kdh = false;
    this.$dh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayerPos2(t);
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
}
exports.FbPlayerPos2 = FbPlayerPos2;
//# sourceMappingURL=FbPlayerPos2.js.map