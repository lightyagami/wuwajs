"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction");
const SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition");
const skillBehaviorMap = new Map();
class TsAnimNotifyStateSkillBehavior extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.技能行为 = undefined;
  }
  Constructor() {}
  K2_NotifyTick(i, e, r) {
    var t = i.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var t = t.CharacterActorComponent.Entity;
    var a = t.GetComponent(40);
    var o = t.GetComponent(213);
    var l = t.GetComponent(40)?.CurrentSkill;
    if (!a || !l || a.IsSkillMontageInvalid(e.GetName())) {
      return false;
    }
    let n = skillBehaviorMap.get(i);
    if (!n) {
      skillBehaviorMap.set(i, n = new Map());
    }
    if (n.get(this)) {
      return false;
    }
    var s = {
      Entity: t,
      SkillComponent: a,
      Skill: l
    };
    for (let i = 0; i < this.技能行为.Num(); i++) {
      var h = this.技能行为.Get(i);
      if (SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(h.SkillBehaviorConditionGroup, h.SkillBehaviorConditionFormula, s)) {
        n.set(this, true);
        var v = o?.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
        l.SkillBehaviorAnimNotifyMessageId = v;
        SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(h.SkillBehaviorActionGroup, s);
        if (!h.SkillBehaviorContinue) {
          break;
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(i, e) {
    var r;
    return i.GetOwner() instanceof TsBaseCharacter_1.default && ((r = skillBehaviorMap.get(i)) && (r.delete(this), r.size === 0) && skillBehaviorMap.delete(i), true);
  }
  GetNotifyName() {
    return "技能行为";
  }
}
exports.default = TsAnimNotifyStateSkillBehavior;
//# sourceMappingURL=TsAnimNotifyStateSkillBehavior.js.map