"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
class TsAnimNotifyStateDuration extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity) && (EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.CharOnAnimNotifyStateDurationChange, r), true);
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity) && (EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.CharOnAnimNotifyStateDurationChange, 0), true);
  }
  GetNotifyName() {
    return "怪物倒地UI显示时长";
  }
}
exports.default = TsAnimNotifyStateDuration;
//# sourceMappingURL=TsAnimNotifyStateDuration.js.map