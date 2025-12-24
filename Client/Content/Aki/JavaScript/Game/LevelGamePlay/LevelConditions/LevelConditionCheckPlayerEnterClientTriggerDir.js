"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerEnterClientTriggerDir = undefined;
const UE = require("ue");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralModel_1 = require("../LevelGeneralModel");
const DEBUG_DRAW_DURATION = 5;
const DEBUG_DRAW_THICKNESS = 2;
class LevelConditionCheckPlayerEnterClientTriggerDir extends LevelGeneralBase_1.LevelConditionBase {
  static CheckPitchAndYaw(e, r, t, l) {
    ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(LevelGeneralModel_1.LEVLE_CONDITION_DEBUG_KEY);
    e.UnRotateVector(t, MathUtils_1.MathUtils.CommonTempVector);
    return !(MathUtils_1.MathUtils.CommonTempVector.Size() < MathUtils_1.MathUtils.SmallNumber) && (MathUtils_1.MathUtils.CommonTempVector.ToOrientationRotator(MathUtils_1.MathUtils.CommonTempRotator), Math.abs(MathUtils_1.MathUtils.CommonTempRotator.Pitch) < Rotator_1.Rotator.ClampAxis(l.VerticalAngle)) && Math.abs(MathUtils_1.MathUtils.CommonTempRotator.Yaw) < Rotator_1.Rotator.ClampAxis(l.HorizontalAngle);
  }
  CheckNew(e, r, t) {
    var l = e.DirConfigs;
    if (!l || !t) {
      return false;
    }
    if (t.Type !== 5) {
      return false;
    }
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.TriggerEntityId ?? 0)?.Entity?.CheckGetComponent(89)?.GetRangeActor()?.K2_GetActorQuaternion();
    if (!a) {
      return false;
    }
    MathUtils_1.MathUtils.CommonTempQuat.FromUeQuat(a);
    a = e.TargetType;
    let i = undefined;
    let o = undefined;
    if (a) {
      switch (a) {
        case "Player":
          i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
          o = 3;
          break;
        case "DrivingVehicle":
          var s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.CheckGetComponent(242);
          if (!s || !s.VehicleEntity?.Valid) {
            return false;
          }
          i = s.VehicleEntity;
          o = 247;
      }
    } else {
      i = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(r, t)?.Entity;
    }
    if (!i?.Valid || !o) {
      return false;
    }
    for (const _ of l) {
      let e = undefined;
      var n = i.CheckGetComponent(o)?.ActorLocationProxy;
      switch (_.Type) {
        case "ForwardAngle":
          e = i.CheckGetComponent(o)?.ActorForwardProxy;
          break;
        case "VelocityDirAngle":
          e = i.CheckGetComponent(o)?.ActorVelocityProxy;
      }
      if (!e || !n) {
        return false;
      }
      if (!LevelConditionCheckPlayerEnterClientTriggerDir.CheckPitchAndYaw(MathUtils_1.MathUtils.CommonTempQuat, n, e, _.AngleRange)) {
        return false;
      }
    }
    return true;
  }
}
exports.LevelConditionCheckPlayerEnterClientTriggerDir = LevelConditionCheckPlayerEnterClientTriggerDir;
//# sourceMappingURL=LevelConditionCheckPlayerEnterClientTriggerDir.js.map