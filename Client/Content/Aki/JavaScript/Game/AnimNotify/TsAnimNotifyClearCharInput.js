"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyClearCharInput extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e.CharacterActorComponent.ClearInput();
    }
    return true;
  }
  GetNotifyName() {
    return "清除角色移动输入";
  }
}
exports.default = TsAnimNotifyClearCharInput;
//# sourceMappingURL=TsAnimNotifyClearCharInput.js.map