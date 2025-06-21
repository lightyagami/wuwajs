"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletLogicSummonRandom = void 0;
const UE = require("ue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSummonRandom extends BulletLogicController_1.BulletLogicController {
  constructor(e, r) {
    super(e, r)
  }
  BulletLogicAction() {
    var e = this.Bullet.GetBulletInfo(),
      r = e.Attacker,
      e = new UE.TransformDouble(e.GetActorRotation().ToUeRotator(), e.GetActorLocation().ToUeVector(), Vector_1.Vector.OneVectorDouble);
    ControllerHolder_1.ControllerHolder.CreatureController.SummonRandomRequest(r.Id, this.LogicController.SummonIndex, e, this.LogicController.SkillId, this.LogicController.IsVisible)
  }
  OnBulletDestroy() {
    var e, r;
    this.LogicController.DestroySummonOnDestroy && (r = (e = this.Bullet.GetBulletInfo().Attacker).GetComponent(0).GetSummonRadomEntityId(this.LogicController.SummonIndex), r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(r), ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityByServerIdRequest(this.LogicController.SkillId, e.Id, r))
  }
}
exports.BulletLogicSummonRandom = BulletLogicSummonRandom;
//# sourceMappingURL=BulletLogicSummonRandom.js.map