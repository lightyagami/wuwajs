"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddGuestCharacter = undefined;
const FbActiveRange_1 = require("./FbActiveRange");
class FbAddGuestCharacter {
  constructor(t) {
    this.FbDataInternal = t;
    this.Pj_ = false;
    this.xj_ = 0;
    this.gEh = false;
    this.fEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddGuestCharacter(t);
    }
  }
  get GuestCharacterId() {
    if (!this.Pj_) {
      this.Pj_ = true;
      this.xj_ = this.FbDataInternal.guestCharacterId();
    }
    return this.xj_;
  }
  get ActiveRange() {
    if (!this.gEh) {
      this.gEh = true;
      this.fEh = FbActiveRange_1.FbActiveRange.Create(this.FbDataInternal.activeRange());
    }
    return this.fEh;
  }
}
exports.FbAddGuestCharacter = FbAddGuestCharacter;
//# sourceMappingURL=FbAddGuestCharacter.js.map