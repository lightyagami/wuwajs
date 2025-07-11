"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityDirectionVectorInfo = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGravityDirectionVectorInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tdh = false;
    this.idh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGravityDirectionVectorInfo(t);
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
exports.FbGravityDirectionVectorInfo = FbGravityDirectionVectorInfo;
//# sourceMappingURL=FbGravityDirectionVectorInfo.js.map