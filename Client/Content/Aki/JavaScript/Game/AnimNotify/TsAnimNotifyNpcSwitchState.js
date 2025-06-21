"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue");
class TsAnimNotifyNpcSwitchState extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), this.StateName = "", this.NeedTransition = !1
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    return t?.IsA(UE.TsBaseCharacter_C.StaticClass()) && "" !== this.StateName && "None" !== this.StateName && (t.CharacterActorComponent?.Entity.GetComponent(186))?.SwitchAnimState({
      TargetStateName: this.StateName,
      Context: e.GetName() + ": AN",
      IsNoTransition: !this.NeedTransition
    }), !0
  }
  GetNotifyName() {
    return "NPC切换ABP状态"
  }
}
exports.default = TsAnimNotifyNpcSwitchState;
//# sourceMappingURL=TsAnimNotifyNpcSwitchState.js.map