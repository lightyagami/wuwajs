"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDirectionalField = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbDirectionalField {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tdh = false;
    this.idh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDirectionalField(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Direction() {
    if (!this.tdh) {
      this.tdh = true;
      this.idh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.direction());
    }
    return this.idh;
  }
}
exports.FbDirectionalField = FbDirectionalField;
//# sourceMappingURL=FbDirectionalField.js.map