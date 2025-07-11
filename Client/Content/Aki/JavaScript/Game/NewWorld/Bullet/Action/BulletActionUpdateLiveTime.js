"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionUpdateLiveTime = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BulletController_1 = require("../BulletController");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionUpdateLiveTime extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    this.BulletInfo.LiveTime = 0;
    this.BulletInfo.LiveTimeAddDelta = 0;
    this.BulletInfo.CreateFrame = 0;
  }
  AfterTick(t) {
    if (this.BulletInfo.CreateFrame === 0) {
      this.BulletInfo.CreateFrame = Time_1.Time.Frame;
    }
    this.BulletInfo.LiveTime = this.BulletInfo.LiveTimeAddDelta;
    var e = this.BulletInfo.Actor;
    if (e?.IsValid()) {
      if (e.IsActorBeingDestroyed()) {
        this.HVo();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "子弹Actor.IsActorBeingDestroyed为true", ["子弹Id", this.BulletInfo.BulletRowName]);
        }
      } else if (!((e = this.BulletInfo.Duration) < 0)) {
        if (this.BulletInfo.LiveTime >= e * TimeUtil_1.TimeUtil.InverseMillisecond) {
          this.BulletInfo.IsTimeNotEnough = true;
          this.HVo();
        } else if (!this.BulletInfo.AttackerHandle) {
          this.HVo();
        }
      }
    } else {
      this.HVo();
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "子弹Actor被意外销毁", ["子弹Id", this.BulletInfo.BulletRowName]);
      }
    }
  }
  HVo() {
    BulletController_1.BulletController.DestroyBullet(this.BulletInfo.BulletEntityId, false);
    this.IsFinish = true;
  }
}
exports.BulletActionUpdateLiveTime = BulletActionUpdateLiveTime;
//# sourceMappingURL=BulletActionUpdateLiveTime.js.map