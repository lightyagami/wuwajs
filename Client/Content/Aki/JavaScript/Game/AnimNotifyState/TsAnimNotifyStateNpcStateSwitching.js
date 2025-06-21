"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateNpcStateSwitching extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    return !!e?.IsA(TsBaseCharacter_1.default.StaticClass()) && ((e.CharacterActorComponent?.Entity.GetComponent(186))?.MarkAnimStateSwitching(!0), !0)
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return !!e?.IsA(TsBaseCharacter_1.default.StaticClass()) && ((e.CharacterActorComponent?.Entity.GetComponent(186))?.MarkAnimStateSwitching(!1), !0)
  }
  GetNotifyName() {
    return "NPC切换动画状态过程中"
  }
}
exports.default = TsAnimNotifyStateNpcStateSwitching;
//# sourceMappingURL=TsAnimNotifyStateNpcStateSwitching.js.map