"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const CameraUtility_1 = require("../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyCameraShake extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.震动配置 = undefined;
    this.bForSelf = false;
    this.Radius = -0;
  }
  Constructor() {}
  K2_Notify(r, e) {
    var t = r.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId))?.Valid && !!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t) && !!CameraUtility_1.CameraUtility.CheckCameraShakeCondition(t) && ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode === 0 && !!ControllerHolder_1.ControllerHolder.CameraController.GetPlayerCameraManager()?.IsValid() && !(this.bForSelf ? ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(this.震动配置, ControllerHolder_1.ControllerHolder.CameraController.Model.ShakeModify, 0, undefined, true) : ControllerHolder_1.ControllerHolder.CameraController.PlayWorldCameraShake(this.震动配置, r?.GetOwner()?.D_K2_GetActorLocation(), this.Radius, this.Radius, 1, true), 0);
  }
  GetNotifyName() {
    return "相机震屏";
  }
}
exports.default = TsAnimNotifyCameraShake;
//# sourceMappingURL=TsAnimNotifyCameraShake.js.map