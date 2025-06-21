"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ConvertAbnormalLight = exports.AbnormalDark = exports.AbnormalLight = exports.AbnormalWind = exports.AbnormalFire = exports.AbnormalIce = exports.AbnormalThunder = void 0;
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  ExtraExecutionEffect_1 = require("./ExtraExecutionEffect");
class AbnormalThunder extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), this.OQo = 0, this.kQo = 0, this.FQo = new Array, this.VQo = new Map
  }
  InitParameters(t) {
    if (this.FQo.length = 0, t.ExtraEffectParameters) {
      for (const i of t.ExtraEffectParameters[0]?.split("|") ?? []) {
        var e = i.trim().split("#");
        this.FQo.push(e.map(t => Number(t.trim())))
      }
      for (const s of t.ExtraEffectParameters[1]?.split("|") ?? []) {
        var r = s.trim().split("#");
        this.VQo.set(Number(r[0].trim()), Number(r[1].trim()))
      }
    }
  }
  OnPeriodCallback() {}
  OnExecute() {}
  OnCreated() {
    this.RefreshModifier(this.Buff?.StackCount ?? 0), this.RefreshCue(this.Buff?.StackCount ?? 0)
  }
  OnRemoved() {
    this.ClearModifier(), this.ClearCue()
  }
  OnStackIncreased(t, e, r) {
    this.RefreshModifier(t), this.RefreshCue(t)
  }
  OnStackDecreased(t, e, r) {
    this.RefreshModifier(t), this.RefreshCue(t)
  }
  ClearModifier() {
    var t = this.ExactOwnerEntity?.GetComponent(172);
    this.OQo && (t?.RemoveModifier(CharacterAttributeTypes_1.EAttributeId.Proto_Atk, this.OQo), this.OQo = 0)
  }
  ClearCue() {
    var t = this.ExactOwnerEntity?.GetComponent(209);
    this.kQo && (t?.RemoveBuffByHandle(this.kQo), this.kQo = 0)
  }
  RefreshModifier(r) {
    this.ClearModifier();
    var t = this.ExactOwnerEntity?.GetComponent(172);
    if (t) {
      let e = 0;
      for (let t = this.FQo.length - 1; 0 <= t; t--) {
        var [i, s] = this.FQo[t];
        if (i <= r) {
          e = s;
          break
        }
      }
      this.OQo = t.AddModifier(CharacterAttributeTypes_1.EAttributeId.Proto_Atk, {
        Type: 2,
        Value1: e,
        Value2: 0,
        SourceAttributeId: CharacterAttributeTypes_1.EAttributeId.vVn,
        SourceCalculationType: 0,
        SourceEntity: this.Buff?.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID
      })
    }
  }
  RefreshCue(e) {
    this.ClearCue();
    var r = this.ExactOwnerEntity?.GetComponent(209);
    if (r) {
      let t = void 0;
      for (var [i, s] of this.VQo)
        if (e >= i) {
          t = s;
          break
        } void 0 !== t && (this.kQo = r.AddGameplayCue([t], -1, "AddByAbnormalThunder"))
    }
  }
}
exports.AbnormalThunder = AbnormalThunder;
class AbnormalIce extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), this.OQo = 0, this.HQo = new Array
  }
  InitParameters(t) {
    if (this.HQo.length = 0, t.ExtraEffectParameters)
      for (const r of t.ExtraEffectParameters[0]?.split("|") ?? []) {
        var e = r.trim().split("#");
        this.HQo.push(e.map(t => Number(t.trim())))
      }
  }
  OnExecute() {}
  OnCreated() {
    this.RefreshModifier(this.Buff?.StackCount ?? 0)
  }
  OnRemoved() {
    this.ClearModifier()
  }
  OnStackIncreased(t, e, r) {
    this.RefreshModifier(t)
  }
  OnStackDecreased(t, e, r) {
    this.RefreshModifier(t)
  }
  ClearModifier() {
    var t = this.ExactOwnerEntity?.GetComponent(172);
    this.OQo && (t?.RemoveModifier(CharacterAttributeTypes_1.EAttributeId.vVn, this.OQo), this.OQo = 0)
  }
  RefreshModifier(r) {
    this.ClearModifier();
    var t = this.ExactOwnerEntity?.GetComponent(172);
    if (t) {
      let e = 0;
      for (let t = this.HQo.length - 1; 0 <= t; t--) {
        var [i, s] = this.HQo[t];
        if (i <= r) {
          e = s;
          break
        }
      }
      this.OQo = t.AddModifier(CharacterAttributeTypes_1.EAttributeId.vVn, {
        Type: 2,
        Value1: e - CharacterAttributeTypes_1.PER_TEN_THOUSAND,
        Value2: 0,
        SourceAttributeId: CharacterAttributeTypes_1.EAttributeId.vVn,
        SourceCalculationType: 0,
        SourceEntity: this.Buff?.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID
      })
    }
  }
}
exports.AbnormalIce = AbnormalIce;
class AbnormalFire extends ExtraEffectBase_1.BuffEffect {
  OnExecute() {}
  OnPeriodCallback() {}
}
exports.AbnormalFire = AbnormalFire;
class AbnormalWind extends ExtraExecutionEffect_1.PeriodExecution {
  OnExecute() {}
  OnPeriodCallback() {}
}
exports.AbnormalWind = AbnormalWind;
class AbnormalLight extends ExtraExecutionEffect_1.PeriodExecution {
  OnExecute() {}
  OnPeriodCallback() {}
}
exports.AbnormalLight = AbnormalLight;
class AbnormalDark extends ExtraEffectBase_1.BuffEffect {
  OnExecute() {}
  OnPeriodCallback() {}
}
exports.AbnormalDark = AbnormalDark;
class ConvertAbnormalLight extends ExtraExecutionEffect_1.PeriodExecution {
  constructor() {
    super(...arguments), this.Id_ = new Array, this.WP1 = 0, this.QP1 = 0
  }
  InitParameters(t) {
    this.Id_ = t.ExtraEffectParameters[0].split("|").map(t => t.split("#").map(t => Number(t))), this.WP1 = Number(t.ExtraEffectParameters[1] ?? ConvertAbnormalLight.KP1), this.QP1 = Number(t.ExtraEffectParameters[2] ?? 0), this.TargetType = Number(t.ExtraEffectParameters[3] ?? 0)
  }
  OnExecute() {
    var t = this.OwnerBuffComponent;
    if (t) {
      let r = 0;
      var i = t.GetBuffHandleByEffectId(this.WP1);
      if (i) {
        for (const h of i) {
          var s = t.GetBuffByHandle(h);
          if (s) {
            if (!((r += s.StackCount) <= this.QP1 || 0 === this.QP1)) {
              t.RemoveBuffByHandle(h, s.StackCount - (r - this.QP1), ConvertAbnormalLight.pLe), r = this.QP1;
              break
            }
            t.RemoveBuffByHandle(h, -1, ConvertAbnormalLight.pLe)
          }
        }
        let e = 0;
        for (let t = this.Id_.length - 1; 0 <= t; t--) {
          var [a, o] = this.Id_[t];
          if (r >= a) {
            e = o;
            break
          }
        }
        e <= 0 || this.GetEffectTarget()?.AddIterativeBuff(e, this.Buff, void 0, !0, ConvertAbnormalLight.pLe)
      }
    }
  }
}(exports.ConvertAbnormalLight = ConvertAbnormalLight).KP1 = 1005, ConvertAbnormalLight.pLe = "buff额外效果1102";
//# sourceMappingURL=ExtraEffectAbnormal.js.map