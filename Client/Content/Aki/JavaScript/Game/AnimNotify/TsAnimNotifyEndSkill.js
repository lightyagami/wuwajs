"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterBuffIds_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifyEndSkill extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      var t = e.GetComponent(209);
      var a = e.GetComponent(40);
      var i = e.GetComponent(178);
      if (!t?.Valid || !a?.Valid || !i?.Valid || a.IsSkillMontageInvalid(r.GetName())) {
        return false;
      }
      r = UE.KismetSystemLibrary.GetPathName(r);
      if (t.HasTag(-1221493771) && (r.includes("Move_F") || r.includes("Move_B"))) {
        return false;
      }
      CombatLog_1.CombatLog.Info("Skill", e, "结束技能帧事件", ["技能ID", a.CurrentSkill?.SkillId], ["技能名称", a.CurrentSkill?.SkillName]);
      a.IsMainSkillReadyEnd = true;
      if (i.HasBuffAuthority()) {
        i.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "从TsAnimNotifyEndSkill蓝图移除Buff");
      }
      a.SetCurrentPriority(0);
      a.CallAnimBreakPoint();
    }
    return true;
  }
  GetNotifyName() {
    return "结束技能";
  }
}
exports.default = TsAnimNotifyEndSkill;
//# sourceMappingURL=TsAnimNotifyEndSkill.js.map