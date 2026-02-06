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
    this.ExcludeTag = new UE.GameplayTagContainer();
    this.CameraShakeInstanceIdMap = new Map();
    this.PlayingForceFeedback = new Set();
  }
  Constructor() {
    this.CameraShakeInstanceIdMap = new Map();
    this.PlayingForceFeedback = new Set();
  }
  K2_NotifyBegin(e, r, t) {
    var a;
    var o = e.GetOwner();
    return (o instanceof TsBaseCharacter_1.default || o instanceof TsBaseVehicle_1.default) && !!(a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(o.EntityId))?.Valid && !!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(a) && !!CameraUtility_1.CameraUtility.CheckCameraShakeCondition(a) && ControllerHolder_1.ControllerHolder.CameraController.Model.CameraMode === 0 && !!ControllerHolder_1.ControllerHolder.CameraController.GetPlayerCameraManager()?.IsValid() && !(o.GetEntityNoBlueprint()?.GetComponent(217)?.HasAnyTagContainer(this.ExcludeTag) ? (this.PlayingForceFeedback.add(e), ControllerHolder_1.ControllerHolder.CameraController.PlayForceFeedbackFromCameraShake(this.震动配置)) : ((a = this.CameraShakeInstanceIdMap.get(e)) && ControllerHolder_1.ControllerHolder.CameraController.StopCameraShake(a, true), this.CameraShakeInstanceIdMap.set(e, ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(this.震动配置, ControllerHolder_1.ControllerHolder.CameraController.Model.ShakeModify, 0, undefined, true, true))), 0);
  }
  K2_NotifyEnd(e, r) {
    var t = this.CameraShakeInstanceIdMap.get(e);
    if (t) {
      ControllerHolder_1.ControllerHolder.CameraController.StopCameraShake(t, true);
      this.CameraShakeInstanceIdMap.delete(e);
    }
    if (this.PlayingForceFeedback.has(e)) {
      ControllerHolder_1.ControllerHolder.CameraController.StopForceFeedbackFromCameraShake(this.震动配置);
      this.PlayingForceFeedback.delete(e);
    }
    return true;
  }
  GetNotifyName() {
    return "相机震屏ANS";
  }
}
exports.default = TsAnimNotifyStateCameraShake;
//# sourceMappingURL=TsAnimNotifyStateCameraShake.js.map