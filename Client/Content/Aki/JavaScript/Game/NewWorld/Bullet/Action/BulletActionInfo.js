"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInfoDelayDestroyBullet = exports.BulletActionInfoAttachActor = exports.BulletActionInfoDestroyBullet = exports.BulletActionInfoSummonBullet = exports.BulletActionInfoSimple = exports.BulletActionInfoBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class BulletActionInfoBase {
  constructor(t) {
    this.IsInPool = false;
    this.Index = 0;
    this.Type = t;
  }
  Clear() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 17, "BulletActionInfo need override clear()");
    }
  }
}
class BulletActionInfoSimple extends (exports.BulletActionInfoBase = BulletActionInfoBase) {
  Clear() {}
}
exports.BulletActionInfoSimple = BulletActionInfoSimple;
class BulletActionInfoSummonBullet extends BulletActionInfoBase {
  constructor() {
    super(...arguments);
    this.ChildrenType = undefined;
    this.Victim = undefined;
    this.IsStayInCharacter = false;
    this.ParentImpactPoint = undefined;
    this.ParentLastPosition = undefined;
    this.CreateOnAuthority = true;
  }
  Clear() {
    this.ChildrenType = undefined;
    this.Victim = undefined;
    this.IsStayInCharacter = false;
    this.ParentImpactPoint = undefined;
    this.ParentLastPosition = undefined;
  }
}
exports.BulletActionInfoSummonBullet = BulletActionInfoSummonBullet;
class BulletActionInfoDestroyBullet extends BulletActionInfoBase {
  constructor() {
    super(...arguments);
    this.SummonChild = false;
    this.DestroyReason = undefined;
  }
  Clear() {
    this.SummonChild = false;
    this.DestroyReason = undefined;
  }
}
exports.BulletActionInfoDestroyBullet = BulletActionInfoDestroyBullet;
class BulletActionInfoAttachActor extends BulletActionInfoBase {
  constructor() {
    super(...arguments);
    this.IsParentActor = false;
    this.Actor = undefined;
    this.SocketName = undefined;
    this.LocationRule = undefined;
    this.RotationRule = undefined;
    this.ScaleRule = undefined;
    this.WeldSimulatedBodies = false;
    this.AttachLocationOffset = undefined;
  }
  Clear() {
    this.IsParentActor = false;
    this.Actor = undefined;
    this.SocketName = undefined;
    this.LocationRule = undefined;
    this.RotationRule = undefined;
    this.ScaleRule = undefined;
    this.WeldSimulatedBodies = false;
    this.AttachLocationOffset = undefined;
  }
}
exports.BulletActionInfoAttachActor = BulletActionInfoAttachActor;
class BulletActionInfoDelayDestroyBullet extends BulletActionInfoBase {
  constructor() {
    super(...arguments);
    this.DelayTime = 0;
    this.SummonChild = false;
    this.IgnoreBulletActorTimeScale = false;
  }
  Clear() {
    this.DelayTime = 0;
    this.SummonChild = false;
    this.IgnoreBulletActorTimeScale = false;
  }
}
exports.BulletActionInfoDelayDestroyBullet = BulletActionInfoDelayDestroyBullet;
//# sourceMappingURL=BulletActionInfo.js.map