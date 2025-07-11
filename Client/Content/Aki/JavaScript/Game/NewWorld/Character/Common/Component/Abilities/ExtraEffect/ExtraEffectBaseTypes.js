"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectParameters = exports.RequirementPayload = exports.DEFAULT_WEAPON_TYPE_NOT_PASS = exports.RequireAndLimits = exports.EffectLimits = exports.periodExecutionIds = exports.initExecutionIds = undefined;
exports.initExecutionIds = new Set([24, 52]);
exports.periodExecutionIds = new Set([28, 29, 102, 34, 26, 58, 4, 5, 30, 13, 101, 65, 67, 1102, 69]);
class EffectLimits {
  constructor() {
    this.ExtraEffectCd = -0;
    this.ExtraEffectRemoveStackNum = 0;
    this.ExtraEffectProbability = -0;
  }
}
exports.EffectLimits = EffectLimits;
class RequireAndLimits {
  constructor() {
    this.CheckType = 0;
    this.Requirements = [];
    this.Limits = new EffectLimits();
  }
}
exports.RequireAndLimits = RequireAndLimits;
exports.DEFAULT_WEAPON_TYPE_NOT_PASS = -2;
class RequirementPayload {
  constructor() {
    this.SkillId = -1;
    this.SkillGenre = -1;
    this.BattleFlags = [];
    this.CalculateType = -1;
    this.DamageType = -1;
    this.DamageSubTypes = [];
    this.SmashType = -1;
    this.BulletId = undefined;
    this.BuffId = undefined;
    this.IsCritical = false;
    this.IsImmune = false;
    this.IsTargetKilled = false;
    this.ElementType = 0;
    this.WeaponType = -1;
    this.PartId = -1;
    this.PartTag = 0;
    this.BulletTags = [];
    this.SkillDamageCount = undefined;
    this.BulletDamageCount = undefined;
    this.BulletMessageId = undefined;
    this.SkillMessageId = undefined;
  }
  PartialAssign(t) {
    return Object.assign(this, t);
  }
}
exports.RequirementPayload = RequirementPayload;
class ExtraEffectParameters {
  constructor() {
    this.ExtraEffectId = 2;
    this.ExtraEffectParameters = undefined;
    this.ExtraEffectGrowParameters1 = undefined;
    this.ExtraEffectGrowParameters2 = undefined;
    this.ExtraEffectRequirement = undefined;
    this.ExtraEffectRequirementPara = undefined;
    this.ExtraEffectRequirementSetting = 0;
    this.ExtraEffectCd = undefined;
    this.ExtraEffectRemoveStackNum = 0;
    this.ExtraEffectProbability = undefined;
    this.ExecutionEffect = undefined;
  }
}
exports.ExtraEffectParameters = ExtraEffectParameters;
//# sourceMappingURL=ExtraEffectBaseTypes.js.map