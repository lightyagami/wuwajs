"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById");
const BuffGetAll_1 = require("../../../../../../Core/Define/ConfigQuery/BuffGetAll");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const TimeLimit_1 = require("../../../../../../Core/Performance/TimeLimit");
const Macro_1 = require("../../../../../../Core/Preprocessor/Macro");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const BuffTypes_1 = require("./Buff/BuffTypes");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes");
const ExtraEffectDefine_1 = require("./ExtraEffect/ExtraEffectDefine");
const ExtraEffectLibrary_1 = require("./ExtraEffect/ExtraEffectLibrary");
const TIME_LIMIT_MICRO_SECOND = 1000;
class BuffController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (BuffController.uoh && !UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      var e = BuffGetAll_1.configBuffGetAll.GetConfigList(false);
      if (e) {
        for (const t of e) {
          BuffController.AddBuffRef(t);
        }
      }
    }
    return super.OnInit();
  }
  static OnClear() {
    this.W5g.clear();
    return super.OnClear();
  }
  static RegisterBuffComponent(e) {
    this.W5g.add(e);
  }
  static UnregisterBuffComponent(e) {
    this.W5g.delete(e);
  }
  static OnTick(e) {
    this.CueTimeLimit.ResetCost();
    for (const t of this.W5g) {
      t.ProcessPendingCues();
      if (this.CueTimeLimit.IsTimeLimitExceeded()) {
        break;
      }
    }
  }
  static SetHandlePrefix(e, t) {
    var f = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1;
    if (e < 0 || f < e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 19, "Invalid Buff Handle prefix.", ["prefix", e], ["handleStart", t]);
      }
      e &= f;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 19, "Set GameplayEffect Handle prefix.", ["prefix", e], ["handleStart", t]);
    }
    var f = ModelManager_1.ModelManager.BuffModel;
    f.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE;
    f.LastHandle = Math.max(t, f.LastHandle);
  }
  static GenerateHandle() {
    var e = ModelManager_1.ModelManager.BuffModel;
    return (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) + (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK);
  }
  static GetBuffDefinition(e, t) {
    var f = ModelManager_1.ModelManager.BuffModel.Get(e);
    return f || ((f = BuffById_1.configBuffById.GetConfig(e)) ? BuffController.AddBuffRef(f) : void CombatLog_1.CombatLog.Error("Buff", undefined, "无法查找到对应编号的Buff。", ["BuffId", e], ["原因", t]));
  }
  static ParseExtraEffect(e, t) {
    var f;
    var a;
    var r;
    if (e && e.ExtraEffectID) {
      (f = new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId = e.ExtraEffectID;
      f.ExtraEffectParameters = e.ExtraEffectParameters;
      f.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1;
      f.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2;
      f.ExtraEffectRequirement = e.ExtraEffectRequirements;
      f.ExtraEffectRequirementPara = e.ExtraEffectReqPara;
      f.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting;
      f.ExtraEffectCd = e.ExtraEffectCD;
      f.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum;
      f.ExtraEffectProbability = e.ExtraEffectProbability;
      a = ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(e.Id, f, 1);
      if (r = (0, ExtraEffectDefine_1.getBuffExecutionClass)(e.ExtraEffectID)) {
        r = r.Create(e.Id, t, a, f);
        f.ExecutionEffect = r;
      }
      return f;
    }
  }
  static vQo(e) {
    var t = [e];
    for (const a of e.RelatedExtraEffectBuffId) {
      var f = BuffById_1.configBuffById.GetConfig(a);
      if (f) {
        t.push(f);
      }
    }
    return t;
  }
  static AddBuffRef(e) {
    this.MQo.Start();
    var t;
    var f;
    var a = new BuffTypes_1.BuffDefinition();
    a.Id = e.Id;
    if (!Info_1.Info.IsBuildShipping) {
      a.Desc = "";
    }
    a.StackLimitCount = e.StackLimitCount;
    a.FormationPolicy = e.FormationPolicy;
    a.StackingType = e.StackingType;
    a.DefaultStackCount = e.DefaultStackCount;
    a.StackAppendCount = e.StackAppendCount;
    a.Probability = e.Probability;
    a.DurationMagnitude = e.DurationMagnitude;
    a.DurationPolicy = e.DurationPolicy;
    a.DurationMagnitude2 = e.DurationMagnitude2;
    a.DurationCalculationPolicy = e.DurationCalculationPolicy;
    a.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime;
    a.Period = e.Period;
    a.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy;
    a.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication;
    a.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy;
    a.StackPeriodResetPolicy = e.StackPeriodResetPolicy;
    a.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber;
    a.DenyOverflowAdd = e.bDenyOverflowApplication;
    a.ClearStackOnOverflow = e.bClearStackOnOverflow;
    if (e.GameAttributeID > 0) {
      a.Modifiers.push({
        AttributeId: e.GameAttributeID,
        Value1: e.ModifierMagnitude,
        Value2: e.ModifierMagnitude2,
        CalculationPolicy: e.CalculationPolicy
      });
    }
    a.PrematureExpirationEffects = e.PrematureExpirationEffects;
    a.RoutineExpirationEffects = e.RoutineExpirationEffects;
    a.OverflowEffects = e.OverflowEffects;
    a.GameplayCueIds = e.GameplayCueIds;
    a.DeadRemove = e.DeadRemove;
    if (e.RemoveBuffWithTags.length > 0) {
      a.RemoveBuffWithTags = e.RemoveBuffWithTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedTags.length > 0) {
      a.GrantedTags = e.GrantedTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagRequirements.length > 0) {
      a.AddInstigatorTagRequirements = e.ApplicationSourceTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagIgnores.length > 0) {
      a.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagRequirements.length > 0) {
      a.AddTagRequirements = e.ApplicationTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagIgnores.length > 0) {
      a.AddTagIgnores = e.ApplicationTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagRequirements.length > 0) {
      a.ActivateTagRequirements = e.OngoingTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagIgnores.length > 0) {
      a.ActivateTagIgnores = e.OngoingTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagRequirements.length > 0) {
      a.RemoveTagExistAll = e.RemovalTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagIgnores.length > 0) {
      a.RemoveTagIgnores = e.RemovalTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTags.length > 0) {
      a.ImmuneTags = e.GrantedApplicationImmunityTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTagIgnores.length > 0) {
      a.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    for ([t, f] of this.vQo(e).entries()) {
      if (f && this.EQo(f)) {
        switch (f.ExtraEffectID) {
          case 43:
            a.RemoveTagExistAny = a.RemoveTagExistAny ?? [];
            for (const s of f.ExtraEffectParameters[0].split("#").map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim())).filter(e => e !== undefined)) {
              a.RemoveTagExistAny.push(s);
            }
            continue;
          case 57:
            a.BuffsAddedByStackCountOnRemoved = a.BuffsAddedByStackCountOnRemoved ?? [];
            for (const u of f.ExtraEffectParameters[0].split("#").map(e => Number(e)) ?? []) {
              a.BuffsAddedByStackCountOnRemoved.push(u);
            }
            continue;
        }
        var r = this.ParseExtraEffect(f, t);
        if (r) {
          a.EffectInfos.push(r);
        }
      }
    }
    if (e.BuffAction) {
      a.BuffAction = [];
      for (const c of e.BuffAction ?? []) {
        var i = c.split("#").map(e => e.trim());
        const n = [["BuffId", e.Id], ["Action", c]];
        if (i.length < 2) {
          CombatLog_1.CombatLog.Error("Buff", undefined, "BuffAction参数过少", ...n);
        } else {
          var o = Number(i[0]);
          switch (o) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
              try {
                a.BuffAction.push({
                  Type: o,
                  Buffs: i.slice(1).map(e => Number(e))
                });
              } catch (e) {
                CombatLog_1.CombatLog.ErrorWithStack("Buff", undefined, "BuffAction参数解析失败", e, ...n);
              }
              continue;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
              a.BuffAction.push({
                Type: o,
                Tags: i.slice(1).map(e => {
                  e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
                  if (e === undefined) {
                    CombatLog_1.CombatLog.Error("Buff", undefined, "BuffAction找不到对应的Tag", ...n);
                  }
                  return e;
                }).filter(e => e !== undefined)
              });
              continue;
            default:
              CombatLog_1.CombatLog.Error("Buff", undefined, "BuffAction参数不合法", ...n);
              continue;
          }
        }
      }
    }
    a.HasBuffEffect = this.HasBuffEffects(a.EffectInfos);
    a.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(a.EffectInfos);
    ModelManager_1.ModelManager.BuffModel.Add(e.Id, a);
    this.MQo.Stop();
    return a;
  }
  static CreateDynamicBuffRef() {
    var e = new BuffTypes_1.BuffDefinition();
    e.Id = ActiveBuffConfigs_1.DYNAMIC_BUFF_ID;
    e.DurationPolicy = 1;
    return e;
  }
  static EQo(e) {
    switch (e.ExtraEffectID) {
      case 14:
        if (e.ExtraEffectParameters.length >= 2) {
          var t = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) {
            break;
          }
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)", ["BuffId", e.Id], ["AttributeId", t]);
        } else {
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性额外效果14的Buff配置的效果参数过少 < 2，此效果无效", ["BuffId", e.Id]);
        }
        return false;
      case 15:
      case 16:
        if (e.ExtraEffectParameters.length >= 1) {
          t = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) {
            break;
          }
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)", ["BuffId", e.Id], ["AttributeId", t]);
        } else {
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定上下限属性额外效果15或16的Buff配置的效果参数过少 < 1，此效果无效", ["BuffId", e.Id]);
        }
        return false;
    }
    return true;
  }
  static HasBuffEffects(e) {
    for (const t of e) {
      if ((0, ExtraEffectDefine_1.getBuffEffectClass)(t.ExtraEffectId)) {
        return true;
      }
    }
    return false;
  }
  static HasBuffPeriodExecutions(e) {
    for (const t of e) {
      if (ExtraEffectBaseTypes_1.periodExecutionIds.has(t.ExtraEffectId)) {
        return true;
      }
    }
    return false;
  }
}
BuffController.uoh = true;
BuffController.W5g = new Set();
BuffController.CueTimeLimit = new TimeLimit_1.TimeLimit(TIME_LIMIT_MICRO_SECOND);
BuffController.MQo = Stats_1.Stat.Create("BuffController.AddBuffRef");
exports.default = BuffController; //# sourceMappingURL=CharacterBuffController.js.map