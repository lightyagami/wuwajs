"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicDestroyBulletController = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../BulletController");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
const NONE_STRING = "None";
class BulletLogicDestroyBulletController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.h7o = t;
  }
  BulletLogicAction(e = undefined) {
    if (this.h7o.DestroyBulletRowName !== NONE_STRING) {
      let t = undefined;
      if (e && e instanceof BulletHitActorData_1.BulletHitActorData) {
        t = e.Entity;
      }
      e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(this.C7o(this.h7o.BulletOwner, t).Id);
      if (e) {
        for (const r of e) {
          var l = r.GetBulletInfo();
          if (l.BulletRowName === this.h7o.DestroyBulletRowName) {
            BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, this.h7o.SummonChildBullet);
          }
        }
      }
    }
  }
  C7o(t, e) {
    switch (t) {
      case 1:
        return this.Bullet.GetBulletInfo().Attacker;
      case 2:
        return e;
      default:
        return this.Bullet.GetBulletInfo().Attacker;
    }
  }
}
exports.BulletLogicDestroyBulletController = BulletLogicDestroyBulletController;
//# sourceMappingURL=BulletLogicDestroyBulletController.js.map