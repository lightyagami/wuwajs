"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetMotorSpeed = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetMotorSpeed extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(r, t) {
    var l = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (l) {
      l = l.Entity.CheckGetComponent(233);
      if (l && l.VehicleEntity?.Valid) {
        if (l.VehicleType !== "Motorcycle") {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, `[SetMotorSpeed] EVehicleType${l.VehicleType}不是Motorcycle`, ["context", t], ["param", r]);
          }
        } else {
          l = l.VehicleEntity.CheckGetComponent(238);
          if (l) {
            var a = r;
            if (a.SpeedConfig.Type === "TargetSpeed") {
              var e = a.SpeedConfig.TargetSpeed * a.SpeedConfig.TargetSpeed;
              var o = l.ActorVelocityProxy.SizeSquared();
              if ((!a.SpeedConfig.NotAllowSpeedAdjustmentIfExceed || !(e < o)) && (!a.SpeedConfig.NotAllowSpeedAdjustmentIfBelow || !(o < e))) {
                let e = 0;
                let o = "";
                switch (a.SpeedConfig.ChangeSpeedCurve.Type) {
                  case "Preset":
                    e = a.SpeedConfig.ChangeSpeedCurve.PresetType;
                    break;
                  case "Custom":
                    e = 13;
                    o = a.SpeedConfig.ChangeSpeedCurve.CustomCurve;
                }
                if (UE.KuroMovementBPLibrary.KuroEaseSpeedTo(l.Actor.VehicleMovementComponent, a.SpeedConfig.TargetSpeed * CommonDefine_1.MTOCM, e, a.SpeedConfig.TransitionTime, 1, o) === 0 && Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 72, "[SetMotorSpeed] KuroEaseSpeedTo 失败", ["context", t], ["param", r]);
                }
              }
            }
          }
        }
      }
    }
  }
}
exports.LevelEventSetMotorSpeed = LevelEventSetMotorSpeed;
//# sourceMappingURL=LevelEventSetMotorSpeed.js.map