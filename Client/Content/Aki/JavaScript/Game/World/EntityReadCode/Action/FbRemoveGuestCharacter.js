"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveGuestCharacter = undefined;
class FbRemoveGuestCharacter {
  constructor(t) {
    this.FbDataInternal = t;
    this.Pj_ = false;
    this.xj_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRemoveGuestCharacter(t);
    }
  }
  get GuestCharacterId() {
    if (!this.Pj_) {
      this.Pj_ = true;
      this.xj_ = this.FbDataInternal.guestCharacterId();
    }
    return this.xj_;
  }
}
exports.FbRemoveGuestCharacter = FbRemoveGuestCharacter;
//# sourceMappingURL=FbRemoveGuestCharacter.js.map