"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyEnableCollision extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e.SetActorEnableCollision(false);
    }
    return true;
  }
  GetNotifyName() {
    return "启用Actor碰撞";
  }
}
exports.default = TsAnimNotifyEnableCollision;
//# sourceMappingURL=TsAnimNotifyEnableCollision.js.map