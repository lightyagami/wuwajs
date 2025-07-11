"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenderBookPage = undefined;
const UnionTargetEntityHelper_1 = require("../Action/UnionTargetEntityHelper");
class FbRenderBookPage {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sIh = false;
    this.s9o = 0;
    this.gYh = false;
    this.fYh = undefined;
    this.zfh = false;
    this.Jfh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRenderBookPage(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
  get CenterTarget() {
    var t;
    var e;
    if (!this.gYh && (this.gYh = true, t = this.FbDataInternal.centerTargetType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.fYh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.centerTarget(e));
    }
    return this.fYh;
  }
  get AkEvent() {
    if (!this.zfh) {
      this.zfh = true;
      this.Jfh = this.FbDataInternal.akEvent();
    }
    return this.Jfh;
  }
}
exports.FbRenderBookPage = FbRenderBookPage;
//# sourceMappingURL=FbRenderBookPage.js.map