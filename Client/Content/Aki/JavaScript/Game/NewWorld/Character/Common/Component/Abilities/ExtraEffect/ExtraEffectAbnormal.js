"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertAbnormalLight = exports.AbnormalDark = exports.AbnormalLight = exports.AbnormalWind = exports.AbnormalFire = exports.AbnormalIce = exports.AbnormalThunder = undefined;
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const ExtraExecutionEffect_1 = require("./ExtraExecutionEffect");
class AbnormalThunder extends ExtraExecutionEffect_1.PeriodExecution {
  constructor() {
    super(...arguments);
    this.ReductionRateThunder = 0;
    this.ReductionRateExplode = 0;
    this.ExplodeBuffId = 0;
    this.ExecuteAddBuffId = 0;
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters) {
      this.ReductionRateThunder = Number(t.ExtraEffectParameters[0] ?? 0) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      this.ReductionRateExplode = Number(t.ExtraEffectParameters[1] ?? 0) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      this.ExplodeBuffId = Number(t.ExtraEffectParameters[2] ?? 0);
      this.ExecuteAddBuffId = Number(t.ExtraEffectParameters[5] ?? 0);
    }
  }
  OnExecute() {
    this.BuffEffectExecutePush();
    var t = this.OwnerBuffComponent;
    var e = Math.ceil(this.Buff.StackCount * this.ReductionRateThunder);
    if (e > 0) {
      t.RemoveBuff(this.BuffId, e, "电磁效应触发时移除buff");
    }
    var r = t.GetBuffById(this.ExplodeBuffId);
    if (r) {
      e = Math.ceil(r.StackCount * this.ReductionRateExplode);
      t.RemoveBuff(this.ExplodeBuffId, e, "电磁效应触发时移除buff");
    }
    if (this.ExecuteAddBuffId > 0) {
      this.OwnerBuffComponent?.AddIterativeBuff(this.ExecuteAddBuffId, this.Buff, undefined, true, "电磁效应触发时buff添加");
    }
  }
  DoBuffStackOverflow(t, e, r) {
    e -= r;
    if (e > 0 && this.ExplodeBuffId > 0) {
      this.OwnerBuffComponent?.AddIterativeBuff(this.ExplodeBuffId, this.Buff, e, true, "电磁效应叠层溢出添加");
    }
  }
}
exports.AbnormalThunder = AbnormalThunder;
class AbnormalIce extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.OQo = 0;
    this.HQo = new Array();
  }
  InitParameters(t) {
    this.HQo.length = 0;
    if (t.ExtraEffectParameters) {
      for (const r of t.ExtraEffectParameters[0]?.split("|") ?? []) {
        var e = r.trim().split("#");
        this.HQo.push(e.map(t => Number(t.trim())));
      }
    }
  }
  OnExecute() {}
  OnCreated() {
    this.RefreshModifier(this.Buff?.StackCount ?? 0);
  }
  OnRemoved() {
    this.ClearModifier();
  }
  OnStackIncreased(t, e, r) {
    this.RefreshModifier(t);
  }
  OnStackDecreased(t, e, r) {
    this.RefreshModifier(t);
  }
  ClearModifier() {
    var t = this.ExactOwnerEntity?.GetComponent(181);
    if (this.OQo) {
      t?.RemoveModifier(CharacterAttributeTypes_1.EAttributeId.vVn, this.OQo);
      this.OQo = 0;
    }
  }
  RefreshModifier(r) {
    this.ClearModifier();
    var t = this.ExactOwnerEntity?.GetComponent(181);
    if (t) {
      let e = 0;
      for (let t = this.HQo.length - 1; t >= 0; t--) {
        var [s, i] = this.HQo[t];
        if (s <= r) {
          e = i;
          break;
        }
      }
      this.OQo = t.AddModifier(CharacterAttributeTypes_1.EAttributeId.vVn, {
        Type: 2,
        Value1: e - CharacterAttributeTypes_1.PER_TEN_THOUSAND,
        Value2: 0,
        SourceAttributeId: CharacterAttributeTypes_1.EAttributeId.vVn,
        SourceCalculationType: 0,
        SourceEntity: this.Buff?.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID
      });
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
    super(...arguments);
    this.Id_ = new Array();
    this.Sx1 = 0;
    this.Mx1 = 0;
  }
  InitParameters(t) {
    this.Id_ = t.ExtraEffectParameters[0].split("|").map(t => t.split("#").map(t => Number(t)));
    this.Sx1 = Number(t.ExtraEffectParameters[1] ?? ConvertAbnormalLight.Ex1);
    this.Mx1 = Number(t.ExtraEffectParameters[2] ?? 0);
    this.TargetType = Number(t.ExtraEffectParameters[3] ?? 0);
  }
  OnExecute() {
    var t = this.OwnerBuffComponent;
    if (t) {
      let r = 0;
      var s = t.GetBuffHandleByEffectId(this.Sx1);
      if (s) {
        for (const o of s) {
          var i = t.GetBuffByHandle(o);
          if (i) {
            if (!((r += i.StackCount) <= this.Mx1) && this.Mx1 !== 0) {
              t.RemoveBuffByHandle(o, i.StackCount - (r - this.Mx1), ConvertAbnormalLight.pLe);
              r = this.Mx1;
              break;
            }
            t.RemoveBuffByHandle(o, -1, ConvertAbnormalLight.pLe);
          }
        }
        let e = 0;
        for (let t = this.Id_.length - 1; t >= 0; t--) {
          var [a, h] = this.Id_[t];
          if (r >= a) {
            e = h;
            break;
          }
        }
        if (!(e <= 0)) {
          this.GetEffectTarget()?.AddIterativeBuff(e, this.Buff, undefined, true, ConvertAbnormalLight.pLe);
        }
      }
    }
  }
}
(exports.ConvertAbnormalLight = ConvertAbnormalLight).Ex1 = 1005;
ConvertAbnormalLight.pLe = "buff额外效果1102"; //# sourceMappingURL=ExtraEffectAbnormal.js.map