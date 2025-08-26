"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const QUIT_BLEND_TIME = 0.1;
class TsAnimNotifyStateStopMontage extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyTick(e, t, r) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity) && (e.GetComponent(179)?.HasMoveInput && (e = e.GetComponent(178)) && e.MainAnimInstance.Montage_Stop(QUIT_BLEND_TIME), true);
  }
}
exports.default = TsAnimNotifyStateStopMontage;
//# sourceMappingURL=TsAnimNotifyStateStopMontage.js.map