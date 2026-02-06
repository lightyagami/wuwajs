"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicFreezeController = undefined;
const BulletUtil_1 = require("../BulletUtil");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicFreezeController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.a7o = this.Bullet.GetBulletInfo();
    this.h7o = t;
  }
  BulletLogicAction(t = undefined) {
    let e = undefined;
    if (t && t instanceof BulletHitActorData_1.BulletHitActorData) {
      e = t.Entity;
    }
    var l = this.C7o(this.h7o.Target, e);
    var r = this.h7o.Tags.GameplayTags.Num();
    if (l || !(r > 0)) {
      for (let t = 0; t < r; ++t) {
        if (!l.GetComponent(217).HasTag(this.h7o.Tags.GameplayTags.Get(t)?.TagId)) {
          return;
        }
      }
      BulletUtil_1.BulletUtil.FrozenBulletTime(this.a7o, this.h7o.FreezeTime);
    }
  }
  C7o(t, e) {
    switch (t) {
      case 1:
        return this.a7o.Attacker;
      case 2:
        return e;
      default:
        return this.a7o.Attacker;
    }
  }
}
exports.BulletLogicFreezeController = BulletLogicFreezeController;
//# sourceMappingURL=BulletLogicFreezeController.js.map