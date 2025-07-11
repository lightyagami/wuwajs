"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const CameraUtility_1 = require("../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateSoftLock extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, a) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!CameraUtility_1.CameraUtility.CheckFormationControlState(ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId), true, true) && (this.EnableSoftLock(t), true);
  }
  K2_NotifyTick(t, e, a) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !CameraUtility_1.CameraUtility.CheckFormationControlState(ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId), true, true) && (this.DisableSoftLock(t), true);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (this.DisableSoftLock(t), true);
  }
  EnableSoftLock(t) {
    if (TsAnimNotifyStateSoftLock.CacheMap.get(t) === undefined) {
      TsAnimNotifyStateSoftLock.CacheMap.set(t, ModelManager_1.ModelManager.CameraModel.EnableSoftLock("TsAnimNotifyStateSoftLock Enable"));
    }
  }
  DisableSoftLock(t) {
    var e = TsAnimNotifyStateSoftLock.CacheMap.get(t);
    if (e !== undefined) {
      ModelManager_1.ModelManager.CameraModel.DisableSoftLock(e, "TsAnimNotifyStateSoftLock Disable");
      TsAnimNotifyStateSoftLock.CacheMap.delete(t);
    }
  }
  GetNotifyName() {
    return "开启镜头软锁";
  }
}
TsAnimNotifyStateSoftLock.CacheMap = new Map();
exports.default = TsAnimNotifyStateSoftLock; //# sourceMappingURL=TsAnimNotifyStateSoftLock.js.map