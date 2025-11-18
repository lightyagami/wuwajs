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
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateCameraShake extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.震动配置 = undefined;
    this.CameraShakeInstanceId = -1;
  }
  Constructor() {
    this.CameraShakeInstanceId = -1;
  }
  K2_NotifyBegin(e, r, a) {
    var e = e.GetOwner();
    return (e instanceof TsBaseCharacter_1.default || e instanceof TsBaseVehicle_1.default) && !!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Valid && !!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(e) && !!CameraUtility_1.CameraUtility.CheckCameraShakeCondition(e) && ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode === 0 && !!ControllerHolder_1.ControllerHolder.CameraController.GetPlayerCameraManager()?.IsValid() && !(this.CameraShakeInstanceId = ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(this.震动配置, ControllerHolder_1.ControllerHolder.CameraController.Model.ShakeModify, 0, undefined, true, true), 0);
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    return (e instanceof TsBaseCharacter_1.default || e instanceof TsBaseVehicle_1.default) && (ControllerHolder_1.ControllerHolder.CameraController.StopCameraShake(this.CameraShakeInstanceId, true), true);
  }
  GetNotifyName() {
    return "相机震屏ANS";
  }
}
exports.default = TsAnimNotifyStateCameraShake;
//# sourceMappingURL=TsAnimNotifyStateCameraShake.js.map