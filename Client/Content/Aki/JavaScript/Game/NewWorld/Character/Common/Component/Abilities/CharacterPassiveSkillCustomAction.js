"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterPassiveSkillCustomAction = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  ConditionFormula_1 = require("../../../../../Utils/Trigger/ConditionFormula"),
  KatixiyaVisionSkill = 20000109;

function AddCustomBuff(t, i, a, o, e) {
  var r, s, l = t.PassiveSkillComp.GetSKill(t.SkillId);
  return i && l ? (r = i.GetComponent(174), s = `被动技能${t.SkillId}添加`, r.AddBuff(a, {
    InstigatorId: e?.GetComponent(0)?.GetCreatureDataId() ?? t.BuffComp.CreatureDataId,
    PreMessageId: l.CombatMessageId,
    Reason: s,
    OuterStackCount: o
  }), !0) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["skillId", t.SkillId], ["targetEntity", i], ["Instigator", e]), !1)
}
const builtinFunc = {
    AddBuff2: AddCustomBuff,
    RefreshBuffDuration: (t, i, a) => i ? (i.GetComponent(174)?.RefreshBuffDuration(a, "被动技能行为刷新buff时长"), !0) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能刷新buff持续时间失败", ["skillId", t.SkillId], ["target", i]), !1),
    UpdateTag: (t, i, a, o, e) => {
      var r = i?.GetComponent(205),
        s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a[o] ?? "");
      return r && s && i?.GetComponent(209)?.HasBuffAuthority() ? (r?.TagContainer.UpdateExactTag(7, s, e), !0) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能本地更新tag失败", ["skillId", t.SkillId], ["tagArray", a], ["index", o], ["target", i?.Id]), !1)
    },
    AddBuffByArray: (t, i, a, o, e, r) => o < 0 || !a || o >= a.length ? (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["index", o], ["buffIds", a]), !1) : AddCustomBuff(t, i, a[o], e, r),
    EndAbilityVision: (t, i, a) => {
      i = i?.GetComponent(40);
      return i && (i.EndSkill(PhantomUtil_1.VISION_MORPH_SKILL_ID, "CharacterPassiveSKill"), i.EndSkill(KatixiyaVisionSkill, "CharacterPassiveSKill")), !0
    }
  },
  builtinFuncMap = new Map(Object.entries(builtinFunc));
class CharacterPassiveSkillCustomAction {
  static AddCustomAction(t, i, a) {
    var o;
    if (t) return (o = t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = i, new ConditionFormula_1.Formula(t.SkillActionScript).SetBuiltinFunctions(a).SetContextBuiltinFunctions(builtinFuncMap).SetDefaultParams(o);
    Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 85, "被动自定义行为创建失败", ["owner", i.Id])
  }
}
exports.CharacterPassiveSkillCustomAction = CharacterPassiveSkillCustomAction;
//# sourceMappingURL=CharacterPassiveSkillCustomAction.js.map