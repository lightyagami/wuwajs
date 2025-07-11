"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterGroupNew = undefined;
class FbCharacterGroupNew {
  constructor(t) {
    this.FbDataInternal = t;
    this.USh = false;
    this.DSh = 0;
    this.BSh = false;
    this.qSh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterGroupNew(t);
    }
  }
  get CharacterId() {
    if (!this.USh) {
      this.USh = true;
      this.DSh = this.FbDataInternal.characterId();
    }
    return this.DSh;
  }
  get IsAiCharacter() {
    if (!this.BSh) {
      this.BSh = true;
      this.qSh = this.FbDataInternal.isAiCharacter();
    }
    return this.qSh;
  }
}
exports.FbCharacterGroupNew = FbCharacterGroupNew;
//# sourceMappingURL=FbCharacterGroupNew.js.map