"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraExploreController = undefined;
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
class DefaultState extends StateBase_1.StateBase {
  OnUpdate(t) {
    if (this.Owner.CheckAdjust()) {
      this.StateMachine.Switch(1);
    }
  }
}
class ReadyAdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.gle = -0;
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    this.gle += t;
    if (this.Owner.CheckAdjust()) {
      if (this.gle >= this.Owner.PrepTime) {
        this.StateMachine.Switch(2);
      }
    } else {
      this.StateMachine.Switch(0);
    }
  }
}
class AdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.U1e = 0;
    this.A1e = Vector_1.Vector.Create();
    this.P1e = Vector_1.Vector.Create();
    this.x1e = 0;
    this.w1e = false;
    this.ole = 0;
    this.rle = 0;
    this.CurrentCameraArmOffset = Vector_1.Vector.Create();
    this.B1e = Vector_1.Vector.Create();
    this.sle = 0;
    this.ale = 0;
    this.L1e = 0;
    this.b1e = 0;
    this.Gue = Rotator_1.Rotator.Create();
  }
  get q1e() {
    if (this.w1e) {
      return 1;
    } else {
      return -1;
    }
  }
  OnEnter() {
    this.B1e.DeepCopy(this.CurrentCameraArmOffset);
    this.U1e = 0;
    this.A1e.FromUeVector(this.Owner.Camera.Character.D_K2_GetActorLocation());
    var t = this.Owner.Camera.Character.K2_GetActorRotation();
    this.P1e.DeepCopy(this.Owner.LookAtLocation1);
    this.P1e.SubtractionEqual(this.Owner.LookAtLocation2);
    this.w1e = Vector_1.Vector.DotProduct(this.P1e, Vector_1.Vector.Create(t.VectorDouble())) > 0;
    this.P1e.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
    var t = Vector_1.Vector.Create();
    t.DeepCopy(this.A1e);
    t.SubtractionEqual(this.Owner.LookAtLocation1);
    this.x1e = Vector_1.Vector.DotProduct(this.P1e, t);
    if (this.Owner.HasLookAtPoint) {
      this.G1e();
    }
    this.N1e();
  }
  CanReEnter() {
    return true;
  }
  OnReEnter() {
    this.OnEnter();
  }
  OnUpdate(t) {
    var i;
    if (this.Owner.CheckAdjust()) {
      i = Vector_1.Vector.Create(this.Owner.Camera.Character.D_K2_GetActorLocation());
      this.O1e(i);
      this.k1e();
      this.A1e.DeepCopy(i);
    } else {
      this.StateMachine.Switch(0);
    }
  }
  O1e(t) {
    var i;
    if (!t.Equals(this.A1e, MathUtils_1.MathUtils.KindaSmallNumber)) {
      if (this.Owner.HasLookAtPoint) {
        this.U1e += Vector_1.Vector.Dist(t, this.A1e);
      } else {
        (i = Vector_1.Vector.Create()).DeepCopy(t);
        i.SubtractionEqual(this.Owner.LookAtLocation1);
        t = Vector_1.Vector.DotProduct(this.P1e, i);
        this.U1e = (t - this.x1e) * this.q1e;
      }
    }
  }
  G1e() {
    var t = Vector_1.Vector.Create(this.Owner.Camera.PlayerLocation);
    var i = this.Owner.Camera.CameraActor.K2_GetActorRotation();
    var i = Vector_1.Vector.Create(i.VectorDouble());
    var s = this.w1e ? this.Owner.LookAtLocation1 : this.Owner.LookAtLocation2;
    var h = Vector_1.Vector.Create();
    s.SubtractionEqual(t);
    var s = h.CosineAngle2D(i);
    var t = h.SineAngle2D(i);
    this.sle = this.Owner.Camera.CameraRotationInGravity.Yaw;
    h.Rotation(this.Gue);
    this.ale = CameraUtility_1.CameraUtility.GetYawInGravity(this.Gue);
    if (t < 0) {
      if (s > Math.cos(this.Owner.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)) {
        this.ale += this.Owner.CheckAdjustYawAngleMin;
      } else if (s < Math.cos(this.Owner.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad)) {
        this.ale += this.Owner.CheckAdjustYawAngleMax;
      } else {
        this.ale = this.sle;
      }
    } else if (s > Math.cos(this.Owner.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)) {
      this.ale -= this.Owner.CheckAdjustYawAngleMin;
    } else if (s < Math.cos(this.Owner.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad)) {
      this.ale -= this.Owner.CheckAdjustYawAngleMax;
    } else {
      this.ale = this.sle;
    }
    if (this.sle - this.ale > 180) {
      this.ale += 360;
    } else if (this.ale - this.sle > 180) {
      this.ale -= 360;
    }
    if (this.Owner.Camera.IsInNormalGravityMode()) {
      this.ole = this.Owner.Camera.CameraActor.K2_GetActorRotation().Pitch;
      this.rle = MathUtils_1.MathUtils.RangeClamp(h.Z, this.Owner.DefaultPitchInRangeMin, this.Owner.DefaultPitchInRangeMax, this.Owner.DefaultPitchOutRangeMin, this.Owner.DefaultPitchOutRangeMax);
    } else {
      this.ole = this.Owner.Camera.CameraRotationInGravity.Pitch;
      this.rle = MathUtils_1.MathUtils.RangeClamp(CameraUtility_1.CameraUtility.GetZnInGravity(h), this.Owner.DefaultPitchInRangeMin, this.Owner.DefaultPitchInRangeMax, this.Owner.DefaultPitchOutRangeMin, this.Owner.DefaultPitchOutRangeMax);
    }
  }
  N1e() {
    this.L1e = this.Owner.Camera.DesiredCamera.ArmLength;
    if (this.L1e < this.Owner.ArmLengthMin) {
      this.b1e = this.Owner.ArmLengthMin;
    } else if (this.L1e > this.Owner.ArmLengthMax) {
      this.b1e = this.Owner.ArmLengthMax;
    } else {
      this.b1e = this.L1e;
    }
  }
  k1e() {
    var t;
    var i;
    var s = this.Owner.FadeDistance > 0 ? this.U1e / this.Owner.FadeDistance : 1;
    var s = MathUtils_1.MathUtils.Clamp(s, 0, 1);
    if (this.Owner.HasLookAtPoint) {
      t = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, s);
      i = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, s);
      if (this.Owner.Camera.IsInNormalGravityMode()) {
        this.Owner.Camera.DesiredCamera.ArmRotation.Set(i, t, 0);
      } else {
        this.Gue.Set(i, t, 0);
        CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Owner.Camera.DesiredCamera.ArmRotation, this.Gue);
      }
      this.Owner.Camera.IsModifiedArmRotationPitch = true;
      this.Owner.Camera.IsModifiedArmRotationYaw = true;
    }
    this.Owner.Camera.DesiredCamera.ArmLength = MathUtils_1.MathUtils.RangeClamp(s, 0, 1, this.L1e, this.b1e);
    this.Owner.Camera.IsModifiedArmLength = true;
  }
}
class CameraExploreController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t);
    this.CheckAdjustYawAngleMin = 0;
    this.CheckAdjustYawAngleMax = 0;
    this.DefaultPitchInRangeMin = 0;
    this.DefaultPitchInRangeMax = 0;
    this.DefaultPitchOutRangeMin = 0;
    this.DefaultPitchOutRangeMax = 0;
    this.CheckCameraDirectionCos = 0;
    this.CheckMoveDirectionCos = 0;
    this.LookAtLocation1 = Vector_1.Vector.Create();
    this.LookAtLocation2 = Vector_1.Vector.Create();
    this.LookAtDirection = Vector_1.Vector.Create();
    this.PrepTime = -0;
    this.FadeDistance = 0;
    this.ArmLengthMin = 0;
    this.ArmLengthMax = 0;
    this.F1e = false;
    this.HasLookAtPoint = false;
    this.V1e = new Map();
    this.H1e = 0;
    this.Lle = new StateMachine_1.StateMachine(this);
    this.Lle.AddState(0, DefaultState);
    this.Lle.AddState(1, ReadyAdjustState);
    this.Lle.AddState(2, AdjustState);
    this.Lle.Start(0);
  }
  Name() {
    return "ExploreController";
  }
  OnInit() {
    this.SetConfigMap(1, "CheckAdjustYawAngleMin");
    this.SetConfigMap(2, "CheckAdjustYawAngleMax");
    this.SetConfigMap(3, "DefaultPitchInRangeMin");
    this.SetConfigMap(4, "DefaultPitchInRangeMax");
    this.SetConfigMap(5, "DefaultPitchOutRangeMin");
    this.SetConfigMap(6, "DefaultPitchOutRangeMax");
    this.SetConfigMap(7, "CheckCameraDirectionCos");
    this.SetConfigMap(8, "CheckMoveDirectionCos");
  }
  EnterCameraExplore(t, i, s, h, e, a, r) {
    this.H1e = t;
    this.HasLookAtPoint = !!i && !!s;
    if (this.HasLookAtPoint) {
      this.LookAtLocation1.FromUeVector(i);
      this.LookAtLocation2.FromUeVector(s);
      this.LookAtDirection.DeepCopy(this.LookAtLocation1);
      this.LookAtDirection.SubtractionEqual(this.LookAtLocation2);
    }
    this.PrepTime = h;
    this.FadeDistance = e;
    this.ArmLengthMin = a;
    this.ArmLengthMax = r;
    this.V1e.set(t, [i, s, h, e, a, r]);
    this.LookAtDirection.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
    this.F1e = true;
    switch (this.Lle.CurrentState) {
      case 0:
      case 1:
        this.Lle.Switch(0);
        break;
      case 2:
        this.Lle.Switch(2);
    }
  }
  ExitCameraExplore(t) {
    this.V1e.delete(t);
    if (this.H1e === t) {
      if (this.V1e.size > 0) {
        for (const c of this.V1e) {
          const t = c[0];
          var [i, s, h, e, a, r] = c[1];
          this.H1e = t;
          this.HasLookAtPoint = !!i && !!s;
          if (this.HasLookAtPoint) {
            this.LookAtLocation1.FromUeVector(i);
            this.LookAtLocation2.FromUeVector(s);
            this.LookAtDirection.DeepCopy(this.LookAtLocation1);
            this.LookAtDirection.SubtractionEqual(this.LookAtLocation2);
          }
          this.PrepTime = h;
          this.FadeDistance = e;
          this.ArmLengthMin = a;
          this.ArmLengthMax = r;
          this.LookAtDirection.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
          switch (this.Lle.CurrentState) {
            case 0:
            case 1:
              this.Lle.Switch(0);
              break;
            case 2:
              this.Lle.Switch(2);
          }
          break;
        }
      } else {
        this.F1e = false;
      }
    }
  }
  UpdateInternal(t) {
    if (this.Camera.IsModifiedArmRotationPitch || this.Camera.IsModifiedArmRotationYaw || this.Camera.IsModifiedArmLength) {
      this.Lle.Switch(0);
    }
    this.Lle.Update(t);
  }
  CheckAdjust() {
    if (!this.F1e) {
      return false;
    }
    var t = Vector_1.Vector.Create(this.Camera.Character.K2_GetActorRotation().VectorDouble());
    var i = Vector_1.Vector.Create();
    this.Camera.CameraRotation.Vector(i);
    if (t.DotProduct(i) < this.CheckCameraDirectionCos) {
      return false;
    }
    if (this.HasLookAtPoint) {
      i = this.LookAtDirection;
      t = t.DotProduct(i);
      if (t < this.CheckMoveDirectionCos && t > -this.CheckMoveDirectionCos) {
        return false;
      }
    }
    switch (this.Camera.CharacterEntityHandle.Entity.GetComponent(179).MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
      case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
        return true;
      default:
        return false;
    }
  }
}
exports.CameraExploreController = CameraExploreController;
//# sourceMappingURL=CameraExploreController.js.map