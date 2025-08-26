"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismEventFireBullet = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MechanismEventBase_1 = require("./MechanismEventBase");
class MechanismEventFireBullet extends MechanismEventBase_1.MechanismEventBase {
  constructor() {
    super(...arguments);
    this.BulletEntityId = 0;
  }
  OnTrigger(e) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "MechanismEventFireBullet.Trigger", ["context", this.Context], ["eventName", this.EventName]);
      }
      this.BulletEntityId = this.EventListenerComponent.CreateBullet(e, this.EventName);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "MechanismEventFireBullet.参数类型错误", ["context", this.Context], ["eventName", this.EventName]);
    }
  }
  OnStart(e) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "MechanismEventFireBullet.Start", ["context", this.Context], ["eventName", this.EventName]);
      }
      this.BulletEntityId = this.EventListenerComponent.CreateBullet(e, this.EventName);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "MechanismEventFireBullet.参数类型错误", ["context", this.Context], ["eventName", this.EventName]);
    }
  }
  OnEnd(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "MechanismEventFireBullet.End", ["eventType", this.Type], ["context", this.Context]);
    }
    this.EventListenerComponent.DestroyBullet(this.BulletEntityId);
  }
}
exports.MechanismEventFireBullet = MechanismEventFireBullet;
//# sourceMappingURL=MechanismEventFireBullet.js.map