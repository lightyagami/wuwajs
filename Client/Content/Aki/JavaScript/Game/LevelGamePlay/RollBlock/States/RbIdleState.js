"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbIdleState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const RollBlockDefind_1 = require("../RollBlockDefind");
const RbBaseMoveState_1 = require("./RbBaseMoveState");
class RbIdleState extends RbBaseMoveState_1.RbBaseMoveState {
  constructor() {
    super(...arguments);
    this.Info = undefined;
  }
  Enter(e) {
    var t;
    if ((0, RollBlockDefind_1.isRbBlockIdleState)(e)) {
      this.StateName = 1;
      this.Info = e;
      this.Owner.AvailableInputDirs = [];
      (t = Vector_1.Vector.Create()).FromConfigVector(e.l9_);
      e = Rotator_1.Rotator.Create(e.g8n.Y, e.g8n.Z, e.g8n.X);
      this.Owner.SetActorLocationAndRotation(t, e);
      this.IsFinishedInternal = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "RbIdleState Enter without IdleState info");
    }
  }
}
exports.RbIdleState = RbIdleState;
//# sourceMappingURL=RbIdleState.js.map