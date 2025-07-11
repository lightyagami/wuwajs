"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateReplaceHitEffect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Setting = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var s;
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (this.Setting ? !!(s = e.CharacterActorComponent?.Entity)?.Valid && !!(s = s.GetComponent(61))?.Valid && (s.ReplaceHitEffect(this.Setting), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "替换受击效果的ANS缺少配置", ["", e?.GetName()]), false));
  }
  K2_NotifyEnd(e, t) {
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent?.Entity)?.Valid && !!(e = e.GetComponent(61))?.Valid && (e.RemoveHitEffectReplaced(), true);
  }
  GetNotifyName() {
    return "替换受击效果";
  }
}
exports.default = TsAnimNotifyStateReplaceHitEffect;
//# sourceMappingURL=TsAnimNotifyStateReplaceHitEffect.js.map