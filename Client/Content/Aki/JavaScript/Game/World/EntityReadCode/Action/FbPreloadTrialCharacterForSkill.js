"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreloadTrialCharacterForSkill = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCharacterGroupNew_1 = require("./FbCharacterGroupNew");
class FbPreloadTrialCharacterForSkill {
  constructor(r) {
    this.FbDataInternal = r;
    this.u_h = false;
    this.f8o = undefined;
    this.wSh = false;
    this.PSh = undefined;
  }
  static Create(r) {
    if (r) {
      return new FbPreloadTrialCharacterForSkill(r);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CharacterGroupNew() {
    if (!this.wSh) {
      this.wSh = true;
      this.PSh = new Array();
      var t = this.FbDataInternal.characterGroupNewLength();
      if (t) {
        for (let r = 0; r < t; ++r) {
          var e = this.FbDataInternal.characterGroupNew(r, new fb_action_1.CharacterGroupNew());
          this.PSh.push(FbCharacterGroupNew_1.FbCharacterGroupNew.Create(e));
        }
      }
    }
    return this.PSh;
  }
}
exports.FbPreloadTrialCharacterForSkill = FbPreloadTrialCharacterForSkill;
//# sourceMappingURL=FbPreloadTrialCharacterForSkill.js.map