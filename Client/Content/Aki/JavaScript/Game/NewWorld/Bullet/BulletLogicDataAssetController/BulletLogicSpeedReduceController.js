"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicSpeedReduceController = undefined;
const BulletLogicController_1 = require("./BulletLogicController");
const TOLERANCE = 0.00001;
const MIN_WEIGHT = 50;
class BulletLogicSpeedReduceController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.a7o = this.Bullet.GetBulletInfo();
    this.h7o = t;
  }
  BulletLogicAction(t = 0) {
    var e;
    var l = (l = this.a7o.AttackerMoveComp.CharacterWeight) < MIN_WEIGHT ? MIN_WEIGHT : l;
    var o = this.a7o.CollisionInfo.GetFirstVictim([1]);
    if (o?.Valid) {
      e = l - (o = (o = o?.GetComponent(178).CharacterWeight) < MIN_WEIGHT ? MIN_WEIGHT : o) * 0.1 * this.h7o.SpeedDampingRatio;
      o = (o = (o = (l = l + o * 0.1 * this.h7o.SpeedDampingRatio) < TOLERANCE || e < 0 ? 0 : this.a7o.MoveInfo.BulletSpeed * (e / l)) > 0 ? o : 0) < this.h7o.MinSpeed ? 0 : o;
      this.a7o.MoveInfo.BulletSpeed = o;
    }
  }
  BulletLogicActionOnHitObstacles(t = 0) {
    if (this.h7o.IsNotThroughObstacles) {
      this.a7o.MoveInfo.BulletSpeed = 0;
    }
  }
}
exports.BulletLogicSpeedReduceController = BulletLogicSpeedReduceController;
//# sourceMappingURL=BulletLogicSpeedReduceController.js.map