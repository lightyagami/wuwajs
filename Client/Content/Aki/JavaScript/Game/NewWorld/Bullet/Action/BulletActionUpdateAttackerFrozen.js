"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionUpdateAttackerFrozen = undefined;
const BulletController_1 = require("../BulletController");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateAttackerFrozen extends BulletActionBase_1.BulletActionBase {
  OnTick(e) {
    var t = this.BulletInfo;
    if ((t.Attacker?.GetComponent(16)).IsFrozen()) {
      BulletController_1.BulletController.DestroyBullet(t.BulletEntityId, false);
    }
  }
}
exports.BulletActionUpdateAttackerFrozen = BulletActionUpdateAttackerFrozen;
//# sourceMappingURL=BulletActionUpdateAttackerFrozen.js.map