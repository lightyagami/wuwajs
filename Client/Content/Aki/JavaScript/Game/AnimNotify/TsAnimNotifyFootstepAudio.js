"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFootstepAudio extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Variant = 0;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var r;
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !e.GetEntityNoBlueprint()?.GetComponent(217)?.HasTag(1654452863) && !(r = e.GetEntityNoBlueprint()?.GetComponent(201), e = e.GetEntityNoBlueprint()?.GetComponent(62), !r) && !!e && !(r.ChangeFootstepVariant(this.Variant), e.PostFootstepVoice(), 0);
  }
  GetNotifyName() {
    return "脚步音效";
  }
}
exports.default = TsAnimNotifyFootstepAudio;
//# sourceMappingURL=TsAnimNotifyFootstepAudio.js.map