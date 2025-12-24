"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const FormationPropertyAll_1 = require("../../Core/Define/ConfigQuery/FormationPropertyAll");
const PassiveSkillById_1 = require("../../Core/Define/ConfigQuery/PassiveSkillById");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController");
const FormationDataController_1 = require("../Module/Abilities/FormationDataController");
const CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const CharacterPassiveSkillComponent_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterPassiveSkillComponent");
const CharacterTagContainer_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterTagContainer");
const TriggerType_1 = require("../NewWorld/Character/Common/Component/Abilities/Trigger/TriggerType");
const CombatDebugController_1 = require("./CombatDebugController");
const CombatDebugDrawController_1 = require("./CombatDebugDrawController");
const CombatLog_1 = require("./CombatLog");
class CombatDebugBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static AddPassiveSkillForDebug(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    if (t?.Valid) {
      t.LearnPassiveSkill(Number(e), {
        CombatMessageId: -1n,
        PreMessageId: -1n
      });
    }
  }
  static RemovePassiveSkillForDebug(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    if (t?.Valid) {
      t.ForgetPassiveSkill(Number(e));
    }
  }
  static GetDebugMonsterMovePath() {
    return CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath;
  }
  static SetDebugMonsterMovePath(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath = t;
  }
  static GetDebugMonsterControl() {
    return CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterControl;
  }
  static SetDebugMonsterControl(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterControl = t;
  }
  static OpenMonsterServerLogic(t) {
    t = "CloseMonsterServerLogic#" + (t ? 0 : 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
  }
  static IsDrawEntityBoxEnabled() {
    return CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxEnabled ?? false;
  }
  static SetDrawEntityBoxEnabled(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxEnabled = t;
  }
  static IsDrawEntityBoxInfoEnabled() {
    return CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxInfoEnabled ?? false;
  }
  static SetDrawEntityBoxInfoEnabled(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxInfoEnabled = t;
  }
  static GetCombatScriptIndexes() {
    return CombatDebugController_1.CombatDebugController.ScriptHelper.CombatScriptIndexes;
  }
  static FilterScript(t) {
    return CombatDebugController_1.CombatDebugController.FilterCmd(t);
  }
  static IsDebugPrintOpened(t) {
    return CombatLog_1.CombatLog.DebugCombatInfo.has(t);
  }
  static SetDebugPrintOpened(t, e) {
    if (e) {
      CombatLog_1.CombatLog.DebugCombatInfo.add(t);
    } else {
      CombatLog_1.CombatLog.DebugCombatInfo.delete(t);
    }
  }
  static TryRefreshServerDebugInfo() {
    CombatDebugController_1.CombatDebugController.RefreshServerDebugInfo();
  }
  static GetBuffComponent(t, e) {
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(220);
    if (t?.GetBuffByHandle(e)) {
      return t;
    } else if (t && (0, RegisterComponent_1.isComponentInstance)(t, 200) && t.GetFormationBuffComp()?.GetBuffByHandle(e)) {
      return t.GetFormationBuffComp();
    } else {
      return undefined;
    }
  }
  static GetServerBuffRemainDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetBuffComponent(t, e)?.Entity.GetComponent(22)?.GetServerBuffRemainDuration(e) ?? -1;
  }
  static GetServerBuffTotalDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetBuffComponent(t, e)?.Entity.GetComponent(22)?.GetServerBuffTotalDuration(e) ?? -1;
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(220);
    var r = t?.GetBuffByHandle(e);
    return r || (!r && (0, RegisterComponent_1.isComponentInstance)(t, 200) ? t.GetFormationBuffComp().GetBuffByHandle(e) : undefined);
  }
  static GetBuffRemainDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.GetRemainDuration() ?? -1;
  }
  static GetBuffTotalDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Duration ?? -1;
  }
  static HasServerBuff(t, e) {
    var r = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(22);
    return !!r && (t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(200)?.GetFormationBuffComp()?.Entity.GetComponent(22), r.HasServerBuff(e) || t?.HasServerBuff(e) || !r.HasBuffRequest(e) && !t?.HasBuffRequest(e));
  }
  static GetAttributeDebugString(t, e = "") {
    var r = new Set([...e.matchAll(/[0-9]+/g)].map(t => Number(t[0] ?? 0)));
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 182);
    if (!e || !n) {
      return "";
    }
    var a = new Set(CharacterAttributeTypes_1.attributeIdsWithMax.values());
    var i = new Set(CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values());
    var o = new Set(CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values());
    let s = "";
    const u = e.ServerDebugInfo?.GSs;
    var l = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (u) {
      for (const g of u) {
        l[g.tSs] = g;
      }
    }
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if (!CharacterAttributeTypes_1.attributeIdsWithMax.has(t) && !a.has(t) && !CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) && !i.has(t) && !o.has(t) && (!(r.size > 0) || !!r.has(t))) {
        var [C, b] = [n.GetBaseValue(t), n.GetCurrentValue(t)];
        var c = b.toFixed(0);
        var b = b === C ? "" : (C < b ? "(+" : "(") + (b - C).toFixed(0) + ")";
        const u = l[t];
        var [C, m] = [u?.eSs ?? 0, u?.y6n ?? 0];
        var y = m.toFixed(0);
        var m = m === C ? "" : (C < m ? "(+" : "(") + (m - C).toFixed(0) + ")";
        s += `#${t} undefined C:${c}${b} | S:${y}${m}
`;
      }
    }
    return s.trim();
  }
  static GetStateAttributeDebugString(t, e = "") {
    var r = new Set([...e.matchAll(/[0-9]+/g)].map(t => Number(t[0] ?? 0)));
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 182);
    if (!e || !n) {
      return "";
    }
    let a = "";
    const i = e.ServerDebugInfo?.GSs;
    var o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (i) {
      for (const m of i) {
        o[m.tSs] = m;
      }
    }
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if ((CharacterAttributeTypes_1.attributeIdsWithMax.has(t) || CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)) && (!(r.size > 0) || r.has(t))) {
        var s = n.GetBaseValue(t).toFixed(0);
        const i = o[t];
        var u;
        var l;
        var C;
        var b;
        var c = (i?.eSs ?? 0).toFixed(0);
        if (CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)) {
          u = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0;
          b = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0;
          l = n.GetCurrentValue(b).toFixed(0);
          b = (o[b]?.y6n ?? 0).toFixed(0);
          C = n.GetCurrentValue(u).toFixed(0);
          u = (o[u]?.y6n ?? 0).toFixed(0);
          a += `#${t} undefined C:${s}/${l} (${C}/s) | S:${c}/${b} (${u}/s)
`;
        } else if (CharacterAttributeTypes_1.attributeIdsWithMax.has(t)) {
          l = CharacterAttributeTypes_1.attributeIdsWithMax.get(t) ?? 0;
          C = n.GetCurrentValue(l).toFixed(0);
          b = (o[l]?.y6n ?? 0).toFixed(0);
          a += `#${t} undefined C:${s}/${C} | S:${c}/${b}
`;
        }
      }
    }
    return a.trim();
  }
  static GetFormationAttributeDebugString(t, e = "") {
    var r = new Set([...e.matchAll(/[0-9]+/g)].map(t => Number(t[0] ?? 0)));
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (!e) {
      return "";
    }
    let n = "";
    var a;
    var i;
    var o;
    var s;
    var u;
    var l;
    var C;
    var t = e.ServerDebugInfo?.M6n;
    var b = new Array();
    if (t) {
      for (const c of t) {
        b[c.E6n] = c;
      }
    }
    for (const m of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      if (!(r.size > 0) || !!r.has(m.Id)) {
        a = m.Id;
        i = FormationAttributeController_1.FormationAttributeController.GetValue(a);
        o = FormationAttributeController_1.FormationAttributeController.GetMax(a);
        s = FormationAttributeController_1.FormationAttributeController.GetSpeed(a);
        u = (C = b[a])?.y6n.toFixed(0) ?? "???";
        l = C?.I6n.toFixed(0) ?? "???";
        C = C?.L6n.toFixed(0) ?? "???";
        n += `#${a} C:${i?.toFixed(0)}/${o?.toFixed(0)} (${s?.toFixed(0)}/s) | S:${u}/${l} (${C}/s)
`;
      }
    }
    return n.trim();
  }
  static ServerSkillMap(t) {
    var e = {};
    for (const n of t.split(/(?=技能:)/)) {
      var r = /技能:(?<skillId>\d+)/.exec(n);
      if (r?.groups?.skillId) {
        e[r.groups.skillId] = n;
      }
    }
    return e;
  }
  static GetPassiveCdString(t) {
    let e = "";
    for (var [r] of t.SkillCdFinishStampMap) {
      var n = t.GetCurRemainingCd(r);
      e += `entityId: ${r} CD:${n.toFixed(2)}
`;
    }
    return e;
  }
  static GetPassiveDebugString(t, e = "") {
    var r = [...e.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 28);
    if (!e) {
      return "";
    }
    let a = "";
    if (e.GetAllPassiveSkills().length > 0) {
      var i = EntitySystem_1.EntitySystem.GetComponent(t, 217);
      a += "----- 客户端被动技能 -----\n";
      for (const l of e.GetAllPassiveSkills()) {
        if (!(r.length > 0) || r.some(t => String(l.SkillId).startsWith(t))) {
          n?.GetTrigger(l.TriggerHandle);
          var o = PassiveSkillById_1.configPassiveSkillById.GetConfig(l.SkillId);
          var s = i?.GetPassiveSkillCdInfo(l.SkillId);
          var s = s ? CombatDebugBlueprintFunctionLibrary.GetPassiveCdString(s) : "【无CD组件】";
          a = `${a = `${a = `${a = `${a}技能: ${l.SkillId} handle: ${l.TriggerHandle}
${"" + s}`}说明: ${o.SkillDesc}
`}触发器类型: ${o.TriggerType}${TriggerType_1.ETriggerEvent[o.TriggerType] !== undefined ? "" : "(非法类型)"}
触发时机: undefined
`}条件公式: undefined
触发行为:
`;
          for (const C of l.Actions) {
            var u = C.Action;
            switch (u) {
              case CharacterPassiveSkillComponent_1.ESkillAction.AddBullet:
                a += `    添加子弹 ${C.BulletRowNames.join("、")}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.RemoveBullet:
                a += `    移除子弹 ${C.BulletRowNames.map((t, e) => `${t}(${C.SummonChild ? "创建子子弹" : "不创建子子弹"})`).join("、")}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.AddBuff:
                a += `    添加Buff ${C.BuffId.join("、")}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.RemoveBuff:
                a += `    移除Buff ${C.BuffId.map((t, e) => "" + t + (C.StackCount[e] <= 0 ? "" : `(移除${C.StackCount[e]}层)`)).join("、")}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.StartSkill:
                a += `    触发主动技能 ${C.SkillId}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.LockOn:
                a += `    锁定目标 ${C.IsHardLock} ${C.LockOnConfigId} ${C.SkillTargetPriority} ${C.ShowTarget} ${C.GlobalTarget}
`;
                break;
              case CharacterPassiveSkillComponent_1.ESkillAction.Customize:
                a += `    自定义行为 ${C.Formula?.FormulaStr} 
`;
                break;
              default:
                a += `    未知行为 ${u}
`;
            }
          }
          a += "\n\n";
        }
      }
    }
    e = EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfo?.nT_;
    if (e) {
      if (r.length === 0) {
        a = a + "----- 服务端被动技能 -----\n" + e;
      } else {
        t = CombatDebugBlueprintFunctionLibrary.ServerSkillMap(e);
        for (const [b, c] of Object.entries(t)) {
          if (r.some(t => b.startsWith(t))) {
            a += c;
          }
        }
      }
    }
    return a.trim();
  }
  static IsRegexFuzzyMatch(t, e) {
    return new RegExp(e.split("").join(".*")).test(t);
  }
  static GetTagsDebugString(t, e = "") {
    const s = e.split(/[,，]/).map(t => t.trim());
    const o = EntitySystem_1.EntitySystem.GetComponent(t, 215)?.TagContainer;
    e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (!e || !o) {
      return "";
    }
    var t = e?.ServerDebugInfo?.bAs;
    var e = e?.ServerDebugInfo?.qAs;
    var r = new Map();
    const u = new Map([["实体", new Map()], ["编队", new Map()]]);
    if (t) {
      var n = u.get("实体");
      for (const i of t) {
        r.set(i.m5n, r.get(i.m5n) ?? 0 + i.m9n);
        n.set(i.m5n, i.m9n);
      }
    }
    if (e) {
      var a = u.get("编队");
      for (const l of e) {
        r.set(l.m5n, r.get(l.m5n) ?? 0 + l.m9n);
        a.set(l.m5n, l.m9n);
      }
    }
    return ("【客户端】\n" + [...o.GetAllExactTags()].map(t => {
      const e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      if (e && s.length > 0 && !s.some(t => CombatDebugBlueprintFunctionLibrary.IsRegexFuzzyMatch(e, t))) {
        return "";
      }
      var r = o.GetExactTagCount(t);
      let n = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${r}(`;
      for (const i of o.GetAllChannels()) {
        var a = o.GetRawTagCount(i, t);
        if (a) {
          n += `${CharacterTagContainer_1.channelDebugName[i]} x ${a} `;
        }
      }
      return n.trimEnd() + ")\n";
    }).sort((t, e) => t.localeCompare(e)).join("") + "\n【服务端】\n" + [...r.entries()].map(([t, e]) => {
      const r = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      if (r && s.length > 0 && !s.some(t => CombatDebugBlueprintFunctionLibrary.IsRegexFuzzyMatch(r, t))) {
        return "";
      }
      let n = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${e}(`;
      var a;
      var i;
      for ([a, i] of u.entries()) {
        var o = i.get(t);
        if (o) {
          n += `${a} x ${o} `;
        }
      }
      return n.trimEnd() + ")\n";
    }).sort((t, e) => t.localeCompare(e)).join("")).trim();
  }
  static GetCueDebugString(e, t = "") {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 21);
    if (!r) {
      return "";
    }
    let n = "实体Cue:\n";
    var a = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    for (const i of r.GetAllCurrentCueRef()) {
      if (!(a.length > 0) || !!a.some(t => String(i.CueConfig.Id).includes(t))) {
        n += `CueId: ${i.CueConfig.Id} CueHandleId: ${[...i.CueHandleIds]} BuffId: ${i.BuffId}
`;
      }
    }
    if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().some(t => t.Id === e)) {
      n += "\n编队Cue:\n";
      t = FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(239);
      if (t) {
        for (const o of t.GetAllCurrentCueRef()) {
          if (!(a.length > 0) || !!a.some(t => String(o.CueConfig.Id).includes(t))) {
            n += `CueId: ${o.CueConfig.Id} CueHandleId: ${[...o.CueHandleIds]} BuffId: ${o.BuffId}
`;
          }
        }
      }
    }
    return n;
  }
  static LoadDataTable(t) {
    if (Info_1.Info.IsPlayInEditor) {
      return ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable, "Debug");
    }
  }
  static GetDebugStateMachine(t, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 79);
    t?.StateMachineGroup?.RequestServerDebugInfo();
    var t = t?.StateMachineGroup?.ToString();
    var r = (0, puerts_1.$unref)(e);
    if (t) {
      for (const n of t) {
        r.Add(n);
      }
    }
  }
  static GetSkillDebugString(e) {
    let r = "";
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 40);
    if (n) {
      var a = EntitySystem_1.EntitySystem.GetComponent(e, 218);
      let t = false;
      for (const s of n.GetAllActivatedSkill()) {
        t = true;
        r += `#${s.SkillId} ${s.SkillName} | 技能组: ${s.SkillInfo.GroupId} | 打断等级: ${s.InterruptLevel} | CD: ${a?.GetGroupSkillCdInfo(s.SkillId)?.CurRemainingCd?.toFixed(2) ?? 0}s
`;
      }
      if (t) {
        r += "\n";
      }
      var n = EntitySystem_1.EntitySystem.GetComponent(e, 186);
      var e = n?.MainAnimInstance?.GetMainAnimsDebugText();
      r += "" + e;
      var i = n?.MainAnimInstance?.ActiveAnimNotifyState;
      if (i && i.Num() > 0) {
        r += "\n\n";
        for (let t = 0; t < i.Num(); t++) {
          var o = i.Get(t);
          if (o.NotifyStateClass.IsA(UE.KuroAnimNotifyState.StaticClass())) {
            o = o.NotifyStateClass;
            r += `exportIndex:${o.exportIndex}--${o.GetNotifyName()}
`;
          }
        }
      }
    }
    return r;
  }
  static GetSkillLogString(t, e = "") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t) {
      return t.GetSkillLogString(e);
    } else {
      return "";
    }
  }
  static ClearSkillLogString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t) {
      t.ClearSkillLogString();
    }
  }
  static GetSkillBehaviorLogString(t, e = "") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t) {
      return t.GetSkillBehaviorLogString(e);
    } else {
      return "";
    }
  }
  static ClearSkillBehaviorLogString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t) {
      t.ClearSkillBehaviorLogString();
    }
  }
  static GetBulletDebugString(t) {
    t = ModelManager_1.ModelManager.BulletModel?.GetBulletSetByAttacker(t);
    if (!t) {
      return "";
    }
    let e = "";
    for (const n of t) {
      var r = n.GetBulletInfo();
      e += `#RowName:${r.BulletRowName}, EntityId:${n.Id}, LiveTime:${r.LiveTime}/${r.Duration}
`;
    }
    return e;
  }
  static GetBulletLogString(t, e = "") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t?.Valid) {
      return t.GetBulletLogString(e);
    } else {
      return "";
    }
  }
  static ClearBulletLogString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (t?.Valid) {
      t.ClearBulletLogString();
    }
  }
}
exports.default = CombatDebugBlueprintFunctionLibrary;
//# sourceMappingURL=CombatDebugBlueprintFunctionLibrary.js.map