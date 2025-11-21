"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyCd = undefined;
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ModifyCd extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.SkillIdOrGenres = new Set();
    this.SkillType = 0;
    this.ModifyType = 0;
    this.ModifyValue = 0;
    this.Voa = undefined;
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    for (const s of e[0].split("#")) {
      this.SkillIdOrGenres.add(Number(s));
    }
    this.SkillType = Number(e[1]);
    this.ModifyType = Number(e[2]);
    this.Voa = t.ExtraEffectGrowParameters1;
  }
  OnCreated() {
    var t = this.ExactOwnerEntity?.GetComponent(210);
    if (t) {
      this.ModifyValue = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Voa, this.Level, 0);
      if (this.ModifyType === 1) {
        this.ModifyValue *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      }
      t.UpdateModifyCdEffect(true, this);
    }
  }
  OnExecute() {}
  OnRemoved(t) {
    var e = this.ExactOwnerEntity?.GetComponent(210);
    if (e) {
      e.UpdateModifyCdEffect(false, this);
    }
  }
}
exports.ModifyCd = ModifyCd;
//# sourceMappingURL=ExtraEffectModifyCd.js.map