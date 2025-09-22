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
function AddCustomBuff(t, i, e, l, r) {
  var a;
  var o;
  var s = t.PassiveSkillComp.GetSKill(t.SkillId);
  if (i && s) {
    a = i.GetComponent(175);
    o = `被动技能${t.SkillId}添加`;
    a.AddBuff(e, {
      InstigatorId: r?.GetComponent(0)?.GetCreatureDataId() ?? t.BuffComp.CreatureDataId,
      PreMessageId: s.CombatMessageId,
      Reason: o,
      OuterStackCount: l
    });
    return true;
  } else {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["skillId", t.SkillId], ["targetEntity", i], ["Instigator", r]);
    return false;
  }
}
const builtinFunc = {
  AddBuff2: AddCustomBuff,
  RefreshBuffDuration: (t, i, e) => i ? (i.GetComponent(175)?.RefreshBuffDuration(e, "被动技能行为刷新buff时长"), true) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能刷新buff持续时间失败", ["skillId", t.SkillId], ["target", i]), false),
  UpdateTag: (t, i, e, l, r) => {
    var a = i?.GetComponent(206);
    var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e[l] ?? "");
    if (a && o && i?.GetComponent(210)?.HasBuffAuthority()) {
      a?.TagContainer.UpdateExactTag(7, o, r);
      return true;
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能本地更新tag失败", ["skillId", t.SkillId], ["tagArray", e], ["index", l], ["target", i?.Id]);
      return false;
    }
  },
  AddBuffByArray: (t, i, e, l, r, a) => l < 0 || !e || l >= e.length ? (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["index", l], ["buffIds", e]), false) : AddCustomBuff(t, i, e[l], r, a),
  EndAbilityVision: (t, i, e) => {
    i = i?.GetComponent(43);
    if (i?.Valid) {
      i.EndAbilityVision(e);
    }
    return true;
  },
  AddCustomBullet: (t, i, e, l, r, a) => {
    var o = e?.GetComponent(3);
    var s = t.PassiveSkillComp.GetSKill(t.SkillId);
    if (!i || !o || !s) {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加子弹失败", ["skillId", t.SkillId], ["Attacker", !i], ["target", !e]);
      return false;
    }
    let u = undefined;
    u = (u = r && a >= 0 && a < r.length ? SkillUtils_1.SkillUtils.GetTargetSocketTransform(e, r[a], 0, "被动技能" + t.SkillId) : u) || o.ActorTransform;
    BulletController_1.BulletController.CreateBulletCustomTarget(i, l.toString(), u, {}, s.CombatMessageId);
    return true;
  },
  ExecDamage: (t, i, e) => {
    var l;
    var r;
    var a = t.PassiveSkillComp.GetSKill(t.SkillId);
    if (i && a) {
      l = i?.CheckGetComponent(19);
      i = i?.CheckGetComponent(1)?.ActorLocation;
      r = t.Owner;
      return !!l && !!i && !!r && (l.ExecuteBuffDamage({
        DamageDataId: BigInt(e),
        SkillLevel: 1,
        Attacker: r,
        HitPosition: i
      }, {}, a.CombatMessageId), true);
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能触发结算失败", ["skillId", t.SkillId]);
      return false;
    }
  }
};
const builtinFuncMap = new Map(Object.entries(builtinFunc));
class CharacterPassiveSkillCustomAction {
  static AddCustomAction(t, i, e) {
    var l;
    if (t) {
      (l = t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = i;
      return new ConditionFormula_1.Formula(t.SkillActionScript).SetBuiltinFunctions(e).SetContextBuiltinFunctions(builtinFuncMap).SetDefaultParams(l);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 85, "被动自定义行为创建失败", ["owner", i.Id]);
    }
  }
}
exports.CharacterPassiveSkillCustomAction = CharacterPassiveSkillCustomAction;
//# sourceMappingURL=CharacterPassiveSkillCustomAction.js.map