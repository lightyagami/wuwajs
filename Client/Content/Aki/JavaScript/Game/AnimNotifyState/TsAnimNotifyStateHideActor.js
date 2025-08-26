"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyStateHideActor extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    return !!t && (CharacterUtils_1.CharacterUtils.SetActorHiddenInGame(t, true, 0), true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return !!t && (CharacterUtils_1.CharacterUtils.SetActorHiddenInGame(t, false, 0), true);
  }
  GetNotifyName() {
    return "隐藏Actor";
  }
}
exports.default = TsAnimNotifyStateHideActor;
//# sourceMappingURL=TsAnimNotifyStateHideActor.js.map