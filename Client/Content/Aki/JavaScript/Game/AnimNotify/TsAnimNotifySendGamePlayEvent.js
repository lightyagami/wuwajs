"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifySendGamePlayEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.事件Tag = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent.Entity.GetComponent(17);
      if (!e?.Valid) {
        return false;
      }
      e.SendGameplayEventToActor(this.事件Tag);
    }
    return false;
  }
  GetNotifyName() {
    return "发送动画通知广播";
  }
}
exports.default = TsAnimNotifySendGamePlayEvent;
//# sourceMappingURL=TsAnimNotifySendGamePlayEvent.js.map