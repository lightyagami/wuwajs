"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionDelayDestroyBullet = undefined;
const BulletController_1 = require("../BulletController");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionDelayDestroyBullet extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.b2o = 0;
  }
  OnExecute() {
    var t = this.ActionInfo;
    if (t.DelayTime <= 0) {
      this.HVo();
    } else {
      this.b2o = t.DelayTime;
    }
  }
  OnTick(t) {
    var e;
    var l;
    var s = this.BulletInfo;
    if (!this.BulletInfo.NeedDestroy) {
      l = this.ActionInfo;
      e = s.Entity.TimeDilation;
      if (!l.IgnoreBulletActorTimeScale && (l = s.Actor)?.IsValid()) {
        this.b2o -= t * l.CustomTimeDilation * e;
      } else {
        this.b2o -= t * e;
      }
      if (this.b2o <= 0) {
        this.HVo();
      }
    }
  }
  HVo() {
    var t = this.ActionInfo;
    BulletController_1.BulletController.DestroyBullet(this.BulletInfo.BulletEntityId, t.SummonChild);
    this.IsFinish = true;
  }
  Clear() {
    super.Clear();
    this.b2o = 0;
  }
}
exports.BulletActionDelayDestroyBullet = BulletActionDelayDestroyBullet;
//# sourceMappingURL=BulletActionDelayDestroyBullet.js.map