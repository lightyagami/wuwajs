"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyNpcSwitchState extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.StateName = "";
    this.NeedTransition = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (t?.IsA(UE.TsBaseCharacter_C.StaticClass()) && this.StateName !== "" && this.StateName !== "None") {
      t.CharacterActorComponent?.Entity.GetComponent(186)?.SwitchAnimState({
        TargetStateName: this.StateName,
        Context: e.GetName() + ": AN",
        IsNoTransition: !this.NeedTransition
      });
    }
    return true;
  }
  GetNotifyName() {
    return "NPC切换ABP状态";
  }
}
exports.default = TsAnimNotifyNpcSwitchState;
//# sourceMappingURL=TsAnimNotifyNpcSwitchState.js.map