"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateNpcStateSwitching extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    return !!e?.IsA(TsBaseCharacter_1.default.StaticClass()) && (e.CharacterActorComponent?.Entity.GetComponent(196)?.MarkAnimStateSwitching(true), true);
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    return !!e?.IsA(TsBaseCharacter_1.default.StaticClass()) && (e.CharacterActorComponent?.Entity.GetComponent(196)?.MarkAnimStateSwitching(false), true);
  }
  GetNotifyName() {
    return "NPC切换动画状态过程中";
  }
}
exports.default = TsAnimNotifyStateNpcStateSwitching;
//# sourceMappingURL=TsAnimNotifyStateNpcStateSwitching.js.map