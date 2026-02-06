"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWeaponHide extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Hide = true;
    this.WeaponIndex = -1;
    this.HideEffect = true;
    this.UseHighPriority = false;
    this.ActivateTag = new UE.GameplayTag();
  }
  Constructor() {}
  K2_NotifyBegin(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e?.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      if (this.ActivateTag.TagName !== "None") {
        var i = e.GetComponent(217);
        if (i && !i.HasTag(this.ActivateTag.TagId)) {
          return false;
        }
      }
      e.GetComponent(86)?.HideWeapon(this.WeaponIndex, this.Hide, this.HideEffect, false, this.UseHighPriority ? 1 : 0, "TsAnimNotifyStateWeaponHide");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 6, "TsAnimNotifyStateWeaponHide", ["Anim", t.GetName()], ["Index", this.WeaponIndex], ["h", this.Hide]);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "武器隐藏";
  }
}
exports.default = TsAnimNotifyStateWeaponHide;
//# sourceMappingURL=TsAnimNotifyStateWeaponHide.js.map