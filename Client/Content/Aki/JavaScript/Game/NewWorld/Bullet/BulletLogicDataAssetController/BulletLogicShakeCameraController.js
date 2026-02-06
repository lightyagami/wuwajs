"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicShakeCameraController = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const CharacterUtils_1 = require("../../Character/CharacterUtils");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicShakeCameraController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.x7o = false;
    this.w7o = -0;
    this.B7o = 0;
    this.b7o = undefined;
    this.NeedTick = true;
    this.Hte = e.GetComponent(180);
    this.q7o = t.Count;
    this.G7o = t.Interval * TimeUtil_1.TimeUtil.InverseMillisecond;
    if (CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(this.Bullet.GetBulletInfo().AttackerHandle)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.LogicController.Shake.ToAssetPathName(), UE.Class, t => {
        this.b7o = t;
      });
    }
  }
  Update(t) {
    if (!!this.x7o && !(this.B7o >= this.q7o)) {
      if (this.w7o < this.G7o) {
        this.w7o += t;
      } else if (this.b7o) {
        CameraController_1.CameraController.PlayWorldCameraShake(this.b7o, this.Hte.ActorLocation, this.LogicController.InnerRadius, this.LogicController.OuterRadius, this.LogicController.Falloff, this.LogicController.OrientShakeTowardsEpicenter);
        this.w7o = 0;
        this.B7o++;
      }
    }
  }
  BulletLogicAction() {
    if (this.b7o) {
      CameraController_1.CameraController.PlayWorldCameraShake(this.b7o, this.Hte.ActorLocation, this.LogicController.InnerRadius, this.LogicController.OuterRadius, this.LogicController.Falloff, this.LogicController.OrientShakeTowardsEpicenter);
      this.x7o = true;
      this.w7o = 0;
      this.B7o = 1;
    }
  }
}
exports.BulletLogicShakeCameraController = BulletLogicShakeCameraController;
//# sourceMappingURL=BulletLogicShakeCameraController.js.map