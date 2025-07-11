"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageFilter = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes");
const ExtraEffectSnapModifier_1 = require("./ExtraEffectSnapModifier");
class DamageFilter extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.lNe = false;
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.lNe = Boolean(Number(e[0]));
  }
  OnExecute() {
    return !this.lNe;
  }
  static ApplyEffects(e, r, t, a, s, f, i) {
    var E = e.GetComponent(174);
    var r = r.GetComponent(174);
    if (E && r) {
      var c = e.GetComponent(40);
      var o = new ExtraEffectBaseTypes_1.RequirementPayload();
      if (s) {
        o.SkillId = s;
        c = c.GetSkillInfo(s);
        o.SkillGenre = c?.SkillGenre ?? -1;
      }
      var s = f ? ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(f) : undefined;
      if (s) {
        o.DamageType = s.Type;
        o.DamageSubTypes = s.SubType;
        o.CalculateType = s.CalculateType;
        o.SmashType = s.SmashType;
        o.ElementType = ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(E, s.Id) ?? s.Element;
      }
      o.BulletId = BigInt(t);
      o.BulletTags = a ?? [];
      o.BattleFlags = i ?? [];
      o.WeaponType = e.GetComponent(95)?.GetWeaponType() ?? ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS;
      for (const n of r.BuffEffectManager.FilterById(22)) {
        if (n.Check(o, E) === n.Execute()) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.DamageFilter = DamageFilter;
//# sourceMappingURL=ExtraEffectDamageFilter.js.map