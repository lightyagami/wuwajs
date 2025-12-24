"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSetMotorSpeed = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Global_1 = require("../../Global");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSetMotorSpeed extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    if (this.OPt) {
      var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      if (t) {
        t = t.Entity.CheckGetComponent(242);
        if (t && t.VehicleEntity?.Valid) {
          var r = this.OPt;
          if (t.VehicleType !== "Motorcycle") {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 72, `[SetMotorSpeed] EVehicleType${t.VehicleType}不是Motorcycle`, ["param", r]);
            }
          } else {
            t = t.VehicleEntity.CheckGetComponent(247);
            if (t) {
              if (r.SpeedConfig.Type === "TargetSpeed") {
                var e = r.SpeedConfig.TargetSpeed * r.SpeedConfig.TargetSpeed;
                var s = t.ActorVelocityProxy.SizeSquared();
                if ((!r.SpeedConfig.NotAllowSpeedAdjustmentIfExceed || !(e < s)) && (!r.SpeedConfig.NotAllowSpeedAdjustmentIfBelow || !(s < e))) {
                  let e = 0;
                  let o = "";
                  switch (r.SpeedConfig.ChangeSpeedCurve.Type) {
                    case "Preset":
                      e = r.SpeedConfig.ChangeSpeedCurve.PresetType;
                      break;
                    case "Custom":
                      e = 13;
                      o = r.SpeedConfig.ChangeSpeedCurve.CustomCurve;
                  }
                  s = UE.KuroMovementBPLibrary.KuroEaseSpeedTo(t.Actor.VehicleMovementComponent, r.SpeedConfig.TargetSpeed * CommonDefine_1.MTOCM, e, r.SpeedConfig.TransitionTime, 1, o);
                  if (s === 0 && Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 72, "[SetMotorSpeed] KuroEaseSpeedTo 失败", ["param", r]);
                  }
                  this.FinishExecute(s !== 0);
                }
              }
            } else {
              this.FinishExecute(false);
            }
          }
        } else {
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowSetMotorSpeed = LevelFlowSetMotorSpeed;
//# sourceMappingURL=LevelFlowSetMotorSpeed.js.map