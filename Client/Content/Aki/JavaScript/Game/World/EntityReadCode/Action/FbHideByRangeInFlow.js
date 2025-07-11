"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideByRangeInFlow = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbHideByRangeInFlow {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nIh = false;
    this.n9o = undefined;
    this.sIh = false;
    this.s9o = 0;
    this.V1h = false;
    this.j1h = undefined;
    this.aIh = false;
    this.hIh = false;
    this.lIh = false;
    this._Ih = false;
  }
  static Create(t) {
    if (t) {
      return new FbHideByRangeInFlow(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Center() {
    if (!this.nIh) {
      this.nIh = true;
      this.n9o = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.center());
    }
    return this.n9o;
  }
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var s = this.FbDataInternal.entityIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
  get IsCleanSimpleNpc() {
    if (!this.aIh) {
      this.aIh = true;
      this.hIh = this.FbDataInternal.isCleanSimpleNpc();
    }
    return this.hIh;
  }
  get IsCleanPasserByNpc() {
    if (!this.lIh) {
      this.lIh = true;
      this._Ih = this.FbDataInternal.isCleanPasserByNpc();
    }
    return this._Ih;
  }
}
exports.FbHideByRangeInFlow = FbHideByRangeInFlow;
//# sourceMappingURL=FbHideByRangeInFlow.js.map