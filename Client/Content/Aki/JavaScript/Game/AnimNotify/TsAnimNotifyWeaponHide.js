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
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e?.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      e.GetComponent(81)?.HideWeapon(this.WeaponIndex, this.Hide, this.HideEffect, false, this.UseHighPriority ? 1 : 0);
    }
    return true;
  }
  GetNotifyName() {
    return "武器隐藏";
  }
}
exports.default = TsAnimNotifyWeaponHide;
//# sourceMappingURL=TsAnimNotifyWeaponHide.js.map