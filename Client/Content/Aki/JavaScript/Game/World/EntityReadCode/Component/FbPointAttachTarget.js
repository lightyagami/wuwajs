"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPointAttachTarget = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointAttachTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.s$h = false;
    this.a$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPointAttachTarget(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RelativePoint() {
    if (!this.s$h) {
      this.s$h = true;
      this.a$h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.relativePoint());
    }
    return this.a$h;
  }
}
exports.FbPointAttachTarget = FbPointAttachTarget;
//# sourceMappingURL=FbPointAttachTarget.js.map