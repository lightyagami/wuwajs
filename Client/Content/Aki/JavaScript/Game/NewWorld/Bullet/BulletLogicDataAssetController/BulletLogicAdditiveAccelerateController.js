"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicAdditiveAccelerateController = undefined;
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicAdditiveAccelerateController extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t);
    this.a7o = t.GetBulletInfo();
  }
  BulletLogicAction() {
    var e;
    var t = this.LogicController;
    if (this.a7o.BulletDataMain.Move.Trajectory !== 2) {
      (e = this.a7o.MoveInfo).AdditiveAccelerateCurve = t.AccelerationCurve;
      e.BaseAdditiveAccelerate.FromUeVector(t.Acceleration);
      e.AdditiveAccelerate.FromUeVector(t.Acceleration);
    }
  }
}
exports.BulletLogicAdditiveAccelerateController = BulletLogicAdditiveAccelerateController;
//# sourceMappingURL=BulletLogicAdditiveAccelerateController.js.map