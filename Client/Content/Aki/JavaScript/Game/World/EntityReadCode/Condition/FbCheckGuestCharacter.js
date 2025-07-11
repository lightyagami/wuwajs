"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckGuestCharacter = undefined;
class FbCheckGuestCharacter {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Pj_ = false;
    this.xj_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckGuestCharacter(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get GuestCharacterId() {
    if (!this.Pj_) {
      this.Pj_ = true;
      this.xj_ = this.FbDataInternal.guestCharacterId();
    }
    return this.xj_;
  }
}
exports.FbCheckGuestCharacter = FbCheckGuestCharacter;
//# sourceMappingURL=FbCheckGuestCharacter.js.map