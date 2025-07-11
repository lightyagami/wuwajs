"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffEffect = exports.BuffEffectBase = undefined;
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const RandomSystem_1 = require("../../../../../../../Core/Random/RandomSystem");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
class BuffEffectBase {
  constructor(t) {
    this.RequireAndLimits = t;
    this.BuffId = -1;
    this.IsInLoop = false;
    this.Level = 0;
    this.ServerId = -1;
    this.InstigatorEntityId = 0;
    this.OpponentEntityId = 0;
    this.OwnerBuffComponent = undefined;
  }
  get InstigatorEntity() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.InstigatorEntityId);
  }
  get InstigatorCreatureId() {
    return this.InstigatorEntity?.Entity?.GetComponent(0)?.GetCreatureDataId() ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID;
  }
  get InstigatorBuffComponent() {
    return this.InstigatorEntity?.Entity?.CheckGetComponent(174);
  }
  get OpponentEntity() {
    return EntitySystem_1.EntitySystem.Get(this.OpponentEntityId);
  }
  get OpponentBuffComponent() {
    return this.OpponentEntity?.CheckGetComponent(174);
  }
  get OwnerEntity() {
    return this.OwnerBuffComponent?.GetEntity();
  }
  get ExactOwnerEntity() {
    return this.OwnerBuffComponent?.GetExactEntity();
  }
  get OwnerEffectManager() {
    return this.OwnerBuffComponent.BuffEffectManager;
  }
  InitParameters(t) {}
  CheckExecutable() {
    return true;
  }
  CheckAuthority() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  IsPlayerBuff() {
    return (0, RegisterComponent_1.isComponentInstance)(this.OwnerBuffComponent, 199);
  }
  CheckLoop() {
    return !this.IsInLoop;
  }
  CheckRequirements(t) {
    if (this.RequireAndLimits.Requirements.length === 0) {
      return true;
    }
    switch (this.RequireAndLimits.CheckType) {
      case 0:
        for (const e of this.RequireAndLimits.Requirements) {
          if (!this.ZQo(e, t)) {
            return false;
          }
        }
        return true;
      case 1:
        for (const r of this.RequireAndLimits.Requirements) {
          if (this.ZQo(r, t)) {
            return true;
          }
        }
        return false;
      default:
        return true;
    }
  }
  ZQo(t, e) {
    switch (t.Type) {
      case 1:
        return Number.isInteger(e.SkillId) && t.SkillIds.includes(BigInt(e.SkillId ?? -1));
      case 2:
        return Number.isInteger(e.SkillGenre) && t.SkillGenres.includes(e.SkillGenre ?? -1);
      case 3:
        return t.RequireInterval.CheckActiveness(this.eXo(t.RequireTargetType).GetAttributeComponent());
      case 4:
        return Number.isInteger(e.SmashType) && t.SmashTypes.includes(e.SmashType ?? -1);
      case 5:
        return e.BulletId !== undefined && t.BulletIds.includes(e.BulletId);
      case 6:
        return t.IsCritical === e.IsCritical;
      case 7:
        return Number.isInteger(e.ElementType) && t.ElementTypes.includes(e.ElementType);
      case 8:
        return Number.isInteger(e.WeaponType) && t.WeaponTypes.includes(e.WeaponType);
      case 9:
        return this.eXo(t.RequireTargetType).GetTagComponent()?.HasAnyTag(t.RequireTagContainer) === t.IsExist;
      case 10:
        return GameplayTagUtils_1.GameplayTagUtils.Contains(t.RequirePartTags, e.PartTag);
      case 11:
        return GameplayTagUtils_1.GameplayTagUtils.HasAny(t.RequireBulletTags, e.BulletTags);
      case 12:
        return t.DamageTypes.includes(e.DamageType ?? -1);
      case 17:
        {
          const s = e.DamageSubTypes ?? [];
          switch (t.IncludeType) {
            case 1:
              return t.DamageSubTypes.every(t => s.includes(t));
            case 3:
              return t.DamageSubTypes.every(t => !s.includes(t));
            case 2:
              return t.DamageSubTypes.some(t => !s.includes(t));
            default:
              return t.DamageSubTypes.some(t => s.includes(t));
          }
        }
      case 13:
        var r = this.eXo(t.RequireTargetType)?.GetEntity()?.GetComponent(0)?.GetMonsterMatchType();
        return Number.isInteger(r) && t.MonsterGenres.includes(r);
      case 14:
        r = this.eXo(t.RequireTargetType);
        return (r && r.GetBuffTotalStackById(t.BuffId) >= t.MinStack && r.GetBuffTotalStackById(t.BuffId) <= t.MaxStack) ?? false;
      case 15:
        return PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.eXo(t.RequireTargetType).GetEntity(), t.SummonType, t.SummonIndex)?.Entity?.CheckGetComponent(205)?.HasAnyTag(t.RequireTagContainer) === t.IsExist;
      case 16:
        return t.CalculationTypes.includes(e.CalculateType ?? -1);
      case 18:
        return t.BattleFlags.some(t => e.BattleFlags?.includes(t));
      default:
        return true;
    }
    return true;
  }
  eXo(t) {
    switch (t) {
      case 0:
        return this.OwnerBuffComponent;
      case 1:
        return this.OpponentBuffComponent;
      case 2:
        return this.InstigatorBuffComponent;
      default:
        return;
    }
  }
}
class BuffEffect extends (exports.BuffEffectBase = BuffEffectBase) {
  constructor(t, e, r, s, i) {
    super(r);
    this.ActiveHandleId = t;
    this.Index = e;
    this.Timeout = 0;
    this.ExecuteContext = undefined;
    r = (this.OwnerBuffComponent = s).GetBuffByHandle(t);
    if (r && (this.Level = r.Level, this.ServerId = r.ServerId, this.BuffId = r.Id, i)) {
      this.InstigatorEntityId = i.Entity.Id;
    }
  }
  get RemainCd() {
    return this.OwnerBuffComponent?.GetBuffEffectCd(this.BuffId, this.Index) ?? 0;
  }
  get Buff() {
    return this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
  }
  get PendingBuff() {
    return this.OwnerBuffComponent.GetPendingBuffByHandle(this.ActiveHandleId);
  }
  static Create(t, e, r, s, i, n) {
    t = new this(t, e, r, s, i);
    if (n) {
      t.InitParameters(n);
    }
    return t;
  }
  OnCreated() {}
  OnRemoved(t) {}
  OnStackDecreased(t, e, r) {}
  OnStackIncreased(t, e, r) {}
  OnPeriodCallback() {}
  TryExecute(t, e, ...r) {
    return !!this.Check(t, e) && !(this.ExecuteContext = t, this.Execute(...r), this.ExecuteContext = undefined);
  }
  Check(t, e) {
    return !!this.CheckExecutable() && (this.OpponentEntityId = e.GetEntity()?.Id ?? 0, !!this.CheckLoop()) && !!this.CheckRequirements(t) && (this.ActiveHandleId < 0 || !(this.RemainCd > 0) && !(RandomSystem_1.default.GetRandomPercent() > this.RequireAndLimits.Limits.ExtraEffectProbability));
  }
  Execute(...t) {
    this.IsInLoop = true;
    t = this.OnExecute(...t);
    this.PostExecuted();
    this.IsInLoop = false;
    return t;
  }
  PostExecuted() {
    var t;
    if (!(this.ActiveHandleId < 0) && !!this.OwnerBuffComponent) {
      t = this.RequireAndLimits.Limits.ExtraEffectCd * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      if (this.CheckAuthority()) {
        this.OwnerBuffComponent.SetBuffEffectCd(this.BuffId, this.Index, t);
      }
      t = this.RequireAndLimits.Limits.ExtraEffectRemoveStackNum;
      if (this.CheckAuthority() && t > 0) {
        this.OwnerBuffComponent.RemoveBuffByHandle(this.ActiveHandleId, t, "buff额外效果触发后移除");
      }
    }
  }
}
exports.BuffEffect = BuffEffect;
//# sourceMappingURL=ExtraEffectBase.js.map