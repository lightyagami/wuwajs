"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyRoleSitDown extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent.Entity.GetComponent(29))) {
      e.DoSitDownAction();
    }
    return true;
  }
  GetNotifyName() {
    return "角色坐下";
  }
}
exports.default = TsAnimNotifyRoleSitDown;
//# sourceMappingURL=TsAnimNotifyRoleSitDown.js.map