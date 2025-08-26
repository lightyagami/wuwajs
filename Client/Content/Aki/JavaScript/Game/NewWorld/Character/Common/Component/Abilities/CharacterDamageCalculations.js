"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calculation = exports.ENERGY_SHARE_RATE = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const AbnormalDamageConfigByLevel_1 = require("../../../../../../Core/Define/ConfigQuery/AbnormalDamageConfigByLevel");
const RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const DAMAGE_CONSTANT1 = 2;
const DAMAGE_CONSTANT2 = 800;
const DAMAGE_CONSTANT3 = 8;
const DAMAGE_CONSTANT4 = 2;
const DAMAGE_CONSTANT5 = 0.8;
const DAMAGE_CONSTANT6 = 5;
const DAMAGE_CONSTANT_K = 40000;
const DAMAGE_CONSTANT_A = 1;
const DAMAGE_CONSTANT_B = 0.8;
const DAMAGE_CONSTANT_MU = 40;
const DAMAGE_CONSTANT_SIGMA = 0.5;
const DAMAGE_CONSTANT_WEIGHT = 0.1;
const ELEMENT_CONTER_RATE = 1;
const REACTION_LIMIT_CONSTANT = 3000;
const REACTION_EXTRACT_CONSTANT = 8;
const REACTION_LOWER_BOUND_CONSTANT = 1830;
const DAMAGE_FALLING_10000 = 10000;
function getAttrFromSnapshots(t, e, r) {
  if (r < CharacterAttributeTypes_1.EAttributeId.Proto_Lv || r >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX) {
    return 0;
  } else {
    return (e !== 0 ? t.TargetSnapshot : t.AttackerSnapshot).GetCurrentValue(r);
  }
}
exports.ENERGY_SHARE_RATE = 3000;
const formulas = {
  1: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h, b, l, y, o, p, N) {
    var E = getAttrFromSnapshots.bind(this, t);
    var h = E(h, n) * (b * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + l;
    var n = E(p, o) * (y * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + N + E(C, c) * h;
    if (e === 1) {
      b = t.TargetSnapshot.CurrentValues.Proto_HealedChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      l = t.AttackerSnapshot.CurrentValues.Proto_HealChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      p = n * Math.max(0, 1 + b + l);
      return Math.max(p, 0);
    } else {
      o = Calculation.CalculateHurt(t, r.Element, r.DamageData.Type, r.DamageData.RelatedProperty, AbilityUtils_1.AbilityUtils.GetLevelValue(r.DamageData.RateLv, a, 0), A, s, i, T, n);
      return Math.max(o, 0);
    }
  },
  2: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h) {
    C = getAttrFromSnapshots.bind(this, t)(C, c) * (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + h;
    if (e === 1) {
      return -Math.min(t.TargetSnapshot.CurrentValues.Proto_Life - C, 0);
    } else {
      return Math.max(t.TargetSnapshot.CurrentValues.Proto_Life - C, 0);
    }
  },
  3: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h) {
    return getAttrFromSnapshots.bind(this, t)(C, c) * (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + h;
  },
  4: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h, b) {
    t = getAttrFromSnapshots.bind(this, t)(C, c) * (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + h;
    return Math.min(t, _ * (b * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND));
  },
  5: function (t, e, r, a, A, s, i, _, u, T, c, C) {
    return t.TargetSnapshot.CurrentValues.l5n * (c * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) / u + C;
  },
  6: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h, b, l) {
    t = getAttrFromSnapshots.bind(this, t);
    C = t(C, c) * (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + t(b, h) * (l * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
    return Math.max(C, 0);
  },
  7: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h, b, l) {
    C = getAttrFromSnapshots.bind(this, t)(C, c) * (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + h;
    c = t.TargetSnapshot.CurrentValues.Proto_Life - (t.TargetSnapshot.CurrentValues.l5n * b * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + l);
    return Math.max(0, Math.min(C, c));
  },
  1001: function (t, e, r, a, A, s, i, _, u, T, c, C, n, h, b, l) {
    var r = r.Element;
    var y = t.AttackerSnapshot;
    var t = t.TargetSnapshot;
    var o = y.CurrentValues.Proto_Lv;
    let p = 0;
    switch (r) {
      case 1:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1003 ?? 0;
        break;
      case 2:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1004 ?? 0;
        break;
      case 3:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1002 ?? 0;
        break;
      case 4:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1001 ?? 0;
        break;
      case 5:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1005 ?? 0;
        break;
      default:
        p = AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(o)?.Abnormal1006 ?? 0;
    }
    var c = c * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var N = Math.min(Calculation.GetElementDamageReduce(t, r), 1);
    var E = Calculation.GetElementResistant(t, r);
    var r = Calculation.GetElementIgnoreResistance(y, r);
    let M = 0;
    M = E - r <= 0 ? 1 - (E - r) / DAMAGE_CONSTANT4 : E - r < DAMAGE_CONSTANT5 ? 1 - (E - r) : 1 / (1 + (E - r) * DAMAGE_CONSTANT6);
    E = t.CurrentValues.Proto_Def;
    r = y.CurrentValues.Proto_IgnoreDefRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    E = Math.min(DAMAGE_CONSTANT1, 1 / (E * (1 - r) / (DAMAGE_CONSTANT2 + o * DAMAGE_CONSTANT3) + 1));
    r = Math.min(t.CurrentValues.Proto_DamageReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 1);
    t = Math.max(y.CurrentValues.Proto_SpecialDamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, -1);
    return p * c * E * M * (1 - r) * (1 - N) * (1 + t);
  }
};
class Calculation {
  static CalculateHurt(t, e, r, a, A, s, i, _, u, T = 0) {
    var c = t.AttackerSnapshot;
    var C = t.TargetSnapshot;
    var A = A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var n = this.GetElementDamageBonus(c, e);
    var h = Math.min(this.GetElementDamageReduce(C, e), 1);
    var b = this.GetElementResistant(C, e);
    var l = this.GetElementIgnoreResistance(c, e);
    let y = 0;
    y = b - l <= 0 ? 1 - (b - l) / DAMAGE_CONSTANT4 : b - l < DAMAGE_CONSTANT5 ? 1 - (b - l) : 1 / (1 + (b - l) * DAMAGE_CONSTANT6);
    b = this.GetAttackTypeDamageBonus(c, r);
    l = getAttrFromSnapshots(t, 0, a);
    r = C.CurrentValues.Proto_Def;
    t = c.CurrentValues.Proto_IgnoreDefRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    a = c.CurrentValues.Proto_Lv;
    r = Math.min(DAMAGE_CONSTANT1, 1 / (r * (1 - t) / (DAMAGE_CONSTANT2 + a * DAMAGE_CONSTANT3) + 1));
    t = 1 + c.CurrentValues.Proto_DamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + n + b;
    a = C.CurrentValues.Proto_ElementPropertyType;
    n = Math.min(C.CurrentValues.Proto_DamageReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 1);
    b = 1 + c.CurrentValues.Proto_SpecialDamageChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    C = Calculation.CalculateElementMatchUpRate(e, a);
    e = c.CurrentValues.Proto_CritDamage * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    a = (A * l + i + T) * (s ? e : 1) * r * t * y * (1 - n) * (1 - h) * b * C * u * Math.max(1 + _ * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 0);
    return Math.max(0, a);
  }
  static GetElementResistant(t, e) {
    switch (e) {
      case 0:
        return t.CurrentValues.Proto_DamageResistancePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 1:
        return t.CurrentValues.Proto_DamageResistanceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 2:
        return t.CurrentValues.Proto_DamageResistanceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 3:
        return t.CurrentValues.Proto_DamageResistanceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 4:
        return t.CurrentValues.Proto_DamageResistanceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 5:
        return t.CurrentValues.Proto_DamageResistanceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 6:
        return t.CurrentValues.Proto_DamageResistanceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      default:
        return 0;
    }
    return 0;
  }
  static GetElementIgnoreResistance(t, e) {
    switch (e) {
      case 0:
        return t.CurrentValues.Proto_IgnoreDamageResistancePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 1:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 2:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 3:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 4:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 5:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 6:
        return t.CurrentValues.Proto_IgnoreDamageResistanceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      default:
        return 0;
    }
    return 0;
  }
  static GetElementDamageReduce(t, e) {
    switch (e) {
      case 0:
        return t.CurrentValues.Proto_DamageReducePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 1:
        return t.CurrentValues.Proto_DamageReduceElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 2:
        return t.CurrentValues.Proto_DamageReduceElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 3:
        return t.CurrentValues.Proto_DamageReduceElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 4:
        return t.CurrentValues.Proto_DamageReduceElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 5:
        return t.CurrentValues.Proto_DamageReduceElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 6:
        return t.CurrentValues.Proto_DamageReduceElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      default:
        return 0;
    }
    return 0;
  }
  static GetElementDamageBonus(t, e) {
    switch (e) {
      case 0:
        return t.CurrentValues.Proto_DamageChangePhys * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 1:
        return t.CurrentValues.Proto_DamageChangeElement1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 2:
        return t.CurrentValues.Proto_DamageChangeElement2 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 3:
        return t.CurrentValues.Proto_DamageChangeElement3 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 4:
        return t.CurrentValues.Proto_DamageChangeElement4 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 5:
        return t.CurrentValues.Proto_DamageChangeElement5 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 6:
        return t.CurrentValues.Proto_DamageChangeElement6 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      default:
        return 0;
    }
    return 0;
  }
  static GetAttackTypeDamageBonus(t, e) {
    switch (e) {
      case 0:
        return t.CurrentValues.Proto_DamageChangeAuto * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 1:
        return t.CurrentValues.Proto_DamageChangeCast * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 2:
        return t.CurrentValues.Proto_DamageChangeUltra * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 3:
        return t.CurrentValues.Proto_DamageChangeQte * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 4:
        return t.CurrentValues.Proto_DamageChangeNormalSkill * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      case 5:
        return t.CurrentValues.Proto_DamageChangePhantom * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    }
    return 0;
  }
  static yQo(t, e, r, a) {
    var r = getAttrFromSnapshots(t, 0, r);
    var a = a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var A = t.TargetSnapshot.CurrentValues.Proto_HealedChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var t = t.AttackerSnapshot.CurrentValues.Proto_HealChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var a = (a * r + e) * Math.max(0, A + t + 1);
    return Math.max(0, a);
  }
  static ToughCalculation(t, e, r) {
    return r * (t.CurrentValues.Proto_ToughChange * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) * (e.CurrentValues.Proto_ToughReduce * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) * (e.CurrentValues.Proto_SkillToughRatio * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
  }
  static LandingDamageCalculationRole(t, e, r) {
    var a = CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_role");
    var A = t / a[0] - 1;
    var A = A > 0 ? A : 0;
    var s = a[2] / DAMAGE_FALLING_10000;
    var i = a[3] / DAMAGE_FALLING_10000;
    var s = Math.pow(e, s) * i;
    var i = A + s;
    var _ = Math.floor(i * r);
    if (_ > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 28, "角色跌落伤害", ["上一帧速度", t], ["damage", _], ["time", e], ["lifeMax", r], ["landing_damage_args_role", a], ["rateBase", A], ["rateT", s], ["rate", i]);
      }
      return _;
    } else {
      return 0;
    }
  }
  static LandingDamageCalculationMonster(t, e) {
    var r;
    var a = CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_monster");
    if (t < a[0]) {
      return 0;
    } else {
      r = Math.floor(Math.pow(t, a[1] / DAMAGE_FALLING_10000) * (a[3] / DAMAGE_FALLING_10000) * e / a[2]);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "怪物跌落伤害", ["height", t], ["landing_damage_args_monster", a], ["damage", r], ["lifeMax", e]);
      }
      return r;
    }
  }
  static ReactionDamageRateCalculation(t, e, r, a, A, s, i) {
    s = 2 - REACTION_LIMIT_CONSTANT / (s * REACTION_EXTRACT_CONSTANT + REACTION_LOWER_BOUND_CONSTANT);
    let _ = 0;
    switch (a) {
      case 0:
        _ = t.CurrentValues.Proto_DamageChangePhys;
        break;
      case 1:
        _ = t.CurrentValues.Proto_DamageChangeElement1;
        break;
      case 2:
        _ = t.CurrentValues.Proto_DamageChangeElement2;
        break;
      case 3:
        _ = t.CurrentValues.Proto_DamageChangeElement3;
        break;
      case 4:
        _ = t.CurrentValues.Proto_DamageChangeElement4;
        break;
      case 5:
        _ = t.CurrentValues.Proto_DamageChangeElement5;
        break;
      case 6:
        _ = t.CurrentValues.Proto_DamageChangeElement6;
    }
    _ *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var a = t.CurrentValues.Proto_CritDamage * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var i = i ? a : 1;
    var a = A.A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var u = A.B * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var T = A.C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var c = A.D * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var C = A.E * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var n = A.F * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var A = A.G * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var h = t.CurrentValues.Proto_Lv;
    var b = t.CurrentValues.Proto_Atk;
    var e = e.CurrentValues.Proto_Lv;
    var l = DAMAGE_CONSTANT_WEIGHT / (1 / DAMAGE_CONSTANT_K + DAMAGE_CONSTANT_A * Math.pow(DAMAGE_CONSTANT_B, (h + DAMAGE_CONSTANT_MU) * DAMAGE_CONSTANT_SIGMA));
    var r = r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * (1 + s * a + u * h + C) * i * (1 + b * T) * (1 + _ * c) * (1 / (1 + e / (n + h * A))) * l;
    return Math.ceil(r);
  }
  static CalculateElementMatchUpRate(t, e) {
    switch (t) {
      case 0:
        return 1;
      case 1:
        if (e === 4) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      case 2:
        if (e === 1) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      case 3:
        if (e === 2) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      case 4:
        if (e === 3) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      case 5:
        if (e === 6) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      case 6:
        if (e === 5) {
          return ELEMENT_CONTER_RATE;
        } else {
          return 1;
        }
      default:
        return 1;
    }
    return 1;
  }
  static CalculateFormula(t, e, r, a, A, s, i) {
    var _ = t.DamageData;
    var u = t.SkillLevel;
    var T = _.FormulaType;
    var c = _.CalculateType;
    let C = 0;
    if (T) {
      if (!(T in formulas)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 19, "unexpected formula type", ["damageId", _.Id], ["formula type", T]);
        }
        return 0;
      }
      C = formulas[T](e, c, t, u, r, a, A, t.Accumulation, s, i, AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam1, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam2, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam3, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam4, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam5, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam6, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam7, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam8, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam9, u, 0), AbilityUtils_1.AbilityUtils.GetLevelValue(_.FormulaParam10, u, 0));
    } else {
      T = _.RelatedProperty;
      s = AbilityUtils_1.AbilityUtils.GetLevelValue(_.RateLv, u, 0);
      C = c === 0 ? this.CalculateHurt(e, t.Element, _.Type, T, s, r, a, A, i) : (r = AbilityUtils_1.AbilityUtils.GetLevelValue(_.CureBaseValue, u, 0), this.yQo(e, r, T, s));
    }
    a = t.RandomSeed;
    t.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(a, 1);
    A = AbilityUtils_1.AbilityUtils.GetLevelValue(_.FluctuationUpper, u, CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    i = AbilityUtils_1.AbilityUtils.GetLevelValue(_.FluctuationLower, u, CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    e = ((A - i) * (a % CharacterAttributeTypes_1.PER_TEN_THOUSAND) + i) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    C = Math.ceil(C * t.ExtraRate * e);
    return C = c === 1 ? -C : C;
  }
}
exports.Calculation = Calculation;
//# sourceMappingURL=CharacterDamageCalculations.js.map