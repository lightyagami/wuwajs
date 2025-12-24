"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction");
const CreatureController_1 = require("../World/Controller/CreatureController");
class TsAnimNotifySummonRandom extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.SummonIndex = 0;
    this.Action = undefined;
    this.SkillId = 0;
    this.IsVisible = true;
  }
  Constructor() {}
  K2_Notify(r, e) {
    var t;
    var o;
    var r = r.GetOwner();
    return !!r && !!(r instanceof TsBaseCharacter_1.default) && !!r?.CharacterActorComponent?.IsAutonomousProxy && !!(r = r?.CharacterActorComponent?.Entity)?.Valid && !!(o = r.GetComponent(41)) && !!o.CurrentSkill && !!this.Action && !(o = {
      Entity: r,
      SkillComponent: o,
      Skill: o.CurrentSkill
    }, t = SkillBehaviorAction_1.SkillBehaviorAction.CalculateLocation(this.Action, o), o = SkillBehaviorAction_1.SkillBehaviorAction.CalculateRotation(this.Action, o), o = new UE.TransformDouble(o, t, Vector_1.Vector.OneVectorDouble), CreatureController_1.CreatureController.SummonRandomRequest(r.Id, this.SummonIndex, o, this.SkillId, this.IsVisible), 0);
  }
  GetNotifyName() {
    return "随机召唤";
  }
}
exports.default = TsAnimNotifySummonRandom;
//# sourceMappingURL=TsAnimNotifySummonRandom.js.map