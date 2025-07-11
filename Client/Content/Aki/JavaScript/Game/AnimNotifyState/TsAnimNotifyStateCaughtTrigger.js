"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateCaughtTrigger extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.CaughtIds = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var s;
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity) && (t = e.GetComponent(209)?.CreateAnimNotifyContent(t.GetName(), this.exportIndex), s = e.GetComponent(40), !!(e = e.GetComponent(52))) && (e.SetCaughtTriggerAnsInfo(t), e.BeginCaughtTrigger(this.CaughtIds, s?.CurrentSkill?.SkillId ?? 0), true);
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity) && !!(e = e.GetComponent(52)) && (e.EndCaughtTrigger(), true);
  }
  GetNotifyName() {
    return "抓取判定";
  }
}
exports.default = TsAnimNotifyStateCaughtTrigger;
//# sourceMappingURL=TsAnimNotifyStateCaughtTrigger.js.map