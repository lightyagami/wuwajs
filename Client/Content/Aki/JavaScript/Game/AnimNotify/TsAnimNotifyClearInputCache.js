"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyClearInputCache extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.InputAction = 0;
    this.InputState = 0;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent.Entity.GetComponent(62))) {
      e.ClearInputCache(this.InputAction, this.InputState);
    }
    return true;
  }
  GetNotifyName() {
    return "清除角色所有输入缓存";
  }
}
exports.default = TsAnimNotifyClearInputCache;
//# sourceMappingURL=TsAnimNotifyClearInputCache.js.map