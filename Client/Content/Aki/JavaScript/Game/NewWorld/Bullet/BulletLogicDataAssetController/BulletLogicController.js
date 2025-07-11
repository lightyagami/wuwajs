"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicController = undefined;
class BulletLogicController {
  constructor(t, e) {
    this.LogicController = t;
    this.Bullet = e;
    this.oW = false;
  }
  get NeedTick() {
    return this.oW;
  }
  set NeedTick(t) {
    this.oW = t;
  }
  OnInit() {}
  BulletLogicAction(t = 0) {}
  BulletLogicActionOnHitObstacles(t = 0) {}
  Update(t) {}
  Tick(t) {
    this.Update(t);
  }
  OnBulletDestroy() {}
}
exports.BulletLogicController = BulletLogicController;
//# sourceMappingURL=BulletLogicController.js.map