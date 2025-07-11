"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnMonsterConstraintAnnularSector = undefined;
class FbSpawnMonsterConstraintAnnularSector {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.rkh = false;
    this.okh = 0;
    this.nkh = false;
    this.skh = 0;
    this.fqh = false;
    this.pqh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnMonsterConstraintAnnularSector(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get InnerRadius() {
    if (!this.rkh) {
      this.rkh = true;
      this.okh = this.FbDataInternal.innerRadius();
    }
    return this.okh;
  }
  get OuterRadius() {
    if (!this.nkh) {
      this.nkh = true;
      this.skh = this.FbDataInternal.outerRadius();
    }
    return this.skh;
  }
  get Angle() {
    if (!this.fqh) {
      this.fqh = true;
      this.pqh = this.FbDataInternal.angle();
    }
    return this.pqh;
  }
}
exports.FbSpawnMonsterConstraintAnnularSector = FbSpawnMonsterConstraintAnnularSector;
//# sourceMappingURL=FbSpawnMonsterConstraintAnnularSector.js.map