"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction");
const SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition");
class TsAnimNotifySkillBehavior extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.技能行为 = undefined;
  }
  Constructor() {}
  K2_Notify(i, r) {
    i = i.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var i = i.CharacterActorComponent.Entity;
    var e = i.GetComponent(43);
    var o = i.GetComponent(222);
    var t = i.GetComponent(43)?.CurrentSkill;
    if (!e || !t || e.IsSkillMontageInvalid(r.GetName())) {
      return false;
    }
    var o = o?.CreateAnimNotifyContent(r.GetName(), this.exportIndex);
    t.SkillBehaviorAnimNotifyMessageId = o;
    var l = {
      Entity: i,
      SkillComponent: e,
      Skill: t
    };
    for (let i = 0; i < this.技能行为.Num(); i++) {
      var a = this.技能行为.Get(i);
      if (SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(a.SkillBehaviorConditionGroup, a.SkillBehaviorConditionFormula, l) && (SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(a.SkillBehaviorActionGroup, l), !a.SkillBehaviorContinue)) {
        break;
      }
    }
    return true;
  }
  GetNotifyName() {
    return "技能行为";
  }
}
exports.default = TsAnimNotifySkillBehavior;
//# sourceMappingURL=TsAnimNotifySkillBehavior.js.map