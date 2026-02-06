"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyDamageElement = exports.DamageAmplifyOnBeHit = exports.DamageAmplifyOnHit = exports.ShieldSnapshotModify = exports.CommonSnapshotModify = exports.ModifierCalculator = exports.SnapModifier = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapModifier {
  static VXo(t, s, i) {
    var e = new Map();
    var r = new Map();
    var h = s.Attacker.OwnerBuffComponent.BuffEffectManager;
    var a = s.Target.OwnerBuffComponent.BuffEffectManager;
    for (const [c, u, f] of [[e, 0, h], [r, 1, h], [e, 2, a], [r, 3, a]]) {
      var o = f.FilterById([1, 46], t => t.TargetType === u && t.NeedCheckCritical === i);
      this.HXo(t, s, c, o, u);
    }
    this.jXo(e, s.AttackerSnapshot);
    this.jXo(r, s.TargetSnapshot);
  }
  static PreCriticalModify(t, s) {
    this.VXo(t, s, false);
  }
  static PostCriticalModify(t, s) {
    this.VXo(t, s, true);
  }
  static HXo(t, s, i, e, r) {
    let h = undefined;
    switch (r) {
      case 0:
      case 1:
        h = s.Target.OwnerBuffComponent;
        break;
      case 3:
      case 2:
        h = s.Attacker.OwnerBuffComponent;
    }
    for (const a of e) {
      a.TryExecute(t, h, i, s);
    }
  }
  static jXo(t, s) {
    for (var [i, e] of t.entries()) {
      i = CharacterAttributeTypes_1.EAttributeId[i];
      e = s.CurrentValues[i] + e;
      s.CurrentValues[i] = e;
    }
  }
}
exports.SnapModifier = SnapModifier;
class SnapModifyBuffEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.TargetType = undefined;
    this.NeedCheckCritical = false;
  }
  CheckAuthority() {
    return false;
  }
  GetAttrValue(t, s, i, e) {
    t = this.WXo(t, e);
    if (t) {
      if (i === 0) {
        return t.GetBaseValue(s);
      } else {
        return t.GetCurrentValue(s);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 61, "[SnapModifier] Get attributeSet failed.");
      }
      return 0;
    }
  }
  WXo(t, s) {
    switch (s) {
      case 1:
        return this.OwnerEntity?.CheckGetComponent(184);
      case 0:
        return this.InstigatorEntity?.Entity?.CheckGetComponent(184);
      case 2:
        return t.AttackerSnapshot;
      case 3:
        return t.TargetSnapshot;
      default:
        return;
    }
  }
}
class ModifierCalculator extends SnapModifyBuffEffect {
  constructor() {
    super(...arguments);
    this.CalculationPolicy = 0;
    this.RefAttrId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.RefValueType = 0;
    this.StackParam = [];
    this.RefTargetType = 2;
    this.AttributeThreshold = 0;
    this.ModifierMax = 0;
    this.RefParam1 = 0;
    this.RefParam2 = 0;
  }
  Txf(t, s, i, e) {
    var r;
    if (this.AttributeThreshold > 0) {
      r = this.GetAttrValue(t, s, i, e) - this.AttributeThreshold;
      return Math.max(r, 0);
    } else {
      return this.GetAttrValue(t, s, i, e);
    }
  }
  CalculateValue(t) {
    let s = this.RefParam1;
    if (this.StackParam[0] === 1) {
      s *= this.Buff?.StackCount ?? 1;
    } else if (this.StackParam[0] === 2) {
      i = this.StackParam[1] === 0 ? t.Attacker : t.Target;
      s *= i?.OwnerBuffComponent?.GetBuffTotalStackById(this.StackParam[2]) ?? 1;
    }
    var i;
    var e = this.RefParam2;
    let r = 0;
    switch (this.CalculationPolicy) {
      case 0:
        r = s;
        break;
      case 1:
        var h = s * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        r = this.Txf(t, this.RefAttrId, this.RefValueType, this.RefTargetType) * h;
        break;
      case 2:
        h = s * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        r = this.Txf(t, this.RefAttrId, this.RefValueType, this.RefTargetType) * h + e;
    }
    return r = this.ModifierMax > 0 && r > this.ModifierMax ? this.ModifierMax : r;
  }
}
class CommonSnapshotModify extends (exports.ModifierCalculator = ModifierCalculator) {
  constructor() {
    super(...arguments);
    this.AttrId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
  }
  InitParameters(t) {
    var s;
    var i = t.ExtraEffectParameters;
    var e = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    var r = this.Level;
    this.TargetType = Number(i[0]);
    this.AttrId = Number(i[1]);
    this.CalculationPolicy = Number(i[2]);
    if (i[3]) {
      s = i[3].split("#").map(t => Number(t));
      this.RefAttrId = s[0];
      this.AttributeThreshold = s[1] ?? 0;
      this.ModifierMax = s[2] ?? 0;
    }
    if (this.CalculationPolicy === 1) {
      this.RefAttrId = this.AttrId;
    }
    this.RefTargetType = Number(i[4]);
    this.RefValueType = Number(i[5]);
    this.StackParam = i[6]?.split("#").map(t => Number(t)) ?? [0];
    this.RefParam1 = AbilityUtils_1.AbilityUtils.GetLevelValue(e, r, 0);
    this.RefParam2 = AbilityUtils_1.AbilityUtils.GetLevelValue(t, r, 0);
    this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(t => t.Type === 6);
  }
  OnExecute(t, s) {
    var i;
    var e;
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "[SnapModifier] Modify without resultMap.");
      }
    } else {
      i = this.AttrId;
      e = t.get(i) ?? 0;
      s = this.CalculateValue(s);
      t.set(i, e + s);
    }
  }
}
exports.CommonSnapshotModify = CommonSnapshotModify;
class ShieldSnapshotModify extends SnapModifyBuffEffect {
  constructor() {
    super(...arguments);
    this.BuffHolderType = undefined;
    this.ShieldId = 0;
    this.AttributeId = 0;
    this.CompareFactor = 0;
    this.ConvertThreshold = 0;
    this.ConvertLimit = 0;
    this.ConvertMagnitude = 0;
    this.ConvertRatio = 0;
  }
  InitParameters(t) {
    var s = t.ExtraEffectParameters;
    var i = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    this.TargetType = Number(s[0]);
    this.BuffHolderType = Number(s[1]);
    this.ShieldId = Number(s[2]);
    this.AttributeId = Number(s[3]);
    this.CompareFactor = Number(s[4]);
    this.ConvertThreshold = Number(s[5]);
    this.ConvertLimit = Number(s[6]);
    this.ConvertMagnitude = AbilityUtils_1.AbilityUtils.GetLevelValue(i, this.Level, 0);
    this.ConvertRatio = AbilityUtils_1.AbilityUtils.GetLevelValue(t, this.Level, 0);
    this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(t => t.Type === 6);
  }
  OnExecute(i, e) {
    var r = i.get(this.AttributeId) ?? 0;
    var h = this.BuffHolderType ? this.InstigatorEntity?.Entity : this.OwnerEntity;
    if (h) {
      var a;
      var h = h.CheckGetComponent(80)?.GetShieldValue(this.ShieldId) ?? 0;
      let t = h >= this.ConvertThreshold;
      let s = h;
      if (this.ConvertLimit > 0) {
        s = Math.min(s, this.ConvertLimit);
      }
      if (this.CompareFactor > 0 && (a = this.BuffHolderType === 0 ? 1 : 0, e = this.GetAttrValue(e, this.CompareFactor, 1, a), t = h >= e * this.ConvertThreshold * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, this.ConvertLimit > 0)) {
        s = Math.min(h, e * this.ConvertLimit * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
      }
      if (t) {
        a = s * this.ConvertRatio * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + this.ConvertMagnitude;
        i.set(this.AttributeId, r + a);
      }
    }
  }
}
exports.ShieldSnapshotModify = ShieldSnapshotModify;
class DamageAmplifyOnHit extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.Value = -0;
  }
  InitParameters(t) {
    this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
  }
  OnExecute() {
    return this.Value * (this.Buff?.StackCount ?? 1);
  }
  static ApplyEffects(t, s) {
    var i = s.Attacker.OwnerBuffComponent;
    var e = s.Target.OwnerBuffComponent;
    let r = 0;
    for (const h of i.BuffEffectManager.FilterById(37)) {
      if (h.Check(t, e)) {
        r += h.Execute();
      }
    }
    return r;
  }
}
(exports.DamageAmplifyOnHit = DamageAmplifyOnHit).TempModifiedResult = 0;
class DamageAmplifyOnBeHit extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.Value = -0;
  }
  InitParameters(t) {
    this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
  }
  OnExecute() {
    return this.Value * (this.Buff?.StackCount ?? 1);
  }
  static ApplyEffects(t, s) {
    var i = s.Attacker.OwnerBuffComponent;
    let e = 0;
    for (const r of s.Target.OwnerBuffComponent.BuffEffectManager.FilterById(38)) {
      if (r.Check(t, i)) {
        e += r.Execute();
      }
    }
    return e;
  }
}
(exports.DamageAmplifyOnBeHit = DamageAmplifyOnBeHit).TempModifiedResult = 0;
class ModifyDamageElement extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.DamageIds = new Set();
  }
  InitParameters(t) {
    this.TargetType = Number(t.ExtraEffectParameters[0]);
    for (const s of t.ExtraEffectParameters[1].split(",")) {
      this.DamageIds.add(Number(s));
    }
  }
  OnExecute() {
    return this.TargetType;
  }
  static ApplyEffects(t, s) {
    if (t) {
      for (const i of t.BuffEffectManager.FilterById(63)) {
        if (i.DamageIds.has(s)) {
          return i.TargetType;
        }
      }
    }
  }
}
exports.ModifyDamageElement = ModifyDamageElement;
//# sourceMappingURL=ExtraEffectSnapModifier.js.map