"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckClimb = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCheckClimb {
  constructor(t) {
    this.FbDataInternal = t;
    this.tdh = false;
    this.idh = undefined;
    this.rdh = false;
    this.odh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckClimb(t);
    }
  }
  get Direction() {
    if (!this.tdh) {
      this.tdh = true;
      this.idh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.direction());
    }
    return this.idh;
  }
  get Distance() {
    if (!this.rdh) {
      this.rdh = true;
      this.odh = this.FbDataInternal.distance();
    }
    return this.odh;
  }
}
exports.FbCheckClimb = FbCheckClimb;
//# sourceMappingURL=FbCheckClimb.js.map