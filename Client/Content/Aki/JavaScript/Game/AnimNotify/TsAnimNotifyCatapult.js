"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyCatapult extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      (e.CharacterActorComponent.Entity?.GetComponent(34)).StartCatapult();
    }
    return true;
  }
  GetNotifyName() {
    return "轨迹运动";
  }
}
exports.default = TsAnimNotifyCatapult;
//# sourceMappingURL=TsAnimNotifyCatapult.js.map