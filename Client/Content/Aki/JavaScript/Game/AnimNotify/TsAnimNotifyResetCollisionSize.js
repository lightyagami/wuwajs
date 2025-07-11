"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetCollisionSize extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, s) {
    e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (e.CharacterActorComponent.ResetCapsuleRadiusAndHeight(), true);
  }
  GetNotifyName() {
    return "恢复默认碰撞大小";
  }
}
exports.default = TsAnimNotifyResetCollisionSize;
//# sourceMappingURL=TsAnimNotifyResetCollisionSize.js.map