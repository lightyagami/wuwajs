"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraDialogueController = undefined;
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const MIDDLE_OFFSET_ANGLE = 90;
class CameraDialogueController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.FadeInExp = 0;
    this.FadeInDuration = -0;
    this.FadeOutInterpSpeed = 0;
    this.CheckYaw = 0;
    this.CheckPitchMin = 0;
    this.CheckPitchMax = 0;
    this.AdjustYaw = 0;
    this.AdjustPitchMin = 0;
    this.AdjustPitchMax = 0;
    this.OffsetRate = 0;
    this.OffsetLengthMax = 0;
    this.DefaultArmLength = 0;
    this.v1e = -0;
    this.M1e = false;
    this.State = 0;
    this.E1e = Vector_1.Vector.Create();
    this.S1e = Vector_1.Vector.Create();
    this.y1e = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.bdc = Rotator_1.Rotator.Create();
    this.T1e = false;
    this.ile = false;
    this.sle = 0;
    this.ale = 0;
    this.ole = 0;
    this.rle = 0;
    this.L1e = 0;
    this.PQ1 = undefined;
    this.xQ1 = 0;
    this.Gue = Rotator_1.Rotator.Create();
  }
  Name() {
    return "DialogueController";
  }
  OnInit() {
    this.SetConfigMap(1, "FadeInExp");
    this.SetConfigMap(2, "FadeInDuration");
    this.SetConfigMap(3, "FadeOutInterpSpeed");
    this.SetConfigMap(5, "CheckPitchMin");
    this.SetConfigMap(4, "CheckYaw");
    this.SetConfigMap(6, "CheckPitchMax");
    this.SetConfigMap(7, "AdjustYaw");
    this.SetConfigMap(8, "AdjustPitchMin");
    this.SetConfigMap(9, "AdjustPitchMax");
    this.SetConfigMap(10, "OffsetRate");
    this.SetConfigMap(11, "OffsetLengthMax");
    this.SetConfigMap(12, "DefaultArmLength");
    this.State = 0;
  }
  UpdateInternal(i) {
    var s = this.Camera.CharacterController;
    if (s && this.M1e) {
      switch (this.State) {
        case 1:
          {
            this.v1e += i;
            if (this.v1e > this.FadeInDuration) {
              this.v1e = this.FadeInDuration;
            }
            var h = this.v1e / this.FadeInDuration;
            var h = isNaN(h) ? 1 : h;
            Vector_1.Vector.VectorBlendEaseIn(this.E1e, this.S1e, h, this.FadeInExp, this.I1e);
            this.Camera.SetArmLocation(this.I1e);
            this.bdc.DeepCopy(s.GetControlRotation());
            if (!this.Camera.IsInNormalGravityMode()) {
              GravityUtils_1.GravityUtils.GetRotatorInGravity(this.bdc, this.Camera.GravityInverseQuat, this.bdc);
            }
            this.bdc.Yaw;
            var e = MathUtils_1.MathUtils.BlendEaseIn(this.sle, this.ale, h, this.FadeInExp);
            let t = this.bdc.Pitch;
            if (this.ile) {
              t = MathUtils_1.MathUtils.BlendEaseIn(this.ole, this.rle, h, this.FadeInExp);
            }
            this.Gue.Set(t, e, 0);
            if (this.Camera.IsInNormalGravityMode()) {
              this.Camera.DesiredCamera.ArmRotation.DeepCopy(this.Gue);
            } else {
              GravityUtils_1.GravityUtils.GetRotatorInNormal(this.Gue, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
            }
            this.Camera.IsModifiedArmRotationPitch = true;
            this.Camera.IsModifiedArmRotationYaw = true;
            e = MathUtils_1.MathUtils.BlendEaseIn(this.L1e, this.DefaultArmLength, h, this.FadeInExp);
            this.Camera.DesiredCamera.ArmLength = e;
            this.Camera.IsModifiedArmLength = true;
            if (this.v1e === this.FadeInDuration) {
              this.State = 2;
              this.Camera.SetArmLocation(this.S1e);
            }
          }
          break;
        case 2:
          this.Camera.SetArmLocation(this.S1e);
          break;
        case 3:
          if (this.y1e.IsNearlyZero()) {
            this.y1e.Reset();
            this.M1e = false;
            this.State = 0;
          } else {
            MathUtils_1.MathUtils.VectorInterpTo(this.y1e, Vector_1.Vector.ZeroVectorProxy, i, this.FadeOutInterpSpeed, this.y1e);
            this.Camera.PlayerLocation.Addition(this.y1e, this.I1e);
            this.Camera.SetArmLocation(this.I1e);
          }
      }
    } else {
      this.State = 0;
    }
  }
  EnterSequenceDialogue(t, i = false, s = undefined, h = undefined) {
    if (this.State !== 1 && this.State !== 2) {
      this.M1e = true;
      this.T1e = false;
      this.v1e = 0;
      this.PQ1 = s;
      this.xQ1 = h ?? 0;
      if (i || !t) {
        this.S1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation);
      } else {
        this.State = 1;
        this.E1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation);
        this.L1e = this.Camera.CurrentCamera.ArmLength;
        s = t ?? this.E1e;
        this.D1e(s);
        this.R1e(s);
      }
    }
  }
  ExitSequenceDialogue() {
    this.Camera.CurrentCamera.ArmLocation.Subtraction(this.Camera.PlayerLocation, this.y1e);
    this.State = 3;
    if (this.T1e) {
      this.Camera.CameraConfigController.DisableHookConfigByType(IAction_1.EAdjustPlayerCamera.Dialog);
    }
  }
  D1e(t) {
    var i = Vector_1.Vector.Create(t);
    var s = Vector_1.Vector.Create(this.Camera.PlayerLocation);
    i.SubtractionEqual(s);
    var i = i.Size();
    let h = 0;
    if (this.PQ1 !== undefined) {
      h = this.PQ1 / 100;
    } else {
      h = this.OffsetRate;
      if (i * this.OffsetRate > this.OffsetLengthMax) {
        h = this.OffsetLengthMax / i;
      }
    }
    Vector_1.Vector.Lerp(s, t, h, this.S1e);
    if (this.xQ1 !== 0) {
      CameraUtility_1.CameraUtility.AddZnInGravity(this.S1e, this.xQ1, this.S1e);
    }
  }
  R1e(t, i = true, s = true) {
    var h;
    var e = Rotator_1.Rotator.Create(this.Camera.CameraActor.K2_GetActorRotation());
    var r = Vector_1.Vector.Create();
    e.Vector(r);
    if (!this.Camera.IsInNormalGravityMode()) {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(e, this.Camera.GravityInverseQuat, e);
      e.Vector(r);
    }
    if (i) {
      if (e.Pitch < this.CheckPitchMin) {
        this.ile = true;
        this.ole = e.Pitch;
        this.rle = this.AdjustPitchMin;
      } else if (e.Pitch > this.CheckPitchMax) {
        this.ile = true;
        this.ole = e.Pitch;
        this.rle = this.AdjustPitchMax;
      } else {
        this.ile = false;
      }
    }
    if (s) {
      i = this.Camera.PlayerLocation;
      s = Vector_1.Vector.Create(t.X - i.X, t.Y - i.Y, t.Z - i.Z);
      if (!this.Camera.IsInNormalGravityMode()) {
        s.Rotation(this.Gue);
        GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Gue, this.Camera.GravityInverseQuat, this.Gue);
        this.Gue.Vector(s);
      }
      t = s.CosineAngle2D(r);
      if ((i = Math.cos(this.CheckYaw)) <= Math.abs(t)) {
        h = s.SineAngle2D(r);
        this.sle = e.Yaw;
        e = Rotator_1.Rotator.Create();
        s.Rotation(e);
        this.ale = e.Yaw;
        if (h > 0) {
          this.ale += i < t ? this.AdjustYaw : 180 - this.AdjustYaw;
        } else {
          this.ale -= i < t ? this.AdjustYaw : 180 - this.AdjustYaw;
        }
      } else {
        e = s.SineAngle2D(r);
        this.sle = this.Camera.CameraActor.K2_GetActorRotation().Yaw;
        h = Rotator_1.Rotator.Create();
        s.Rotation(h);
        this.ale = h.Yaw;
        if (e > 0) {
          this.ale += i < t ? MIDDLE_OFFSET_ANGLE : 180 - MIDDLE_OFFSET_ANGLE;
        } else {
          this.ale -= i < t ? MIDDLE_OFFSET_ANGLE : 180 - MIDDLE_OFFSET_ANGLE;
        }
      }
      if (this.sle - this.ale > 180) {
        this.ale += 360;
      } else if (this.ale - this.sle > 180) {
        this.ale -= 360;
      }
    }
  }
  AdjustDialogueParams(t, i, s, h) {
    this.T1e = true;
    this.v1e = 0;
    this.State = 1;
    if (t) {
      this.E1e.DeepCopy(this.Camera.CurrentCamera.ArmLocation);
      this.S1e.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
    }
    t = Rotator_1.Rotator.Create(this.Camera.CameraActor.K2_GetActorRotation());
    if (!this.Camera.IsInNormalGravityMode()) {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, this.Camera.GravityInverseQuat, t);
    }
    if (i !== undefined) {
      this.ile = true;
      this.ole = t.Pitch;
      this.rle = this.AdjustPitchMin;
    }
    if (s !== undefined) {
      this.sle = t.Yaw;
      this.ale = s;
      if (this.sle - this.ale > 180) {
        this.ale += 360;
      } else if (this.ale - this.sle > 180) {
        this.ale -= 360;
      }
    }
    if (h !== undefined) {
      this.DefaultArmLength = h;
    }
  }
}
exports.CameraDialogueController = CameraDialogueController;
//# sourceMappingURL=CameraDialogueController.js.map