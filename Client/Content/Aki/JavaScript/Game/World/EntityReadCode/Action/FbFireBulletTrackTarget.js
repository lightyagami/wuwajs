"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFireBulletTrackTarget = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbFireBulletTrackTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.v0h = false;
    this.y0h = undefined;
    this.ldh = false;
    this.NHo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFireBulletTrackTarget(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get Launcher() {
    var t;
    var e;
    if (!this.v0h && (this.v0h = true, t = this.FbDataInternal.launcherType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.y0h = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.launcher(e));
    }
    return this.y0h;
  }
  get Target() {
    var t;
    var e;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(e));
    }
    return this.NHo;
  }
}
exports.FbFireBulletTrackTarget = FbFireBulletTrackTarget;
//# sourceMappingURL=FbFireBulletTrackTarget.js.map