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
class BuffController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (BuffController.uoh && !UE.KuroStaticLibrary.IsLowMemoryDevice()) {
      var e = BuffGetAll_1.configBuffGetAll.GetConfigList(false);
      if (e) {
        for (const f of e) {
          BuffController.AddBuffRef(f);
        }
      }
    }
    return super.OnInit();
  }
  static SetHandlePrefix(e, f) {
    var t = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1;
    if (e < 0 || t < e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 19, "Invalid Buff Handle prefix.", ["prefix", e], ["handleStart", f]);
      }
      e &= t;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 19, "Set GameplayEffect Handle prefix.", ["prefix", e], ["handleStart", f]);
    }
    var t = ModelManager_1.ModelManager.BuffModel;
    t.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE;
    t.LastHandle = Math.max(f, t.LastHandle);
  }
  static GenerateHandle() {
    var e = ModelManager_1.ModelManager.BuffModel;
    return (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) + (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK);
  }
  static GetBuffDefinition(e) {
    var f = ModelManager_1.ModelManager.BuffModel.Get(e);
    return f || ((f = BuffById_1.configBuffById.GetConfig(e)) ? BuffController.AddBuffRef(f) : void CombatLog_1.CombatLog.Error("Buff", undefined, "无法查找到对应编号的Buff。", ["BuffId", e]));
  }
  static ParseExtraEffect(e) {
    var f;
    var t;
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
      t = ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(e.Id, f, 1);
      if (r = (0, ExtraEffectDefine_1.getBuffExecutionClass)(e.ExtraEffectID)) {
        r = r.Create(e.Id, t, f);
        f.ExecutionEffect = r;
      }
      return f;
    }
  }
  static vQo(e) {
    var f = [e];
    for (const r of e.RelatedExtraEffectBuffId) {
      var t = BuffById_1.configBuffById.GetConfig(r);
      if (t) {
        f.push(t);
      }
    }
    return f;
  }
  static AddBuffRef(e) {
    this.MQo.Start();
    var f = new BuffTypes_1.BuffDefinition();
    f.Id = e.Id;
    if (!Info_1.Info.IsBuildShipping) {
      f.Desc = "";
    }
    f.StackLimitCount = e.StackLimitCount;
    f.FormationPolicy = e.FormationPolicy;
    f.StackingType = e.StackingType;
    f.DefaultStackCount = e.DefaultStackCount;
    f.StackAppendCount = e.StackAppendCount;
    f.Probability = e.Probability;
    f.DurationMagnitude = e.DurationMagnitude;
    f.DurationPolicy = e.DurationPolicy;
    f.DurationMagnitude2 = e.DurationMagnitude2;
    f.DurationCalculationPolicy = e.DurationCalculationPolicy;
    f.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime;
    f.Period = e.Period;
    f.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy;
    f.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication;
    f.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy;
    f.StackPeriodResetPolicy = e.StackPeriodResetPolicy;
    f.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber;
    f.DenyOverflowAdd = e.bDenyOverflowApplication;
    f.ClearStackOnOverflow = e.bClearStackOnOverflow;
    if (e.GameAttributeID > 0) {
      f.Modifiers.push({
        AttributeId: e.GameAttributeID,
        Value1: e.ModifierMagnitude,
        Value2: e.ModifierMagnitude2,
        CalculationPolicy: e.CalculationPolicy
      });
    }
    f.PrematureExpirationEffects = e.PrematureExpirationEffects;
    f.RoutineExpirationEffects = e.RoutineExpirationEffects;
    f.OverflowEffects = e.OverflowEffects;
    f.GameplayCueIds = e.GameplayCueIds;
    f.DeadRemove = e.DeadRemove;
    if (e.RemoveBuffWithTags.length > 0) {
      f.RemoveBuffWithTags = e.RemoveBuffWithTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedTags.length > 0) {
      f.GrantedTags = e.GrantedTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagRequirements.length > 0) {
      f.AddInstigatorTagRequirements = e.ApplicationSourceTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagIgnores.length > 0) {
      f.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagRequirements.length > 0) {
      f.AddTagRequirements = e.ApplicationTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagIgnores.length > 0) {
      f.AddTagIgnores = e.ApplicationTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagRequirements.length > 0) {
      f.ActivateTagRequirements = e.OngoingTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagIgnores.length > 0) {
      f.ActivateTagIgnores = e.OngoingTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagRequirements.length > 0) {
      f.RemoveTagExistAll = e.RemovalTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagIgnores.length > 0) {
      f.RemoveTagIgnores = e.RemovalTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTags.length > 0) {
      f.ImmuneTags = e.GrantedApplicationImmunityTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTagIgnores.length > 0) {
      f.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    var t = this.vQo(e);
    for (const i of t) {
      if (i && this.EQo(i)) {
        switch (i.ExtraEffectID) {
          case 43:
            f.RemoveTagExistAny = f.RemoveTagExistAny ?? [];
            for (const s of i.ExtraEffectParameters[0].split("#").map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim())).filter(e => e !== undefined)) {
              f.RemoveTagExistAny.push(s);
            }
            continue;
          case 57:
            f.BuffsAddedByStackCountOnRemoved = f.BuffsAddedByStackCountOnRemoved ?? [];
            for (const u of i.ExtraEffectParameters[0].split("#").map(e => Number(e)) ?? []) {
              f.BuffsAddedByStackCountOnRemoved.push(u);
            }
            continue;
        }
        var r = this.ParseExtraEffect(i);
        if (r) {
          f.EffectInfos.push(r);
        }
      }
    }
    if (e.BuffAction) {
      f.BuffAction = [];
      for (const c of e.BuffAction ?? []) {
        var a = c.split("#").map(e => e.trim());
        const n = [["BuffId", e.Id], ["Action", c]];
        if (a.length < 2) {
          CombatLog_1.CombatLog.Error("Buff", undefined, "BuffAction参数过少", ...n);
        } else {
          var o = Number(a[0]);
          switch (o) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
              try {
                f.BuffAction.push({
                  Type: o,
                  Buffs: a.slice(1).map(e => Number(e))
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
              f.BuffAction.push({
                Type: o,
                Tags: a.slice(1).map(e => {
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
    f.HasBuffEffect = this.HasBuffEffects(f.EffectInfos);
    f.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(f.EffectInfos);
    ModelManager_1.ModelManager.BuffModel.Add(e.Id, f);
    this.MQo.Stop();
    return f;
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
          var f = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(f)) {
            break;
          }
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性额外效果14的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)", ["BuffId", e.Id], ["AttributeId", f]);
        } else {
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性额外效果14的Buff配置的效果参数过少 < 2，此效果无效", ["BuffId", e.Id]);
        }
        return false;
      case 15:
      case 16:
        if (e.ExtraEffectParameters.length >= 1) {
          f = Number(e.ExtraEffectParameters[0]);
          if (CharacterAttributeTypes_1.stateAttributeIds.has(f)) {
            break;
          }
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定属性上下限额外效果的Buff配置的属性Id不是状态属性（生命、能量等），此效果无效(如锁定生命，应该填生命属性的Id而不是上限属性的Id)", ["BuffId", e.Id], ["AttributeId", f]);
        } else {
          CombatLog_1.CombatLog.Error("Buff", undefined, "带有锁定上下限属性额外效果15或16的Buff配置的效果参数过少 < 1，此效果无效", ["BuffId", e.Id]);
        }
        return false;
    }
    return true;
  }
  static HasBuffEffects(e) {
    for (const f of e) {
      if ((0, ExtraEffectDefine_1.getBuffEffectClass)(f.ExtraEffectId)) {
        return true;
      }
    }
    return false;
  }
  static HasBuffPeriodExecutions(e) {
    for (const f of e) {
      if (ExtraEffectBaseTypes_1.periodExecutionIds.has(f.ExtraEffectId)) {
        return true;
      }
    }
    return false;
  }
}
BuffController.uoh = true;
BuffController.MQo = Stats_1.Stat.Create("BuffController.AddBuffRef");
exports.default = BuffController; //# sourceMappingURL=CharacterBuffController.js.map