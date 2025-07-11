"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedPos = undefined;
const FbPosA_1 = require("./FbPosA");
class FbFixedPos {
  constructor(s) {
    this.FbDataInternal = s;
    this.u_h = false;
    this.f8o = undefined;
    this.hfh = false;
    this.lfh = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbFixedPos(s);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetPos() {
    if (!this.hfh) {
      this.hfh = true;
      this.lfh = FbPosA_1.FbPosA.Create(this.FbDataInternal.targetPos());
    }
    return this.lfh;
  }
}
exports.FbFixedPos = FbFixedPos;
//# sourceMappingURL=FbFixedPos.js.map