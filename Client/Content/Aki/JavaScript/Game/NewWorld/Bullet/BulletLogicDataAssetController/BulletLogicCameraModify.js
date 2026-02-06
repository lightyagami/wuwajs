"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicCameraModify = undefined;
const CameraUtility_1 = require("../../../Camera/CameraUtility");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUtils_1 = require("../../Character/CharacterUtils");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicCameraModify extends BulletLogicController_1.BulletLogicController {
  constructor(t, i) {
    super(t, i);
    this.Lo = undefined;
    this.Lo = t;
  }
  BulletLogicAction(t) {
    var i = this.Lo.Player;
    if (i === 0 || i === 2) {
      this.UOm(this.Bullet.GetBulletInfo().AttackerHandle);
    }
    if (i === 1 || i === 2) {
      this.UOm(t?.EntityHandle);
    }
  }
  UOm(t) {
    if (t?.Valid) {
      var i = t.Entity.GetComponent(3)?.Actor;
      if (i && CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t)) {
        var r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
        if (r?.Valid && CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(t, this.Lo.ModifierSettings, this.Lo.ClientType, this.Lo.Conditions)) {
          let t = undefined;
          if (this.Lo.ClientType !== 0 && this.Lo.ClientType !== 1 && this.Lo.ClientType !== 6) {
            t = i;
            this.Lo.ModifierSettings.IsLockInput = true;
            this.Lo.ModifierSettings.OverrideCameraInput = true;
          }
          r.ApplyCameraModify(this.Lo.Tag, this.Lo.Duration, this.Lo.BlendIn, this.Lo.BlendOut, this.Lo.ModifierSettings, undefined, this.Lo.BlendOutInterrupt, undefined, undefined, t, this.Lo.CameraAttachSocket, i);
        }
      }
    }
  }
}
exports.BulletLogicCameraModify = BulletLogicCameraModify;
//# sourceMappingURL=BulletLogicCameraModify.js.map