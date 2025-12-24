"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffExtraEffectLibrary = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes");
const ADD_BULLET_MIN_INTERVAL = 0.5;
class BuffExtraEffectLibrary {
  static ResolveRequireAndLimits(e, r, a) {
    var t;
    var s;
    var i = new ExtraEffectBaseTypes_1.RequireAndLimits();
    i.CheckType = r.ExtraEffectRequirementSetting;
    for ([t, s] of r.ExtraEffectRequirement.entries()) {
      var u = r.ExtraEffectRequirementPara[t].split("#");
      switch (s) {
        case 3:
          var [T, b, y, l, p] = u;
          i.Requirements.push({
            Type: s,
            RequireTargetType: T === StringUtils_1.ZERO_STRING ? 0 : 1,
            RequireInterval: new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(Number(b), Number(l), Number(p), Number(y) === 1)
          });
          break;
        case 6:
          i.Requirements.push({
            Type: s,
            IsCritical: u[0] === StringUtils_1.ONE_STRING
          });
          break;
        case 9:
          i.Requirements.push({
            Type: s,
            RequireTargetType: Number(u[0]),
            IsExist: u[1] === StringUtils_1.ONE_STRING,
            RequireTagContainer: (u?.slice(2) ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined)
          });
          break;
        case 10:
          i.Requirements.push({
            Type: s,
            RequirePartTags: (u ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined)
          });
          break;
        case 11:
          i.Requirements.push({
            Type: s,
            RequireBulletTags: (u ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined)
          });
          break;
        case 13:
          i.Requirements.push({
            Type: s,
            RequireTargetType: Number(u[0]),
            MonsterGenres: u.slice(1).map(e => Number(e))
          });
          break;
        case 1:
          i.Requirements.push({
            Type: s,
            SkillIds: u.map(e => BigInt(e))
          });
          break;
        case 2:
          i.Requirements.push({
            Type: s,
            SkillGenres: u.map(e => Number(e))
          });
          break;
        case 4:
          i.Requirements.push({
            Type: s,
            SmashTypes: u.map(e => Number(e))
          });
          break;
        case 5:
          i.Requirements.push({
            Type: s,
            BulletIds: u.map(e => BigInt(e))
          });
          break;
        case 7:
          i.Requirements.push({
            Type: s,
            ElementTypes: u.map(e => Number(e))
          });
          break;
        case 8:
          i.Requirements.push({
            Type: s,
            WeaponTypes: u.map(e => Number(e))
          });
          break;
        case 12:
          i.Requirements.push({
            Type: s,
            DamageTypes: u.map(e => Number(e))
          });
          break;
        case 17:
          i.Requirements.push({
            Type: s,
            IncludeType: Number(u[0]),
            DamageSubTypes: u.slice(1).map(e => Number(e))
          });
          break;
        case 14:
          i.Requirements.push({
            Type: s,
            BuffId: Number(u[0]),
            RequireTargetType: Number(u[1]),
            MinStack: Number(u[2]),
            MaxStack: Number(u[3])
          });
          break;
        case 15:
          i.Requirements.push({
            Type: s,
            RequireTargetType: Number(u[0]),
            SummonType: Number(u[1]),
            SummonIndex: Number(u[2]),
            IsExist: u[3] === StringUtils_1.ONE_STRING,
            RequireTagContainer: (u?.slice(4) ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined)
          });
          break;
        case 16:
          i.Requirements.push({
            Type: s,
            CalculationTypes: u.map(e => Number(e))
          });
          break;
        case 18:
          i.Requirements.push({
            Type: s,
            BattleFlags: u
          });
          break;
        case 19:
          i.Requirements.push({
            Type: s,
            CheckInclude: Number(u[0]) === 0,
            DamageSourceTypes: u.slice(1).map(e => Number(e))
          });
          break;
        case 20:
          i.Requirements.push({
            Type: s,
            ChangeWeaknessType: Number(u[0] ?? 0)
          });
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 19, "未知的ExtraEffect条件类型", ["requireType", s], ["buffId", e]);
          }
      }
    }
    var c = i.Limits;
    c.ExtraEffectCd = AbilityUtils_1.AbilityUtils.GetLevelValue(r.ExtraEffectCd, a, -1);
    if (r.ExtraEffectId === 3) {
      c.ExtraEffectCd = Math.max(c.ExtraEffectCd, ADD_BULLET_MIN_INTERVAL);
    }
    c.ExtraEffectRemoveStackNum = r.ExtraEffectRemoveStackNum;
    c.ExtraEffectProbability = AbilityUtils_1.AbilityUtils.GetLevelValue(r.ExtraEffectProbability, a, CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    return i;
  }
}
exports.BuffExtraEffectLibrary = BuffExtraEffectLibrary;
//# sourceMappingURL=ExtraEffectLibrary.js.map