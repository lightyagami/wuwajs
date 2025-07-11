"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbForwardFrontRebound = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbForwardFrontRebound {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.w7h = false;
    this.P7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbForwardFrontRebound(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ReboundPoint() {
    if (!this.w7h) {
      this.w7h = true;
      this.P7h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.reboundPoint());
    }
    return this.P7h;
  }
}
exports.FbForwardFrontRebound = FbForwardFrontRebound;
//# sourceMappingURL=FbForwardFrontRebound.js.map