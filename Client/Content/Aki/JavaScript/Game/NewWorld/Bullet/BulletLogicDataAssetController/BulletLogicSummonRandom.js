"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicSummonRandom = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSummonRandom extends BulletLogicController_1.BulletLogicController {
  constructor(e, o) {
    super(e, o);
  }
  BulletLogicAction() {
    var e = this.Bullet.GetBulletInfo();
    var o = e.Attacker;
    var e = new UE.TransformDouble(e.GetActorRotation().ToUeRotator(), e.GetActorLocation().ToUeVector(), Vector_1.Vector.OneVectorDouble);
    ControllerHolder_1.ControllerHolder.CreatureController.SummonRandomRequest(o.Id, this.LogicController.SummonIndex, e, this.LogicController.SkillId, this.LogicController.IsVisible);
  }
  OnBulletDestroy() {
    var e;
    var o;
    if (this.LogicController.DestroySummonOnDestroy && (o = (e = this.Bullet.GetBulletInfo().Attacker).GetComponent(0).GetSummonRandomEntityId(this.LogicController.SummonIndex))) {
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(this.LogicController.SkillId, e.Id, o);
    }
  }
}
exports.BulletLogicSummonRandom = BulletLogicSummonRandom;
//# sourceMappingURL=BulletLogicSummonRandom.js.map