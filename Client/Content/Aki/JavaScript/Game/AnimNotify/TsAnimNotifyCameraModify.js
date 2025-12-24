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
class TsAnimNotifyCameraModify extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.持续时间 = -0;
    this.淡入时间 = -0;
    this.淡出时间 = -0;
    this.打断淡出时间 = -0;
    this.相机修改配置 = undefined;
    this.生效客户端类型 = 0;
    this.CameraAttachSocket = "CameraPosition";
    this.条件 = undefined;
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default) && !(t instanceof TsBaseVehicle_1.default)) {
      return false;
    }
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
    if (!i?.Valid) {
      return false;
    }
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(i)) {
      return false;
    }
    var r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
    if (!r?.Valid) {
      return false;
    }
    let s = undefined;
    if (e instanceof UE.AnimMontage) {
      s = e;
    }
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(i, this.相机修改配置, this.生效客户端类型, this.条件)) {
      let e = undefined;
      if (this.生效客户端类型 !== 0 && this.生效客户端类型 !== 1 && this.生效客户端类型 !== 6 && this.生效客户端类型 !== 9 && this.生效客户端类型 !== 10 && (e = t, this.生效客户端类型 !== 7) && this.生效客户端类型 !== 8) {
        this.相机修改配置.IsLockInput = true;
        this.相机修改配置.OverrideCameraInput = true;
      }
      r.ApplyCameraModify(this.Tag, this.持续时间, this.淡入时间, this.淡出时间, this.相机修改配置, s, this.打断淡出时间, undefined, undefined, e, this.CameraAttachSocket, t);
    }
    return true;
  }
  GetNotifyName() {
    return "Modify镜头";
  }
}
exports.default = TsAnimNotifyCameraModify;
//# sourceMappingURL=TsAnimNotifyCameraModify.js.map