"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityUtils = undefined;
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
class GravityUtils {
  static GetAngleOffsetFromCurrentToInput(t) {
    var r;
    var i = this.GetMoveComponentForActor(t);
    if (!i || i.IsStandardGravity) {
      return MathUtils_1.MathUtils.WrapAngle(t.InputRotatorProxy.Yaw - t.ActorRotationProxy.Yaw);
    } else {
      r = Math.acos(Vector_1.Vector.DotProduct(t.ActorForwardProxy, t.InputFacingProxy)) * MathUtils_1.MathUtils.RadToDeg;
      Vector_1.Vector.CrossProduct(t.ActorForwardProxy, t.InputFacingProxy, this.TmpVector);
      if (Vector_1.Vector.DotProduct(this.TmpVector, i.GravityDirect) > 0) {
        return -r;
      } else {
        return r;
      }
    }
  }
  static GetAngleOffsetFromCurrentToInputAbs(t) {
    var r = this.GetMoveComponentForActor(t);
    if (!r || r.IsStandardGravity) {
      return Math.abs(MathUtils_1.MathUtils.WrapAngle(t.InputRotatorProxy.Yaw - t.ActorRotationProxy.Yaw));
    } else {
      return Math.acos(Vector_1.Vector.DotProduct(t.ActorForwardProxy, t.InputFacingProxy)) * MathUtils_1.MathUtils.RadToDeg;
    }
  }
  static ConvertToPlanarVectorForActor(t, r) {
    var i;
    var t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      i = r.Z;
      r.Z = 0;
    } else {
      i = -Vector_1.Vector.DotProduct(r, t.GravityDirect);
      t.GravityDirect.Multiply(i, this.TmpVector);
      r.AdditionEqual(this.TmpVector);
    }
    return i;
  }
  static GetPlanarSizeSquared2dForActor(t, r) {
    var t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      return r.SizeSquared2D();
    } else {
      t = r.DotProduct(t.GravityDirect);
      return r.SizeSquared() - t * t;
    }
  }
  static GetDistSquared2dForActor(t, r, i) {
    i.Subtraction(r, this.TmpVector);
    return this.GetPlanarSizeSquared2dForActor(t, this.TmpVector);
  }
  static GetAngleOffsetInGravityForActor(t, r, i) {
    var e;
    var t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      return MathUtils_1.MathUtils.WrapAngle(MathUtils_1.MathUtils.GetAngleByVector2D(i) - MathUtils_1.MathUtils.GetAngleByVector2D(r));
    } else {
      e = Math.acos(Vector_1.Vector.DotProduct(r, i)) * MathUtils_1.MathUtils.RadToDeg;
      Vector_1.Vector.CrossProduct(r, i, this.TmpVector);
      if (Vector_1.Vector.DotProduct(this.TmpVector, t.GravityDirect) > 0) {
        return -e;
      } else {
        return e;
      }
    }
  }
  static GetAngleOffsetInGravityAbsForActor(t, r, i) {
    var t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      t = MathUtils_1.MathUtils.WrapAngle(MathUtils_1.MathUtils.GetAngleByVector2D(i) - MathUtils_1.MathUtils.GetAngleByVector2D(r));
      return Math.abs(t);
    } else {
      return Math.acos(Vector_1.Vector.DotProduct(r, i)) * MathUtils_1.MathUtils.RadToDeg;
    }
  }
  static TurnVectorByDirectionInGravityForActor(r, i, e) {
    if (e !== 0) {
      r = this.GetMoveComponentForActor(r);
      if (!r || r.IsStandardGravity) {
        let t = 0;
        switch (e) {
          case 1:
            i.X = -i.X;
            i.Y = -i.Y;
            break;
          case 2:
            t = i.X;
            i.X = i.Y;
            i.Y = -t;
            break;
          case 3:
            t = -i.X;
            i.X = i.Y;
            i.Y = -t;
        }
      } else {
        let t = 0;
        switch (e) {
          case 1:
            t = 180;
            break;
          case 2:
            t = 90;
            break;
          case 3:
            t = -90;
            break;
          default:
            return;
        }
        Quat_1.Quat.ConstructorByAxisAngle(r.GravityDirect, -t * MathUtils_1.MathUtils.DegToRad, this.TmpQuat);
        this.TmpQuat.RotateVector(i, i);
      }
    }
  }
  static GetQuatFromRotatorAndGravity(t, r, i) {
    r.Quaternion(this.TmpQuat);
    this.TmpQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TmpVector);
    r = this.TmpVector.DotProduct(t);
    if (Math.abs(r) > 0.99) {
      this.TmpQuat.RotateVector(r > 0 ? Vector_1.Vector.UpVectorProxy : Vector_1.Vector.DownVectorProxy, this.TmpVector);
    }
    t.UnaryNegation(this.TmpVector2);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.TmpVector2, i);
  }
  static GetQuatFromRotatorAndGravityForActor(t, r, i) {
    t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      this.TmpRotator.Set(0, r.Yaw, 0);
      this.TmpRotator.Quaternion(i);
    } else {
      this.GetQuatFromRotatorAndGravity(t.GravityDirect, r, i);
    }
  }
  static GetZnInGravity(t, r) {
    return -Vector_1.Vector.DotProduct(r, t);
  }
  static GetZnInGravityForDirect(t, r) {
    if (MathUtils_1.MathUtils.IsNearlyEqual(t.Z, -1)) {
      return r.Z;
    } else {
      return this.GetZnInGravity(t, r);
    }
  }
  static GetZnInGravityForActor(t, r) {
    t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      return r.Z;
    } else {
      return this.GetZnInGravity(t.GravityDirect, r);
    }
  }
  static SetZnInGravity(t, r, i) {
    var e = -Vector_1.Vector.DotProduct(r, t);
    t.Multiply(e - i, this.TmpVector);
    r.AdditionEqual(this.TmpVector);
  }
  static SetZnInGravityForActor(t, r, i) {
    t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      r.Z = i;
    } else {
      this.SetZnInGravity(t.GravityDirect, r, i);
    }
  }
  static AddZnInGravity(t, r, i) {
    t.Multiply(-i, this.TmpVector);
    r.AdditionEqual(this.TmpVector);
  }
  static AddZnInGravityForDirect(t, r, i) {
    if (MathUtils_1.MathUtils.IsNearlyEqual(t.Z, -1)) {
      r.Z += i;
    } else {
      this.AddZnInGravity(t, r, i);
    }
  }
  static AddZnInGravityForActor(t, r, i) {
    t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      r.Z += i;
    } else {
      this.AddZnInGravity(t.GravityDirect, r, i);
    }
  }
  static GetGravityUpForActor(t) {
    t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      return Vector_1.Vector.UpVectorProxy;
    } else {
      return t.GravityUp;
    }
  }
  static GetGravityDirectForActor(t) {
    if (!t?.MoveComp || t.MoveComp.IsStandardGravity) {
      return Vector_1.Vector.DownVectorProxy;
    } else {
      return t.MoveComp.GravityDirect;
    }
  }
  static IsEntityGravityLimitGravity(t) {
    t = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent");
    return !!t?.GravityConfig && (t.GravityConfig.SpecifyGravityLock ?? false);
  }
  static GetGravityDirectByEntityData(t) {
    var r;
    var i = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent")?.GravityConfig?.GravityDirection;
    if (i?.Type === "VectorInfo") {
      (r = Vector_1.Vector.Create()).FromConfigVector(i.Direction);
      return r;
    }
    if (i?.Type === "WorldAxis") {
      switch (i.WorldAxis) {
        case "PositiveX":
          return Vector_1.Vector.XAxisVectorProxy;
        case "PositiveY":
          return Vector_1.Vector.YAxisVectorProxy;
        case "PositiveZ":
          return Vector_1.Vector.ZAxisVectorProxy;
        case "NegativeX":
          return Vector_1.Vector.XAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
        case "NegativeY":
          return Vector_1.Vector.YAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
        case "NegativeZ":
          return Vector_1.Vector.ZAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
      }
    } else if (i?.Type === "SelfRotation" && t) {
      Rotator_1.Rotator.Create(t.Transform?.Rot?.Y ?? 0, t.Transform?.Rot?.Z ?? 0, t.Transform?.Rot?.X ?? 0).Quaternion().GetUpVector(MathUtils_1.MathUtils.CommonTempVector);
      return MathUtils_1.MathUtils.CommonTempVector.Multiply(-1, Vector_1.Vector.Create());
    }
    return Vector_1.Vector.DownVectorProxy;
  }
  static GetGravityDirectionByConfigAndActor(t, r) {
    var i;
    if (t?.Type === "VectorInfo") {
      (i = Vector_1.Vector.Create()).FromConfigVector(t.Direction);
      return i;
    }
    if (t?.Type === "WorldAxis") {
      switch (t.WorldAxis) {
        case "PositiveX":
          return Vector_1.Vector.XAxisVectorProxy;
        case "PositiveY":
          return Vector_1.Vector.YAxisVectorProxy;
        case "PositiveZ":
          return Vector_1.Vector.ZAxisVectorProxy;
        case "NegativeX":
          return Vector_1.Vector.XAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
        case "NegativeY":
          return Vector_1.Vector.YAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
        case "NegativeZ":
          return Vector_1.Vector.ZAxisVectorProxy.Multiply(-1, Vector_1.Vector.Create());
      }
    } else if (t?.Type === "SelfRotation") {
      return r?.ActorUpProxy.Multiply(-1, Vector_1.Vector.Create()) ?? Vector_1.Vector.DownVectorProxy;
    }
    return Vector_1.Vector.DownVectorProxy;
  }
  static GetBaseQuatInGravityForActor(t, r) {
    var t = this.GetMoveComponentForActor(t);
    if (!t || t.IsStandardGravity) {
      r.Set(0, 0, 0, 1);
    } else {
      t = t.GravityUp;
      if (Math.abs(t.DotProduct(Vector_1.Vector.ForwardVectorProxy)) < 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, t, r);
      } else {
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.UpVectorProxy, t, r);
      }
    }
  }
  static GetYawInInverseQuat(t, r) {
    r.RotateVector(t, this.TmpVector);
    return Math.atan2(this.TmpVector.Y, this.TmpVector.X) * MathUtils_1.MathUtils.RadToDeg;
  }
  static GetRotInInverseQuat(t, r, i) {
    r.Multiply(t.Quaternion(), this.TmpQuat);
    this.TmpQuat.Rotator(i);
  }
  static RotatedVectorByActorInitGravity(t, r) {
    if (t?.ActorInitNotStandardGravity) {
      t = t.ActorInitGravityRotation.RotateVector(r.ToUeVectorOld());
      r.DeepCopy(t);
    }
  }
  static GetMoveComponentForActor(t) {
    if (t?.MoveComp) {
      return t.MoveComp;
    } else {
      return t?.Entity?.GetComponent(237);
    }
  }
  static GetRotatorInGravity(t, r, i) {
    t.Quaternion(this.TmpQuat);
    r.Multiply(this.TmpQuat, this.TmpQuat2);
    this.TmpQuat2.Rotator(i);
    return i;
  }
  static GetRotatorInNormal(t, r, i) {
    t.Quaternion(this.TmpQuat);
    r.Multiply(this.TmpQuat, this.TmpQuat2);
    this.TmpQuat2.Rotator(i);
    return i;
  }
  static GetVectorInGravity(t, r, i) {
    r.RotateVector(t, i);
    return i;
  }
  static GetVectorInNormal(t, r, i) {
    r.RotateVector(t, i);
    return i;
  }
  static RotatorInterpConstantToForActor(t, r, i, e, s, a) {
    var o = this.GetMoveComponentForActor(t);
    if (!o || o.IsStandardGravity) {
      MathUtils_1.MathUtils.RotatorInterpConstantTo(r, i, e, s, a);
    } else if (e <= 0 || s <= 0) {
      a.DeepCopy(r);
    } else {
      this.GetBaseQuatInGravityForActor(t, this.TmpQuat);
      this.TmpQuat.Inverse(this.TmpQuat2);
      r.Quaternion(this.TmpQuat3);
      this.TmpQuat2.Multiply(this.TmpQuat3, this.TmpQuat4);
      this.TmpQuat4.Rotator(this.TmpRotator);
      i.Quaternion(this.TmpQuat3);
      this.TmpQuat2.Multiply(this.TmpQuat3, this.TmpQuat4);
      this.TmpQuat4.Rotator(this.TmpRotator2);
      MathUtils_1.MathUtils.RotatorInterpConstantTo(this.TmpRotator, this.TmpRotator2, e, s, this.TmpRotator3);
      this.TmpRotator3.Quaternion(this.TmpQuat3);
      this.TmpQuat.Multiply(this.TmpQuat3, this.TmpQuat4);
      this.TmpQuat4.Rotator(a);
    }
  }
  static RotateDirectInGravityForActor(t, r, i) {
    r.Quaternion(this.TmpQuat);
    r = this.GetMoveComponentForActor(t);
    (!r || r.IsStandardGravity ? this.TmpQuat : (Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, r.GravityUp, this.TmpQuat2), this.TmpQuat2.Inverse(this.TmpQuat3), this.TmpQuat3.RotateVector(i, i), this.TmpQuat.RotateVector(i, i), this.TmpQuat2)).RotateVector(i, i);
  }
}
(exports.GravityUtils = GravityUtils).TmpVector = Vector_1.Vector.Create();
GravityUtils.TmpVector2 = Vector_1.Vector.Create();
GravityUtils.TmpQuat = Quat_1.Quat.Create();
GravityUtils.TmpQuat2 = Quat_1.Quat.Create();
GravityUtils.TmpQuat3 = Quat_1.Quat.Create();
GravityUtils.TmpQuat4 = Quat_1.Quat.Create();
GravityUtils.TmpRotator = Rotator_1.Rotator.Create();
GravityUtils.TmpRotator2 = Rotator_1.Rotator.Create();
GravityUtils.TmpRotator3 = Rotator_1.Rotator.Create(); //# sourceMappingURL=GravityUtils.js.map