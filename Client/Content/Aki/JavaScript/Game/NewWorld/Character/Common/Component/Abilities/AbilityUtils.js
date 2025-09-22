"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbilityUtils = undefined;
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const SpecialSkillFuLuoLuo_1 = require("../Skill/SpecialSkill/SpecialSkillFuLuoLuo");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
class AbilityUtils {
  static GetLevelValue(t, e, i) {
    if (t && t.length !== 0) {
      if (e >= 1 && e - 1 < t.length) {
        return t[e - 1];
      } else if (e === 0) {
        return t[0];
      } else {
        return t[t.length - 1];
      }
    } else {
      return i;
    }
  }
  static GetArrayValue(t, e, i) {
    if (!t || t.length === 0 || e < 0) {
      return i;
    } else if (e < t.length) {
      return t[e];
    } else {
      return t[t.length - 1];
    }
  }
  static GetAttrValue(t, e, i) {
    if (!t) {
      return 0;
    }
    switch (i) {
      case 2:
        return t.GetCurrentValue(e) - t.GetBaseValue(e);
      case 1:
        return t.GetCurrentValue(e);
      default:
        return t.GetBaseValue(e);
    }
  }
  static SetSpecialEnergyAttrValue(t, e, i) {
    if (CharacterAttributeTypes_1.specialEnergyIds.includes(e) && (t = EntitySystem_1.EntitySystem.GetComponent(t, 173))?.Valid) {
      t.SetBaseValue(e, i);
    }
  }
  static ModifyFuLuoLuoSpecialEnergy(t, e) {
    t = t?.GetComponent(256)?.SpecialSkill;
    return !!t && t instanceof SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo && (e === 0 ? t.RemoveSpecialEnergy() : t.AddSpecialEnergy(e), true);
  }
  static GetFuLuoLuoSpecialEnergyType(t, e) {
    t = t?.GetComponent(256)?.SpecialSkill;
    if (t && t instanceof SpecialSkillFuLuoLuo_1.SpecialSkillFuLuoLuo) {
      return t.GetSpecialEnergyType(e);
    } else {
      return 0;
    }
  }
}
exports.AbilityUtils = AbilityUtils;
//# sourceMappingURL=AbilityUtils.js.map