"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorLookAtPositionData = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbActorLookAtPositionData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yfh = false;
    this.d3l = false;
    this.uch = false;
    this.dch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActorLookAtPositionData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Lock() {
    if (!this.Yfh) {
      this.Yfh = true;
      this.d3l = this.FbDataInternal.lock();
    }
    return this.d3l;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
}
exports.FbActorLookAtPositionData = FbActorLookAtPositionData;
//# sourceMappingURL=FbActorLookAtPositionData.js.map