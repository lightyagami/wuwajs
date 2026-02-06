"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyQuitAiming extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var r = e.CharacterActorComponent.Entity;
      if (!e.CharacterActorComponent.IsWorldOwner()) {
        return false;
      }
      if (this.Tag.TagName === "None" || r.GetComponent(217).HasTag(this.Tag.TagId)) {
        r.GetComponent(186).ExitAimStatus();
        return true;
      }
    }
    return false;
  }
  GetNotifyName() {
    return "退出瞄准模式";
  }
}
exports.default = TsAnimNotifyQuitAiming;
//# sourceMappingURL=TsAnimNotifyQuitAiming.js.map