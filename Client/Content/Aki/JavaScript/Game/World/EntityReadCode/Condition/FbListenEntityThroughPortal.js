"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbListenEntityThroughPortal = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbListenEntityThroughPortal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.BJh = false;
    this.qJh = undefined;
    this.kJh = false;
    this.GJh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbListenEntityThroughPortal(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CheckTarget() {
    var t;
    var i;
    if (!this.BJh && (this.BJh = true, t = this.FbDataInternal.checkTargetType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.qJh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.checkTarget(i));
    }
    return this.qJh;
  }
  get PortalEntityId() {
    if (!this.kJh) {
      this.kJh = true;
      this.GJh = this.FbDataInternal.portalEntityId();
    }
    return this.GJh;
  }
}
exports.FbListenEntityThroughPortal = FbListenEntityThroughPortal;
//# sourceMappingURL=FbListenEntityThroughPortal.js.map