"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicAdditiveAccelerateController = undefined;
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const BulletPool_1 = require("../Model/BulletPool");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicAdditiveAccelerateController extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l);
    this.a7o = undefined;
    this.a7o = l.GetBulletInfo();
  }
  BulletLogicAction() {
    var t;
    var l;
    var e;
    var o = this.LogicController;
    if (this.a7o.BulletDataMain.Move.Trajectory !== 2) {
      t = this.a7o.MoveInfo;
      if (this.a7o.AttackerMoveComp?.IsStandardGravity) {
        t.AdditiveAccelerateCurve = o.AccelerationCurve;
        t.BaseAdditiveAccelerate.FromUeVector(o.Acceleration);
        t.AdditiveAccelerate.FromUeVector(o.Acceleration);
      } else {
        l = Quat_1.Quat.Create();
        GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.a7o.AttackerActorComp, l);
        (e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.Acceleration);
        l.RotateVector(e, t.BaseAdditiveAccelerate);
        BulletPool_1.BulletPool.RecycleVector(e);
        t.AdditiveAccelerate.FromUeVector(t.BaseAdditiveAccelerate);
      }
    }
  }
}
exports.BulletLogicAdditiveAccelerateController = BulletLogicAdditiveAccelerateController;
//# sourceMappingURL=BulletLogicAdditiveAccelerateController.js.map