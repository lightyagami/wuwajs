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
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const LevelFlowAddBuffAction_1 = require("../../../../../LevelFlow/Action/LevelFlowAddBuffAction");
const LevelFlowCameraShake_1 = require("../../../../../LevelFlow/Action/LevelFlowCameraShake");
const LevelFlowPLayLevelSequence_1 = require("../../../../../LevelFlow/Action/LevelFlowPLayLevelSequence");
const LevelFlowRemoveBuffAction_1 = require("../../../../../LevelFlow/Action/LevelFlowRemoveBuffAction");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const GuessJokerPlotAction_1 = require("../../../../../Module/ActivityGamePlay/GuessJokerCard/Data/Action/GuessJokerPlotAction");
const BattleLinkController_1 = require("../../../../../Module/Battle/Link/BattleLinkController");
const LogReportController_1 = require("../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const ActorUtils_1 = require("../../../../../Utils/ActorUtils");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
const BulletController_1 = require("../../../../Bullet/BulletController");
const BulletTypes_1 = require("../../../../Bullet/BulletTypes");
const BulletUtil_1 = require("../../../../Bullet/BulletUtil");
const SceneItemDynamicAttachTargetComponent_1 = require("../../../../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const GravityHookController_1 = require("../../../../SceneItem/Controller/GravityHookController");
const EntityHandle_1 = require("../../../EntityHandle");
const RoleAudioController_1 = require("../../../Role/RoleAudioController");
const AbilityUtils_1 = require("../../Component/Abilities/AbilityUtils");
const CharacterAttributeTypes_1 = require("../../Component/Abilities/CharacterAttributeTypes");
const CharacterBuffIds_1 = require("../../Component/Abilities/CharacterBuffIds");
const CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent");
const CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes");
const ExtraEffectBaseTypes_1 = require("../../Component/Abilities/ExtraEffect/ExtraEffectBaseTypes");
const GameplayCueEffect_1 = require("../../Component/Abilities/GameplayCueSFX/GameplayCueEffect");
const LockOnDebug_1 = require("../../Component/LockOn/LockOnDebug");
const SkillBehaviorAction_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorAction");
const SkillBehaviorCondition_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorCondition");
const SkillBehaviorMisc_1 = require("../../Component/Skill/SkillBehavior/SkillBehaviorMisc");
const SkillUtils_1 = require("../../Component/Skill/SkillUtils");
const CampUtils_1 = require("./CampUtils");
class TsGameplayBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static ContainsTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 217);
    return !!t?.Valid && !!e && t.HasTag(e.TagId);
  }
  static AddTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 217);
    if (t?.Valid && e) {
      t.AddTag(e.TagId);
    }
  }
  static AddTagWithDuration(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    if (!!t?.Valid && !!i && !(e <= 0)) {
      t.AddTagWithReturnHandle([i.TagId], e);
    }
  }
  static AddTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 217);
    if (i?.Valid && (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)) !== undefined) {
      i.AddTag(e);
      i = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
      t = StringUtils_1.StringUtils.Format("GmAddTag {0} {1} 1", i.toString(), e.toString());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
    }
  }
  static RemoveTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 217);
    if (t?.Valid && e) {
      t.RemoveTag(e.TagId);
    }
  }
  static RemoveTagByName(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 217);
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
  static SetGameplayCueEffectForceRecycle(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 21);
    if (t?.Valid && (t = t.GetCueByCueId(Number(e))) instanceof GameplayCueEffect_1.GameplayCueEffect) {
      t.IsForceRecycle = true;
    }
  }
  static IsLogicAutonomousProxy(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 3)?.IsAutonomousProxy ?? false;
  }
  static RemoveActiveGameplayEffect(t, e, i = -1) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    return !!t?.Valid && t.RemoveBuffByHandle(e.Handle, i) > 0;
  }
  static RemoveBuffByTag(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
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
      if (r = EntitySystem_1.EntitySystem.GetComponent(e, 185)) {
        r.AddBuffForDebug(Number(i), {
          InstigatorId: t,
          Reason: "AddBuffForDebug"
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "添加buff对象没有BuffComponent", ["TargetEntityId", e], ["BuffId", i]);
      }
    }
  }
  static SendCombatEventForDebug(t, e, i, r) {
    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
    if (e !== undefined) {
      r = r ? "GmSendMainBattleStateToFsm" : "GmSendSubBattleStateToFsm";
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
      r = StringUtils_1.StringUtils.Format("{0} {1} {2} {3}", r, t.toString(), e.toString(), i ? "1" : "0");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, r);
    }
  }
  static SendLevelEventForDebug(t, e) {
    e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
    if (e !== undefined) {
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
      t = StringUtils_1.StringUtils.Format("GmFsmSendFsmNotifyLevelPlayEvent {0} {1}", t.toString(), e.toString());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
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
    return PhantomUtil_1.PhantomUtil.GetSummonedEntity(EntitySystem_1.EntitySystem.Get(t), i)?.Entity?.GetComponent(43)?.GetSkill(e);
  }
  static TryGetSummonedEntitySkill(t, e) {
    let i = this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom);
    return i = (i = i || this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)) || this.TryGetSummonedEntitySkillInner(t, e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole);
  }
  static AddBuffFromGA(i, r, n, a, o) {
    a = TsGameplayBlueprintFunctionLibrary.GetSpecialBuffToSkillId(Number(n), a);
    if (a === "" && CharacterBuffIds_1.specialIgnoreGaBuff.findIndex(t => t === Number(n)) === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 35, "AddBuffFromGA的SkillId为空", ["buffId", n]);
      }
    } else {
      var s = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i);
      if (s) {
        var l = EntitySystem_1.EntitySystem.GetComponent(i, 42)?.GetSkill(Number(a));
        let t = l?.MNc;
        let e = l?.AbilityClass?.GetName();
        if (!t) {
          l = EntitySystem_1.EntitySystem.GetComponent(i, 0).GetSummonerId();
          e = (l > 0 ? (l = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)?.Entity?.GetComponent(42), t = l?.GetSkill(Number(a))?.MNc, l?.GetSkill(Number(a))) : (l = TsGameplayBlueprintFunctionLibrary.TryGetSummonedEntitySkill(i, Number(a)), t = l?.MNc, l))?.AbilityClass?.GetName();
        }
        if (r instanceof TsBaseCharacter_1.default) {
          if (i = r.CharacterActorComponent.Entity.CheckGetComponent(185)) {
            i.AddBuff(Number(n), {
              InstigatorId: s,
              Reason: `技能${a}GA${e}的buff添加`,
              PreMessageId: t,
              OuterStackCount: o
            });
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 19, "添加buff对象没有BuffComponent", ["Target", r.GetName()], ["BuffId", n]);
          }
        }
      }
    }
  }
  static RemoveBuffById(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 185);
    if (t?.Valid) {
      t.RemoveBuff(Number(e), i, "从蓝图移除Buff");
    }
  }
  static GetBuffCountById(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(222);
    if (t?.Valid) {
      return t.GetBuffTotalStackById(Number(e), i);
    } else {
      return 0;
    }
  }
  static AddGameplayCueLocal(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 222);
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
  static GetShieldDebugString(t, e = "") {
    return EntitySystem_1.EntitySystem.GetComponent(t, 22)?.GetShieldDebugString(e).trim() ?? "";
  }
  static GetPassiveSkillDebugString(t) {
    return "";
  }
  static GetShieldValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 80)?.GetShieldValue(e) ?? 0;
  }
  static GetBuffDebugStringsNoBlueprint(t, e = "") {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 185);
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
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (!r.has(o.Id)) {
        t = (t = o?.Entity?.GetComponent(3)?.Actor?.GetName()) ? `${o.constructor.name}_${o.Id}[${t}]` : o.constructor.name + "_" + o.Id;
        t = new UE.Layer(e, o.Id + "," + t);
        e.AddItem(t);
      }
    }
  }
  static GetEntityActorName(t) {
    var e;
    if (t) {
      return t?.GetComponent(3)?.Actor?.GetName() || ((e = t?.GetComponent(246)) && e.VehicleFeatures.has(2) ? t?.GetComponent(1)?.Owner?.GetName() : undefined);
    }
  }
  static RefreshEntityComboBox(e) {
    var t;
    var i = e.GetOptionCount();
    var r = new Set();
    for (let t = i - 1; t >= 0; t--) {
      var n = e.GetOptionAtIndex(t);
      var a = /^(?<actorName>.+?)_(?<handleId>\d+)$/.exec(n);
      var o = Number(a?.groups?.handleId ?? 0);
      var a = a?.groups?.actorName;
      var s = EntitySystem_1.EntitySystem.Get(o);
      if (o === 0 || r.has(o) || !s || a !== TsGameplayBlueprintFunctionLibrary.GetEntityActorName(s)) {
        e.RemoveOption(n);
      } else {
        r.add(o);
      }
    }
    for (const l of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (!r.has(l?.Id)) {
        t = l?.Entity;
        if (t = TsGameplayBlueprintFunctionLibrary.GetEntityActorName(t)) {
          e.AddOption(t + "_" + l.Id);
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
    var n = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(222);
    if (n) {
      var a;
      var o;
      var s = e.GetListItems();
      var l = new Set();
      for (let t = s.Num() - 1; t >= 0; t--) {
        var y = s.Get(t);
        const c = n.GetBuffByHandle(Number(y.GetName().split(",")[1]));
        if (c === undefined || l.has(c.Handle) || r.length > 0 && !r.some(t => String(c.Id).startsWith(t))) {
          e.RemoveItem(y);
        } else {
          l.add(c.Handle);
        }
      }
      for (const u of n.GetAllBuffs()) {
        if (!l.has(u.Handle) && (!(r.length > 0) || !!r.some(t => String(u.Id).startsWith(t)))) {
          a = new UE.Layer(e, t + "," + u.Handle);
          e.AddItem(a);
        }
      }
      if ((0, RegisterComponent_1.isComponentInstance)(n, 202) && n.GetFormationBuffComp()) {
        for (const _ of n.GetFormationBuffComp().GetAllBuffs()) {
          if (!l.has(_.Handle) && (!(r.length > 0) || !!r.some(t => String(_.Id).startsWith(t)))) {
            o = new UE.Layer(e, t + "," + _.Handle);
            e.AddItem(o);
          }
        }
      }
    } else {
      e.ClearListItems();
    }
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(222);
    var i = t?.GetBuffByHandle(e);
    return i || (!i && (0, RegisterComponent_1.isComponentInstance)(t, 202) ? t.GetFormationBuffComp().GetBuffByHandle(e) : undefined);
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
    if ((0, RegisterComponent_1.isComponentInstance)(t?.GetOwnerBuffComponent(), 211)) {
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
    for (const o of i.BuffEffectManager?.GetEffectsByHandle(a.Handle) ?? []) {
      n += `持续效果 (cd:${(i.GetBuffEffectCd(o.BuffId, o.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
    }
    for (const s of a.Config.EffectInfos) {
      var r = s.ExecutionEffect;
      if (ExtraEffectBaseTypes_1.periodExecutionIds.has(s.ExtraEffectId) && r) {
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
    return EntitySystem_1.EntitySystem.GetComponent(t, 184)?.GetCurrentValue(e);
  }
  static GetAttributeBaseValue(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 184)?.GetBaseValue(e);
  }
  static SetRageModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.SetRageModeId(e);
  }
  static SetHardnessModeId(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.SetHardnessModeId(e);
  }
  static OnHit(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    e = BulletTypes_1.HitInformation.FromUeHitInformation(e);
    t?.OnHit(e, undefined, false, false, undefined, undefined);
  }
  static SetBeHitIgnoreRotate(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.SetBeHitIgnoreRotate(e);
  }
  static CheckHasPart(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 74)?.IsMultiPart ?? false;
  }
  static GetPartRemainedLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 74);
    if (t?.IsMultiPart) {
      return t.GetPartByTag(e).RemainedLife();
    } else {
      return -1;
    }
  }
  static ResetPartLife(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 74);
    if (t?.IsMultiPart) {
      t.GetPartByTag(e).ResetLife();
    }
  }
  static ActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.ActiveStiff(1);
  }
  static DeActiveStiff(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.DeActiveStiff("蓝图退出硬直");
  }
  static GetAcceptedNewBeHitAndReset(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.GetAcceptedNewBeHitAndReset() ?? false;
  }
  static GetEnterFkAndReset(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.GetEnterFkAndReset() ?? false;
  }
  static IsStiff(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.IsStiff() ?? false;
  }
  static GetRageModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.RageModeId;
  }
  static GetHardnessModeId(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.HardnessModeId;
  }
  static GetBeHitBone(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t?.BeHitBones && t?.BeHitBones?.length > 0) {
      return t.BeHitBones[0];
    } else {
      return FNameUtil_1.FNameUtil.EMPTY;
    }
  }
  static GetToughDecreaseValue(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.ToughDecreaseValue;
  }
  static GetCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.CounterAttackInfoInternal;
  }
  static GetVisionCounterAttackInfoInternal(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.VisionCounterAttackInfoInternal;
  }
  static GetBeHitTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.BeHitTime;
  }
  static GetBeHitAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 66);
    if (t) {
      return t.BeHitAnim;
    } else {
      return 0;
    }
  }
  static GetEnterFk(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.EnterFk ?? false;
  }
  static GetBeHitDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.BeHitDirect.ToUeVector();
  }
  static GetBeHitLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.BeHitLocation.ToUeVector();
  }
  static AddCheckBuffList(t, e) {}
  static ClearCheckBuffList(t) {}
  static CounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.CounterAttackEnd();
  }
  static VisionCounterAttackEnd(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.VisionCounterAttackEnd();
  }
  static SetCounterAttackEndTime(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 66)?.SetCounterAttackEndTime(e);
  }
  static IsTriggerCounterAttack(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 66)?.IsTriggerCounterAttack ?? false;
  }
  static ResetTarget(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.ResetTarget();
  }
  static SetShowTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) {
      t.ExitLockDirection();
    }
  }
  static EnterLockDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) {
      t.EnterLockDirection();
    }
  }
  static GetCurrentTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    if (t?.Valid) {
      return t.GetCurrentTarget()?.Entity?.GetComponent(1)?.Owner;
    }
  }
  static SetLockOnDebugLine(t, e) {
    LockOnDebug_1.LockOnDebug.IsShowDebugLine = e;
  }
  static ManipulateValid(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 70)?.Valid ?? false;
  }
  static ManipulateGetDrawTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      return t.GetDrawTarget();
    }
  }
  static ManipulateGetCastTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      return t.GetCastTarget();
    }
  }
  static ManipulateGetDrawTargetChantTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      return t.GetDrawTargetChantTime();
    } else {
      return 0;
    }
  }
  static ManipulateChant(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.Chant(e);
  }
  static ManipulateDraw(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.Draw();
  }
  static ManipulateCast(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.Precast(e);
  }
  static ManipulateReset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      t.Reset();
    }
  }
  static ManipulateChangeToProjectileState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.ChangeToProjectileState();
  }
  static ManipulateChangeToNormalState(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.ChangeToNormalState();
  }
  static GetHoldingActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      return t.GetHoldingActor();
    }
  }
  static SetDebugDraw(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      t.DebugDrawSphereAndArrow = e;
    }
  }
  static ExtraAction(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    if (t?.Valid) {
      t.ExtraAction();
    }
  }
  static SetQtePosition(t, e, i, r, n, a, o, s = 0) {
    EntitySystem_1.EntitySystem.GetComponent(t, 106)?.SetQtePosition({
      Rotate: e,
      Length: i,
      Height: r,
      ReferenceTarget: n,
      QteType: s
    });
  }
  static GetGoBattleActor(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 106)?.GoBattleActor;
  }
  static GetDtSkillInfo(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.DtSkillInfo;
    }
  }
  static GetDtSkillInfoMapForDebug(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      const i = UE.NewMap(UE.BuiltinInt, UE.DataTable);
      t.DtSkillInfoMapForDebug.forEach((t, e) => {
        i.Add(e, t);
      });
      return i;
    }
  }
  static GetLastActivateSkillTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      return t.LastActivateSkillTime;
    } else {
      return 0;
    }
  }
  static SetLastActivateSkillTime(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      t.SetLastActivateSkillTime(e);
    }
  }
  static GetSkillElevationAngle(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      return t.SkillElevationAngle;
    } else {
      return 0;
    }
  }
  static SetSkillElevationAngle(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      t.SetSkillElevationAngle(e);
    }
  }
  static CurrentSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.CurrentSkill?.SkillId.toString();
    } else {
      return "";
    }
  }
  static CurrentPriority(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.CurrentPriority;
    } else {
      return 0;
    }
  }
  static SetCurrentPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.SetCurrentPriority(e);
    }
  }
  static HasAbility(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.HasAbility(Number(e));
  }
  static GetSkillInfo(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetSkillInfo(Number(e));
    }
  }
  static SetSkillPriority(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.SetSkillPriority(Number(e), i);
    }
  }
  static EndSkill(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.EndSkill");
    }
  }
  static BeginSkill(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.BeginSkill(Number(e.toString()), {
      Target: r,
      SocketName: n.toString(),
      Reason: "TsGameplayBlueprintFunctionLibrary.BeginSkill"
    });
  }
  static BeginSkillAsync(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
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
    var r = t?.GetComponent(42);
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
    var r = t?.GetComponent(42);
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
    var r = t?.GetComponent(42);
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
    var r = t?.GetComponent(42);
    var e = r?.GetSkill(e.SkillId);
    return !!t && !!r?.Valid && !!e && (t = {
      Entity: t,
      SkillComponent: r,
      Skill: e
    }, SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(i, t));
  }
  static GetSkillTarget(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.SkillTarget?.Valid) {
      return t.SkillTarget.Entity?.GetComponent(1)?.Owner;
    }
  }
  static SetSkillTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid && (t.SkillTarget = undefined, e) && (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)?.Entity)) {
      t.SkillTarget = new EntityHandle_1.EntityHandle(e);
    }
  }
  static LockOnTargetAndSetShow(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.LockOnTargetAndSetShow(e);
    }
  }
  static IsHasInputDir(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    return !!t?.Valid && t.IsHasInputDir();
  }
  static GetSkillIdWithGroupId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetSkillIdWithGroupId(e)?.toString();
    } else {
      return "";
    }
  }
  static GetSkillAcceptInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.SkillAcceptInput;
  }
  static SetSkillAcceptInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.SetSkillAcceptInput(e);
    }
  }
  static SetCommonSkillCanBeInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.IsMainSkillReadyEnd = e;
    }
  }
  static GetCommonSkillCanBeInterrupt(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    return !!t?.Valid && t.IsMainSkillReadyEnd;
  }
  static OnActivateAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.OnActivateAbility(e, i);
    } else {
      return -1;
    }
  }
  static OnEndAbility(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.OnEndAbility(e, i);
    }
  }
  static GetPriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetPriority(Number(e));
    } else {
      return -1;
    }
  }
  static GetActivePriority(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetActivePriority(Number(e));
    } else {
      return -1;
    }
  }
  static GetSkillMontageInstance(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetSkillMontageInstance(Number(e), i);
    }
  }
  static CreateSpecifiedTagPlayMontageAndWaitAbilityTask(t, e, i, r, n, a, o, s = 0) {
    var l;
    var y = (0, puerts_1.$ref)(new UE.TsBaseCharacter_C());
    t.获取施法者(y);
    var y = (0, puerts_1.$unref)(y);
    var c = y.EntityId;
    if (e) {
      e = new UE.GameplayTagContainer();
      if (l = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName("行为状态.动作状态.受击")) {
        e.GameplayTags.Add(l);
        l = (0, puerts_1.$ref)(false);
        t.是否拥有任意标签(y, e, l);
        (0, puerts_1.$unref)(l);
      }
    } else {
      TsGameplayBlueprintFunctionLibrary.ExitHitState(c);
      if ((y = t.GetOwningActorFromActorInfo())?.IsValid() && y.IsA(UE.TsBaseCharacter_C.StaticClass())) {
        e = y;
        l = (0, puerts_1.$ref)("");
        t.获取当前GA的技能数据名(l);
        c = (0, puerts_1.$unref)(l);
        y = (0, puerts_1.$ref)(1);
        t.获取当前技能攻速(y);
        l = (0, puerts_1.$unref)(y);
        TsGameplayBlueprintFunctionLibrary.PlaySkillMontage2Server(e.EntityId, c, r, l, n.toString(), a);
        y = (0, puerts_1.$ref)(new UE.AnimMontage());
        t.获取技能动画(r, y);
      }
    }
  }
  static SetSkillRotateLocation(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      e = Vector_1.Vector.Create(e);
      t.SetRotateTarget(e, 1);
    }
  }
  static SetSkillRotateDirect(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      e = Vector_1.Vector.Create(e);
      t.SetRotateTarget(e, 2);
    }
  }
  static CallAnimBreakPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.CallAnimBreakPoint();
    }
  }
  static RollingGround(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      t.RollingGrounded();
    }
  }
  static ActivateAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 46);
    return !!t?.Valid && t.ActivateAbilityVision(e);
  }
  static EndAbilityVision(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 46);
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
    return UE.NewArray(UE.BuiltinInt);
  }
  static ExitMultiSkillStateOfMorphVision(t) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(45)?.ExitMultiSkillState();
  }
  static SetKeepMultiSkillState(t, e, i) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(45)?.SetKeepMultiSkillState(e, i);
  }
  static SetEnableAttackInputActionOfMorphVision(t, e) {
    PhantomUtil_1.PhantomUtil.GetSummonedEntityByOwnerId(t, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision)?.Entity.GetComponent(45)?.SetEnableAttackInputAction(e);
  }
  static GetVisionLevelList(t) {
    return UE.NewArray(UE.BuiltinInt);
  }
  static GetVisionSkillId(t, e, i) {
    return PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(t, e);
  }
  static InterruptSkill(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.EndSkill(Number(e), "TsGameplayBlueprintFunctionLibrary.InterruptSkill");
    }
  }
  static DeleteSkills(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.StopAllSkills("TsGameplayBlueprintFunctionLibrary.DeleteSkills");
    }
  }
  static GetCurrentMontageCorrespondingSkillId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetCurrentMontageCorrespondingSkillId()?.toString();
    } else {
      return "";
    }
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.SkillTargetSocket = e;
    }
  }
  static GetSocketName(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.PlaySkillMontage2Server(Number(e), i, r, n, a);
    }
  }
  static EndSkillMontage(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.EndSkillMontage(Number(e), i);
    }
  }
  static BeginAddMoveByInputDirect(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 280)?.SpecialSkill;
    if (t) {
      t.BeginAddMoveByInputDirect?.(e, i, r, n);
    }
  }
  static BeginAbsoluteTimeStop(t, e, i = true) {
    SkillUtils_1.SkillUtils.BeginAbsoluteTimeStop(t, e, i);
  }
  static EndAbsoluteTimeStop(t) {
    SkillUtils_1.SkillUtils.EndAbsoluteTimeStop(t);
  }
  static BeginTimeStopRequest(t, e) {
    SkillUtils_1.SkillUtils.BeginTimeStopRequest(t, e);
  }
  static EndTimeStopRequest(t) {
    SkillUtils_1.SkillUtils.EndTimeStopRequest(t);
  }
  static EndAddMoveByInputDirect(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 280)?.SpecialSkill;
    if (t) {
      t.EndAddMoveByInputDirect?.();
    }
  }
  static CanActivateFixHook(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && t.CanActivateFixHook();
  }
  static FixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetCurrentTargetLocation().ToUeVector();
    }
  }
  static FixHookTargetPathways(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      var e = t.GetCurrentPathways();
      if (e) {
        var i = UE.NewArray(UE.VectorDouble);
        if (e.length > 0) {
          for (const r of e) {
            i.Add(r[0].ToUeVector());
            i.Add(r[1].ToUeVector());
          }
        } else {
          i.Add(t.ActorComp.ActorLocationProxy.ToUeVector());
          i.Add(t.GetCurrentTargetLocation().ToUeVector());
        }
        return i;
      }
    }
  }
  static FixHookTargetEnterPortalCapture(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetCurrentTargetEnterPortalCapture();
    }
  }
  static FixHookTargetActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetCurrentTargetActor();
    }
  }
  static FixHookTargetIsSuiGuangType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && t.GetTargetIsSuiGuangType();
  }
  static GetHookTargetType(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetTargetType();
    } else {
      return 0;
    }
  }
  static FixHookTargetForward(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetCurrentTargetForward();
    }
  }
  static NextFixHookTargetLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetNextTargetLocation();
    }
  }
  static FixHookTargetInheritSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && t.GetInheritSpeed();
  }
  static FixHookTargetIsClimb(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && t.GetIsClimb();
  }
  static SetIsHookEndByInterrupt(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      t.SetIsHookEndByInterrupt(e);
    }
  }
  static FixHookIsSummitPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsSummitPoint ?? false);
  }
  static FixHookIsNormalPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsNormalHookPoint ?? false);
  }
  static GetHookOverrideSpeed(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return t.GetCurrentTarget()?.HookOverrideSpeed ?? -1;
    } else {
      return -1;
    }
  }
  static FixHookIsGravityPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && (t.GetCurrentTarget()?.IsGravityHookPoint ?? false);
  }
  static FixHookTargetEntityId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57)?.InteractingTarget?.Entity;
    if (t) {
      return t.Id;
    }
  }
  static SlashHookPointHasLookAtConfig(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && t.GetCurrentTarget()?.GetSlashHookCharacterLookAtPoint() !== undefined;
  }
  static SlashHookPointCharacterLookAtPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (t?.Valid) {
      return (t.GetCurrentTarget()?.GetSlashHookCharacterLookAtPoint() ?? Vector_1.Vector.ZeroVectorProxy).ToUeVector();
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  static SlashHookPointIsTakeOverCamera(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t?.Valid && (t.GetCurrentTarget()?.GetLevelPlayTakeOverCamera() ?? false);
  }
  static SlashHookPointSafePointLoc(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 107)?.GetCurrentTarget()?.GetSafePointLocation().ToUeVector() ?? Vector_1.Vector.ZeroVectorDouble;
  }
  static SlashHookPointSafePointRot(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 107)?.GetCurrentTarget()?.GetSafePointRotation().ToUeRotator() ?? Rotator_1.Rotator.ZeroRotator;
  }
  static StartChargeSlash(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) {
      ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StartChargeSlash(t);
    }
  }
  static StopChargeSlash(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (t?.Valid) {
      ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StopChargeSlash(t);
    }
  }
  static IsSlashGameplayIsSuccess() {
    return ControllerHolder_1.ControllerHolder.SlashGameplayController.CheckGroups();
  }
  static GetGravityHookLockInfo(t) {
    return GravityHookController_1.GravityHookController.GetGravityHookLockInfo(t);
  }
  static ChangeGravityByHook(t, e, i, r, n) {
    GravityHookController_1.GravityHookController.ChangeGravity(t, e, i, r, n);
  }
  static SetIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.SetIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
    }
  }
  static DeleteIgnoreSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      t.DeleteIgnoreSocketName(FNameUtil_1.FNameUtil.GetDynamicFName(e));
    }
  }
  static GetToTargetSocketDistance(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
    if (t?.Valid) {
      return t.GetTargetDistance();
    } else {
      return -1;
    }
  }
  static SetPredictProjectileInfo(t, e, i, r, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 83);
    if (t?.Valid) {
      t.SetPredictProjectileInfo(e, i, r, n);
    }
  }
  static SetVisible(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 83);
    if (t?.Valid) {
      t.SetVisible(e);
    }
  }
  static GetCharUnifiedMoveState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 111)?.MoveState;
  }
  static GetCharUnifiedPositionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 111)?.PositionState;
  }
  static ExitHitState(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.ExitHitState();
  }
  static SetDirectionState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 111)?.SetDirectionState(e);
  }
  static GetDirectionState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 111)?.DirectionState;
  }
  static GetIsInGame(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 111)?.IsInGame ?? false;
  }
  static SprintPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.SprintPress();
  }
  static SprintRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.SprintRelease();
  }
  static StandPress(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 111);
    if (e && e.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && EntitySystem_1.EntitySystem.GetComponent(t, 3)?.CreatureData.IsRole()) {
      e.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
    }
  }
  static SwingPress(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.SwingPress();
  }
  static SwingRelease(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.SwingRelease();
  }
  static CustomSetWalkOrRun(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.CustomSetWalkOrRun(e);
  }
  static EnterAimStatus(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.EnterAimStatus(e);
  }
  static ExitAimStatus(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.ExitAimStatus();
  }
  static EnableEntity(t, e) {}
  static UpdateAnimInfoHit(t, e) {
    var i;
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (n?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 66)) && (e = e, n = n.AnimLogicParamsSetter, i = t.GetAcceptedNewBeHitAndReset(), n.AcceptedNewBeHit !== i && (n.AcceptedNewBeHit = i, e.AcceptedNewBeHitRef = i), r = t.BeHitAnim, n.BeHitAnim !== r && (n.BeHitAnim = r, e.BeHitAnimRef = r), i = t.GetEnterFkAndReset(), n.EnterFk !== i && (n.EnterFk = i, e.EnterFkRef = i), i = t.GetDoubleHitInAir(), n.DoubleHitInAir !== i)) {
      n.DoubleHitInAir = i;
      e.DoubleHitInAirRef = i;
    }
  }
  static UpdateAnimInfoFk(e, i) {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 188);
    if (r?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 66);
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
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (r?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 111)) && (e = e, r = r.AnimLogicParamsSetter, i = t.MoveState, r.CharMoveState !== i && (r.CharMoveState = i, e.CharMoveStateRef = i), i = t.PositionState, r.CharPositionState !== i && (r.CharPositionState = i, e.CharPositionStateRef = i), i = t.DirectionState, r.CharCameraState !== i)) {
      r.CharCameraState = i;
      e.CharCameraStateRef = i;
    }
  }
  static UpdateAnimInfoUnifiedStateRoleNpc(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 188);
    if (i?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 111)) && (e = e, i = i.AnimLogicParamsSetter, t = t.MoveState, i.CharMoveState !== t)) {
      i.CharMoveState = t;
      e.CharMoveStateRef = t;
    }
  }
  static GetIsCharRotateWithCameraWhenManipulate(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 70);
    return !!t?.Valid && t.GetIsCharRotateWithCameraWhenManipulate();
  }
  static GetIsUseCatapultUpAnim(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 29);
    return !!t?.Valid && t.IsUseCatapultUpAnim;
  }
  static GetNextMultiSkillId(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 220);
    if (t?.Valid) {
      return t.GetNextMultiSkillId(e);
    } else {
      return 0;
    }
  }
  static GetNextMultiSkillIdNew(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 220);
    if (t?.Valid) {
      return t.GetNextMultiSkillId(e);
    } else {
      return 0;
    }
  }
  static GetManipulateInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    return !t || t.CheckCurrentTargetCanInteract();
  }
  static GetHookInteractTargetCanInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !t || t.CheckNextTargetCanInteract();
  }
  static GetHookInteractTargetIsIgnorePlayerCollision(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    return !!t && t.GetNextTargetIsIgnorePlayerCollision();
  }
  static StartManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    return !!t && t.StartPullGiantInteract();
  }
  static EndManipulateInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t) {
      t.EndPullGiantInteract();
    }
  }
  static StartStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    return !!t && t.StartStatueInteract();
  }
  static EndStatueInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t) {
      t.EndStatueInteract();
    }
  }
  static StartCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    return !!t && t.StartCustomInteract();
  }
  static EndCustomInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t) {
      t.EndCustomInteract();
    }
  }
  static QuantumDiffusionInteract(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t) {
      t.QuantumDiffusionInteract();
    }
  }
  static GetManipulateInteractLocation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 34);
    e = EntitySystem_1.EntitySystem.Get(e);
    if (t?.Valid && e?.Valid) {
      t.LockOnSpecifyTarget(new EntityHandle_1.EntityHandle(e));
    }
  }
  static IsSkillInCd(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 220);
    return !!t?.Valid && t.IsSkillInCd(e);
  }
  static SendHookSkillUseLogData(t, e) {
    var i = new LogReportDefine_1.HookSkillUseLogData();
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 1).ActorLocationProxy;
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
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 1).ActorLocationProxy;
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
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 136);
    if (n && e) {
      let t = new UE.TransformDouble();
      var a;
      var i = EntitySystem_1.EntitySystem.Get(i);
      var o = i?.GetComponent(1)?.Owner;
      if (o && (o.IsA(UE.Character.StaticClass()) ? (a = o).Mesh.DoesSocketExist(r) && (t = a.Mesh.D_GetSocketTransform(r, 0)) : t = o.D_GetTransform(), n.GetComponent(1)?.SetActorLocationAndRotation(t.GetLocation(), t.GetRotation().Rotator()), (a = i?.GetComponent(0)?.GetCreatureDataId()) !== undefined)) {
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 43);
    if (t?.Valid) {
      t.SetSkillTargetDirection(e);
    }
  }
  static ChangeAiControllerDebugDraw(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 50);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 291);
    if (t?.Valid) {
      var o = [];
      var s = (0, puerts_1.$unref)(a);
      for (let t = 0; t < s.Num(); t++) {
        o.push(s.Get(t));
      }
      t.StartInhalation(e, i, r, n, o);
    }
  }
  static StopInhalation(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 291);
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
        var o = e.EventGraphs.Get(t);
        r.push(o);
        n(o, r);
      }
      for (const c of r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "FunctionGraphs", ["Name", c.GetName()]);
        }
        var s = c?.Nodes;
        for (let t = 0; t < s.Num(); t++) {
          var l;
          var y = s.Get(t);
          if (y instanceof UE.K2Node_Variable && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("AI", 42, "Change Graph Node", ["Name", y.GetName()], ["MemberName", y.VariableReference.MemberName], ["MemberGuid", y.VariableReference.MemberGuid], ["MemberScope", y.VariableReference.MemberScope], ["MemberParent", y.VariableReference.MemberParent?.GetName()]), l = y.VariableReference.MemberName.toString(), i.has(l))) {
            y.VariableReference.MemberName = FNameUtil_1.FNameUtil.GetDynamicFName(i.get(l));
            y.VariableReference.MemberGuid.A = 0;
            y.VariableReference.MemberGuid.B = 0;
            y.VariableReference.MemberGuid.C = 0;
            y.VariableReference.MemberGuid.D = 0;
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
          const i = t[0]?.Entity?.GetComponent(247)?.DebugMovementComp;
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
      return Time_1.Time.DeltaTime * t.TimeDilation * (t.GetComponent(133)?.CurrentTimeScale ?? 1);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 303);
    if (t?.Valid) {
      t.FishingBoatEnterSprint(e, i, r);
    }
  }
  static FishingBoatSkill(t) {
    ControllerHolder_1.ControllerHolder.FishingController.BeginFishingSkill(t);
  }
  static GetCharacterMorphType(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 308)?.GetMorphType() ?? 0;
  }
  static SetCharacterMorphType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 308)?.SetMorphType(e);
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
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 43)?.GetSkill(e)?.MNc;
    if (r && t) {
      ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(i, t, r, 1);
    }
  }
  static StopGroup1Skill(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 42);
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
  static IsEnemy(t, e) {
    var e = e.GetEntityNoBlueprint();
    return t instanceof TsBaseCharacter_1.default && !e?.GetComponent(217)?.HasTag(-149285150) && !!(t = t.GetEntityNoBlueprint()?.GetComponent(0)) && !!(e = e?.GetComponent(0)) && (t = t.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player ? t.GetEntityCamp() : 0, e = e.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player ? e.GetEntityCamp() : 0, CampUtils_1.CampUtils.GetCampRelationship(t, e) * 2 == 4);
  }
  static SetWalkOffLedge(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 48);
    if (t?.Valid) {
      t.SetWalkOffLedgeRecord(e);
    }
  }
  static StartFlyingFeather(t, e, i) {
    if (t instanceof TsBaseCharacter_1.default) {
      const r = t.EntityId;
      const n = BulletUtil_1.BulletUtil.GetSkillContextId(t.GetEntityNoBlueprint(), i.SkillId);
      if (TimerSystem_1.TimerSystem.Has(TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 42, "[FlyingFeather] 存在异常的飞雷神羽毛定时器，移除定时器", ["HandleId", TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle?.Id]);
        }
        TimerSystem_1.TimerSystem.Remove(TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle);
        TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = undefined;
      }
      if (i.BulletDelayTime > TimerSystem_1.MIN_TIME && i.BulletDelayTime < TimerSystem_1.MAX_TIME) {
        TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = TimerSystem_1.TimerSystem.Delay(() => {
          TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = undefined;
          TsGameplayBlueprintFunctionLibrary.EmitFeatherBullet(t, e, i, r, n);
        }, i.BulletDelayTime);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 42, "[FlyingFeather] 开始延时等待创建飞雷神羽毛子弹", ["HandleId", TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle?.Id], ["DelayTime", i.BulletDelayTime]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 42, "[FlyingFeather] 直接创建飞雷神羽毛子弹");
        }
        TsGameplayBlueprintFunctionLibrary.EmitFeatherBullet(t, e, i, r, n);
      }
    }
  }
  static EmitFeatherBullet(e, t, i, r, n) {
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent?.Entity.Valid) {
      var a = BlackboardController_1.BlackboardController.GetVectorValueByEntity(r, i.FeatherTarget);
      if (a) {
        MathUtils_1.MathUtils.CommonTempVector.Set(a.X, a.Y, a.Z);
      } else {
        MathUtils_1.MathUtils.CommonTempVector.DeepCopy(t);
      }
      const o = BulletController_1.BulletController.CreateBulletCustomTarget(e, i.BulletId, e.D_GetTransform(), {
        SkillId: i.SkillId,
        SkillContextId: n,
        InitTargetLocation: MathUtils_1.MathUtils.CommonTempVector.ToUeVector()
      }, n)?.GetBulletInfo().BulletEntityId;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 42, "[FlyingFeather] 创建飞雷神羽毛子弹", ["bulletId", o]);
      }
      const s = t => {
        if (t.BulletEntityId === o && (TsGameplayBlueprintFunctionLibrary.ChangeFlyingFeatherMove(r), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Test", 42, "[FlyingFeather] 监听到羽毛子弹销毁", ["bulletId", o]), TimerSystem_1.TimerSystem.Has(TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Test", 42, "[FlyingFeather] 移除保底销毁羽毛子弹定时器", ["HandleId", TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle?.Id]), TimerSystem_1.TimerSystem.Remove(TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle)), TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = undefined, e.CharacterActorComponent?.Entity)) {
          EventSystem_1.EventSystem.RemoveWithTarget(e.CharacterActorComponent.Entity, EventDefine_1.EEventName.BulletDestroy, s);
        }
      };
      TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = TimerSystem_1.TimerSystem.Delay(() => {
        TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = undefined;
        TsGameplayBlueprintFunctionLibrary.ChangeFlyingFeatherMove(r);
        var t = e.CharacterActorComponent?.Entity;
        if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.BulletDestroy, s)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Test", 42, "[FlyingFeather] 触发保底销毁羽毛子弹，移除子弹监听");
          }
          EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.BulletDestroy, s);
        }
      }, MathUtils_1.MathUtils.Clamp(i.MaxChangeStateTime, TimerSystem_1.MIN_TIME, TimerSystem_1.MAX_TIME));
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 42, "[FlyingFeather] 开启保底销毁羽毛子弹定时器", ["HandleId", TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle?.Id]);
      }
      EventSystem_1.EventSystem.AddWithTarget(e.CharacterActorComponent.Entity, EventDefine_1.EEventName.BulletDestroy, s);
    }
  }
  static ChangeFlyingFeatherMove(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 42, "[FlyingFeather] 飞雷神转成移动状态");
    }
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 217);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
    if (e && t?.GetIsHooking()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 42, "[FlyingFeather] 添加飞雷神移动中Tag");
      }
      if (!e.HasTag(-1281048221)) {
        e.AddTag(-1281048221);
      }
    }
  }
  static GetFlyingFeatherTargetId(t) {
    if (t instanceof TsBaseCharacter_1.default) {
      var t = t.EntityId;
      var t = EntitySystem_1.EntitySystem.GetComponent(t, 107);
      var e = t?.GetCurrentTarget()?.GetHookBindEntityConfig();
      if (t && e) {
        t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e);
        if (t) {
          return t.Id.toString();
        }
      }
    }
  }
  static AddFlyingFeatherTargetTag(t, e) {
    var i;
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(Number(e));
    if (e) {
      if (!(i = e.Entity?.GetComponent(217))?.HasTag(t.TagId)) {
        i?.AddTag(t.TagId);
      }
      return e.Entity?.GetComponent(1)?.Owner;
    }
  }
  static UpdateFlyingFeather(t, e) {
    if (t instanceof TsBaseCharacter_1.default) {
      var i = t.EntityId;
      var r = EntitySystem_1.EntitySystem.GetComponent(i, 107);
      var n = r?.GetCurrentTargetActor();
      if (r && n) {
        r = t.CharacterActorComponent.ActorLocationProxy;
        n = n.D_K2_GetActorLocation();
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(i, e, n.X, n.Y, n.Z);
        i = TsGameplayBlueprintFunctionLibrary.GetFlyingFeatherTargetId(t);
        if (i) {
          e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(Number(i))?.Entity?.GetComponent(1);
          if (e) {
            MathUtils_1.MathUtils.CommonTempVector.DeepCopy(e.ActorLocationProxy);
            MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(r);
            t = MathUtils_1.MathUtils.CommonTempVector.Size();
            MathUtils_1.MathUtils.CommonTempVector.Normalize();
            MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(Math.max(0, t - e.GetRadius()));
            MathUtils_1.MathUtils.CommonTempVector.AdditionEqual(r);
            return MathUtils_1.MathUtils.CommonTempVector.ToUeVector();
          }
        }
        return n;
      }
    }
  }
  static EmitGlobalClientEvent(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckClientEvent, t);
  }
  static GetDriverEntityId(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 246)?.Driver;
    if (t) {
      return t.Id;
    } else {
      return 0;
    }
  }
  static StartCableWayMove(e, i) {
    const r = EntitySystem_1.EntitySystem.Get(e);
    var t;
    if (ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(r)?.Valid) {
      if (e !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 31, "开始索道移动失败，实体为非主控角色", ["id", e]);
        }
      } else if ((t = EntitySystem_1.EntitySystem.GetComponent(e, 107)?.GetCurrentTarget()) && t.GetHookInteractType() === "CableWay") {
        t = t.GetHookInteractConfig().SplineEntityId;
        if (ControllerHolder_1.ControllerHolder.SplineMoveTaskController.GetEntityCurSplineMoveTask(e)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Entity", 31, "开始索道移动时，角色还有样条任务未结束，清理旧任务", ["id", e]);
          }
          ControllerHolder_1.ControllerHolder.SplineMoveTaskController.EndEntityTasks(e);
        }
        r?.GetComponent(217)?.AddTag(-82341994);
        r?.GetComponent(38)?.StartRailSlide(t, "/Game/Aki/Data/Level/RailSlide/DA_Strop.DA_Strop", t => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 31, "索道移动结束", ["id", e]);
          }
          r?.GetComponent(217)?.RemoveTag(-82341994);
          i.Callback.Broadcast(t);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 31, "开始索道移动失败，当前目标不是索道", ["id", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 31, "开始索道移动失败，实体无效", ["id", e]);
    }
  }
  static StopCableWayMove(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e)?.Valid) {
      if (t !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 31, "结束索道移动失败，实体为非主控角色", ["id", t]);
        }
      } else {
        e?.GetComponent(38)?.SetExitSplineRailSlide("GA主动停止");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 31, "结束索道移动失败，实体无效", ["id", t]);
    }
  }
  static GetBuffInstigatorId(t, e, i) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(222)?.GetBuffById(e)?.GetInstigator();
    if (!t) {
      return -1;
    }
    if (i) {
      e = t.GetComponent(0)?.GetSummonerId();
      if (e) {
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity;
        if (i) {
          return i.Id;
        }
      }
    }
    return t.Id;
  }
  static SetSubMeshOrder(t, e, i, r, n, a) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 236);
    if (t?.Valid) {
      t.SetSubMeshOrder(e, i, r, n, a * MathUtils_1.MathUtils.SecondToMillisecond);
    }
  }
  static GetPilotThrowSpeed() {
    return ModelManager_1.ModelManager.PilotThrowModel.LaunchSpeed;
  }
  static GetPilotThrowDirection() {
    return ModelManager_1.ModelManager.PilotThrowModel.LaunchDirection.ToUeVector();
  }
  static GetPilotThrowGravity() {
    return ModelManager_1.ModelManager.PilotThrowModel.LaunchGravity;
  }
  static GetPilotThrowNeedMotorRide() {
    return ModelManager_1.ModelManager.PilotThrowModel.NeedMotorRide ?? false;
  }
  static GetPilotThrowIsDisableInterrupt() {
    return ModelManager_1.ModelManager.PilotThrowModel.DisableInterrupt ?? false;
  }
  static OpenPilotThrowGameplayCamera(t) {
    var e;
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 90);
    if (i?.Valid) {
      if ((e = i?.GetHookInteractConfig())?.Type !== "PilotThrow") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 31, "开启铁驭玩法相机失败, 当前探索组件正在交互的目标交互类型不合法", ["EHookInteractType", e?.Type]);
        }
      } else {
        ControllerHolder_1.ControllerHolder.PilotThrowController.EnterInteractHookPoint(i.EntityConfigId, e.TitanEntityId, e.TargetList);
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.EnterSpecialGameplayCamera(1);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary]开启铁驭玩法相机失败", ["TargetEntityId", t]);
    }
  }
  static GetCurrentTargetPilotSkeletalMeshComponent(t) {
    var e = EntitySystem_1.EntitySystem.Get(t);
    if (ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e)?.Valid) {
      e = EntitySystem_1.EntitySystem.GetComponent(t, 107)?.GetCurrentTarget();
      if (e && e.GetHookInteractType() === "PilotThrow") {
        e = e.GetHookInteractConfig();
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e?.TitanEntityId)?.Entity;
        if (e && e.Valid) {
          e = e.GetComponent(1)?.Owner;
          if (e && e.IsValid()) {
            return UE.LGUIBPLibrary.GetComponentInChildren(e, UE.SkeletalMeshComponent.StaticClass(), false);
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 31, "获取当前钩锁目标铁驭Actor失败，铁驭Actor无效", ["id", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 31, "获取当前钩锁目标铁驭Actor失败，当前目标不是铁驭", ["id", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 31, "获取当前钩锁目标铁驭Actor失败，当前目标不是铁驭钩锁", ["id", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 31, "获取当前钩锁目标铁驭Actor失败，实体无效", ["id", t]);
    }
  }
  static GetPilotCurrentInRangePoint() {
    return ModelManager_1.ModelManager.PilotThrowModel.CurrentInRangePoint?.ToUeVector() ?? Vector_1.Vector.ZeroVectorDouble;
  }
  static GetVehicleCatapultUnitRisingTime(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 329)?.GetCatapultUnit();
    if (t) {
      return t.RisingTime;
    } else {
      return 0;
    }
  }
  static GuessJokerNpcTurnToIdlePerform() {
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel?.InGame) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 5)]);
    }
  }
  static LevelFlowDeadlySkeletonMeshCastToCharacter() {
    ModelManager_1.ModelManager.LevelFlowModel.ResetLevelFlow();
  }
  static LevelFlowAddBuff(t, e) {
    ModelManager_1.ModelManager.LevelFlowModel.PushDynamicAction(new LevelFlowAddBuffAction_1.LevelFlowAddBuffAction().Init(t, [e]));
  }
  static LevelFlowRemoveBuff(t, e) {
    ModelManager_1.ModelManager.LevelFlowModel.PushDynamicAction(new LevelFlowRemoveBuffAction_1.LevelFlowRemoveBuffAction().Init(t, [e]));
  }
  static LevelFlowCameraShake(t) {
    ModelManager_1.ModelManager.LevelFlowModel.PushDynamicAction(new LevelFlowCameraShake_1.LevelFlowCameraShake().Init({
      CameraShakeConfig: {
        Type: "Constant"
      },
      CameraShakeBp: t
    }));
  }
  static LevelFlowPlayLevelSequence(t, e) {
    ModelManager_1.ModelManager.LevelFlowModel.PushDynamicAction(new LevelFlowPLayLevelSequence_1.LevelFlowPlayLevelSequence().Init({
      LevelSequencePath: t,
      Mark: e,
      IsEnableCenterOffset: true,
      PlayMode: "direct",
      KeepUI: true
    }));
  }
}
TsGameplayBlueprintFunctionLibrary.FlyingFeatherHandle = undefined;
exports.default = TsGameplayBlueprintFunctionLibrary; //# sourceMappingURL=TsGameplayBlueprintFunctionLibrary.js.map