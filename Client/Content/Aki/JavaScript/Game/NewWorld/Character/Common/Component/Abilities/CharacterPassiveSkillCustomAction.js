"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPassiveSkillCustomAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ConditionFormula_1 = require("../../../../../Utils/Trigger/ConditionFormula");
function AddCustomBuff(t, i, a, o, e) {
  var r;
  var s;
  var u = t.PassiveSkillComp.GetSKill(t.SkillId);
  if (i && u) {
    r = i.GetComponent(174);
    s = `被动技能${t.SkillId}添加`;
    r.AddBuff(a, {
      InstigatorId: e?.GetComponent(0)?.GetCreatureDataId() ?? t.BuffComp.CreatureDataId,
      PreMessageId: u.CombatMessageId,
      Reason: s,
      OuterStackCount: o
    });
    return true;
  } else {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["skillId", t.SkillId], ["targetEntity", i], ["Instigator", e]);
    return false;
  }
}
const builtinFunc = {
  AddBuff2: AddCustomBuff,
  RefreshBuffDuration: (t, i, a) => i ? (i.GetComponent(174)?.RefreshBuffDuration(a, "被动技能行为刷新buff时长"), true) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能刷新buff持续时间失败", ["skillId", t.SkillId], ["target", i]), false),
  UpdateTag: (t, i, a, o, e) => {
    var r = i?.GetComponent(205);
    var s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a[o] ?? "");
    if (r && s && i?.GetComponent(209)?.HasBuffAuthority()) {
      r?.TagContainer.UpdateExactTag(7, s, e);
      return true;
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能本地更新tag失败", ["skillId", t.SkillId], ["tagArray", a], ["index", o], ["target", i?.Id]);
      return false;
    }
  },
  AddBuffByArray: (t, i, a, o, e, r) => o < 0 || !a || o >= a.length ? (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["index", o], ["buffIds", a]), false) : AddCustomBuff(t, i, a[o], e, r),
  EndAbilityVision: (t, i, a) => {
    i = i?.GetComponent(43);
    if (i?.Valid) {
      i.EndAbilityVision(a);
    }
    return true;
  }
};
const builtinFuncMap = new Map(Object.entries(builtinFunc));
class CharacterPassiveSkillCustomAction {
  static AddCustomAction(t, i, a) {
    var o;
    if (t) {
      (o = t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = i;
      return new ConditionFormula_1.Formula(t.SkillActionScript).SetBuiltinFunctions(a).SetContextBuiltinFunctions(builtinFuncMap).SetDefaultParams(o);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 85, "被动自定义行为创建失败", ["owner", i.Id]);
    }
  }
}
exports.CharacterPassiveSkillCustomAction = CharacterPassiveSkillCustomAction;
//# sourceMappingURL=CharacterPassiveSkillCustomAction.js.map