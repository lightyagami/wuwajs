"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventVehicleSetSpeedImmediately = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventVehicleSetSpeedImmediately extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l = e.SetSpeedConfig;
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (e?.Valid) {
      e = e.Entity.CheckGetComponent(242)?.VehicleEntity;
      if (e?.Valid) {
        var r = e.CheckGetComponent(249);
        var a = e.CheckGetComponent(247);
        if (r?.Valid && a?.Valid) {
          switch (l.Type) {
            case "TotalSpeed":
              var i = ControllerHolder_1.ControllerHolder.LevelGamePlayController.ConstraintProcessedValue(l.Speed, a.ActorVelocityProxy.Size());
              a.ActorVelocityProxy.GetSafeNormal(MathUtils_1.MathUtils.CommonTempVector);
              r.SetForceSpeed(MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(i));
              break;
            case "HorizontalVerticalSpeed":
              {
                MathUtils_1.MathUtils.CommonTempVector2.DeepCopy(a.ActorVelocityProxy);
                let e = GravityUtils_1.GravityUtils.GetZnInGravityForActor(a, a.ActorVelocityProxy);
                if (l.VerticalSpeed) {
                  e = ControllerHolder_1.ControllerHolder.LevelGamePlayController.ConstraintProcessedValue(l.VerticalSpeed, e);
                }
                if (l.HorizontalSpeed) {
                  MathUtils_1.MathUtils.CommonTempVector.DeepCopy(a.ActorVelocityProxy);
                  GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(a, MathUtils_1.MathUtils.CommonTempVector);
                  i = ControllerHolder_1.ControllerHolder.LevelGamePlayController.ConstraintProcessedValue(l.HorizontalSpeed, MathUtils_1.MathUtils.CommonTempVector.Size());
                  MathUtils_1.MathUtils.CommonTempVector.GetSafeNormal(MathUtils_1.MathUtils.CommonTempVector2);
                  MathUtils_1.MathUtils.CommonTempVector2.MultiplyEqual(i);
                }
                GravityUtils_1.GravityUtils.SetZnInGravityForActor(a, MathUtils_1.MathUtils.CommonTempVector2, e);
                r.SetForceSpeed(MathUtils_1.MathUtils.CommonTempVector2);
                break;
              }
          }
        }
      }
    }
  }
}
exports.LevelEventVehicleSetSpeedImmediately = LevelEventVehicleSetSpeedImmediately;
//# sourceMappingURL=LevelEventVehicleSetSpeedImmediately.js.map