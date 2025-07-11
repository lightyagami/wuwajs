"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionAttachParentEffect = undefined;
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAttachParentEffect extends BulletActionBase_1.BulletActionBase {
  OnTick(t) {
    var e;
    var l = this.BulletInfo;
    if (!l.NeedDestroy) {
      if (e = EffectSystem_1.EffectSystem.GetSureEffectActor(l.ParentEffect)) {
        BulletUtil_1.BulletUtil.AttachParentEffectSkeleton(l, e, l.ParentEffect);
        this.IsFinish = true;
      }
    }
  }
}
exports.BulletActionAttachParentEffect = BulletActionAttachParentEffect;
//# sourceMappingURL=BulletActionAttachParentEffect.js.map