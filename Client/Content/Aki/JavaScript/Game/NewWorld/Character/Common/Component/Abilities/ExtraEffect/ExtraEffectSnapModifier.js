"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyDamageElement = exports.DamageAmplifyOnBeHit = exports.DamageAmplifyOnHit = exports.ShieldSnapshotModify = exports.CommonSnapshotModify = exports.SnapModifier = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapModifier {
  static VXo(t, s, i) {
    var e = new Map();
    var r = new Map();
    var a = s.Attacker.OwnerBuffComponent.BuffEffectManager;
    var h = s.Target.OwnerBuffComponent.BuffEffectManager;
    for (const [c, u, f] of [[e, 0, a], [r, 1, a], [e, 2, h], [r, 3, h]]) {
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
    let a = undefined;
    switch (r) {
      case 0:
      case 1:
        a = s.Target.OwnerBuffComponent;
        break;
      case 3:
      case 2:
        a = s.Attacker.OwnerBuffComponent;
    }
    for (const h of e) {
      h.TryExecute(t, a, i, s);
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
        return this.OwnerEntity?.CheckGetComponent(174);
      case 0:
        return this.InstigatorEntity?.Entity?.CheckGetComponent(174);
      case 2:
        return t.AttackerSnapshot;
      case 3:
        return t.TargetSnapshot;
      default:
        return;
    }
  }
}
class CommonSnapshotModify extends SnapModifyBuffEffect {
  constructor() {
    super(...arguments);
    this.AttrId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.CalculationPolicy = 0;
    this.RefAttrId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.RefValueType = 0;
    this.StackParam = [];
    this.RefTargetType = 2;
    this.RefParam1 = 0;
    this.RefParam2 = 0;
  }
  InitParameters(t) {
    var s = t.ExtraEffectParameters;
    var i = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    var e = this.Level;
    this.TargetType = Number(s[0]);
    this.AttrId = Number(s[1]);
    this.CalculationPolicy = Number(s[2]);
    this.RefAttrId = Number(s[3]);
    if (this.CalculationPolicy === 1) {
      this.RefAttrId = this.AttrId;
    }
    this.RefTargetType = Number(s[4]);
    this.RefValueType = Number(s[5]);
    this.StackParam = s[6]?.split("#").map(t => Number(t)) ?? [0];
    this.RefParam1 = AbilityUtils_1.AbilityUtils.GetLevelValue(i, e, 0);
    this.RefParam2 = AbilityUtils_1.AbilityUtils.GetLevelValue(t, e, 0);
    this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(t => t.Type === 6);
  }
  OnExecute(i, e) {
    if (i === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "[SnapModifier] Modify without resultMap.");
      }
    } else {
      var r;
      var a = this.AttrId;
      var h = i.get(a) ?? 0;
      let t = this.RefParam1;
      if (this.StackParam[0] === 1) {
        t *= this.Buff?.StackCount ?? 1;
      } else if (this.StackParam[0] === 2) {
        r = this.StackParam[1] === 0 ? e.Attacker : e.Target;
        t *= r?.OwnerBuffComponent?.GetBuffTotalStackById(this.StackParam[2]) ?? 1;
      }
      var o = this.RefParam2;
      let s = 0;
      switch (this.CalculationPolicy) {
        case 0:
          s = t;
          break;
        case 1:
          var c = t * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
          s = this.GetAttrValue(e, this.RefAttrId, this.RefValueType, this.RefTargetType) * c;
          break;
        case 2:
          c = t * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
          s = this.GetAttrValue(e, this.RefAttrId, this.RefValueType, this.RefTargetType) * c + o;
      }
      i.set(a, h + s);
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
    var a = this.BuffHolderType ? this.InstigatorEntity?.Entity : this.OwnerEntity;
    if (a) {
      var h;
      var a = a.CheckGetComponent(75)?.GetShieldValue(this.ShieldId) ?? 0;
      let t = a >= this.ConvertThreshold;
      let s = a;
      if (this.ConvertLimit > 0) {
        s = Math.min(s, this.ConvertLimit);
      }
      if (this.CompareFactor > 0 && (h = this.BuffHolderType === 0 ? 1 : 0, e = this.GetAttrValue(e, this.CompareFactor, 1, h), t = a >= e * this.ConvertThreshold * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, this.ConvertLimit > 0)) {
        s = Math.min(a, e * this.ConvertLimit * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
      }
      if (t) {
        h = s * this.ConvertRatio * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + this.ConvertMagnitude;
        i.set(this.AttributeId, r + h);
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
    for (const a of i.BuffEffectManager.FilterById(37)) {
      if (a.Check(t, e)) {
        r += a.Execute();
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