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
    var a = (1 << ActiveBuffConfigs_1.BUFF_HANDLE_PREFIX_BYTE) - 1;
    if (e < 0 || a < e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 19, "Invalid Buff Handle prefix.", ["prefix", e], ["handleStart", f]);
      }
      e &= a;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 19, "Set GameplayEffect Handle prefix.", ["prefix", e], ["handleStart", f]);
    }
    var a = ModelManager_1.ModelManager.BuffModel;
    a.HandlePrefix = Math.floor(e) << ActiveBuffConfigs_1.BUFF_HANDLE_ID_BYTE;
    a.LastHandle = Math.max(f, a.LastHandle);
  }
  static GenerateHandle() {
    var e = ModelManager_1.ModelManager.BuffModel;
    return (++e.LastHandle & ActiveBuffConfigs_1.HANDLE_MASK) + (e.HandlePrefix & ~ActiveBuffConfigs_1.HANDLE_MASK);
  }
  static GetBuffDefinition(e) {
    var f = ModelManager_1.ModelManager.BuffModel.Get(e);
    return f || ((f = BuffById_1.configBuffById.GetConfig(e)) ? BuffController.AddBuffRef(f) : void CombatLog_1.CombatLog.Error("Buff", undefined, "无法查找到对应编号的Buff。", ["BuffId", e]));
  }
  static ParseExtraEffect(e, f) {
    var a;
    var t;
    var r;
    if (e && e.ExtraEffectID) {
      (a = new ExtraEffectBaseTypes_1.ExtraEffectParameters()).ExtraEffectId = e.ExtraEffectID;
      a.ExtraEffectParameters = e.ExtraEffectParameters;
      a.ExtraEffectGrowParameters1 = e.ExtraEffectParametersGrow1;
      a.ExtraEffectGrowParameters2 = e.ExtraEffectParametersGrow2;
      a.ExtraEffectRequirement = e.ExtraEffectRequirements;
      a.ExtraEffectRequirementPara = e.ExtraEffectReqPara;
      a.ExtraEffectRequirementSetting = e.ExtraEffectReqSetting;
      a.ExtraEffectCd = e.ExtraEffectCD;
      a.ExtraEffectRemoveStackNum = e.ExtraEffectRemoveStackNum;
      a.ExtraEffectProbability = e.ExtraEffectProbability;
      t = ExtraEffectLibrary_1.BuffExtraEffectLibrary.ResolveRequireAndLimits(e.Id, a, 1);
      if (r = (0, ExtraEffectDefine_1.getBuffExecutionClass)(e.ExtraEffectID)) {
        r = r.Create(e.Id, f, t, a);
        a.ExecutionEffect = r;
      }
      return a;
    }
  }
  static vQo(e) {
    var f = [e];
    for (const t of e.RelatedExtraEffectBuffId) {
      var a = BuffById_1.configBuffById.GetConfig(t);
      if (a) {
        f.push(a);
      }
    }
    return f;
  }
  static AddBuffRef(e) {
    this.MQo.Start();
    var f;
    var a;
    var t = new BuffTypes_1.BuffDefinition();
    t.Id = e.Id;
    if (!Info_1.Info.IsBuildShipping) {
      t.Desc = "";
    }
    t.StackLimitCount = e.StackLimitCount;
    t.FormationPolicy = e.FormationPolicy;
    t.StackingType = e.StackingType;
    t.DefaultStackCount = e.DefaultStackCount;
    t.StackAppendCount = e.StackAppendCount;
    t.Probability = e.Probability;
    t.DurationMagnitude = e.DurationMagnitude;
    t.DurationPolicy = e.DurationPolicy;
    t.DurationMagnitude2 = e.DurationMagnitude2;
    t.DurationCalculationPolicy = e.DurationCalculationPolicy;
    t.DurationAffectedByBulletTime = e.bDurationAffectedByBulletTime;
    t.Period = e.Period;
    t.PeriodicInhibitionPolicy = e.PeriodicInhibitionPolicy;
    t.ExecutePeriodicOnAdd = e.bExecutePeriodicEffectOnApplication;
    t.StackDurationRefreshPolicy = e.StackDurationRefreshPolicy;
    t.StackPeriodResetPolicy = e.StackPeriodResetPolicy;
    t.StackExpirationRemoveNumber = e.StackExpirationRemoveNumber;
    t.DenyOverflowAdd = e.bDenyOverflowApplication;
    t.ClearStackOnOverflow = e.bClearStackOnOverflow;
    if (e.GameAttributeID > 0) {
      t.Modifiers.push({
        AttributeId: e.GameAttributeID,
        Value1: e.ModifierMagnitude,
        Value2: e.ModifierMagnitude2,
        CalculationPolicy: e.CalculationPolicy
      });
    }
    t.PrematureExpirationEffects = e.PrematureExpirationEffects;
    t.RoutineExpirationEffects = e.RoutineExpirationEffects;
    t.OverflowEffects = e.OverflowEffects;
    t.GameplayCueIds = e.GameplayCueIds;
    t.DeadRemove = e.DeadRemove;
    if (e.RemoveBuffWithTags.length > 0) {
      t.RemoveBuffWithTags = e.RemoveBuffWithTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedTags.length > 0) {
      t.GrantedTags = e.GrantedTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagRequirements.length > 0) {
      t.AddInstigatorTagRequirements = e.ApplicationSourceTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationSourceTagIgnores.length > 0) {
      t.AddInstigatorTagIgnores = e.ApplicationSourceTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagRequirements.length > 0) {
      t.AddTagRequirements = e.ApplicationTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.ApplicationTagIgnores.length > 0) {
      t.AddTagIgnores = e.ApplicationTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagRequirements.length > 0) {
      t.ActivateTagRequirements = e.OngoingTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.OngoingTagIgnores.length > 0) {
      t.ActivateTagIgnores = e.OngoingTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagRequirements.length > 0) {
      t.RemoveTagExistAll = e.RemovalTagRequirements.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.RemovalTagIgnores.length > 0) {
      t.RemoveTagIgnores = e.RemovalTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTags.length > 0) {
      t.ImmuneTags = e.GrantedApplicationImmunityTags.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    if (e.GrantedApplicationImmunityTagIgnores.length > 0) {
      t.ImmuneTagIgnores = e.GrantedApplicationImmunityTagIgnores.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)).filter(e => e !== undefined);
    }
    for ([f, a] of this.vQo(e).entries()) {
      if (a && this.EQo(a)) {
        switch (a.ExtraEffectID) {
          case 43:
            t.RemoveTagExistAny = t.RemoveTagExistAny ?? [];
            for (const s of a.ExtraEffectParameters[0].split("#").map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.trim())).filter(e => e !== undefined)) {
              t.RemoveTagExistAny.push(s);
            }
            continue;
          case 57:
            t.BuffsAddedByStackCountOnRemoved = t.BuffsAddedByStackCountOnRemoved ?? [];
            for (const u of a.ExtraEffectParameters[0].split("#").map(e => Number(e)) ?? []) {
              t.BuffsAddedByStackCountOnRemoved.push(u);
            }
            continue;
        }
        var r = this.ParseExtraEffect(a, f);
        if (r) {
          t.EffectInfos.push(r);
        }
      }
    }
    if (e.BuffAction) {
      t.BuffAction = [];
      for (const c of e.BuffAction ?? []) {
        var o = c.split("#").map(e => e.trim());
        const n = [["BuffId", e.Id], ["Action", c]];
        if (o.length < 2) {
          CombatLog_1.CombatLog.Error("Buff", undefined, "BuffAction参数过少", ...n);
        } else {
          var i = Number(o[0]);
          switch (i) {
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
                t.BuffAction.push({
                  Type: i,
                  Buffs: o.slice(1).map(e => Number(e))
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
              t.BuffAction.push({
                Type: i,
                Tags: o.slice(1).map(e => {
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
    t.HasBuffEffect = this.HasBuffEffects(t.EffectInfos);
    t.HasBuffPeriodExecution = this.HasBuffPeriodExecutions(t.EffectInfos);
    ModelManager_1.ModelManager.BuffModel.Add(e.Id, t);
    this.MQo.Stop();
    return t;
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