"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const BattleLinkController_1 = require("../../../../../Module/Battle/Link/BattleLinkController");
const LogReportController_1 = require("../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const ActorUtils_1 = require("../../../../../Utils/ActorUtils");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const BulletTypes_1 = require("../../../../Bullet/BulletTypes");
const SceneItemDynamicAttachTargetComponent_1 = require("../../../../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const EntityHandle_1 = require("../../../EntityHandle");
const RoleAudioController_1 = require("../../../Role/RoleAudioController");
const AbilityUtils_1 = require("../../Component/Abilities/AbilityUtils");
const CharacterAttributeTypes_1 = require("../../Component/Abilities/CharacterAttributeTypes");
const CharacterBuffIds_1 = require("../../Component/Abilities/CharacterBuffIds");
const CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent");
const CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes");
const ExtraEffectBaseTypes_1 = require("../../Component/Abilities/ExtraEffect/ExtraEffectBaseTypes");
const LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug");
const SkillBehaviorAction_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorAction");
const SkillBehaviorCondition_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorCondition");
const SkillBehaviorMisc_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorMisc");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static ContainsTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    return !!t?.Valid && !!e && t.HasTag(e.TagId);
  }
  static AddTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    if (t?.Valid && e) {
      t.AddTag(e.TagId);
    }
  }
  static AddTagWithDuration(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 174);
    if (!!t?.Valid && !!i && !(e <= 0)) {
      t.AddTagWithReturnHandle([i.TagId], e);
    }
  }
  static AddTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    if (i?.Valid && (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) !== undefined) {
      i.AddTag(e);
      i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
      t = StringUtils_1.StringUtils.Format("GmAddTag {0} {1} 1", i.toString(), e.toString());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
    }
  }
  static RemoveTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    if (t?.Valid && e) {
      t.RemoveTag(e.TagId);
    }
  }
  static RemoveTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 205);
    if (i?.Valid && (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) !== undefined) {
      i.RemoveTag(e);
      i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
      t = StringUtils_1.StringUtils.Format("GmRemoveTag {0} {1}", i.toString(), e.toString());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
    }
  }
  static AddCue(t, e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 21);
    if (r?.Valid) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t || e);
      r.AddCue(Number(i), {
        Instigator: t
      });
    }
  }
  static RemoveCue(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 21);
    if (t?.Valid) {
      t.RemoveCue(Number(e));
    }
  }
  static IsLogicAutonomousProxy(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? false;
  }
  static RemoveActiveGameplayEffect(t, e, i = -1) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 174);
    return !!t?.Valid && t.RemoveBuffByHandle(e.Handle, i) > 0;
  }
  static RemoveBuffByTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 174);
    if (t?.Valid && e) {
      t.RemoveBuffByTag(e.TagId, "蓝图通过Tag移除Buff");
    }
  }
  static AddPassiveSkill(t, e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 19, "废弃接口已无效");
    }
  }
  static RemovePassiveSkill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    if (t?.Valid) {
      t.ForgetPassiveSkill(Number(e));
    }
  }
  static SetPassiveGaSkillId(t, e) {}
  static AddBuffForDebug(t, e, i) {
    var r;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    if (t) {
      if (r = EntitySystem_1.EntitySystem.GetComponent(e, 174)) {
        r.AddBuffForDebug(Number(i), {
          InstigatorId: t,
          Reason: "AddBuffForDebug"
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "添加buff对象没有BuffComponent", ["TargetEntityId", e], ["BuffId", i]);
      }
    }
  }
  static GetSpecialBuffToSkillId(t, e) {
    if (e !== "") {
      return e;
    } else if (e = CharacterBuffIds_1.specialBuffToSkillIdMap.get(t)) {
      return e.toString();
    } else {
      return "";
    }
  }
  static TryGetSummonedEntitySkillInner(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetSummonedEntity(EntitySystem_1.EntitySystem.Get(t), i)?.Entity?.GetComponent(40)?.GetSkill(e);
  }
  static TryGetSummonedEntitySkill(t, e) {
    let i = this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom);
    return i = (i = i || this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)) || this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole);
  }
  static AddBuffFromGA(i, r, n, a, s) {
    a = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(Number(n), a);
    if (a === "" && CharacterBuffIds_1.specialIgnoreGaBuff.findIndex(t => t === Number(n)) === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 35, "AddBuffFromGA的SkillId为空", ["buffId", n]);
      }
    } else {
      var o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i);
      if (o) {
        var y = EntitySystem_1.EntitySystem.GetComponent(i, 39)?.GetSkill(Number(a));
        let t = y?.MNc;
        let e = y?.AbilityClass?.GetName();
        if (!t) {
          y = EntitySystem_1.EntitySystem.GetComponent(i, 0).GetSummonerId();
          e = (y > 0 ? (y = ModelManager_1.ModelManager.CreatureModel.GetEntity(y)?.Entity?.GetComponent(39), t = y?.GetSkill(Number(a))?.MNc, y?.GetSkill(Number(a))) : (y = TsGameplayBlueprintFunctionLibrary.TryGetSummonedEntitySkill(i, Number(a)), t = y?.MNc, y))?.AbilityClass?.GetName();
        }
        if (r instanceof TsBaseCharacter_1.default) {
          if (i = r.CharacterActorComponent.Entity.CheckGetComponent(174)) {
            i.AddBuff(Number(n), {
              InstigatorId: o,
              Reason: `技能${a}GA${e}的buff添加`,
              PreMessageId: t,
              OuterStackCount: s
            });
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 19, "添加buff对象没有BuffComponent", ["Target", r.GetName()], ["BuffId", n]);
          }
        }
      }
    }
  }
  static RemoveBuffById(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 174);
    if (t?.Valid) {
      t.RemoveBuff(Number(e), i, "从蓝图移除Buff");
    }
  }
  static GetBuffCountById(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(209);
    if (t?.Valid) {
      return t.GetBuffTotalStackById(Number(e), i);
    } else {
      return 0;
    }
  }
  static AddGameplayCueLocal(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 209);
    if (t?.Valid) {
      i = [Number(i)];
      t.AddGameplayCue(i, e, "蓝图AddGameplayCueLocal");
    }
  }
  static GetGeDebugString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetGeDebugStrings() ?? "";
  }
  static GetTagDebugStrings(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetTagDebugStrings() ?? "";
  }
  static GetBuffDebugStrings(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetBuffDebugStringsNoBlueprint(t, e);
  }
  static GetShieldDebugString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetShieldDebugString().trim() ?? "";
  }
  static GetPassiveSkillDebugString(t) {
    return "";
  }
  static GetShieldValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 75)?.GetShieldValue(e) ?? 0;
  }
  static GetBuffDebugStringsNoBlueprint(t, e = "") {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 174);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    return (i?.GetDebugBuffString(e) ?? "未找到buff组件") + "\n" + t?.GetShieldDebugString();
  }
  static GetAttributeDebugString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetAttributeDebugStrings() ?? "";
  }
  static GetAllAttributeDebugStrings(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetAllAttributeDebugStrings() ?? "";
  }
  static GetServerBuffString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerBuffString();
  }
  static GetServerTagString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerTagString();
  }
  static GetServerAttributeString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerAttributeString();
  }
  static GetServerPartString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerPartString();
  }
  static GetServerHateString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerHateString();
  }
  static GetServerShieldString(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetServerShieldString();
  }
  static ServerDebugInfoRequest(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfoRequest();
  }
  static GetServerDebugInfoDirty(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfoDirty ?? false;
  }
  static SetServerDebugInfoDirty(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t) {
      t.ServerDebugInfoDirty = e;
    }
  }
  static DebugResetBaseVal(t, e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (r) {
      r?.DebugResetBaseValue(e, i);
    }
    var r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    var t = StringUtils_1.StringUtils.Format("GmSetAttribute {0} {1} {2}", r.toString(), e.toString(), i.toString());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
  }
  static DebugResetFormationValue(t, e) {
    FormationAttributeController_1.FormationAttributeController.SetValue(t, e);
  }
  static Record(t, e) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (e) {
        CharacterGasDebugComponent_1.CharacterGasDebugComponent.BeginRecord();
        return "";
      } else {
        return CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord();
      }
    } else {
      return "";
    }
  }
  static RefreshEntityListView(e) {
    var t;
    var i = e.GetListItems();
    var r = new Set();
    for (let t = i.Num() - 1; t >= 0; t--) {
      var n = i.Get(t);
      var a = Number(n.GetName().split(",")[0]);
      if (!Number.isNaN(a) || r.has(a)) {
        e.RemoveItem(n);
      } else {
        r.add(a);
      }
    }
    for (const s of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (!r.has(s.Id)) {
        t = (t = s?.Entity?.GetComponent(3)?.Actor?.GetName()) ? `${s.constructor.name}_${s.Id}[${t}]` : s.constructor.name + "_" + s.Id;
        t = new UE.Layer(e, s.Id + "," + t);
        e.AddItem(t);
      }
    }
  }
  static RefreshEntityComboBox(e) {
    var t;
    var i;
    var r = e.GetOptionCount();
    var n = new Set();
    for (let t = r - 1; t >= 0; t--) {
      var a = e.GetOptionAtIndex(t);
      var s = Number(/_(?<entityId>\d+)$/.exec(a)?.groups.entityId ?? 0);
      if (s === 0 || n.has(s) || !EntitySystem_1.EntitySystem.Get(s)) {
        e.RemoveOption(a);
      } else {
        n.add(s);
      }
    }
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (!n.has(o?.Id)) {
        if (i = (t = o?.Entity)?.GetComponent(3)?.Actor?.GetName()) {
          e.AddOption(i + "_" + o.Id);
        } else if ((i = t?.GetComponent(233)) && i.VehicleFeatures.has(2)) {
          i = t?.GetComponent(1)?.Owner?.GetName();
          e.AddOption(i + "_" + o.Id);
        }
      }
    }
  }
  static SetEntityComboBox(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(e);
    var r = i?.GetComponent(1)?.Owner?.GetName();
    var n = t.GetSelectedOption();
    if (i && r) {
      if (Number(/_(?<entityId>\d+)$/.exec(n)?.groups.entityId ?? -1) !== e) {
        if (t.FindOptionIndex(i = r + "_" + e) < 0) {
          t.AddOption(i);
        }
        t.SetSelectedOption(i);
      }
    } else if (n) {
      t.ClearSelection();
    }
  }
  static SetDebugEntityId(t) {
    CombatDebugController_1.CombatDebugController.DebugEntityId = CombatDebugController_1.CombatDebugController.DebugEntityId === t ? 0 : t;
  }
  static GetDebugEntityId() {
    return CombatDebugController_1.CombatDebugController.DebugEntityId ?? 0;
  }
  static RefreshBuffListView(t, e, i = "") {
    var r = [...i.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var n = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(209);
    if (n) {
      var a;
      var s;
      var o = e.GetListItems();
      var y = new Set();
      for (let t = o.Num() - 1; t >= 0; t--) {
        var l = o.Get(t);
        const c = n.GetBuffByHandle(Number(l.GetName().split(",")[1]));
        if (c === undefined || y.has(c.Handle) || r.length > 0 && !r.some(t => String(c.Id).startsWith(t))) {
          e.RemoveItem(l);
        } else {
          y.add(c.Handle);
        }
      }
      for (const S of n.GetAllBuffs()) {
        if (!y.has(S.Handle) && (!(r.length > 0) || !!r.some(t => String(S.Id).startsWith(t)))) {
          a = new UE.Layer(e, t + "," + S.Handle);
          e.AddItem(a);
        }
      }
      if ((0, RegisterComponent_1.isComponentInstance)(n, 190) && n.GetFormationBuffComp()) {
        for (const u of n.GetFormationBuffComp().GetAllBuffs()) {
          if (!y.has(u.Handle) && (!(r.length > 0) || !!r.some(t => String(u.Id).startsWith(t)))) {
            s = new UE.Layer(e, t + "," + u.Handle);
            e.AddItem(s);
          }
        }
      }
    } else {
      e.ClearListItems();
    }
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(209);
    var i = t?.GetBuffByHandle(e);
    return i || (!i && (0, RegisterComponent_1.isComponentInstance)(t, 190) ? t.GetFormationBuffComp().GetBuffByHandle(e) : undefined);
  }
  static GetBuffIdByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    return BigInt(t?.Id ?? 0) ?? -1n;
  }
  static GetBuffServerIdByHandle(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.ServerId ?? -1;
  }
  static GetBuffDescByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    e = t?.Config?.Desc ?? "Invalid";
    if ((0, RegisterComponent_1.isComponentInstance)(t?.GetOwnerBuffComponent(), 199)) {
      return `【编队buff】
${e}`;
    } else {
      return e;
    }
  }
  static GetBuffActivateByHandle(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.IsActive() ?? false;
  }
  static GetBuffInstigatorStringByHandle(t, e) {
    return TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.GetInstigatorActorComponent()?.Actor.GetName() ?? "Invalid";
  }
  static GetBuffPeriodStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    if (t !== undefined && t.Period > 0) {
      return t.GetRemainPeriod().toFixed(1) + "/" + t.Period.toFixed(1);
    } else {
      return "无";
    }
  }
  static GetBuffDurationStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    if (t !== undefined && t.Duration > 0) {
      return t.GetRemainDuration().toFixed(1) + "/" + t.Duration.toFixed(1);
    } else {
      return "无限";
    }
  }
  static GetBuffDurationProgress(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    if (t !== undefined && t.Duration > 0) {
      return t.GetRemainDuration() / t.Duration;
    } else {
      return 1;
    }
  }
  static GetBuffLivingStatusStringByHandle(t, e) {
    t = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    if (t?.IsValid()) {
      if (t.IsActive()) {
        return "激活";
      } else {
        return "失效";
      }
    } else {
      return "销毁";
    }
  }
  static GetBuffLevelStringByHandle(t, e) {
    return "" + (TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Level ?? "Invalid");
  }
  static GetBuffStackStringByHandle(t, e) {
    return "" + (TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e)?.StackCount ?? "Invalid");
  }
  static GetBuffDebugStringByHandle(t, e) {
    let n = "";
    const a = TsGameplayBlueprintFunctionLibrary.GetDebugBuff(t, e);
    var i = a?.GetOwnerBuffComponent();
    if (!a || !i) {
      return n;
    }
    a.Config.GrantedTags?.forEach(t => {
      n += `附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
    });
    for (const s of i.BuffEffectManager?.GetEffectsByHandle(a.Handle) ?? []) {
      n += `持续效果 ${""}(cd:${(i.GetBuffEffectCd(s.BuffId, s.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
    }
    for (const o of a.Config.EffectInfos) {
      var r = o.ExecutionEffect;
      if (ExtraEffectBaseTypes_1.periodExecutionIds.has(o.ExtraEffectId) && r) {
        n += "周期效果 \n";
      }
    }
    a.Config.Modifiers?.forEach(t => {
      var e = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value1 ?? [], a.Level, 0);
      var i = AbilityUtils_1.AbilityUtils.GetLevelValue(t.Value2 ?? [], a.Level, 0);
      var r = undefined;
      switch (t.CalculationPolicy[0]) {
        case 0:
          n += `属性${r}增加${t.Value1}
`;
          break;
        case 1:
          n += `属性${r}增加${(e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * 100).toFixed(1)}%
`;
          break;
        case 2:
        case 4:
          n += `属性${r}${t.CalculationPolicy[0] === 2 ? "增加" : "覆盖为"}${t.CalculationPolicy[2] === 1 ? "施加者" : "持有者"}${Protocol_1.Aki.Protocol.Vks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(e * 0.01).toFixed(1)}%+${i}${t.CalculationPolicy[4] ? "(快照)" : ""}`;
          if (t.CalculationPolicy[5]) {
            n += "，下限" + t.CalculationPolicy[5];
          }
          if (t.CalculationPolicy[6]) {
            n += "，比例" + t.CalculationPolicy[6];
          }
          if (t.CalculationPolicy[7]) {
            n += "，上限" + t.CalculationPolicy[7];
          }
          n += "\n";
          break;
        case 9:
          n += `属性${r}以${Protocol_1.Aki.Protocol.Vks[t.CalculationPolicy[1]]}${["基础值", "当前值", "附加值"][t.CalculationPolicy[3]]}的${(e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * 100).toFixed(1)}%为万分比增加/减少
`;
          break;
        case 3:
          n += `属性${r}覆盖为${t.Value1}
`;
          break;
        default:
          n += "修改属性" + r;
      }
    });
    return n.trimEnd();
  }
  static SetDistance(t, e) {
    CharacterGasDebugComponent_1.CharacterGasDebugComponent.SetDistanceMax(e);
  }
  static GetAllMovementHistory(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetAllMovementHistory();
  }
  static ResetBaseValueLocal(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 22)?.DebugResetBaseValue(e, i);
  }
  static GetAttributeCurrentValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 173)?.GetCurrentValue(e);
  }
  static GetAttributeBaseValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 173)?.GetBaseValue(e);
  }
  static SetRageModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.SetRageModeId(e);
  }
  static SetHardnessModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.SetHardnessModeId(e);
  }
  static OnHit(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 61);
    e = BulletTypes_1.HitInformation.FromUeHitInformation(e);
    t?.OnHit(e, undefined, false, false, undefined, undefined);
  }
  static SetBeHitIgnoreRotate(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.SetBeHitIgnoreRotate(e);
  }
  static CheckHasPart(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.IsMultiPart ?? false;
  }
  static GetPartRemainedLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 69);
    if (t?.IsMultiPart) {
      return t.GetPartByTag(e).RemainedLife();
    } else {
      return -1;
    }
  }
  static ResetPartLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 69);
    if (t?.IsMultiPart) {
      t.GetPartByTag(e).ResetLife();
    }
  }
  static ActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.ActiveStiff(1);
  }
  static DeActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.DeActiveStiff("蓝图退出硬直");
  }
  static GetAcceptedNewBeHitAndReset(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.GetAcceptedNewBeHitAndReset() ?? false;
  }
  static GetEnterFkAndReset(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.GetEnterFkAndReset() ?? false;
  }
  static IsStiff(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.IsStiff() ?? false;
  }
  static GetRageModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.RageModeId;
  }
  static GetHardnessModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.HardnessModeId;
  }
  static GetBeHitBone(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 61);
    if (t?.BeHitBones && t?.BeHitBones?.length > 0) {
      return t.BeHitBones[0];
    } else {
      return FNameUtil_1.FNameUtil.EMPTY;
    }
  }
  static GetToughDecreaseValue(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.ToughDecreaseValue;
  }
  static GetCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.CounterAttackInfoInternal;
  }
  static GetVisionCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.VisionCounterAttackInfoInternal;
  }
  static GetBeHitTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.BeHitTime;
  }
  static GetBeHitAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 61);
    if (t) {
      return t.BeHitAnim;
    } else {
      return 0;
    }
  }
  static GetEnterFk(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.EnterFk ?? false;
  }
  static GetBeHitDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.BeHitDirect.ToUeVector();
  }
  static GetBeHitLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.BeHitLocation.ToUeVector();
  }
  static AddCheckBuffList(t, e) {}
  static ClearCheckBuffList(t) {}
  static CounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.CounterAttackEnd();
  }
  static VisionCounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.VisionCounterAttackEnd();
  }
  static SetCounterAttackEndTime(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 61)?.SetCounterAttackEndTime(e);
  }
  static IsTriggerCounterAttack(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 61)?.IsTriggerCounterAttack ?? false;
  }
  static ResetTarget(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 32)?.ResetTarget();
  }
  static SetShowTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    if (t?.Valid) {
      if (e) {
        e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity;
        t.SetShowTarget(new EntityHandle_1.EntityHandle(e));
      } else {
        t.SetShowTarget(undefined);
      }
    }
  }
  static ExitLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    if (t?.Valid) {
      t.ExitLockDirection();
    }
  }
  static EnterLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    if (t?.Valid) {
      t.EnterLockDirection();
    }
  }
  static GetCurrentTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    if (t?.Valid) {
      return t.GetCurrentTarget()?.Entity?.GetComponent(1)?.Owner;
    }
  }
  static SetLockOnDebugLine(t, e) {
    LockOnDebug_1.LockOnDebug.IsShowDebugLine = e;
  }
  static ManipulateValid(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 65)?.Valid ?? false;
  }
  static ManipulateGetDrawTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      return t.GetDrawTarget();
    }
  }
  static ManipulateGetCastTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      return t.GetCastTarget();
    }
  }
  static ManipulateGetDrawTargetChantTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      return t.GetDrawTargetChantTime();
    } else {
      return 0;
    }
  }
  static ManipulateChant(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.Chant(e);
  }
  static ManipulateDraw(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.Draw();
  }
  static ManipulateCast(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.Precast(e);
  }
  static ManipulateReset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      t.Reset();
    }
  }
  static ManipulateChangeToProjectileState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.ChangeToProjectileState();
  }
  static ManipulateChangeToNormalState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.ChangeToNormalState();
  }
  static GetHoldingActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      return t.GetHoldingActor();
    }
  }
  static SetDebugDraw(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      t.DebugDrawSphereAndArrow = e;
    }
  }
  static ExtraAction(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    if (t?.Valid) {
      t.ExtraAction();
    }
  }
  static SetQtePosition(t, e, i, r, n, a, s, o = 0) {
    EntitySystem_1.EntitySystem.GetComponent(t, 98)?.SetQtePosition({
      Rotate: e,
      Length: i,
      Height: r,
      ReferenceTarget: n,
      QteType: o
    });
  }
  static GetGoBattleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 98)?.GoBattleActor;
  }
  static GetDtSkillInfo(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.DtSkillInfo;
    }
  }
  static GetDtSkillInfoMapForDebug(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      const i = UE.NewMap(UE.BuiltinInt, UE.DataTable);
      t.DtSkillInfoMapForDebug.forEach((t, e) => {
        i.Add(e, t);
      });
      return i;
    }
  }
  static GetLastActivateSkillTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      return t.LastActivateSkillTime;
    } else {
      return 0;
    }
  }
  static SetLastActivateSkillTime(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      t.SetLastActivateSkillTime(e);
    }
  }
  static GetSkillElevationAngle(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      return t.SkillElevationAngle;
    } else {
      return 0;
    }
  }
  static SetSkillElevationAngle(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      t.SetSkillElevationAngle(e);
    }
  }
  static CurrentSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.CurrentSkill?.SkillId.toString();
    } else {
      return "";
    }
  }
  static CurrentPriority(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.CurrentPriority;
    } else {
      return 0;
    }
  }
  static SetCurrentPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.SetCurrentPriority(e);
    }
  }
  static HasAbility(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return !!t?.Valid && t.HasAbility(Number(e));
  }
  static GetSkillInfo(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetSkillInfo(Number(e));
    }
  }
  static SetSkillPriority(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.SetSkillPriority(Number(e), i);
    }
  }
  static EndSkill(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
    }
  }
  static BeginSkill(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return !!t?.Valid && t.BeginSkill(Number(e.toString()), {
      Target: r,
      SocketName: n.toString(),
      Reason: "TsGameplayBlueprintFunctionLibrary.BeginSkill"
    });
  }
  static BeginSkillAsync(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.BeginSkillAsync(Number(e.toString()), {
        Target: i,
        SocketName: r.toString(),
        Reason: "TsGameplayBlueprintFunctionLibrary.BeginSkillAsync"
      }).then(t => {
        n.Callback.Broadcast(t);
      });
    }
  }
  static SkillBehaviorBegin(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var r = t?.GetComponent(39);
    var e = r?.GetSkill(e.SkillId);
    if (t && r?.Valid && e) {
      t = {
        Entity: t,
        SkillComponent: r,
        Skill: e
      };
      SkillBehaviorAction_1.SkillBehaviorAction.Begin(i, t);
    }
  }
  static GetLocationByAction(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var r = t?.GetComponent(39);
    var e = r?.GetSkill(e.SkillId);
    if (t && r?.Valid && e) {
      t = {
        Entity: t,
        SkillComponent: r,
        Skill: e
      };
      return SkillBehaviorAction_1.SkillBehaviorAction.CalculateLocation(i, t);
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  static GetRotationByAction(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var r = t?.GetComponent(39);
    var e = r?.GetSkill(e.SkillId);
    if (t && r?.Valid && e) {
      t = {
        Entity: t,
        SkillComponent: r,
        Skill: e
      };
      return SkillBehaviorAction_1.SkillBehaviorAction.CalculateRotation(i, t);
    } else {
      return Rotator_1.Rotator.ZeroRotator;
    }
  }
  static SkillBehaviorSatisfy(t, e, i) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var r = t?.GetComponent(39);
    var e = r?.GetSkill(e.SkillId);
    return !!t && !!r?.Valid && !!e && (t = {
      Entity: t,
      SkillComponent: r,
      Skill: e
    }, SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(i, t));
  }
  static GetSkillTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid && t.SkillTarget) {
      return t.SkillTarget?.Entity?.GetComponent(1)?.Owner;
    } else {
      return undefined;
    }
  }
  static SetSkillTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid && (t.SkillTarget = undefined, e) && (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity)) {
      t.SkillTarget = new EntityHandle_1.EntityHandle(e);
    }
  }
  static LockOnTargetAndSetShow(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.LockOnTargetAndSetShow(e);
    }
  }
  static IsHasInputDir(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    return !!t?.Valid && t.IsHasInputDir();
  }
  static GetSkillIdWithGroupId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetSkillIdWithGroupId(e)?.toString();
    } else {
      return "";
    }
  }
  static GetSkillAcceptInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return !!t?.Valid && t.SkillAcceptInput;
  }
  static SetSkillAcceptInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.SetSkillAcceptInput(e);
    }
  }
  static SetCommonSkillCanBeInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.IsMainSkillReadyEnd = e;
    }
  }
  static GetCommonSkillCanBeInterrupt(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    return !!t?.Valid && t.IsMainSkillReadyEnd;
  }
  static OnActivateAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.OnActivateAbility(e, i);
    } else {
      return -1;
    }
  }
  static OnEndAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.OnEndAbility(e, i);
    }
  }
  static GetPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetPriority(Number(e));
    } else {
      return -1;
    }
  }
  static GetActivePriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetActivePriority(Number(e));
    } else {
      return -1;
    }
  }
  static GetSkillMontageInstance(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetSkillMontageInstance(Number(e), i);
    }
  }
  static SetSkillRotateLocation(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      e = Vector_1.Vector.Create(e);
      t.SetRotateTarget(e, 1);
    }
  }
  static SetSkillRotateDirect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      e = Vector_1.Vector.Create(e);
      t.SetRotateTarget(e, 2);
    }
  }
  static CallAnimBreakPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.CallAnimBreakPoint();
    }
  }
  static RollingGround(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      t.RollingGrounded();
    }
  }
  static ActivateAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    return !!t?.Valid && t.ActivateAbilityVision(e);
  }
  static EndAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    return !!t?.Valid && t.EndAbilityVision(e);
  }
  static ActivateAbilityVisionPlayAudio(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (i?.Valid) {
      switch (e) {
        case 1:
          RoleAudioController_1.RoleAudioController.PlayRoleAudio(i.Entity, 2001);
          break;
        case 0:
          RoleAudioController_1.RoleAudioController.PlayRoleAudio(i.Entity, 2002);
      }
    }
  }
  static GetVisionIdList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      return t.GetVisionIdList();
    } else {
      return UE.NewArray(UE.BuiltinInt);
    }
  }
  static ExitMultiSkillStateOfMorphVision(t) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(42)?.ExitMultiSkillState();
  }
  static SetKeepMultiSkillState(t, e, i) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(42)?.SetKeepMultiSkillState(e, i);
  }
  static SetEnableAttackInputActionOfMorphVision(t, e) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(42)?.SetEnableAttackInputAction(e);
  }
  static GetVisionLevelList(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      return t.GetVisionLevelList();
    } else {
      return UE.NewArray(UE.BuiltinInt);
    }
  }
  static GetVisionSkillId(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
  }
  static InterruptSkill(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.InterruptSkill");
    }
  }
  static DeleteSkills(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
    }
  }
  static GetCurrentMontageCorrespondingSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetCurrentMontageCorrespondingSkillId()?.toString();
    } else {
      return "";
    }
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.SkillTargetSocket = e;
    }
  }
  static GetSocketName(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.SkillTargetSocket;
    } else {
      return "";
    }
  }
  static GetPointTransform(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 1);
    if (t?.Valid) {
      e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
      if ((t = t.SkeletalMesh)?.DoesSocketExist(e)) {
        return t.D_GetSocketTransform(e, 0);
      } else {
        return undefined;
      }
    }
  }
  static PlaySkillMontage2Server(t, e, i, r, n, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.PlaySkillMontage2Server(Number(e), i, r, n, a);
    }
  }
  static EndSkillMontage(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.EndSkillMontage(Number(e), i);
    }
  }
  static BeginAddMoveByInputDirect(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 252)?.SpecialSkill;
    if (t) {
      t.BeginAddMoveByInputDirect?.(e, i, r, n);
    }
  }
  static EndAddMoveByInputDirect(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 252)?.SpecialSkill;
    if (t) {
      t.EndAddMoveByInputDirect?.();
    }
  }
  static CanActivateFixHook(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && t.CanActivateFixHook();
  }
  static FixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetCurrentTargetLocation().ToUeVector();
    }
  }
  static FixHookTargetPathways(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      t = t.GetCurrentPathways();
      if (t) {
        var e = UE.NewArray(UE.VectorDouble);
        for (const i of t) {
          e.Add(i[0].ToUeVector());
          e.Add(i[1].ToUeVector());
        }
        return e;
      }
    }
  }
  static FixHookTargetEnterPortalCapture(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetCurrentTargetEnterPortalCapture();
    }
  }
  static FixHookTargetActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetCurrentTargetActor();
    }
  }
  static FixHookTargetIsSuiGuangType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && t.GetTargetIsSuiGuangType();
  }
  static GetHookTargetType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetTargetType();
    } else {
      return 0;
    }
  }
  static FixHookTargetForward(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetCurrentTargetForward();
    }
  }
  static NextFixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return t.GetNextTargetLocation();
    }
  }
  static FixHookTargetInheritSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && t.GetInheritSpeed();
  }
  static FixHookTargetIsClimb(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && t.GetIsClimb();
  }
  static SetIsHookEndByInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      t.SetIsHookEndByInterrupt(e);
    }
  }
  static FixHookIsSummitPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsSummitPoint ?? false);
  }
  static FixHookIsNormalPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsNormalHookPoint ?? false);
  }
  static SlashHookPointHasLookAtConfig(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && t.GetCurrentTarget()?.GetSlashHookCharacterLookAtPoint() !== undefined;
  }
  static SlashHookPointCharacterLookAtPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    if (t?.Valid) {
      return (t.GetCurrentTarget()?.GetSlashHookCharacterLookAtPoint() ?? Vector_1.Vector.ZeroVectorProxy).ToUeVector();
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  static SlashHookPointIsTakeOverCamera(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t?.Valid && (t.GetCurrentTarget()?.GetLevelPlayTakeOverCamera() ?? false);
  }
  static SlashHookPointSafePointLoc(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.GetCurrentTarget()?.GetSafePointLocation().ToUeVector() ?? Vector_1.Vector.ZeroVectorDouble;
  }
  static SlashHookPointSafePointRot(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 99)?.GetCurrentTarget()?.GetSafePointRotation().ToUeRotator() ?? Rotator_1.Rotator.ZeroRotator;
  }
  static StartChargeSlash(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 85);
    if (t?.Valid) {
      ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StartChargeSlash(t);
    }
  }
  static StopChargeSlash(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 85);
    if (t?.Valid) {
      ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StopChargeSlash(t);
    }
  }
  static IsSlashGameplayIsSuccess() {
    return ControllerHolder_1.ControllerHolder.SlashGameplayController.CheckGroups();
  }
  static SetIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
    }
  }
  static DeleteIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
    }
  }
  static GetToTargetSocketDistance(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      return t.GetTargetDistance();
    } else {
      return -1;
    }
  }
  static SetPredictProjectileInfo(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 78);
    if (t?.Valid) {
      t.SetPredictProjectileInfo(e, i, r, n);
    }
  }
  static SetVisible(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 78);
    if (t?.Valid) {
      t.SetVisible(e);
    }
  }
  static GetCharUnifiedMoveState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 101)?.MoveState;
  }
  static GetCharUnifiedPositionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 101)?.PositionState;
  }
  static ExitHitState(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.ExitHitState();
  }
  static SetDirectionState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 101)?.SetDirectionState(e);
  }
  static GetDirectionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 101)?.DirectionState;
  }
  static GetIsInGame(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 101)?.IsInGame ?? false;
  }
  static SprintPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.SprintPress();
  }
  static SprintRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.SprintRelease();
  }
  static StandPress(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 101);
    if (e && e.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole()) {
      e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
    }
  }
  static SwingPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.SwingPress();
  }
  static SwingRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.SwingRelease();
  }
  static CustomSetWalkOrRun(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.CustomSetWalkOrRun(e);
  }
  static EnterAimStatus(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.EnterAimStatus(e);
  }
  static ExitAimStatus(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 175)?.ExitAimStatus();
  }
  static EnableEntity(t, e) {}
  static UpdateAnimInfoHit(t, e) {
    var i;
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 177);
    if (n?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 61)) && (e = e, n = n.AnimLogicParamsSetter, i = t.GetAcceptedNewBeHitAndReset(), n.AcceptedNewBeHit !== i && (n.AcceptedNewBeHit = i, e.AcceptedNewBeHitRef = i), r = t.BeHitAnim, n.BeHitAnim !== r && (n.BeHitAnim = r, e.BeHitAnimRef = r), i = t.GetEnterFkAndReset(), n.EnterFk !== i && (n.EnterFk = i, e.EnterFkRef = i), i = t.GetDoubleHitInAir(), n.DoubleHitInAir !== i)) {
      n.DoubleHitInAir = i;
      e.DoubleHitInAirRef = i;
    }
  }
  static UpdateAnimInfoFk(e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 177);
    if (r?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 61);
      if (e) {
        r = r.AnimLogicParamsSetter;
        let t = e.BeHitDirect;
        if (!r.BeHitDirect.Equals(t)) {
          r.BeHitDirect.DeepCopy(t);
          i.BeHitDirectRef = t.ToUeVectorOld();
        }
        t = e.BeHitLocation;
        if (!r.BeHitLocation.Equals(t)) {
          r.BeHitLocation.DeepCopy(t);
          i.BeHitLocationRef = t.ToUeVectorOld();
        }
      }
    }
  }
  static UpdateAnimInfoUnifiedState(t, e) {
    var i;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 177);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 101)) && (e = e, r = r.AnimLogicParamsSetter, i = t.MoveState, r.CharMoveState !== i && (r.CharMoveState = i, e.CharMoveStateRef = i), i = t.PositionState, r.CharPositionState !== i && (r.CharPositionState = i, e.CharPositionStateRef = i), i = t.DirectionState, r.CharCameraState !== i)) {
      r.CharCameraState = i;
      e.CharCameraStateRef = i;
    }
  }
  static UpdateAnimInfoUnifiedStateRoleNpc(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 177);
    if (i?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 101)) && (e = e, i = i.AnimLogicParamsSetter, t = t.MoveState, i.CharMoveState !== t)) {
      i.CharMoveState = t;
      e.CharMoveStateRef = t;
    }
  }
  static GetIsCharRotateWithCameraWhenManipulate(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 65);
    return !!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate();
  }
  static GetIsUseCatapultUpAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    return !!t?.Valid && t.IsUseCatapultUpAnim;
  }
  static GetNextMultiSkillId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 207);
    if (t?.Valid) {
      return t.GetNextMultiSkillId(e);
    } else {
      return 0;
    }
  }
  static GetNextMultiSkillIdNew(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 207);
    if (t?.Valid) {
      return t.GetNextMultiSkillId(e);
    } else {
      return 0;
    }
  }
  static GetManipulateInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    return !t || t.CheckCurrentTargetCanInteract();
  }
  static GetHookInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !t || t.CheckNextTargetCanInteract();
  }
  static GetHookInteractTargetIsIgnorePlayerCollision(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 99);
    return !!t && t.GetNextTargetIsIgnorePlayerCollision();
  }
  static StartManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    return !!t && t.StartPullGiantInteract();
  }
  static EndManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t) {
      t.EndPullGiantInteract();
    }
  }
  static StartStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    return !!t && t.StartStatueInteract();
  }
  static EndStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t) {
      t.EndStatueInteract();
    }
  }
  static StartCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    return !!t && t.StartCustomInteract();
  }
  static EndCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t) {
      t.EndCustomInteract();
    }
  }
  static GetManipulateInteractLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t) {
      return t.GetTargetLocation().ToUeVector();
    }
  }
  static EnvironmentInfoDetect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(e, t.IsRoleAndCtrlByMe);
    }
  }
  static LockOnSpecifyTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 32);
    e = EntitySystem_1.EntitySystem.Get(e);
    if (t?.Valid && e?.Valid) {
      t.LockOnSpecifyTarget(new EntityHandle_1.EntityHandle(e));
    }
  }
  static IsSkillInCd(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 207);
    return !!t?.Valid && t.IsSkillInCd(e);
  }
  static SendHookSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.HookSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    i.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    i.f_pos_x = t.X;
    i.f_pos_y = t.Y;
    i.f_pos_z = t.Z;
    i.i_has_target = e ? 1 : 0;
    LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static SendManipulateSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.ManipulateSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    i.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    i.f_pos_x = t.X;
    i.f_pos_y = t.Y;
    i.f_pos_z = t.Z;
    i.i_has_target = e ? 1 : 0;
    LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static SendScanSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.ScanSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3).ActorLocationProxy;
    i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    i.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
    i.f_pos_x = t.X;
    i.f_pos_y = t.Y;
    i.f_pos_z = t.Z;
    i.i_has_target = e ? 1 : 0;
    LogReportController_1.LogReportController.UnitLogReport(i);
  }
  static DynamicAttachEntityToActor(e, i, r) {
    var n = EntitySystem_1.EntitySystem.Get(e);
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 125);
    if (n && e) {
      let t = new UE.TransformDouble();
      var a;
      var i = EntitySystem_1.EntitySystem.Get(i);
      var s = i?.GetComponent(1)?.Owner;
      if (s && (s.IsA(UE.Character.StaticClass()) ? (a = s).Mesh.DoesSocketExist(r) && (t = a.Mesh.D_GetSocketTransform(r, 0)) : t = s.D_GetTransform(), n.GetComponent(1)?.SetActorLocationAndRotation(t.GetLocation(), t.GetRotation().Rotator()), (a = i?.GetComponent(0)?.GetCreatureDataId()) !== undefined)) {
        (r = new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType = 1;
        r.RotAttachType = 1;
        e.RegEntityTargetByCreatureDataId(a, undefined, r, "DynamicAttachEntityToActor");
      }
    }
  }
  static SetEntityEnable(t, e, i, r) {
    if (i?.IsValid()) {
      i = `[蓝图:${i.GetName()}] ${r}`;
      if ((r = EntitySystem_1.EntitySystem.Get(t))?.Valid) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r, e, i, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 28, "调用SetEntityEnable失败，因为callObject为空");
    }
  }
  static SetActorVisible(t, e, i, r, n, a = false) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(t, e, i, r, n, a);
    }
  }
  static SetSkillTargetDirection(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 40);
    if (t?.Valid) {
      t.SetSkillTargetDirection(e);
    }
  }
  static ChangeAiControllerDebugDraw(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 47);
    if (i?.Valid) {
      i.SetDebugDraw(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 42, "实体不含AiComp", ["entityId", t]);
    }
  }
  static GetBeHitAnimType(t) {
    return t;
  }
  static StartInhalation(t, e, i, r, n, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 263);
    if (t?.Valid) {
      var s = [];
      var o = (0, puerts_1.$unref)(a);
      for (let t = 0; t < o.Num(); t++) {
        s.push(o.Get(t));
      }
      t.StartInhalation(e, i, r, n, s);
    }
  }
  static StopInhalation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 263);
    if (t?.Valid) {
      t.StopInhalation();
    }
  }
  static ChangeBlueprintVariablesRef(e, t) {
    const n = (t, e) => {
      var i = t.SubGraphs;
      for (let t = 0; t < i.Num(); t++) {
        var r = i.Get(t);
        e.push(r);
        n(r, e);
      }
    };
    var i = new Map();
    if (e instanceof UE.AnimBlueprint) {
      if (!UE.EditorOperations.GetDefaultObject(e.ParentClass)) {
        return e;
      }
      var r = [];
      for (let t = 0; t < e.FunctionGraphs.Num(); t++) {
        var a = e.FunctionGraphs.Get(t);
        r.push(a);
        n(a, r);
      }
      for (let t = 0; t < e.EventGraphs.Num(); t++) {
        var s = e.EventGraphs.Get(t);
        r.push(s);
        n(s, r);
      }
      for (const c of r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "FunctionGraphs", ["Name", c.GetName()]);
        }
        var o = c?.Nodes;
        for (let t = 0; t < o.Num(); t++) {
          var y;
          var l = o.Get(t);
          if (l instanceof UE.K2Node_Variable && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "Change Graph Node", ["Name", l.GetName()], ["MemberName", l.VariableReference.MemberName], ["MemberGuid", l.VariableReference.MemberGuid], ["MemberScope", l.VariableReference.MemberScope], ["MemberParent", l.VariableReference.MemberParent?.GetName()]), y = l.VariableReference.MemberName.toString(), i.has(y))) {
            l.VariableReference.MemberName = FNameUtil_1.FNameUtil.GetDynamicFName(i.get(y));
            l.VariableReference.MemberGuid.A = 0;
            l.VariableReference.MemberGuid.B = 0;
            l.VariableReference.MemberGuid.C = 0;
            l.VariableReference.MemberGuid.D = 0;
          }
        }
      }
    }
    return e;
  }
  static TryGetDebugMovementComp(t) {
    let e = 0;
    try {
      e = Number(t);
    } catch {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 42, "添加监听输入的PbDataId转number异常", ["pbDataId", t]);
      }
      return;
    }
    if (e !== 0) {
      t = new Array();
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(e, t);
      if (t.length !== 0) {
        if (t[0]?.Entity?.GetComponent(0)?.IsVehicle()) {
          const i = t[0]?.Entity?.GetComponent(234)?.DebugMovementComp;
          i?.SetDebug(true);
          return i?.UeDebugComp;
        }
        const i = t[0]?.Entity?.GetComponent(3)?.DebugMovementComp;
        i?.SetDebug(true);
        return i?.UeDebugComp;
      }
    }
  }
  static TryPlayLinkAnim() {
    BattleLinkController_1.BattleLinkController.TryPlaySplitScreen();
  }
  static TraceGround(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(3);
    if (t) {
      i = UE.VectorDouble.Dist(e, i);
      t = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(t, Vector_1.Vector.Create(e), r, i);
      if (t[0]) {
        e = t[1];
        return new UE.VectorDouble(e.X, e.Y, e.Z);
      }
    }
  }
  static ChangePhantomTeam(t, e) {
    var i = [];
    var r = (0, puerts_1.$unref)(e);
    for (let t = 0; t < r.Num(); t++) {
      i.push(r.Get(t));
    }
    ControllerHolder_1.ControllerHolder.SceneTeamController.ChangePhantomTeam(t, i);
  }
  static RevertPhantomTeam() {
    ControllerHolder_1.ControllerHolder.SceneTeamController.RevertPhantomTeam();
  }
  static GetFormationAttribute(t) {
    return ModelManager_1.ModelManager.FormationAttributeModel?.GetValue(t) ?? 0;
  }
  static GetEntityDeltaMillisecond(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return Time_1.Time.DeltaTime * t.TimeDilation * (t.GetComponent(122)?.CurrentTimeScale ?? 1);
    } else {
      return 1;
    }
  }
  static SyncTwoEntityLocationAndRotation(t, e) {
    var t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
    var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (t?.Valid && e?.Valid && (t = t.Entity?.GetComponent(1), e = e.Entity?.GetComponent(1), t) && e) {
      e.SetActorLocationAndRotation(t.ActorLocation, t.ActorRotation, "SyncTwoEntityLocationAndRotation", false);
    }
  }
  static GetFishingBoat() {
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData().GetEntityHandle()?.Entity;
    if (t?.IsInit) {
      return t.GetComponent(1)?.Owner;
    }
  }
  static FishingBoatSprint(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 274);
    if (t?.Valid) {
      t.FishingBoatEnterSprint(e, i, r);
    }
  }
  static FishingBoatSkill(t) {
    ControllerHolder_1.ControllerHolder.FishingController.BeginFishingSkill(t);
  }
  static GetCharacterMorphType(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 279)?.GetMorphType() ?? 0;
  }
  static SetCharacterMorphType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 279)?.SetMorphType(e);
  }
  static SetSpecialEnergyAttrValue(t, e, i) {
    AbilityUtils_1.AbilityUtils.SetSpecialEnergyAttrValue(t, e, i);
  }
  static GetFuLuoLuoSpecialEnergyType(t, e) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      return AbilityUtils_1.AbilityUtils.GetFuLuoLuoSpecialEnergyType(t, e);
    } else {
      return 0;
    }
  }
  static StartBattleQte(t, e, i) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 40)?.GetSkill(e)?.MNc;
    if (r && t) {
      ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(i, t, r, 1);
    }
  }
  static StopGroup1Skill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 39);
    if (t?.Valid) {
      t.StopGroup1Skill(e);
    }
  }
  static GetCharactersLocationNearBy(t, e, i) {
    return ControllerHolder_1.ControllerHolder.CreatureController.GetCharactersLocationNearBy(t, e, i);
  }
  static GetCurrentPlayer() {
    return Global_1.Global.BaseCharacter;
  }
}
exports.default = TsGameplayBlueprintFunctionLibrary;
//# sourceMappingURL=TsGameplayBlueprintFunctionLibrary.js.map