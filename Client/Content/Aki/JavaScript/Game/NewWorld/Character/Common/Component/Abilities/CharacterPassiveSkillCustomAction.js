"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPassiveSkillCustomAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ConditionFormula_1 = require("../../../../../Utils/Trigger/ConditionFormula");
const BulletController_1 = require("../../../../Bullet/BulletController");
const SkillUtils_1 = require("../Skill/SkillUtils");
function AddCustomBuff(t, i, l, e, r) {
  var o;
  var a;
  var s = t.PassiveSkillComp.GetSKill(t.SkillId);
  if (i && s) {
    o = i.GetComponent(175);
    a = `被动技能${t.SkillId}添加`;
    o.AddBuff(l, {
      InstigatorId: r?.GetComponent(0)?.GetCreatureDataId() ?? t.BuffComp.CreatureDataId,
      PreMessageId: s.CombatMessageId,
      Reason: a,
      OuterStackCount: e
    });
    return true;
  } else {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["skillId", t.SkillId], ["targetEntity", i], ["Instigator", r]);
    return false;
  }
}
const builtinFunc = {
  AddBuff2: AddCustomBuff,
  RefreshBuffDuration: (t, i, l) => i ? (i.GetComponent(175)?.RefreshBuffDuration(l, "被动技能行为刷新buff时长"), true) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能刷新buff持续时间失败", ["skillId", t.SkillId], ["target", i]), false),
  UpdateTag: (t, i, l, e, r) => {
    var o = i?.GetComponent(206);
    var a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l[e] ?? "");
    if (o && a && i?.GetComponent(210)?.HasBuffAuthority()) {
      o?.TagContainer.UpdateExactTag(7, a, r);
      return true;
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能本地更新tag失败", ["skillId", t.SkillId], ["tagArray", l], ["index", e], ["target", i?.Id]);
      return false;
    }
  },
  AddBuffByArray: (t, i, l, e, r, o) => e < 0 || !l || e >= l.length ? (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["index", e], ["buffIds", l]), false) : AddCustomBuff(t, i, l[e], r, o),
  EndAbilityVision: (t, i, l) => {
    i = i?.GetComponent(43);
    if (i?.Valid) {
      i.EndAbilityVision(l);
    }
    return true;
  },
  AddCustomBullet: (t, i, l, e, r, o) => {
    var a = l?.GetComponent(3);
    var s = t.PassiveSkillComp.GetSKill(t.SkillId);
    if (!i || !a || !s) {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加子弹失败", ["skillId", t.SkillId], ["Attacker", !i], ["target", !l]);
      return false;
    }
    let u = undefined;
    u = (u = r && o >= 0 && o < r.length ? SkillUtils_1.SkillUtils.GetTargetSocketTransform(l, r[o], 0, "被动技能" + t.SkillId) : u) || a.ActorTransform;
    BulletController_1.BulletController.CreateBulletCustomTarget(i, e.toString(), u, {}, s.CombatMessageId);
    return true;
  }
};
const builtinFuncMap = new Map(Object.entries(builtinFunc));
class CharacterPassiveSkillCustomAction {
  static AddCustomAction(t, i, l) {
    var e;
    if (t) {
      (e = t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = i;
      return new ConditionFormula_1.Formula(t.SkillActionScript).SetBuiltinFunctions(l).SetContextBuiltinFunctions(builtinFuncMap).SetDefaultParams(e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 85, "被动自定义行为创建失败", ["owner", i.Id]);
    }
  }
}
exports.CharacterPassiveSkillCustomAction = CharacterPassiveSkillCustomAction;
//# sourceMappingURL=CharacterPassiveSkillCustomAction.js.map