"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RailMoveContext = exports.RailMoveTarget = exports.MOTOR_RAIL_MOVE_DEBUG_KEY = exports.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME = exports.DT_MOTOR_RAIL_MOVE_CONFIG_PATH = undefined;
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
exports.DT_MOTOR_RAIL_MOVE_CONFIG_PATH = "/Game/Aki/Data/Gameplay/MotorRailMove/DT_MotorRailMoveConfig.DT_MotorRailMoveConfig";
exports.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME = "Default";
exports.MOTOR_RAIL_MOVE_DEBUG_KEY = "MotorRailMove";
class RailMoveTarget {
  constructor() {
    this.TargetLoc = Vector_1.Vector.Create();
    this.TargetRot = Rotator_1.Rotator.Create();
    this.TargetVel = Vector_1.Vector.Create();
    this.TargetSpline = undefined;
    this.TargetSplineInputKey = 0;
    this.TargetSplineDist = 0;
    this.TargetSplineDir = Vector_1.Vector.Create();
    this.TargetSplineRot = Rotator_1.Rotator.Create();
    this.IsForward = false;
  }
}
exports.RailMoveTarget = RailMoveTarget;
class RailMoveContext {
  constructor() {
    this.SourceLoc = Vector_1.Vector.Create();
    this.SourceRot = Rotator_1.Rotator.Create();
    this.SourceVel = Vector_1.Vector.Create();
    this.RailSpline = undefined;
    this.IsForward = false;
    this.RailMoveTarget = new RailMoveTarget();
  }
}
exports.RailMoveContext = RailMoveContext;
//# sourceMappingURL=MotorcycleRailMoveDefine.js.map