"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueFollow = undefined;
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../../../Camera/CameraUtility");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GameplayCueEffect_1 = require("./GameplayCueEffect");
const MAGIC_NUMBER = 0.1;
class GameplayCueFollow extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments);
    this.L$o = Vector_1.Vector.Create();
    this.fgt = Vector_1.Vector.Create();
    this.D$o = Vector_1.Vector.Create();
    this.R$o = Rotator_1.Rotator.Create();
    this.I1e = Vector_1.Vector.Create();
    this.oAo = Rotator_1.Rotator.Create();
    this.Due = Vector_1.Vector.Create();
    this.U$o = Rotator_1.Rotator.Create();
    this.A$o = false;
    this.P$o = false;
    this.JHa = false;
    this.x$o = Rotator_1.Rotator.Create();
    this.ZHa = Rotator_1.Rotator.Create();
    this.w$o = 0;
    this.B$o = undefined;
    this.b$o = 0;
    this.q$o = -0;
    this._Ke = false;
    this.Gce = undefined;
    this.UQ1 = undefined;
    this.DQ1 = undefined;
    this.BQ1 = undefined;
  }
  OnInit() {
    super.OnInit();
    this.A$o = this.CueConfig.bLockRevolution;
    this.w$o = this.CueConfig.InterpSpeed;
    this.B$o = Vector_1.Vector.Create(Math.abs(this.CueConfig.FaultTolerance.X), Math.abs(this.CueConfig.FaultTolerance.Y), Math.abs(this.CueConfig.FaultTolerance.Z));
    this.b$o = this.CueConfig.FarthestDistance;
    var t = Vector_1.Vector.Create(this.CueConfig.LockRotation.X, this.CueConfig.LockRotation.Y, this.CueConfig.LockRotation.Z);
    this.P$o = !t.IsZero();
    t.Rotation(this.x$o);
    this.JHa = this.CueConfig.LockCamera;
    this.Gce = this.EntityHandle?.Entity?.GetComponent(48);
  }
  OnTick(t) {
    super.OnTick(t);
    this.eja(t);
  }
  AttachEffect() {
    this.eja();
  }
  SetTargetMeshAndSocket() {
    super.SetTargetMeshAndSocket();
    this.SocketTransform.FromUeTransform(this.TargetMesh.D_GetSocketTransform(this.TargetSocket));
    this.RelativeTransform.ComposeTransforms(this.SocketTransform, this.TargetTransform);
    this.L$o.FromUeVector(this.ActorInternal.D_K2_GetActorLocation());
    this.q$o = Vector_1.Vector.Dist2D(this.TargetTransform.GetLocation(), this.L$o);
  }
  eja(t) {
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle)) {
      var i;
      var s = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
      this.I1e.FromUeVector(s.D_K2_GetActorLocation());
      this.oAo.FromUeRotator(s.K2_GetActorRotation());
      if (this.A$o) {
        if (this.fuc()) {
          this.Due.FromUeVector(this.TargetMesh.D_GetSocketLocation(this.TargetSocket));
          this.Due.AdditionEqual(this.RelativeTransform.GetLocation());
        } else {
          this.Due.FromUeVector(this.TargetMesh.D_GetSocketLocation(this.TargetSocket));
          this.UQ1 ||= Vector_1.Vector.Create();
          h = this.RelativeTransform.GetLocation();
          if (i = CameraController_1.CameraController.Model.FightCamera?.LogicComponent?.GravityQuat) {
            i.RotateVector(h, this.UQ1);
          } else {
            this.UQ1.FromUeVector(h);
          }
          this.Due.AdditionEqual(this.UQ1);
        }
        this.U$o.FromUeRotator(this.TargetMesh.GetSocketRotation(this.TargetSocket));
      } else {
        this.SocketTransform.FromUeTransform(this.TargetMesh.D_GetSocketTransform(this.TargetSocket));
        if (this.JHa) {
          if (this.fuc()) {
            this.ZHa.Pitch = 0;
            this.ZHa.Yaw = CameraController_1.CameraController.CameraRotator.Yaw;
            this.ZHa.Roll = 0;
          } else if ((i = CameraController_1.CameraController.Model.FightCamera?.LogicComponent?.CameraRotationInGravity.Yaw) !== undefined) {
            this.DQ1 ||= Rotator_1.Rotator.Create(0, 0, 0);
            this.DQ1.Yaw = i;
            CameraUtility_1.CameraUtility.GetRotatorInNormal(this.DQ1, this.ZHa);
          }
          this.SocketTransform.SetRotation(this.ZHa.Quaternion());
        }
        this.RelativeTransform.ComposeTransforms(this.SocketTransform, this.TargetTransform);
        this.Due = this.TargetTransform.GetLocation();
        this.U$o = this.TargetTransform.GetRotation().Rotator();
      }
      if (t) {
        var h = Vector_1.Vector.Distance(this.I1e, this.Due);
        if (h < MAGIC_NUMBER) {
          this._Ke = false;
          return;
        }
        this.N$o(this.I1e, this.Due);
        this.O$o(this.I1e, this.Due, this.oAo, this.U$o, h);
        MathUtils_1.MathUtils.VectorInterpTo(this.I1e, this.Due, t, this.w$o, this.Due);
        MathUtils_1.MathUtils.RotatorInterpTo(this.oAo, this.U$o, t, this.w$o, this.U$o);
      }
      this.L$o.FromUeVector(this.ActorInternal.D_K2_GetActorLocation());
      if (!this.oAo.Equals(this.U$o, MAGIC_NUMBER) && Vector_1.Vector.Dist2D(this.Due, this.L$o) < this.q$o && this.fuc()) {
        this.L$o.Z = this.Due.Z;
        this.Due.Subtraction(this.L$o, this.fgt);
        this.fgt.Normalize();
        this.fgt.MultiplyEqual(this.q$o);
        this.L$o.Addition(this.fgt, this.Due);
      }
      s.D_K2_SetActorLocationAndRotation(this.Due.ToUeVector(), (this.P$o ? this.kQ1() : this.U$o).ToUeRotator(), false, undefined, true);
    }
  }
  N$o(t, i) {
    var s;
    var h;
    if (!this._Ke && (i.X = MathUtils_1.MathUtils.Clamp(t.X, i.X - this.B$o.X, i.X + this.B$o.X), s = i.X !== t.X, i.Y = MathUtils_1.MathUtils.Clamp(t.Y, i.Y - this.B$o.Y, i.Y + this.B$o.Y), h = i.Y !== t.Y, i.Z = MathUtils_1.MathUtils.Clamp(t.Z, i.Z - this.B$o.Z, i.Z + this.B$o.Z), i = i.Z !== t.Z, s || h || i)) {
      this._Ke = true;
    }
  }
  O$o(t, i, s, h, e) {
    e = this.b$o / Math.max(e, MAGIC_NUMBER);
    if (e < 1) {
      Vector_1.Vector.Lerp(i, t, e, this.D$o);
      Rotator_1.Rotator.Lerp(h, s, e, this.R$o);
      t.DeepCopy(this.D$o);
      s.DeepCopy(this.R$o);
    }
  }
  fuc() {
    return !this.Gce || this.Gce.IsStandardGravity;
  }
  kQ1() {
    var t;
    if (!this.fuc() && (t = CameraController_1.CameraController.Model.FightCamera?.LogicComponent?.GravityQuat)) {
      this.BQ1 ||= Rotator_1.Rotator.Create();
      t.Rotator(this.BQ1);
      this.BQ1.AdditionEqual(this.x$o);
      return this.BQ1;
    } else {
      return this.x$o;
    }
  }
}
exports.GameplayCueFollow = GameplayCueFollow;
//# sourceMappingURL=GameplayCueFollow.js.map