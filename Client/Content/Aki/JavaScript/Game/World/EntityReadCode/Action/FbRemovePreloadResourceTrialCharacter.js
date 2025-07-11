"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemovePreloadResourceTrialCharacter = undefined;
class FbRemovePreloadResourceTrialCharacter {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.NSh = false;
    this.VSh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRemovePreloadResourceTrialCharacter(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CharacterGroup() {
    if (!this.NSh) {
      this.NSh = true;
      this.VSh = new Array();
      var t = this.FbDataInternal.characterGroupLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          this.VSh.push(this.FbDataInternal.characterGroup(e));
        }
      }
    }
    return this.VSh;
  }
}
exports.FbRemovePreloadResourceTrialCharacter = FbRemovePreloadResourceTrialCharacter;
//# sourceMappingURL=FbRemovePreloadResourceTrialCharacter.js.map