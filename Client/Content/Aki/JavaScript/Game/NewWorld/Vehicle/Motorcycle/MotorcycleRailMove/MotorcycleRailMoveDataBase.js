"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailMoveDataBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class MotorcycleRailMoveDataBase {
  constructor(t, o, e) {
    this.Type = t;
    this.OwnerEntity = o;
    this.RelatedRail = e;
    this.IsFinishMove = false;
    this.IsFinishMoveOnFailure = false;
  }
  Enter(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveData] MotorcycleRailMoveData.Enter", ["Type", this.Type]);
    }
    return this.OnEnter(t);
  }
  OnEnter(t) {
    return true;
  }
  Exit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveData] MotorcycleRailMoveData.Exit", ["Type", this.Type]);
    }
    this.OnExit();
  }
  OnExit() {}
  Tick(t) {
    this.OnTick(t);
  }
  OnTick(t) {}
  GetVelocity(t) {
    return false;
  }
}
exports.MotorcycleRailMoveDataBase = MotorcycleRailMoveDataBase;
//# sourceMappingURL=MotorcycleRailMoveDataBase.js.map