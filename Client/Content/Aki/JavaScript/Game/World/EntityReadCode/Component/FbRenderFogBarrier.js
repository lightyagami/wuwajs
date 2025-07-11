"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenderFogBarrier = undefined;
const UnionTargetEntityHelper_1 = require("../Action/UnionTargetEntityHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRenderFogBarrier {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gYh = false;
    this.fYh = undefined;
    this.nIh = false;
    this.n9o = undefined;
    this.oRh = false;
    this.n6 = undefined;
    this.EZh = false;
    this.kJ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRenderFogBarrier(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CenterTarget() {
    var t;
    var i;
    if (!this.gYh && (this.gYh = true, t = this.FbDataInternal.centerTargetType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.fYh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.centerTarget(i));
    }
    return this.fYh;
  }
  get Center() {
    if (!this.nIh) {
      this.nIh = true;
      this.n9o = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.center());
    }
    return this.n9o;
  }
  get Size() {
    if (!this.oRh) {
      this.oRh = true;
      this.n6 = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.size());
    }
    return this.n6;
  }
  get Rotator() {
    if (!this.EZh) {
      this.EZh = true;
      this.kJ = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotator());
    }
    return this.kJ;
  }
}
exports.FbRenderFogBarrier = FbRenderFogBarrier;
//# sourceMappingURL=FbRenderFogBarrier.js.map