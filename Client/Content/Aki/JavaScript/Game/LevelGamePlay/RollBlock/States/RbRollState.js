"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbRollState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RollBlockDefind_1 = require("../RollBlockDefind");
const RbBaseMoveState_1 = require("./RbBaseMoveState");
class RbRollState extends RbBaseMoveState_1.RbBaseMoveState {
  constructor() {
    super(...arguments);
    this.Info = undefined;
    this.fSm = Vector_1.Vector.Create();
    this.gSm = 0;
    this.CSm = Vector_1.Vector.Create();
    this.pSm = Vector_1.Vector.Create();
    this.$6g = 0;
    this.vSm = undefined;
    this.GameplaySetting = undefined;
    this.Gtm = t => {
      var i = this.ySm(1);
      this.Owner.SetActorTransform(i);
      if (ControllerHolder_1.ControllerHolder.RollBlockController.IsCurrentIncId(this.Owner.IncId)) {
        this.NotifyServerMovementFinish();
      }
      this.IsFinishedInternal = true;
    };
  }
  Enter(t) {
    if ((0, RollBlockDefind_1.isRbBlockRollState)(t)) {
      this.StateName = 0;
      this.Info = t;
      this.Owner.AvailableInputDirs = [];
      if ((t = this.Info?.Nfu) !== undefined) {
        this.fSm = this.Owner.PbDirToVector(t);
      }
      this.gSm = 0;
      this.vSm = this.Owner.Transform;
      this.GameplaySetting = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting;
      this.pSm = Vector_1.Vector.Create(this.fSm);
      this.pSm.CrossProductEqual(Vector_1.Vector.Create(0, 0, 1));
      this.CSm = this.Owner.CalculateRotationCenter(RollBlockDefind_1.RB_HALF_HEIGHT, this.fSm);
      this.IsFinishedInternal = false;
      this.$6g = this.Owner.IsMainController ? this.GameplaySetting.BlockRollTime : this.GameplaySetting.VisionBlockRollTime;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "RbIdleState Enter without MovingState info");
    }
  }
  Update(t) {
    if (!(this.gSm >= this.$6g)) {
      if (this.Info && this.fSm && this.vSm && this.GameplaySetting && this.Owner && (this.gSm += t / TimeUtil_1.TimeUtil.InverseMillisecond, t = MathUtils_1.MathUtils.Clamp(this.gSm / this.$6g, 0, 1), t = this.ySm(t), this.Owner.SetActorTransform(t), this.gSm >= this.$6g)) {
        this.Gtm(this.Owner.Entity);
      }
    }
  }
  ySm(t) {
    var i = Vector_1.Vector.Create(this.vSm.GetLocation());
    var e = this.vSm.GetRotation();
    var t = new UE.Quat(this.pSm.ToUeVectorOld(), MathUtils_1.MathUtils.DegToRad * -90 * t);
    var s = Vector_1.Vector.Create();
    i.Subtraction(this.CSm, s);
    var i = t.RotateVector(s.ToUeVectorOld()).op_Addition(this.CSm.ToUeVectorOld());
    var s = t.op_Multiply(e).Rotator();
    return new UE.TransformDouble(s, new UE.VectorDouble(i), this.vSm.GetScale3D());
  }
}
exports.RbRollState = RbRollState;
//# sourceMappingURL=RbRollState.js.map