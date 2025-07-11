"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
class TsGameSplineActor extends UE.Actor {
  constructor() {
    super(...arguments);
    this.SplineData = undefined;
  }
  Constructor() {
    this.SplineData = undefined;
  }
  GetPatrolSpeedByIndex(e) {
    if (this.SplineData.Type !== IComponent_1.ESplineType.Patrol) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 31, "[TsGameSplineActor.GetPatrolSpeedByIndex]当前样条非巡逻样条");
      }
      return -1;
    } else {
      return this.SplineData.Points[e].MoveSpeed;
    }
  }
  GetPointRotatorByIndex(e) {
    var e = this.SplineData.Points[e].Rotation;
    var t = new UE.Rotator();
    if (e !== undefined) {
      t.Pitch = e.Y ?? 0;
      t.Yaw = e.Z ?? 0;
      t.Roll = e.X ?? 0;
    }
    return t;
  }
}
exports.default = TsGameSplineActor;
//# sourceMappingURL=TsGameSplineActor.js.map