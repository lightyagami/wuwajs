"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckDirectionCondition = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCheckDirectionCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tdh = false;
    this.idh = undefined;
    this.aJh = false;
    this.hJh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckDirectionCondition(t);
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
  get AngleInterval() {
    if (!this.aJh) {
      this.aJh = true;
      this.hJh = this.FbDataInternal.angleInterval();
    }
    return this.hJh;
  }
}
exports.FbCheckDirectionCondition = FbCheckDirectionCondition;
//# sourceMappingURL=FbCheckDirectionCondition.js.map