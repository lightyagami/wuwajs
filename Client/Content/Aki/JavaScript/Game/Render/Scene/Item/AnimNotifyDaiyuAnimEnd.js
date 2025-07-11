"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class AnimNotifyDaiyuAnimEnd extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    return !!e.IsVisible() && ((e = e.GetOwner()?.GetAttachParentActor()) && e.OnAnimPlayEnd(t.GetName()), true);
  }
}
exports.default = AnimNotifyDaiyuAnimEnd;
//# sourceMappingURL=AnimNotifyDaiyuAnimEnd.js.map