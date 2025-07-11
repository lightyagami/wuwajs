"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicDestroyOtherBullet = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const BulletController_1 = require("../BulletController");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicDestroyOtherBullet extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l);
  }
  OnInit() {
    this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(this.LogicController.Camp);
  }
  BulletLogicAction(t) {
    var l = t.GetBulletInfo();
    var e = this.LogicController.BulletId;
    if (!!StringUtils_1.StringUtils.IsEmpty(e) || e === l.BulletRowName) {
      BulletController_1.BulletController.DestroyBullet(t.Id, this.LogicController.SummonChildBullet);
    }
  }
}
exports.BulletLogicDestroyOtherBullet = BulletLogicDestroyOtherBullet;
//# sourceMappingURL=BulletLogicDestroyOtherBullet.js.map