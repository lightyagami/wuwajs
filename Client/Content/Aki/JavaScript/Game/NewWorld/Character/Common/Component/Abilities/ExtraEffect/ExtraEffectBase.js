"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffEffect = exports.BuffEffectBase = undefined;
const Time_1 = require("../../../../../../../Core/Common/Time");
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
const CampUtils_1 = require("../../../Blueprint/Utils/CampUtils");
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
class BuffEffectBase {
  constructor(e) {
    this.RequireAndLimits = e;
    this.BuffId = -1;
    this.LoopLock = -1;
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
    return this.InstigatorEntity?.Entity?.CheckGetComponent(185);
  }
  get OpponentEntity() {
    return EntitySystem_1.EntitySystem.Get(this.OpponentEntityId);
  }
  get OpponentBuffComponent() {
    return this.OpponentEntity?.CheckGetComponent(185);
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
  CheckExecutable() {
    return true;
  }
  CheckAuthority() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  IsPlayerBuff() {
    return (0, RegisterComponent_1.isComponentInstance)(this.OwnerBuffComponent, 211);
  }
  InitParameters(e) {}
  OnBuffStackOverflow(e, t, r, s) {
    this.DoBuffStackOverflow(t, r, s);
  }
  DoBuffStackOverflow(e, t, r) {}
  CheckLoop() {
    return this.LoopLock !== Time_1.Time.Frame;
  }
  CheckRequirements(e) {
    if (this.RequireAndLimits.Requirements.length === 0) {
      return true;
    }
    switch (this.RequireAndLimits.CheckType) {
      case 0:
        for (const t of this.RequireAndLimits.Requirements) {
          if (!this.ZQo(t, e)) {
            return false;
          }
        }
        return true;
      case 1:
        for (const r of this.RequireAndLimits.Requirements) {
          if (this.ZQo(r, e)) {
            return true;
          }
        }
        return false;
      default:
        return true;
    }
  }
  ZQo(e, t) {
    switch (e.Type) {
      case 1:
        return Number.isInteger(t.SkillId) && e.SkillIds.includes(BigInt(t.SkillId ?? -1));
      case 2:
        return Number.isInteger(t.SkillGenre) && e.SkillGenres.includes(t.SkillGenre ?? -1);
      case 3:
        return e.RequireInterval.CheckActiveness(this.eXo(e.RequireTargetType).GetAttributeComponent());
      case 4:
        return Number.isInteger(t.SmashType) && e.SmashTypes.includes(t.SmashType ?? -1);
      case 5:
        return t.BulletId !== undefined && e.BulletIds.includes(t.BulletId);
      case 6:
        return e.IsCritical === t.IsCritical;
      case 7:
        return Number.isInteger(t.ElementType) && e.ElementTypes.includes(t.ElementType);
      case 8:
        return Number.isInteger(t.WeaponType) && e.WeaponTypes.includes(t.WeaponType);
      case 9:
        return this.eXo(e.RequireTargetType).GetTagComponent()?.HasAnyTag(e.RequireTagContainer) === e.IsExist;
      case 10:
        return GameplayTagUtils_1.GameplayTagUtils.Contains(e.RequirePartTags, t.PartTag);
      case 11:
        return GameplayTagUtils_1.GameplayTagUtils.HasAny(e.RequireBulletTags, t.BulletTags);
      case 12:
        return e.DamageTypes.includes(t.DamageType ?? -1);
      case 17:
        {
          const i = t.DamageSubTypes ?? [];
          switch (e.IncludeType) {
            case 1:
              return e.DamageSubTypes.every(e => i.includes(e));
            case 3:
              return e.DamageSubTypes.every(e => !i.includes(e));
            case 2:
              return e.DamageSubTypes.some(e => !i.includes(e));
            default:
              return e.DamageSubTypes.some(e => i.includes(e));
          }
        }
      case 13:
        var r = this.eXo(e.RequireTargetType)?.GetEntity()?.GetComponent(0)?.GetMonsterMatchType();
        return Number.isInteger(r) && e.MonsterGenres.includes(r);
      case 14:
        r = this.eXo(e.RequireTargetType);
        return (r && r.GetBuffTotalStackById(e.BuffId) >= e.MinStack && r.GetBuffTotalStackById(e.BuffId) <= e.MaxStack) ?? false;
      case 15:
        return PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.eXo(e.RequireTargetType).GetEntity(), e.SummonType, e.SummonIndex)?.Entity?.CheckGetComponent(217)?.HasAnyTag(e.RequireTagContainer) === e.IsExist;
      case 16:
        return e.CalculationTypes.includes(t.CalculateType ?? -1);
      case 18:
        return e.BattleFlags.some(e => t.BattleFlags?.includes(e));
      case 19:
        r = Number.isInteger(t.SourceType) && e.DamageSourceTypes.includes(t.SourceType);
        if (e.CheckInclude) {
          return r;
        } else {
          return !r;
        }
      case 20:
        return e.ChangeWeaknessType === t.ChangeWeaknessType;
      case 21:
        var r = this.eXo(e.RequireTargetType1)?.GetEntity()?.GetComponent(0)?.GetEntityCamp();
        var s = this.eXo(e.RequireTargetType2)?.GetEntity()?.GetComponent(0)?.GetEntityCamp();
        return e.Relationship === CampUtils_1.CampUtils.GetCampRelationship(r, s);
      default:
        return true;
    }
    return true;
  }
  eXo(e) {
    switch (e) {
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
  constructor(e, t, r, s, i) {
    super(r);
    this.ActiveHandleId = e;
    this.Index = t;
    this.Timeout = 0;
    this.ExecuteContext = undefined;
    r = (this.OwnerBuffComponent = s).GetBuffByHandle(e);
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
  static Create(e, t, r, s, i, n) {
    e = new this(e, t, r, s, i);
    if (n) {
      e.InitParameters(n);
    }
    return e;
  }
  OnCreated() {}
  OnRemoved(e) {}
  OnStackDecreased(e, t, r) {}
  OnStackIncreased(e, t, r) {}
  OnPeriodCallback() {}
  TryExecute(e, t, ...r) {
    return !!this.Check(e, t) && !(this.ExecuteContext = e, this.Execute(...r), this.ExecuteContext = undefined);
  }
  Check(e, t) {
    return !!this.CheckExecutable() && (this.OpponentEntityId = t.GetEntity()?.Id ?? 0, !!this.CheckLoop()) && !!this.CheckRequirements(e) && (this.ActiveHandleId < 0 || !(this.RemainCd > 0) && !(RandomSystem_1.default.GetRandomPercent() > this.RequireAndLimits.Limits.ExtraEffectProbability));
  }
  Execute(...e) {
    this.LoopLock = Time_1.Time.Frame;
    e = this.OnExecute(...e);
    this.PostExecuted();
    this.LoopLock = -1;
    return e;
  }
  PostExecuted() {
    var e;
    if (!(this.ActiveHandleId < 0) && !!this.OwnerBuffComponent) {
      e = this.RequireAndLimits.Limits.ExtraEffectCd * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      if (this.CheckAuthority()) {
        this.OwnerBuffComponent.SetBuffEffectCd(this.BuffId, this.Index, e);
      }
      e = this.RequireAndLimits.Limits.ExtraEffectRemoveStackNum;
      if (this.CheckAuthority() && e > 0) {
        this.OwnerBuffComponent.RemoveBuffByHandle(this.ActiveHandleId, e, "buff额外效果触发后移除");
      }
    }
  }
}
exports.BuffEffect = BuffEffect;
//# sourceMappingURL=ExtraEffectBase.js.map