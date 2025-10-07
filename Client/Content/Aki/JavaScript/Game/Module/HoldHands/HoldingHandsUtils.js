"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoldingHandsUtils = exports.IkTarget = exports.HandRuntime = exports.Binding = exports.Invitation = exports.Relation = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const GravityUtils_1 = require("../../Utils/GravityUtils");
class Relation {
  constructor() {
    this.Key = undefined;
    this.Leader = undefined;
    this.LeaderHandType = 1;
    this.Follower = undefined;
    this.FollowerHandType = 0;
  }
}
class Invitation extends (exports.Relation = Relation) {}
exports.Invitation = Invitation;
class Binding extends Relation {
  constructor() {
    super(...arguments);
    this.LeaderRuntime = undefined;
    this.FollowerRuntime = undefined;
    this.State = 0;
    this.BindDirDamping = 100;
    this.Updated = false;
    this.Reachable = false;
    this.LastReachable = false;
    this.ReachableTime = 0;
    this.UnReachableTime = 0;
    this.ToReachableDistance = 0;
    this.NoLerpNextUpdate = false;
    this.Down = Vector_1.Vector.Create();
    this.ShoulderDelta = Vector_1.Vector.Create();
    this.ShoulderDeltaUnit = Vector_1.Vector.Create();
    this.FoShoulderToLeAnimBindPos = Vector_1.Vector.Create();
    this.BindPosDelta = Vector_1.Vector.Create();
  }
}
exports.Binding = Binding;
const clavicleNames = {
  [0]: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001LClavicle"),
  1: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001RClavicle")
};
const shoulderNames = {
  [0]: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001LUpperArm"),
  1: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001RUpperArm")
};
const handNames = {
  [0]: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001LHand"),
  1: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001RHand")
};
const ringFingerNames = {
  [0]: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001LFinger3"),
  1: FNameUtil_1.FNameUtil.GetDynamicFName("Bip001RFinger3")
};
class HandRuntime {
  constructor() {
    this.InBind = false;
    this.HandType = 0;
    this.MaxBendLength = 0;
    this.CachedClavicle = undefined;
    this.CachedShoulder = undefined;
    this.CachedHand = undefined;
    this.CachedRingFinger = undefined;
    this.RootAfterIk = Transform_1.Transform.Create();
    this.Clavicle = Transform_1.Transform.Create();
    this.Shoulder = Transform_1.Transform.Create();
    this.Hand = Transform_1.Transform.Create();
    this.RingFinger = Transform_1.Transform.Create();
    this.FingerLocalPos = Vector_1.Vector.Create();
    this.FingerLocalRot = Quat_1.Quat.Create();
    this.FingerOffsetSize = 0;
    this.AnimBindPos = Vector_1.Vector.Create();
    this.AnimBindVec = Vector_1.Vector.Create();
    this.AnimBendLength = 0;
    this.AnimHandNormal = Vector_1.Vector.Create();
    this.AnimFingerNormal = Vector_1.Vector.Create();
    this.ClavicleDir = Vector_1.Vector.Create();
    this.BindPos = Vector_1.Vector.Create();
    this.BindDir = Vector_1.Vector.Create();
    this.BindDirSmooth = Vector_1.Vector.Create();
    this.BindVec = Vector_1.Vector.Create();
    this.BendLength = 0;
    this.FingerNormal = Vector_1.Vector.Create();
    this.HandNormal = Vector_1.Vector.Create();
    this.HandPosTarget = Vector_1.Vector.Create();
    this.HandRotTarget = Quat_1.Quat.Create();
    this.TargetAlpha = 0;
    this.IkTarget = new IkTarget();
    this.IkTargetUe = undefined;
    this.BindDirDeltaRot = Quat_1.Quat.Create();
    this.ArmDeltaRot = Quat_1.Quat.Create();
    this.ShoulderDir = Vector_1.Vector.Create();
    this.ShoulderDirLocal = Vector_1.Vector.Create();
    this.ShoulderLocalEuler = Rotator_1.Rotator.Create();
    this.BindVecOnNormal = Vector_1.Vector.Create();
    this.BindDirRootSpace = Vector_1.Vector.Create();
    this.BindDirRsEuler = Rotator_1.Rotator.Create();
  }
  LerpAlphas(t, i) {
    if (this.IkTarget) {
      this.IkTarget.Alpha = MathUtils_1.MathUtils.InterpTo(this.IkTarget.Alpha, this.TargetAlpha, i, 1 / t);
    }
  }
}
exports.HandRuntime = HandRuntime;
class IkTarget {
  constructor(t, i, s) {
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Quat_1.Quat.Create();
    this.Alpha = 0;
    this.Location = t ?? Vector_1.Vector.Create(0, 0, 0);
    this.Rotation = i ?? Quat_1.Quat.Create(0, 0, 0, 1);
    this.Alpha = s ?? 0;
  }
  Equals(t) {
    return t !== undefined && this.Location.Equals(t.Location) && this.Rotation.Equals(t.Rotation) && this.Alpha === t.Alpha;
  }
  DeepCopy(t) {
    this.Location.DeepCopy(t.Location);
    this.Rotation.DeepCopy(t.Rotation);
    this.Alpha = t.Alpha;
  }
  ToUeIkTarget() {
    var t = new UE.IKTarget();
    t.Location = this.Location.ToUeVectorOld();
    t.Rotation = this.Rotation.ToUeQuat();
    t.Alpha = this.Alpha;
    return t;
  }
}
exports.IkTarget = IkTarget;
class HoldingHandsUtils {
  static UpdateBinding(s, e) {
    if (s && s.State !== 0) {
      s.LastReachable = s.Reachable;
      s.Reachable = false;
      var a = s.LeaderRuntime;
      var r = s.FollowerRuntime;
      if (s.Leader && s.Follower && a && r) {
        this.eZc(s);
        let t = e;
        if (s.NoLerpNextUpdate) {
          t = MathUtils_1.MathUtils.Int32Max;
          s.NoLerpNextUpdate = false;
        }
        var h = s.Leader.Params;
        this.tZc(s, t);
        if (s.State === 2) {
          a.BindVec.DeepCopy(a.AnimBindVec);
        } else if (!this.OX1(s.ShoulderDeltaUnit, s.ShoulderDelta.Size(), a.BendLength, r.BendLength, s.Down, a.BindVec)) {
          a.BindVec = a.AnimBindVec;
        }
        a.BindVec.GetUnsafeNormal(a.BindDir);
        var o = s.Leader.Params.ReachableExtraAngle;
        var _ = s.Follower.Params.ReachableExtraAngle;
        let i = s.Reachable;
        this.xsd(a, s.Leader.Params.PitchRange, s.Leader.Params.YawRange, s.LastReachable, o);
        this.GX1(a, s.Leader.Params.ShoulderPitchRange, s.Leader.Params.ShoulderYawRange, s.LastReachable, o);
        this.Dsd(a.BindDirSmooth, a.BindDir, s.BindDirDamping, t);
        a.BindDirSmooth.Multiply(a.BendLength, a.BindVec);
        a.Shoulder.GetLocation().Addition(a.BindVec, a.BindPos);
        a.BindPos.Subtraction(r.Shoulder.GetLocation(), r.BindVec);
        r.BindVec.GetUnsafeNormal(r.BindDir);
        r.BendLength = Math.min(r.MaxBendLength, r.BindVec.Size());
        i = (i &&= this.xsd(r, s.Follower.Params.PitchRange, s.Follower.Params.YawRange, s.LastReachable, _)) && this.GX1(r, s.Follower.Params.ShoulderPitchRange, s.Follower.Params.ShoulderYawRange, s.LastReachable, _);
        r.BindDir.Multiply(r.BendLength, r.BindVec);
        r.Shoulder.GetLocation().Addition(r.BindVec, r.BindPos);
        if (!i) {
          r.BindPos.Subtraction(a.Shoulder.GetLocation(), a.BindVec);
          a.BindVec.GetUnsafeNormal(a.BindDir);
          i = this.xsd(a, s.Leader.Params.PitchRange, s.Leader.Params.YawRange, s.LastReachable, o);
          if (!(i &&= this.GX1(a, s.Leader.Params.ShoulderPitchRange, s.Leader.Params.ShoulderYawRange, s.LastReachable, o))) {
            a.BendLength = MathUtils_1.MathUtils.InterpTo(a.BendLength, Math.min(a.MaxBendLength, a.BindVec.Size()), e, 0.005);
          }
          this.Dsd(a.BindDirSmooth, a.BindDir, s.BindDirDamping, t);
          a.BindDirSmooth.Multiply(a.BendLength, a.BindVec);
          a.Shoulder.GetLocation().Addition(a.BindVec, a.BindPos);
        }
        r.BindPos.Subtraction(a.BindPos, s.BindPosDelta);
        if (!i) {
          s.Reachable &&= s.BindPosDelta.Size() < (s.LastReachable ? h.BindDistanceReachable : h.BindDistanceUnReachable);
        }
        this.FX1(a, s.Down, s.State === 2);
        this.NX1(r, a, h.BindPosDistance, h.HandMinAngle);
        _ = this.RTu(s);
        s.Reachable &&= !_;
        o = this.LRd(s);
        s.Reachable &&= o;
        if (s.Reachable && (this.Debug || s.Leader.Params.Debug)) {
          UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, a.BindPos.ToUeVectorOld(), a.HandPosTarget.ToUeVectorOld(), ColorUtils_1.ColorUtils.LinearRed, 0, 1);
          UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, r.BindPos.ToUeVectorOld(), r.HandPosTarget.ToUeVectorOld(), ColorUtils_1.ColorUtils.LinearBlue, 0, 1);
          UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, a.BindPos.ToUeVectorOld(), a.BindPos.ToUeVectorOld().op_Addition(a.HandNormal.ToUeVectorOld().op_Multiply(10)), ColorUtils_1.ColorUtils.LinearRed, 0, 1);
        }
        a.RootAfterIk.InverseTransformPosition(a.HandPosTarget, a.IkTarget.Location);
        a.RootAfterIk.InverseTransformRotation(a.HandRotTarget, a.IkTarget.Rotation);
        r.RootAfterIk.InverseTransformPosition(r.HandPosTarget, r.IkTarget.Location);
        r.RootAfterIk.InverseTransformRotation(r.HandRotTarget, r.IkTarget.Rotation);
        if (s.Reachable) {
          a.TargetAlpha = r.TargetAlpha = 1;
        } else {
          a.TargetAlpha = r.TargetAlpha = 0;
        }
        a.LerpAlphas(s.Leader.Params.IkAlphaDamping, t);
        r.LerpAlphas(s.Follower.Params.IkAlphaDamping, t);
        if (s.Reachable) {
          s.ReachableTime += e;
          s.UnReachableTime = 0;
        } else {
          s.ReachableTime = 0;
          s.UnReachableTime += e;
        }
      }
    }
  }
  static eZc(t) {
    var i = t.LeaderRuntime;
    var s = t.FollowerRuntime;
    var e = this.BX1(i, t.Leader.AnimInstance, t.Leader.SkelMesh, t.Leader.Params, true);
    if (!(e &&= this.BX1(s, t.Follower.AnimInstance, t.Follower.SkelMesh, t.Follower.Params, false))) {
      return false;
    }
    t.Down = GravityUtils_1.GravityUtils.GetGravityDirectForActor(t.Leader.ActorComp);
    s.Shoulder.GetLocation().Subtraction(i.Shoulder.GetLocation(), t.ShoulderDelta);
    e = t.ShoulderDelta.Size();
    t.ShoulderDelta.Division(e, t.ShoulderDeltaUnit);
    i.AnimBindPos.Subtraction(s.Shoulder.GetLocation(), t.FoShoulderToLeAnimBindPos);
    if (!t.Updated) {
      i.BendLength = i.AnimBendLength;
      s.BendLength = s.AnimBendLength;
    }
    return t.Updated = true;
  }
  static BX1(t, i, s, e, a) {
    var r;
    var h;
    var o = t.HandType;
    if (t.MaxBendLength === 0) {
      r = UE.KuroAnimLibrary.GetDefaultBoneComponentPoseByName(s, shoulderNames[o]);
      h = UE.KuroAnimLibrary.GetDefaultBoneComponentPoseByName(s, ringFingerNames[o]);
      t.MaxBendLength = h.GetLocation().op_Subtraction(r.GetLocation()).Size();
    }
    t.CachedClavicle = i.CachedBones.Get(clavicleNames[o]);
    t.CachedShoulder = i.CachedBones.Get(shoulderNames[o]);
    t.CachedHand = i.CachedBones.Get(handNames[o]);
    t.CachedRingFinger = i.CachedBones.Get(ringFingerNames[o]);
    if (t.CachedClavicle && t.CachedShoulder && t.CachedHand && t.CachedRingFinger) {
      t.RootAfterIk.FromUeTransform(s.GetSocketTransform(FNameUtil_1.FNameUtil.GetDynamicFName("Root")));
      t.Clavicle.FromUeTransform(t.CachedClavicle);
      t.Clavicle.ComposeTransforms(t.RootAfterIk, t.Clavicle);
      t.Shoulder.FromUeTransform(t.CachedShoulder);
      t.Shoulder.ComposeTransforms(t.RootAfterIk, t.Shoulder);
      t.Hand.FromUeTransform(t.CachedHand);
      t.Hand.ComposeTransforms(t.RootAfterIk, t.Hand);
      t.RingFinger.FromUeTransform(t.CachedRingFinger);
      t.RingFinger.ComposeTransforms(t.RootAfterIk, t.RingFinger);
      t.Hand.InverseTransformPosition(t.RingFinger.GetLocation(), t.FingerLocalPos);
      t.Hand.InverseTransformRotation(t.RingFinger.GetRotation(), t.FingerLocalRot);
      t.FingerLocalPos.Y = t.FingerLocalPos.Z = 0;
      t.FingerLocalPos.X *= a ? e.LeaderBindPosScale : e.FollowerBindPosScale;
      t.FingerOffsetSize = t.FingerLocalPos.X;
      t.Hand.TransformPosition(t.FingerLocalPos, t.AnimBindPos);
      t.AnimBindPos.Subtraction(t.Shoulder.GetLocation(), t.AnimBindVec);
      t.AnimBendLength = Math.min(t.AnimBindVec.Size(), t.MaxBendLength);
      t.Hand.TransformVector(Vector_1.Vector.RightVectorProxy, t.AnimHandNormal);
      t.RingFinger.TransformVector(Vector_1.Vector.RightVectorProxy, t.AnimFingerNormal);
      t.Clavicle.TransformVector(Vector_1.Vector.RightVectorProxy, t.ClavicleDir);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 82, "[HoldingHandsUtils.PrepareRuntimeData] KuroCacheBones未正确配置BoneName", ["AnimInstance", i.GetName()]);
      }
      return false;
    }
  }
  static tZc(t, i) {
    var s = t.LeaderRuntime;
    var e = t.FollowerRuntime;
    var a = t.Leader.Params;
    var r = t.State === 2;
    var a = t.ShoulderDelta.Size() * (1 / (t.LastReachable ? a.ReachableDistanceScale : a.UnReachableDistanceScale));
    let h = a - ((r ? s.AnimBendLength : s.MaxBendLength) + e.MaxBendLength);
    if (r) {
      s = t.FoShoulderToLeAnimBindPos.Size();
      h = s - e.MaxBendLength;
    }
    t.ToReachableDistance = h;
    t.Reachable = h < 0;
    this.iZc(t, a, i);
  }
  static iZc(t, i, s) {
    var e;
    var a = t.LeaderRuntime;
    var r = t.FollowerRuntime;
    var h = t.State === 2;
    var o = a.AnimBendLength + r.AnimBendLength;
    var _ = h ? a.AnimBendLength : a.MaxBendLength;
    var l = _ + r.MaxBendLength;
    let n = i <= o;
    let c = !n && i <= l;
    if (h) {
      l = t.FoShoulderToLeAnimBindPos.Size();
      n = l <= r.AnimBendLength;
      c = !n && l <= r.MaxBendLength;
    }
    let U = r.AnimBendLength;
    let d = a.AnimBendLength;
    if (n) {
      l = Vector_1.Vector.DotProduct(t.ShoulderDelta, t.Down);
      t = 1 - Math.pow(Math.abs(l / t.ShoulderDelta.Size()), 2);
      t = Math.max(t, 0.2);
      e = o - i;
      if (l > 0) {
        U = Math.max(r.AnimBendLength * t, r.AnimBendLength - e);
      } else {
        d = Math.max(a.AnimBendLength * t, a.AnimBendLength - e);
      }
    } else if (c) {
      l = i - o;
      if (h) {
        U = r.AnimBendLength + l;
      } else {
        t = a.MaxBendLength - a.AnimBendLength;
        e = r.MaxBendLength - r.AnimBendLength;
        U = r.AnimBendLength + e / (t + e) * l;
        d = a.AnimBendLength + t / (t + e) * l;
      }
    } else {
      d = _ * 0.95;
      U = r.MaxBendLength * 0.95;
    }
    a.BendLength = d;
    r.BendLength = U;
  }
  static OX1(t, i, s, e, a, r) {
    return !(s + e < i) && !(e = MathUtils_1.MathUtils.Clamp((s * s + i * i - e * e) / (s * 2 * i), -1, 1), i = Math.sqrt(1 - e * e), Vector_1.Vector.CrossProduct(t, a, this.TempVector), Vector_1.Vector.CrossProduct(t, this.TempVector, this.TempVector), this.TempVector.Normalize(), this.TempVector.Multiply(-i * s, this.TempVector), t.Multiply(e * s, this.TempVector2), this.TempVector2.Addition(this.TempVector, r), 0);
  }
  static Dsd(t, i, s, e) {
    if (t.IsZero() || s === 0) {
      t.DeepCopy(i);
    } else {
      t.X = MathUtils_1.MathUtils.InterpTo(t.X, i.X, e, 1 / s);
      t.Y = MathUtils_1.MathUtils.InterpTo(t.Y, i.Y, e, 1 / s);
      t.Z = MathUtils_1.MathUtils.InterpTo(t.Z, i.Z, e, 1 / s);
      t.Normalize();
    }
  }
  static xsd(t, i, s, e, a) {
    let r = i.Min;
    let h = i.Max;
    let o = s.Min;
    let _ = s.Max;
    if (e) {
      r -= a;
      h += a;
      o -= a;
      _ += a;
    }
    t.RootAfterIk.InverseTransformVector(t.BindDir, t.BindDirRootSpace);
    if (t.HandType === 1) {
      t.BindDirRootSpace.X = -t.BindDirRootSpace.X;
    }
    t.BindDirRootSpace.ToOrientationRotator(t.BindDirRsEuler);
    i = t.BindDirRsEuler.Pitch < r || t.BindDirRsEuler.Pitch > h || t.BindDirRsEuler.Yaw < o || t.BindDirRsEuler.Yaw > _;
    t.BindDirRsEuler.Pitch = MathUtils_1.MathUtils.Clamp(t.BindDirRsEuler.Pitch, r, h);
    t.BindDirRsEuler.Yaw = MathUtils_1.MathUtils.Clamp(t.BindDirRsEuler.Yaw, o, _);
    t.BindDirRsEuler.Vector(t.BindDirRootSpace);
    if (t.HandType === 1) {
      t.BindDirRootSpace.X = -t.BindDirRootSpace.X;
    }
    t.RootAfterIk.TransformVector(t.BindDirRootSpace, t.BindDir);
    return !i;
  }
  static GX1(t, i, s, e, a) {
    let r = i.Min;
    let h = i.Max;
    let o = s.Min;
    let _ = s.Max;
    if (e) {
      r -= a;
      h += a;
      o -= a;
      _ += a;
    }
    i = r;
    s = h;
    if (t.HandType === 1) {
      r = -s;
      h = -i;
    }
    Quat_1.Quat.FindBetweenVectors(t.AnimBindVec, t.BindDir, t.BindDirDeltaRot);
    t.Shoulder.GetRotation().RotateVector(Vector_1.Vector.ForwardVectorProxy, t.ShoulderDir);
    Quat_1.Quat.FindBetweenVectors(t.ShoulderDir, t.AnimBindVec, t.ArmDeltaRot);
    t.BindDirDeltaRot.RotateVector(t.ShoulderDir, t.ShoulderDir);
    t.Clavicle.InverseTransformVector(t.ShoulderDir, t.ShoulderDirLocal);
    t.ShoulderDirLocal.ToOrientationRotator(t.ShoulderLocalEuler);
    e = t.ShoulderLocalEuler.Pitch < r || t.ShoulderLocalEuler.Pitch > h || t.ShoulderLocalEuler.Yaw < o || t.ShoulderLocalEuler.Yaw > _;
    t.ShoulderLocalEuler.Pitch = MathUtils_1.MathUtils.Clamp(t.ShoulderLocalEuler.Pitch, r, h);
    t.ShoulderLocalEuler.Yaw = MathUtils_1.MathUtils.Clamp(t.ShoulderLocalEuler.Yaw, o, _);
    t.ShoulderLocalEuler.Vector(t.ShoulderDirLocal);
    t.Clavicle.TransformVector(t.ShoulderDirLocal, t.ShoulderDir);
    t.ArmDeltaRot.RotateVector(t.ShoulderDir, t.BindDir);
    t.BindDir.Normalize();
    return !e;
  }
  static VX1(t, i, s, e, a) {
    Vector_1.Vector.CrossProduct(t, s, a);
    a.Normalize();
    a.MultiplyEqual(-1);
    Vector_1.Vector.CrossProduct(i, s, this.TempVector);
    this.TempVector.MultiplyEqual(-1);
    if (Vector_1.Vector.DotProduct(t, this.TempVector) > 0) {
      s = Vector_1.Vector.DotProduct(a, i);
      i.Multiply(s * 2, this.TempVector2);
      a.SubtractionEqual(this.TempVector2);
    }
    t = Vector_1.Vector.DotProduct(a, e);
    if (t < 0) {
      e.GetSafeNormal(this.TempVector2);
      this.TempVector2.MultiplyEqual(t * 2);
      a.SubtractionEqual(this.TempVector2);
    }
    Vector_1.Vector.Lerp(e, a, 0.5, a);
  }
  static FX1(t, i, s) {
    if (s) {
      t.HandNormal = t.AnimHandNormal;
    } else {
      this.VX1(t.BindVec, t.ClavicleDir, i, t.AnimFingerNormal, t.FingerNormal);
      t.FingerLocalRot.UnRotateVector(t.FingerNormal, t.HandNormal);
    }
    Quat_1.Quat.FindBetweenVectors(t.AnimBindVec, t.BindVec, t.BindDirDeltaRot);
    t.AnimBindPos.Subtraction(t.Hand.GetLocation(), this.TempVector);
    t.BindDirDeltaRot.RotateVector(this.TempVector, this.TempVector);
    t.BindPos.Subtraction(this.TempVector, t.HandPosTarget);
    this.TempVector.CrossProduct(t.HandNormal, this.TempVector2);
    MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector, this.TempVector2, t.HandRotTarget);
  }
  static NX1(t, i, s, e) {
    i.FingerNormal.Multiply(-1, t.FingerNormal);
    t.FingerLocalRot.UnRotateVector(t.FingerNormal, t.HandNormal);
    t.FingerNormal.Multiply(s, this.TempVector);
    t.BindPos.Addition(this.TempVector, t.BindPos);
    i.FingerNormal.Multiply(Vector_1.Vector.DotProduct(t.BindVec, i.FingerNormal), this.TempVector);
    t.BindVec.Subtraction(this.TempVector, t.BindVecOnNormal);
    t.BindVecOnNormal.Normalize();
    i.FingerNormal.Multiply(Vector_1.Vector.DotProduct(i.BindVec, i.FingerNormal), this.TempVector);
    i.BindVec.Subtraction(this.TempVector, i.BindVecOnNormal);
    i.BindVecOnNormal.Normalize();
    let a = Math.acos(Vector_1.Vector.DotProduct(i.BindVecOnNormal, t.BindVecOnNormal));
    Vector_1.Vector.CrossProduct(i.BindVecOnNormal, t.BindVecOnNormal, this.TempVector);
    if (Vector_1.Vector.DotProduct(this.TempVector, i.FingerNormal) < 0) {
      a = -a;
    }
    s = e * MathUtils_1.MathUtils.DegToRad;
    a = a < 0 ? Math.min(-s, a) : Math.max(s, a);
    Quat_1.Quat.ConstructorByAxisAngle(i.FingerNormal, a, this.TempQuat);
    i.BindPos.Subtraction(i.HandPosTarget, this.TempVector);
    this.TempQuat.RotateVector(this.TempVector, this.TempVector);
    this.TempVector.Normalize();
    this.TempVector.MultiplyEqual(t.FingerOffsetSize);
    t.BindPos.Subtraction(this.TempVector, t.HandPosTarget);
    this.TempVector.CrossProduct(t.HandNormal, this.TempVector2);
    MathUtils_1.MathUtils.LookRotationForwardFirst(this.TempVector, this.TempVector2, t.HandRotTarget);
  }
  static RTu(t) {
    var i = t.Leader;
    if (!i) {
      return false;
    }
    if (!i.TraceElement) {
      i.CreateTraceElement();
    }
    var s = i.TraceElement;
    var i = this.Debug || i.Params.Debug;
    s.ActorsToIgnore.Empty();
    for (const a of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      s.ActorsToIgnore.Add(a);
    }
    s.WorldContextObject = GlobalData_1.GlobalData.World;
    var e = t.LeaderRuntime.HandPosTarget;
    var t = t.FollowerRuntime.HandPosTarget;
    this.WorldOrigin = UE.GameplayStatics.GetWorldOriginLocation(GlobalData_1.GlobalData.World.GetWorld());
    this.TempVector.FromUeVector(this.WorldOrigin);
    this.TempVector.AdditionEqual(e);
    this.TempVector2.FromUeVector(this.WorldOrigin);
    this.TempVector2.AdditionEqual(t);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, this.TempVector);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, this.TempVector2);
    var e = TraceElementCommon_1.TraceElementCommon.SphereTrace(s, "CharacterHoldingHandsComponent.CheckBindingObstacle");
    if (e && i && (UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.TempVector.ToUeVector(), this.TempVector2.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, 0, 1), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 82, "[HoldingHandsUtils] CheckBindingObstacle", ["Actor", s.HitResult?.Actors.Get(0).GetActorLabel()]);
    }
    return e;
  }
  static LRd(t) {
    var i = t.Leader.ActorComp;
    var s = t.Follower.ActorComp;
    var e = i.ActorLocationProxy;
    var a = s.ActorLocationProxy;
    var r = this.TempVector;
    e.Subtraction(a, r);
    var e = GravityUtils_1.GravityUtils.GetGravityDirectForActor(i);
    var a = Math.abs(Vector_1.Vector.DotProduct(r, e));
    var r = Math.min(i.HalfHeight, s.HalfHeight);
    var i = this.TempVector;
    t.LeaderRuntime.Shoulder.GetLocation().Subtraction(t.FollowerRuntime.Shoulder.GetLocation(), i);
    var s = Math.abs(Vector_1.Vector.DotProduct(i, e));
    var i = t.LastReachable ? t.Leader.Params.ShoulderDeltaHeightReachable : t.Leader.Params.ShoulderDeltaHeightUnReachable;
    return a < r && s < i;
  }
}
(exports.HoldingHandsUtils = HoldingHandsUtils).Debug = false;
HoldingHandsUtils.TempVector = Vector_1.Vector.Create();
HoldingHandsUtils.TempVector2 = Vector_1.Vector.Create();
HoldingHandsUtils.TempQuat = Quat_1.Quat.Create();
HoldingHandsUtils.WorldOrigin = new UE.IntVector(0, 0, 0); //# sourceMappingURL=HoldingHandsUtils.js.map