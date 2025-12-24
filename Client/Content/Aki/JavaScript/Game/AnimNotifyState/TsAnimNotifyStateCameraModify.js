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
const MODIFY_TIME_LENGTH = 100;
class TsAnimNotifyStateCameraModify extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.淡入时间 = -0;
    this.淡出时间 = -0;
    this.打断淡出时间 = -0;
    this.相机修改配置 = undefined;
    this.生效客户端类型 = 0;
    this.CameraAttachSocket = "CameraPosition";
    this.条件 = undefined;
    this.打断后继续 = false;
    this.ModifyInstance = 0;
    this.IsStopByCharacterType = false;
  }
  Constructor() {
    this.ModifyInstance = 0;
    this.IsStopByCharacterType = false;
  }
  K2_NotifyBegin(e, t, i) {
    var r = e.GetOwner();
    return (r instanceof TsBaseCharacter_1.default || r instanceof TsBaseVehicle_1.default) && !!ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent?.Valid && !!(r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.EntityId))?.Valid && (this.IsStopByCharacterType = !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(r), !this.IsStopByCharacterType) && this.CheckAndPlayCameraModify(e, t, r);
  }
  K2_NotifyTick(e, t, i) {
    var r;
    var s;
    return !this.打断后继续 || ((r = e.GetOwner()) instanceof TsBaseCharacter_1.default || r instanceof TsBaseVehicle_1.default) && !!(s = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent)?.Valid && (!!s.HasCameraModify() || !!(s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.EntityId))?.Valid && !this.IsStopByCharacterType && this.CheckAndPlayCameraModify(e, t, s));
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (e instanceof TsBaseCharacter_1.default || e instanceof TsBaseVehicle_1.default) && !!(e = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent)?.Valid && (e.StopCameraModify(t, this.ModifyInstance), true);
  }
  GetNotifyName() {
    return "ModifyANS镜头";
  }
  CheckAndPlayCameraModify(t, i, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default) && !(t instanceof TsBaseVehicle_1.default)) {
      return false;
    }
    var r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
    if (!r?.Valid) {
      return false;
    }
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(e, this.相机修改配置, this.生效客户端类型, this.条件)) {
      let e = undefined;
      if (this.生效客户端类型 !== 0 && this.生效客户端类型 !== 1 && this.生效客户端类型 !== 6 && this.生效客户端类型 !== 9 && this.生效客户端类型 !== 10 && (e = t, this.生效客户端类型 !== 7) && this.生效客户端类型 !== 8) {
        this.相机修改配置.IsLockInput = true;
        this.相机修改配置.OverrideCameraInput = true;
      }
      this.ModifyInstance = r.ApplyCameraModify(this.Tag, MODIFY_TIME_LENGTH, this.淡入时间, this.淡出时间, this.相机修改配置, i, this.打断淡出时间, undefined, undefined, e, this.CameraAttachSocket, t);
    }
    return true;
  }
}
exports.default = TsAnimNotifyStateCameraModify;
//# sourceMappingURL=TsAnimNotifyStateCameraModify.js.map