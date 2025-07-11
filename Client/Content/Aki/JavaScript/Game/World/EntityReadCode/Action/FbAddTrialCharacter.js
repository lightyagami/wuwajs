"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddTrialCharacter = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActiveRange_1 = require("./FbActiveRange");
const FbCharacterGroupNew_1 = require("./FbCharacterGroupNew");
class FbAddTrialCharacter {
  constructor(t) {
    this.FbDataInternal = t;
    this.USh = false;
    this.DSh = 0;
    this.NSh = false;
    this.VSh = undefined;
    this.wSh = false;
    this.PSh = undefined;
    this._Eh = false;
    this.cEh = false;
    this.uEh = false;
    this.dEh = false;
    this.mEh = false;
    this.CEh = false;
    this.gEh = false;
    this.fEh = undefined;
    this.pEh = false;
    this.vEh = false;
    this.Zch = false;
    this.euh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAddTrialCharacter(t);
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
      var i = this.FbDataInternal.characterGroupLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.VSh.push(this.FbDataInternal.characterGroup(t));
        }
      }
    }
    return this.VSh;
  }
  get CharacterGroupNew() {
    if (!this.wSh) {
      this.wSh = true;
      this.PSh = new Array();
      var i = this.FbDataInternal.characterGroupNewLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.characterGroupNew(t, new fb_action_1.CharacterGroupNew());
          this.PSh.push(FbCharacterGroupNew_1.FbCharacterGroupNew.Create(s));
        }
      }
    }
    return this.PSh;
  }
  get AutoChange() {
    if (!this._Eh) {
      this._Eh = true;
      this.cEh = this.FbDataInternal.autoChange();
    }
    return this.cEh;
  }
  get CreateTempTeam() {
    if (!this.uEh) {
      this.uEh = true;
      this.dEh = this.FbDataInternal.createTempTeam();
    }
    return this.dEh;
  }
  get CreateAiCharacter() {
    if (!this.mEh) {
      this.mEh = true;
      this.CEh = this.FbDataInternal.createAiCharacter();
    }
    return this.CEh;
  }
  get ActiveRange() {
    if (!this.gEh) {
      this.gEh = true;
      this.fEh = FbActiveRange_1.FbActiveRange.Create(this.FbDataInternal.activeRange());
    }
    return this.fEh;
  }
  get EnableMapAndTeleport() {
    if (!this.pEh) {
      this.pEh = true;
      this.vEh = this.FbDataInternal.enableMapAndTeleport();
    }
    return this.vEh;
  }
  get DungeonList() {
    if (!this.Zch) {
      this.Zch = true;
      this.euh = new Array();
      var i = this.FbDataInternal.dungeonListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.euh.push(this.FbDataInternal.dungeonList(t));
        }
      }
    }
    return this.euh;
  }
}
exports.FbAddTrialCharacter = FbAddTrialCharacter;
//# sourceMappingURL=FbAddTrialCharacter.js.map