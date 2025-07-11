"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetPositionToGround extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (e.CharacterActorComponent.FixBornLocation("AN.重置到地面", false, undefined, true), true);
  }
  GetNotifyName() {
    return "重置角色到地面";
  }
}
exports.default = TsAnimNotifyResetPositionToGround;
//# sourceMappingURL=TsAnimNotifyResetPositionToGround.js.map