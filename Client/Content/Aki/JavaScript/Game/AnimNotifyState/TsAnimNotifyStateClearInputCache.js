"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateClearInputCache extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.InputAction = 0;
    this.InputState = 0;
  }
  Constructor() {}
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent.Entity.GetComponent(65))) {
      e.ClearInputCache(this.InputAction, this.InputState);
    }
    return true;
  }
}
exports.default = TsAnimNotifyStateClearInputCache;
//# sourceMappingURL=TsAnimNotifyStateClearInputCache.js.map