"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
        CombatMessageId: -1n
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
    t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(209);
    if (t?.GetBuffByHandle(e)) {
      return t;
    } else if (t && (0, RegisterComponent_1.isComponentInstance)(t, 190) && t.GetFormationBuffComp()?.GetBuffByHandle(e)) {
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
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(209);
    var r = t?.GetBuffByHandle(e);
    return r || (!r && (0, RegisterComponent_1.isComponentInstance)(t, 190) ? t.GetFormationBuffComp().GetBuffByHandle(e) : undefined);
  }
  static GetBuffRemainDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.GetRemainDuration() ?? -1;
  }
  static GetBuffTotalDuration(t, e) {
    return CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Duration ?? -1;
  }
  static HasServerBuff(t, e) {
    var r = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(22);
    return !!r && (t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(190)?.GetFormationBuffComp()?.Entity.GetComponent(22), r.HasServerBuff(e) || t?.HasServerBuff(e) || !r.HasBuffRequest(e) && !t?.HasBuffRequest(e));
  }
  static GetAttributeDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 173);
    if (!e || !r) {
      return "";
    }
    var a = new Set(CharacterAttributeTypes_1.attributeIdsWithMax.values());
    var o = new Set(CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values());
    var n = new Set(CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values());
    let i = "";
    const s = e.ServerDebugInfo?.GSs;
    var u = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (s) {
      for (const y of s) {
        u[y.tSs] = y;
      }
    }
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if (!CharacterAttributeTypes_1.attributeIdsWithMax.has(t) && !a.has(t) && !CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) && !o.has(t) && !n.has(t)) {
        var [C, l] = [r.GetBaseValue(t), r.GetCurrentValue(t)];
        var b = l.toFixed(0);
        var l = l === C ? "" : (C < l ? "(+" : "(") + (l - C).toFixed(0) + ")";
        const s = u[t];
        var [C, c] = [s?.eSs ?? 0, s?.y6n ?? 0];
        var m = c.toFixed(0);
        var c = c === C ? "" : (C < c ? "(+" : "(") + (c - C).toFixed(0) + ")";
        i += `#${t} undefined C:${b}${l} | S:${m}${c}
`;
      }
    }
    return i.trim();
  }
  static GetStateAttributeDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 173);
    if (!e || !r) {
      return "";
    }
    let a = "";
    const o = e.ServerDebugInfo?.GSs;
    var n = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (o) {
      for (const c of o) {
        n[c.tSs] = c;
      }
    }
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if (CharacterAttributeTypes_1.attributeIdsWithMax.has(t) || CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)) {
        var i = r.GetBaseValue(t).toFixed(0);
        const o = n[t];
        var s;
        var u;
        var C;
        var l;
        var b = (o?.eSs ?? 0).toFixed(0);
        if (CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)) {
          s = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0;
          l = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0;
          u = r.GetCurrentValue(l).toFixed(0);
          l = (n[l]?.y6n ?? 0).toFixed(0);
          C = r.GetCurrentValue(s).toFixed(0);
          s = (n[s]?.y6n ?? 0).toFixed(0);
          a += `#${t} undefined C:${i}/${u} (${C}/s) | S:${b}/${l} (${s}/s)
`;
        } else if (CharacterAttributeTypes_1.attributeIdsWithMax.has(t)) {
          u = CharacterAttributeTypes_1.attributeIdsWithMax.get(t) ?? 0;
          C = r.GetCurrentValue(u).toFixed(0);
          l = (n[u]?.y6n ?? 0).toFixed(0);
          a += `#${t} undefined C:${i}/${C} | S:${b}/${l}
`;
        }
      }
    }
    return a.trim();
  }
  static GetFormationAttributeDebugString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (!t) {
      return "";
    }
    let e = "";
    var t = t.ServerDebugInfo?.M6n;
    var r = new Array();
    if (t) {
      for (const l of t) {
        r[l.E6n] = l;
      }
    }
    for (const b of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var a = b.Id;
      var o = FormationAttributeController_1.FormationAttributeController.GetValue(a);
      var n = FormationAttributeController_1.FormationAttributeController.GetMax(a);
      var i = FormationAttributeController_1.FormationAttributeController.GetSpeed(a);
      var s = r[a];
      var u = s?.y6n.toFixed(0) ?? "???";
      var C = s?.I6n.toFixed(0) ?? "???";
      var s = s?.L6n.toFixed(0) ?? "???";
      e += `#${a} C:${o?.toFixed(0)}/${n?.toFixed(0)} (${i?.toFixed(0)}/s) | S:${u}/${C} (${s}/s)
`;
    }
    return e.trim();
  }
  static GetPassiveDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 26);
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 28);
    if (!e) {
      return "";
    }
    let a = "";
    if (e.GetAllPassiveSkills().length > 0) {
      var o = EntitySystem_1.EntitySystem.GetComponent(t, 206);
      a += "----- 客户端被动技能 -----\n";
      for (const u of e.GetAllPassiveSkills()) {
        r?.GetTrigger(u.TriggerHandle);
        var n = PassiveSkillById_1.configPassiveSkillById.GetConfig(u.SkillId);
        var i = o?.GetPassiveSkillCdInfo(u.SkillId)?.CurRemainingCd?.toFixed(2) ?? "【无CD组件】";
        a = `${a = `${a = `${a += `技能: ${u.SkillId} handle: ${u.TriggerHandle} CD:${i}
`}说明: ${n.SkillDesc}
`}触发器类型: ${n.TriggerType}${TriggerType_1.ETriggerEvent[n.TriggerType] !== undefined ? "" : "(非法类型)"}
触发时机: undefined
`}条件公式: undefined
触发行为:
`;
        for (const C of u.Actions) {
          var s = C.Action;
          switch (s) {
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
              a += `    未知行为 ${s}
`;
          }
        }
        a += "\n\n";
      }
    }
    e = EntitySystem_1.EntitySystem.GetComponent(t, 22)?.ServerDebugInfo?.nT_;
    return (a = e ? a + "----- 服务端被动技能 -----\n" + e : a).trim();
  }
  static GetTagsDebugString(t) {
    const n = EntitySystem_1.EntitySystem.GetComponent(t, 205)?.TagContainer;
    t = EntitySystem_1.EntitySystem.GetComponent(t, 22);
    if (!t || !n) {
      return "";
    }
    var e = t?.ServerDebugInfo?.bAs;
    var t = t?.ServerDebugInfo?.qAs;
    var r = new Map();
    const i = new Map([["实体", new Map()], ["编队", new Map()]]);
    if (e) {
      var a = i.get("实体");
      for (const s of e) {
        r.set(s.m5n, r.get(s.m5n) ?? 0 + s.m9n);
        a.set(s.m5n, s.m9n);
      }
    }
    if (t) {
      var o = i.get("编队");
      for (const u of t) {
        r.set(u.m5n, r.get(u.m5n) ?? 0 + u.m9n);
        o.set(u.m5n, u.m9n);
      }
    }
    return ("【客户端】\n" + [...n.GetAllExactTags()].map(t => {
      var e = n.GetExactTagCount(t);
      let r = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${e}(`;
      for (const o of n.GetAllChannels()) {
        var a = n.GetRawTagCount(o, t);
        if (a) {
          r += `${CharacterTagContainer_1.channelDebugName[o]} x ${a} `;
        }
      }
      return r.trimEnd() + ")\n";
    }).sort((t, e) => t.localeCompare(e)).join("") + "\n【服务端】\n" + [...r.entries()].map(([t, e]) => {
      let r = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${e}(`;
      var a;
      var o;
      for ([a, o] of i.entries()) {
        var n = o.get(t);
        if (n) {
          r += `${a} x ${n} `;
        }
      }
      return r.trimEnd() + ")\n";
    }).sort((t, e) => t.localeCompare(e)).join("")).trim();
  }
  static GetCueDebugString(e, t = "") {
    var r = EntitySystem_1.EntitySystem.GetComponent(e, 21);
    if (!r) {
      return "";
    }
    let a = "实体Cue:\n";
    var o = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    for (const n of r.GetAllCurrentCueRef()) {
      if (!(o.length > 0) || !!o.some(t => String(n.CueConfig.Id).includes(t))) {
        a += `CueId: ${n.CueConfig.Id} CueHandleId: ${[...n.CueHandleIds]} BuffId: ${n.BuffId}
`;
      }
    }
    if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().some(t => t.Id === e)) {
      a += "\n编队Cue:\n";
      t = FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(226);
      if (t) {
        for (const i of t.GetAllCurrentCueRef()) {
          if (!(o.length > 0) || !!o.some(t => String(i.CueConfig.Id).includes(t))) {
            a += `CueId: ${i.CueConfig.Id} CueHandleId: ${[...i.CueHandleIds]} BuffId: ${i.BuffId}
`;
          }
        }
      }
    }
    return a;
  }
  static LoadDataTable(t) {
    if (Info_1.Info.IsPlayInEditor) {
      return ResourceSystem_1.ResourceSystem.Load(t, UE.DataTable);
    }
  }
}
exports.default = CombatDebugBlueprintFunctionLibrary;
//# sourceMappingURL=CombatDebugBlueprintFunctionLibrary.js.map