"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMatchPlayerRole = undefined;
class FbMatchPlayerRole {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.cZh = false;
    this.uZh = false;
  }
  static Create(t) {
    if (t) {
      return new FbMatchPlayerRole(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MatchPhantomSkill() {
    if (!this.cZh) {
      this.cZh = true;
      this.uZh = this.FbDataInternal.matchPhantomSkill();
    }
    return this.uZh;
  }
}
exports.FbMatchPlayerRole = FbMatchPlayerRole;
//# sourceMappingURL=FbMatchPlayerRole.js.map