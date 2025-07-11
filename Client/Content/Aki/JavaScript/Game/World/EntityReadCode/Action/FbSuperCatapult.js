"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSuperCatapult = undefined;
const FbCatapultParam_1 = require("./FbCatapultParam");
class FbSuperCatapult {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.o_h = false;
    this.n_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSuperCatapult(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Param() {
    if (!this.o_h) {
      this.o_h = true;
      this.n_h = FbCatapultParam_1.FbCatapultParam.Create(this.FbDataInternal.param());
    }
    return this.n_h;
  }
}
exports.FbSuperCatapult = FbSuperCatapult;
//# sourceMappingURL=FbSuperCatapult.js.map