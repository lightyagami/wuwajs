"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveTrialCharacter = undefined;
class FbRemoveTrialCharacter {
  constructor(t) {
    this.FbDataInternal = t;
    this.USh = false;
    this.DSh = 0;
    this.NSh = false;
    this.VSh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRemoveTrialCharacter(t);
    }
  }
  get CharacterId() {
    if (!this.USh) {
      this.USh = true;
      this.DSh = this.FbDataInternal.characterId();
    }
    return this.DSh;
  }
  get CharacterGroup() {
    if (!this.NSh) {
      this.NSh = true;
      this.VSh = new Array();
      var r = this.FbDataInternal.characterGroupLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          this.VSh.push(this.FbDataInternal.characterGroup(t));
        }
      }
    }
    return this.VSh;
  }
}
exports.FbRemoveTrialCharacter = FbRemoveTrialCharacter;
//# sourceMappingURL=FbRemoveTrialCharacter.js.map