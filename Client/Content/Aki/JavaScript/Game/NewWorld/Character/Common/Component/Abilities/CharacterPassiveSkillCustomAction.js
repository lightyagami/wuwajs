"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPassiveSkillCustomAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ConditionFormula_1 = require("../../../../../Utils/Trigger/ConditionFormula");
const BulletController_1 = require("../../../../Bullet/BulletController");
const SkillUtils_1 = require("../Skill/SkillUtils");
function AddCustomBuff(t, l, e, i, o) {
  var r;
  var a;
  var s = t.PassiveSkillComp.GetSKill(t.SkillId);
  if (l && s) {
    r = l.GetComponent(183);
    a = `被动技能${t.SkillId}添加`;
    r.AddBuff(e, {
      InstigatorId: o?.GetComponent(0)?.GetCreatureDataId() ?? t.BuffComp.CreatureDataId,
      PreMessageId: s.CombatMessageId,
      Reason: a,
      OuterStackCount: i
    });
    return true;
  } else {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["skillId", t.SkillId], ["targetEntity", l], ["Instigator", o]);
    return false;
  }
}
function AddCustomBullet(t, l, e, i, o, r, a, s) {
  if (!l?.Valid || !e?.Valid) {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t, "被动技能添加子弹失败,实体不合法", ["skillId", a]);
    return false;
  }
  var u = e?.GetComponent(3);
  if (!u) {
    CombatLog_1.CombatLog.Warn("PassiveSkill", t, "被动技能添加子弹失败", ["skillId", a]);
    return false;
  }
  let n = undefined;
  n = (n = o && r >= 0 && r < o.length ? SkillUtils_1.SkillUtils.GetTargetSocketTransform(e, o[r], 0, "被动技能" + a) : n) || u.ActorTransform;
  BulletController_1.BulletController.CreateBulletCustomTarget(l, i.toString(), n, {}, s);
  return true;
}
const builtinFunc = {
  AddBuff2: AddCustomBuff,
  RefreshBuffDuration: (t, l, e) => l ? (l.GetComponent(183)?.RefreshBuffDuration(e, "被动技能行为刷新buff时长"), true) : (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能刷新buff持续时间失败", ["skillId", t.SkillId], ["target", l]), false),
  UpdateTag: (t, l, e, i, o) => {
    var r = l?.GetComponent(215);
    var a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e[i] ?? "");
    if (r && a && l?.GetComponent(220)?.HasBuffAuthority()) {
      r?.TagContainer.UpdateExactTag(7, a, o);
      return true;
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能本地更新tag失败", ["skillId", t.SkillId], ["tagArray", e], ["index", i], ["target", l?.Id]);
      return false;
    }
  },
  AddBuffByArray: (t, l, e, i, o, r) => i < 0 || !e || i >= e.length ? (CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能添加buff失败", ["index", i], ["buffIds", e]), false) : AddCustomBuff(t, l, e[i], o, r),
  EndAbilityVision: (t, l, e) => {
    l = l?.GetComponent(44);
    if (l?.Valid) {
      l.EndAbilityVision(e);
    }
    return true;
  },
  AddCustomBullet: (t, l, e, i, o, r, a) => {
    const s = t.Owner;
    const u = t.SkillId;
    const n = t.PassiveSkillComp.GetSKill(t.SkillId)?.CombatMessageId;
    if (!a || a <= 0 || !l?.GetComponent(0)?.IsRole()) {
      AddCustomBullet(s, l, e, i, o, r, u, n);
    } else {
      ControllerHolder_1.ControllerHolder.PassiveSkillPlayerQueueController.DoAction(() => {
        AddCustomBullet(s, l, e, i, o, r, u, n);
        return a;
      });
    }
    return true;
  },
  ExecDamage: (t, l, e) => {
    var i;
    var o;
    var r = t.PassiveSkillComp.GetSKill(t.SkillId);
    if (l && r) {
      i = l?.CheckGetComponent(19);
      l = l?.CheckGetComponent(1)?.ActorLocation;
      o = t.Owner;
      return !!i && !!l && !!o && (i.ExecuteBuffDamage({
        DamageDataId: BigInt(e),
        SkillLevel: 1,
        Attacker: o,
        HitPosition: l
      }, {}, r.CombatMessageId), true);
    } else {
      CombatLog_1.CombatLog.Warn("PassiveSkill", t.Owner, "被动技能触发结算失败", ["skillId", t.SkillId]);
      return false;
    }
  }
};
const builtinFuncMap = new Map(Object.entries(builtinFunc));
class CharacterPassiveSkillCustomAction {
  static AddCustomAction(t, l, e) {
    var i;
    if (t) {
      (i = t.ActionScriptParams?.length ? JSON.parse(t.ActionScriptParams) : {}).Owner = l;
      return new ConditionFormula_1.Formula(t.SkillActionScript).SetBuiltinFunctions(e).SetContextBuiltinFunctions(builtinFuncMap).SetDefaultParams(i);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 85, "被动自定义行为创建失败", ["owner", l.Id]);
    }
  }
}
exports.CharacterPassiveSkillCustomAction = CharacterPassiveSkillCustomAction;
//# sourceMappingURL=CharacterPassiveSkillCustomAction.js.map