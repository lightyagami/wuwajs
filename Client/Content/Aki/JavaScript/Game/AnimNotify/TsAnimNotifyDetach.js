"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyDetach extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.IsDetachFollower = false;
    this.IsRecursion = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var s;
    var r;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(s = t.CharacterActorComponent)?.Valid && !!s.IsAutonomousProxy && !!(r = s.Entity.GetComponent(40))?.Valid && !!r.SkillTarget?.Entity && !!(r = t.GetEntityNoBlueprint()?.GetComponent(184))?.Valid && !(t = s.Entity.GetComponent(213).CreateAnimNotifyContent(e.GetName(), this.exportIndex), r.DetachFromHost(this.IsDetachFollower, this.IsRecursion, true, t), 0);
  }
  GetNotifyName() {
    return "从目标身上解绑";
  }
}
exports.default = TsAnimNotifyDetach;
//# sourceMappingURL=TsAnimNotifyDetach.js.map