"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFireBulletTrackPosition = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbFireBulletTrackPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.v0h = false;
    this.y0h = undefined;
    this.S0h = false;
    this.M0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFireBulletTrackPosition(t);
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
    var i;
    if (!this.v0h && (this.v0h = true, t = this.FbDataInternal.launcherType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.y0h = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.launcher(i));
    }
    return this.y0h;
  }
  get PositionEntityId() {
    if (!this.S0h) {
      this.S0h = true;
      this.M0h = this.FbDataInternal.positionEntityId();
    }
    return this.M0h;
  }
}
exports.FbFireBulletTrackPosition = FbFireBulletTrackPosition;
//# sourceMappingURL=FbFireBulletTrackPosition.js.map