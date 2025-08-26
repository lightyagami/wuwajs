"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyWeaponHide extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Hide = true;
    this.WeaponIndex = -1;
    this.HideEffect = true;
    this.UseHighPriority = false;
    this.ActivateTag = new UE.GameplayTag();
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t?.CharacterActorComponent?.Entity;
      if (!t?.Valid) {
        return false;
      }
      if (this.ActivateTag.TagName !== "None") {
        var s = t.GetComponent(206);
        if (s && !s.HasTag(this.ActivateTag.TagId)) {
          return false;
        }
      }
      t.GetComponent(81)?.HideWeapon(this.WeaponIndex, this.Hide, this.HideEffect, false, this.UseHighPriority ? 1 : 0);
    }
    return true;
  }
  GetNotifyName() {
    return "武器隐藏";
  }
}
exports.default = TsAnimNotifyWeaponHide;
//# sourceMappingURL=TsAnimNotifyWeaponHide.js.map