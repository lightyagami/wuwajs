"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiControllerLibrary = exports.BoxRangeEntityInfo = exports.SphereRangeEntityInfo = exports.RangeEntityInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const PI = 3.1416;
const MIN_NAVIGATION_FINAL_DIST_SQUARD = 10000;
const MIN_NAVIGATION_FINAL_HEIGHt = 200;
const DEFAULT_NAVIGATION_BLOCK_LENGTH = 100;
const defaultBlockHalfExtent = new UE.VectorDouble(1, 1, 500);
class RangeEntityInfo {
  constructor(t, i) {
    this.Transform = Transform_1.Transform.Create();
    this.Shape = "Box";
    this.NoRotation = true;
    this.Shape = t.Type;
    this.Transform.SetScale3D(Vector_1.Vector.OneVectorProxy);
    if (i) {
      t = RangeEntityInfo.TmpVector1;
      RangeEntityInfo.FromVectorInfo(i.Pos, t);
      this.Transform.SetLocation(t);
      RangeEntityInfo.FromVectorInfo(i.Rot, t);
      RangeEntityInfo.TmpRotator.Set(t.X, t.Y, t.Z);
      this.Transform.SetRotation(RangeEntityInfo.TmpRotator.Quaternion());
      if (!RangeEntityInfo.TmpRotator.Equals(Rotator_1.Rotator.ZeroRotatorProxy)) {
        this.NoRotation = false;
      }
    }
  }
  static FromVectorInfo(t, i) {
    i.X = t?.X ?? 0;
    i.Y = t?.Y ?? 0;
    i.Z = t?.Z ?? 0;
  }
  InverseTransformNoScale(t, i) {
    t.Subtraction(this.Transform.GetLocation(), i);
    if (!this.NoRotation) {
      this.Transform.GetRotation().Inverse(RangeEntityInfo.TmpQuat);
      RangeEntityInfo.TmpQuat.RotateVector(i, i);
    }
  }
  IsInRange(t) {
    return true;
  }
}
(exports.RangeEntityInfo = RangeEntityInfo).TmpVector1 = Vector_1.Vector.Create();
RangeEntityInfo.TmpVector2 = Vector_1.Vector.Create();
RangeEntityInfo.TmpVector3 = Vector_1.Vector.Create();
RangeEntityInfo.TmpRotator = Rotator_1.Rotator.Create();
RangeEntityInfo.TmpQuat = Quat_1.Quat.Create();
class SphereRangeEntityInfo extends RangeEntityInfo {
  constructor(t, i) {
    super(t, i);
    this.Radius = 0;
    this.Radius = t.Radius;
    var i = RangeEntityInfo.TmpVector1;
    var e = RangeEntityInfo.TmpVector2;
    RangeEntityInfo.FromVectorInfo(t.Center, i);
    this.Transform.GetLocation().Addition(i, e);
    this.Transform.SetLocation(e);
    this.NoRotation = true;
  }
  IsInRange(t) {
    this.InverseTransformNoScale(t, RangeEntityInfo.TmpVector3);
    return RangeEntityInfo.TmpVector3.Size() - this.Radius <= 0;
  }
}
exports.SphereRangeEntityInfo = SphereRangeEntityInfo;
class BoxRangeEntityInfo extends RangeEntityInfo {
  constructor(t, i) {
    super(t, i);
    this.Bounds = Vector_1.Vector.Create();
    this.Bounds.Set(t.Size.X ?? 0, t.Size.Y ?? 0, t.Size.Z ?? 0);
    var i = RangeEntityInfo.TmpVector1;
    var e = RangeEntityInfo.TmpVector2;
    RangeEntityInfo.FromVectorInfo(t.Center, i);
    this.Transform.GetLocation().Addition(i, e);
    this.Transform.SetLocation(e);
    RangeEntityInfo.FromVectorInfo(t.Rotator, i);
    RangeEntityInfo.TmpRotator.Set(i.X, i.Y, i.Z);
    RangeEntityInfo.TmpRotator.AdditionEqual(this.Transform.GetRotation().Rotator());
    this.Transform.SetRotation(RangeEntityInfo.TmpRotator.Quaternion());
    if (!RangeEntityInfo.TmpRotator.Equals(Rotator_1.Rotator.ZeroRotatorProxy)) {
      this.NoRotation = false;
    }
  }
  IsInRange(t) {
    this.InverseTransformNoScale(t, RangeEntityInfo.TmpVector3);
    RangeEntityInfo.TmpVector3.GetAbs(RangeEntityInfo.TmpVector1);
    RangeEntityInfo.TmpVector1.SubtractionEqual(this.Bounds);
    RangeEntityInfo.TmpVector2.X = Math.max(RangeEntityInfo.TmpVector1.X, 0);
    RangeEntityInfo.TmpVector2.Y = Math.max(RangeEntityInfo.TmpVector1.Y, 0);
    RangeEntityInfo.TmpVector2.Z = Math.max(RangeEntityInfo.TmpVector1.Z, 0);
    return RangeEntityInfo.TmpVector2.Size() + Math.min(0, RangeEntityInfo.TmpVector1.GetMax()) <= 0;
  }
}
exports.BoxRangeEntityInfo = BoxRangeEntityInfo;
class AiControllerLibrary {
  static NavigationFindPath(t, i, e, n = undefined, r, a) {
    if (t.AiController?.CharActorComp?.MoveComp && !t.AiController.CharActorComp.MoveComp.IsStandardGravity) {
      if (n) {
        n.push(Vector_1.Vector.Create(i));
        n.push(Vector_1.Vector.Create(e));
      }
    } else {
      if (!UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(t, i, undefined, undefined, undefined, defaultBlockHalfExtent, -1)) {
        if (n) {
          n.push(Vector_1.Vector.Create(i));
          n.push(Vector_1.Vector.Create(e));
        }
        return !a;
      }
      var o = UE.NavigationSystemV1.D_FindPathToLocationSynchronously(t, i, e);
      if (!o) {
        return false;
      }
      var s = o.PathPoints.Num();
      if (s < 2) {
        return false;
      }
      a = o.PathPoints.Get(s - 1);
      if (UE.VectorDouble.DistSquared2D(e, new UE.VectorDouble(a)) > MIN_NAVIGATION_FINAL_DIST_SQUARD || !r && Math.abs(a.Z - e.Z) > MIN_NAVIGATION_FINAL_HEIGHt) {
        return false;
      }
      if (n) {
        for (let t = n.length = 0; t < s; ++t) {
          var h = o.PathPoints.Get(t);
          n.push(Vector_1.Vector.Create(h));
        }
      }
    }
    return true;
  }
  static GetPathLength(t, i) {
    if (i.length === 0) {
      return 0;
    }
    let e = 0;
    this.cz.FromUeVector(t);
    e += Vector_1.Vector.Dist(this.cz, i[0]);
    for (let t = 1; t < i.length; ++t) {
      e += Vector_1.Vector.Dist(i[t - 1], i[t]);
    }
    return e;
  }
  static NavigationBlock(t, i, e, n = true) {
    if (t.AiController?.CharActorComp?.MoveComp && !t.AiController.CharActorComp.MoveComp.IsStandardGravity) {
      return false;
    }
    i = i.ToUeVector();
    if (n && !UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(t, i, undefined, undefined, undefined, defaultBlockHalfExtent, -1)) {
      return false;
    }
    return !UE.NavigationSystemV1.D_IsStraightReachable(t, i, e.ToUeVector(), undefined, undefined, defaultBlockHalfExtent);
  }
  static NavigationBlockDirection(t, i, e, n = DEFAULT_NAVIGATION_BLOCK_LENGTH, r = true) {
    var a = t.Character.CharacterMovement.MovementMode;
    return a !== 1 && a !== 2 || (e.Multiply(n, this.cz), this.cz.AdditionEqual(i), this.NavigationBlock(t, i, this.cz, r));
  }
  static NavigationBlockDirectionE(t, i, e, n, r = DEFAULT_NAVIGATION_BLOCK_LENGTH, a = true) {
    this.GetDirectionVector(t, e, n, this.fz);
    return this.NavigationBlockDirection(t, i, this.fz, r, a);
  }
  static GetDirectionVector(t, i, e, n) {
    n.DeepCopy(i);
    var r = t;
    if (r.AiController?.CharActorComp?.MoveComp && !r.AiController.CharActorComp.MoveComp.IsStandardGravity) {
      switch (e) {
        case 0:
          break;
        case 1:
          n.UnaryNegation(n);
          break;
        case 2:
          Vector_1.Vector.CrossProduct(r.AiController.CharActorComp.MoveComp.GravityUp, i, this.cz);
          this.cz.Normalize();
          n.DeepCopy(this.cz);
          break;
        case 3:
          Vector_1.Vector.CrossProduct(i, r.AiController.CharActorComp.MoveComp.GravityUp, this.cz);
          this.cz.Normalize();
          n.DeepCopy(this.cz);
      }
    } else {
      switch (e) {
        case 0:
          break;
        case 1:
          n.UnaryNegation(n);
          break;
        case 2:
          n.Set(-n.Y, n.X, 0);
          break;
        case 3:
          n.Set(n.Y, -n.X, 0);
      }
    }
  }
  static TurnToTarget(t, i, e, n = false, r = 0) {
    i.Subtraction(t.ActorLocationProxy, this.cz);
    t.SetInputFacing(this.cz, !n);
    if (r > 0) {
      i = GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) / r;
      t.SetOverrideTurnSpeed(Math.min(i, e));
    } else {
      t.SetOverrideTurnSpeed(e);
    }
  }
  static TurnToDirect(t, i, e, n = false, r = 0) {
    this.cz.DeepCopy(i);
    t.SetInputFacing(this.cz, !n);
    if (r > 0) {
      i = GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) / r;
      t.SetOverrideTurnSpeed(Math.min(i, e));
    } else {
      t.SetOverrideTurnSpeed(e);
    }
  }
  static ClearInput(t) {
    if (t && (t = t.AiController.CharActorComp)?.Valid) {
      t.ClearInput();
    }
  }
  static AllyOnPath(t, i, e, n) {
    var r = t.CharActorComp;
    var a = r.ActorLocationProxy;
    var o = r.ScaledHalfHeight;
    var s = r.ScaledRadius;
    if (r.MoveComp && !r.MoveComp.IsStandardGravity) {
      Vector_1.Vector.CrossProduct(r.MoveComp.GravityUp, i, this.cz);
      this.cz.Normalize();
    } else {
      this.cz.Set(-i.Y, i.X, 0);
    }
    var h = this.cz;
    var c = this.fz;
    for (const _ of t.AiPerception.Allies) {
      if (_ !== t.CharAiDesignComp.Entity.Id) {
        var l = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(_);
        if (l && (l.ActorLocationProxy.Subtraction(a, c), !(GravityUtils_1.GravityUtils.GetZnInGravityForActor(r, c) > o + l.ScaledHalfHeight))) {
          var l = s + l.ScaledRadius;
          var I = Vector_1.Vector.DotProduct(c, i);
          var f = Vector_1.Vector.DotProduct(c, h);
          if (Math.abs(I) < l && f < e && -e < f && n === (f > 0 ? 2 : 3)) {
            return true;
          }
          if (Math.abs(f) < l && I < e && -e < I && n === (I > 0 ? 0 : 1)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static AllyBlockDirections(t, i, e, n) {
    if (t.AiPerception) {
      n.clear();
      var r = t.CharActorComp;
      var a = r.ActorLocationProxy;
      var o = r.ScaledHalfHeight;
      var s = r.ScaledRadius;
      if (r.MoveComp && !r.MoveComp.IsStandardGravity) {
        Vector_1.Vector.CrossProduct(r.MoveComp.GravityUp, i, this.cz);
        this.cz.Normalize();
      } else {
        this.cz.Set(-i.Y, i.X, 0);
      }
      var h = this.cz;
      var c = this.fz;
      for (const _ of t.AiPerception.Allies) {
        var l;
        var I;
        var f = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(_);
        if (f) {
          f.ActorLocationProxy.Subtraction(a, c);
          if (!(GravityUtils_1.GravityUtils.GetZnInGravityForActor(r, c) > o + f.ScaledHalfHeight)) {
            f = s + f.ScaledRadius;
            l = Vector_1.Vector.DotProduct(c, i);
            I = Vector_1.Vector.DotProduct(c, h);
            if (Math.abs(l) < f && I < e && -e < I) {
              n.add(I > 0 ? 2 : 3);
            }
            if (Math.abs(I) < f && l < e && -e < l) {
              n.add(l > 0 ? 0 : 1);
            }
          }
        }
      }
    }
  }
  static GetLocationFromEntity(t) {
    var i = t?.GetComponent(1);
    if (i) {
      return i.ActorLocationProxy;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 6, "目标Entity没有坐标属性", ["EntityId", t.Id]);
      }
      return Vector_1.Vector.ZeroVectorProxy;
    }
  }
  static InTeamArea(t, i, e = 1) {
    var t = t.CharActorComp.ActorLocationProxy;
    t.Subtraction(i.CachedTargetLocation, this.cz);
    i.Group.InverseGravityQuat.RotateVector(this.cz, this.cz);
    let n = Math.atan2(this.cz.Y, this.cz.X) * MathUtils_1.MathUtils.RadToDeg - i.CachedControllerYaw - i.AngleCenter;
    while (n > 180) {
      n -= 360;
    }
    while (-n > 180) {
      n += 360;
    }
    return !(Math.abs(n) > i.MaxAngleOffset * e) && (t = Vector_1.Vector.DistSquared2D(t, i.CachedTargetLocation)) >= MathUtils_1.MathUtils.Square(i.DistanceCenter - i.MaxDistanceOffset * e) && t <= MathUtils_1.MathUtils.Square(i.DistanceCenter + i.MaxDistanceOffset * e);
  }
  static InputNearestDirection(t, i, e, n, r, a, o) {
    var s;
    var h;
    if (o) {
      if (a) {
        MathUtils_1.MathUtils.LookRotationForwardFirst(i, t?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, e);
        e.Inverse(e);
        e.RotateVector(o, n);
        s = AiControllerLibrary.tqn(n, t.WanderDirectionType, a);
        h = t.GetNearestDirection(i, s);
        if (s !== 0 && s !== 1) {
          h.UnaryNegation(h);
        }
        AiControllerLibrary.TurnToDirect(t, h, r);
      } else {
        AiControllerLibrary.TurnToDirect(t, o, r);
      }
      t.ActorQuatProxy.Inverse(e);
      e.RotateVector(i, n);
    } else {
      t.ActorQuatProxy.Inverse(e);
      e.RotateVector(i, n);
      s = AiControllerLibrary.tqn(n, t.WanderDirectionType, a);
      h = !a && t.WanderDirectionType !== 2 || t.WanderDirectionType === 0 ? i : t.GetNearestDirection(i, s);
      AiControllerLibrary.TurnToDirect(t, h, r);
    }
    t.InputWanderDirection(i, n);
  }
  static tqn(t, i, e) {
    let n = 0;
    if (i === 0 && e) {
      n = Math.abs(t.X) > Math.abs(t.Y) ? t.X < 0 ? 1 : 0 : t.Y < 0 ? 3 : 2;
    } else if (i === 1) {
      n = t.X < 0 ? 1 : 0;
    } else if (i === 2) {
      n = t.Y < 0 ? 3 : 2;
    }
    return n;
  }
  static GlobalSamplePoint(t, i) {
    switch (t.Shape) {
      case "Box":
        this.RandomPointInBox(t.Bounds, t.Transform, i);
        break;
      case "Sphere":
        var e = t;
        this.RandomPointInSphere(e.Radius, e.Transform.GetLocation(), i);
        break;
      default:
        return false;
    }
    return true;
  }
  static RandomPointInBox(t, i, e) {
    var n;
    var r;
    var a;
    if (!(t.GetMin() < 0)) {
      n = RangeEntityInfo.TmpVector1;
      r = MathUtils_1.MathUtils.GetRandomRange(-t.X, t.X);
      a = MathUtils_1.MathUtils.GetRandomRange(-t.Y, t.Y);
      t = MathUtils_1.MathUtils.GetRandomRange(-t.Z, t.Z);
      n.Set(r, a, t);
      i.TransformPositionNoScale(n, e);
    }
  }
  static RandomPointInSphere(t, i, e) {
    if (!(t < 0)) {
      this.RandomPointInSphereFan(0, t, 0, PI * 2, 0, PI, e);
      e.AdditionEqual(i);
    }
  }
  static RandomPointInSphereFan(t, i, e, n, r, a, o) {
    o.Reset();
    if (!(n < e) && !(i < t) && !(a < r) && !(t < 0)) {
      t = MathUtils_1.MathUtils.GetRandomRange(t * t * t, i * i * i);
      i = Math.pow(t, 1 / 3);
      t = MathUtils_1.MathUtils.GetRandomRange(e, n);
      e = MathUtils_1.MathUtils.GetRandomRange(r, a);
      o.X = i * Math.cos(t);
      o.Y = i * Math.sin(t) * Math.cos(e);
      o.Z = i * Math.sin(t) * Math.sin(e);
    }
  }
}
(exports.AiControllerLibrary = AiControllerLibrary).cz = Vector_1.Vector.Create();
AiControllerLibrary.fz = Vector_1.Vector.Create(); //# sourceMappingURL=AiContollerLibrary.js.map