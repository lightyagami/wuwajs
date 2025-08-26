"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyRoleHoldingHands extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.InvitationAccept = false;
    this.StartBinding = false;
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e?.CharacterActorComponent?.Entity;
      if (!e?.Valid) {
        return false;
      }
      e = e.GetComponent(297);
      if (this.InvitationAccept) {
        e?.FollowerAccept();
      }
      if (this.StartBinding) {
        e?.InvitationToBinding();
      }
    }
    return true;
  }
  GetNotifyName() {
    return "牵手";
  }
}
exports.default = TsAnimNotifyRoleHoldingHands;
//# sourceMappingURL=TsAnimNotifyRoleHoldingHands.js.map