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
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
    if (!i?.Valid) {
      return false;
    }
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(i)) {
      return false;
    }
    var a = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
    if (!a?.Valid) {
      return false;
    }
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(i, this.相机修改配置, this.生效客户端类型, this.条件)) {
      let r = undefined;
      if (this.生效客户端类型 !== 0 && this.生效客户端类型 !== 1 && this.生效客户端类型 !== 6) {
        r = t;
        this.相机修改配置.IsLockInput = true;
        this.相机修改配置.OverrideCameraInput = true;
      }
      a.ApplyCameraModify(this.Tag, MODIFY_TIME_LENGTH, this.淡入时间, this.淡出时间, this.相机修改配置, e, this.打断淡出时间, undefined, undefined, r, this.CameraAttachSocket, t);
    }
    return true;
  }
  K2_NotifyEnd(r, t) {
    return r.GetOwner() instanceof TsBaseCharacter_1.default && !!(r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent)?.Valid && (r.StopCameraModify(t), true);
  }
  GetNotifyName() {
    return "ModifyANS镜头";
  }
}
exports.default = TsAnimNotifyStateCameraModify;
//# sourceMappingURL=TsAnimNotifyStateCameraModify.js.map