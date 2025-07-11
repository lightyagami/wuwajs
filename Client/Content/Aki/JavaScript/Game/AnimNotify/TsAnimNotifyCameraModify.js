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
  K2_Notify(t, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
    if (!e?.Valid) {
      return false;
    }
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(e)) {
      return false;
    }
    var i = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
    if (!i?.Valid) {
      return false;
    }
    let a = undefined;
    if (r instanceof UE.AnimMontage) {
      a = r;
    }
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(e, this.相机修改配置, this.生效客户端类型, this.条件)) {
      let r = undefined;
      if (this.生效客户端类型 !== 0 && this.生效客户端类型 !== 1 && this.生效客户端类型 !== 6) {
        r = t;
        this.相机修改配置.IsLockInput = true;
        this.相机修改配置.OverrideCameraInput = true;
      }
      i.ApplyCameraModify(this.Tag, this.持续时间, this.淡入时间, this.淡出时间, this.相机修改配置, a, this.打断淡出时间, undefined, undefined, r, this.CameraAttachSocket, t);
    }
    return true;
  }
  GetNotifyName() {
    return "Modify镜头";
  }
}
exports.default = TsAnimNotifyCameraModify;
//# sourceMappingURL=TsAnimNotifyCameraModify.js.map