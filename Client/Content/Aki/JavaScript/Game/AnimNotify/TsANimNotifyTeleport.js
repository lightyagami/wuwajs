"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const GravityUtils_1 = require("../Utils/GravityUtils");
class TsAnimNotifyTeleport extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.传送基于角色坐标系 = true;
    this.传送偏移 = new UE.VectorDouble(0, 0, 0);
    this.镜头瞬移 = true;
  }
  Constructor() {}
  K2_Notify(t, e) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.CharacterActorComponent)?.Valid && !!t?.IsAutonomousProxy && !(TsAnimNotifyTeleport.Initialize(), this.传送基于角色坐标系 ? t.AddActorLocalOffset(this.传送偏移, "传送并设置镜头位置") : (TsAnimNotifyTeleport.TempVector.DeepCopy(this.传送偏移), GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(t, TsAnimNotifyTeleport.GravityQuat), TsAnimNotifyTeleport.GravityQuat.Inverse(TsAnimNotifyTeleport.InverseGravityQuat), GravityUtils_1.GravityUtils.GetVectorInNormal(TsAnimNotifyTeleport.TempVector, TsAnimNotifyTeleport.InverseGravityQuat, TsAnimNotifyTeleport.TempVector), t.AddActorWorldOffset(TsAnimNotifyTeleport.TempVector.ToUeVector(), "传送并设置镜头位置")), this.镜头瞬移 && ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.ResetFightCameraLogic(false, true), 0);
  }
  static Initialize() {
    if (!TsAnimNotifyTeleport.GravityQuat) {
      TsAnimNotifyTeleport.GravityQuat = Quat_1.Quat.Create();
      TsAnimNotifyTeleport.InverseGravityQuat = Quat_1.Quat.Create();
      TsAnimNotifyTeleport.TempVector = Vector_1.Vector.Create();
    }
  }
  GetNotifyName() {
    return "传送并设置镜头位置";
  }
}
TsAnimNotifyTeleport.GravityQuat = Quat_1.Quat.Create();
TsAnimNotifyTeleport.InverseGravityQuat = Quat_1.Quat.Create();
TsAnimNotifyTeleport.TempVector = Vector_1.Vector.Create();
exports.default = TsAnimNotifyTeleport; //# sourceMappingURL=TsANimNotifyTeleport.js.map