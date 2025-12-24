"use strict";

var MotorcycleActorComponent_1;
var __decorate = this && this.__decorate || function (t, o, e, r) {
  var c;
  var n = arguments.length;
  var i = n < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(t, o, e, r);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (c = t[s]) {
        i = (n < 3 ? c(i) : n > 3 ? c(o, e, i) : c(o, e)) || i;
      }
    }
  }
  if (n > 3 && i) {
    Object.defineProperty(o, e, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleActorComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const RenderConfig_1 = require("../../../Render/Config/RenderConfig");
const FunctionRequestProxy_1 = require("../../Character/Common/Component/Actor/FunctionRequestProxy");
const VehicleActorComponent_1 = require("../Common/VehicleActorComponent");
const TEX_MIP_OFFSET = -10;
const TEX_MIP_OFFSET_DEFAULT = 0;
let MotorcycleActorComponent = MotorcycleActorComponent_1 = class MotorcycleActorComponent extends VehicleActorComponent_1.VehicleActorComponent {
  SetActorLocation(t, o, e) {
    if (e) {
      if (MathUtils_1.MathUtils.IsValidVector(t)) {
        if (this.ActorInternal?.IsValid() && (VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t), VehicleActorComponent_1.VehicleActorComponent.TmpVector.SubtractionEqual(this.ActorLocationProxy), this.CachedDesiredActorLocation.FromUeVector(t), this.IsChangingLocation = true, this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), Quat_1.Quat.Identity, e), this.IsChangingLocation = false, this.CheckIsForbidSettingLocAndRot(true), this.DebugMovementComp)) {
          this.DebugMovementComp.MarkDebugRecord(o + ".SetActorLocation", 1);
        }
        this.ResetLocationCachedTime();
        this.OnTeleport();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "SetActorLocation的value无效", ["value", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    } else {
      return super.SetActorLocation(t, o, e);
    }
  }
  SetActorLocationNoTeleport(t, o, e) {
    if (!e) {
      super.SetActorLocationNoTeleport(t, o, e);
    }
    if (MathUtils_1.MathUtils.IsValidVector(t)) {
      if (this.ActorInternal?.IsValid() && (VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t), VehicleActorComponent_1.VehicleActorComponent.TmpVector.SubtractionEqual(this.ActorLocationProxy), this.CachedDesiredActorLocation.FromUeVector(t), this.IsChangingLocation = true, this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), Quat_1.Quat.Identity, e), this.IsChangingLocation = false, this.CheckIsForbidSettingLocAndRot(true), this.DebugMovementComp)) {
        this.DebugMovementComp.MarkDebugRecord(o + ".SetActorLocation", 1);
      }
      this.ResetLocationCachedTime();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "SetActorLocation的value无效", ["value", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
    }
    return false;
  }
  SetActorRotation(t, o, e) {
    if (e) {
      if (MathUtils_1.MathUtils.IsValidRotator(t)) {
        MotorcycleActorComponent_1.TmpRotator.FromUeRotator(t);
        MotorcycleActorComponent_1.TmpRotator.Quaternion(VehicleActorComponent_1.VehicleActorComponent.TmpQuat);
        this.ActorQuatProxy.Inverse(MotorcycleActorComponent_1.TmpQuat2);
        VehicleActorComponent_1.VehicleActorComponent.TmpQuat.Multiply(MotorcycleActorComponent_1.TmpQuat2, MotorcycleActorComponent_1.TmpQuat3);
        this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(Vector_1.Vector.ZeroVector, MotorcycleActorComponent_1.TmpQuat3.ToUeQuat(), e);
        this.ResetRotationCachedTime();
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(o + ".SetActorRotation", 1);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorRotation NaN");
      }
      return false;
    } else {
      return super.SetActorRotation(t, o, e);
    }
  }
  SetActorLocationAndRotation(t, o, e, r, c) {
    var n;
    if (r) {
      if (MathUtils_1.MathUtils.IsValidVector(t) && MathUtils_1.MathUtils.IsValidRotator(o)) {
        VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t);
        VehicleActorComponent_1.VehicleActorComponent.TmpVector.SubtractionEqual(this.ActorLocationProxy);
        MotorcycleActorComponent_1.TmpRotator.FromUeRotator(o);
        MotorcycleActorComponent_1.TmpRotator.Quaternion(VehicleActorComponent_1.VehicleActorComponent.TmpQuat);
        this.ActorQuatProxy.Inverse(MotorcycleActorComponent_1.TmpQuat2);
        if (c) {
          (n = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = e;
          n.Priority = c;
          if (!this.SetRotationRequestProxy.DecideCall(n)) {
            MotorcycleActorComponent_1.TmpQuat2.DeepCopy(Quat_1.Quat.IdentityProxy);
          }
        }
        this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), MotorcycleActorComponent_1.TmpQuat3.ToUeQuat(), r);
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(e + ".SetActorLocationAndRotation", 1);
        }
        this.ResetTransformCachedTime();
        this.OnTeleport();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorLocationAndRotation NaN");
      }
      return false;
    } else {
      return super.SetActorLocationAndRotation(t, o, e, r, c);
    }
  }
  SetActorTransform(t, o, e, r) {
    var c;
    if (e) {
      if (r) {
        (c = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = o;
        c.Priority = r;
        if (!this.SetRotationRequestProxy.DecideCall(c)) {
          t.SetRotation(this.ActorRotation.Quaternion());
        }
      }
      VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t.GetLocation());
      VehicleActorComponent_1.VehicleActorComponent.TmpVector.SubtractionEqual(this.ActorLocationProxy);
      VehicleActorComponent_1.VehicleActorComponent.TmpQuat.FromUeQuat(t.GetRotation());
      this.ActorQuatProxy.Inverse(MotorcycleActorComponent_1.TmpQuat2);
      VehicleActorComponent_1.VehicleActorComponent.TmpQuat.Multiply(MotorcycleActorComponent_1.TmpQuat2, MotorcycleActorComponent_1.TmpQuat3);
      this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), MotorcycleActorComponent_1.TmpQuat3.ToUeQuat(), e);
      this.ResetTransformCachedTime();
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(o + ".SetActorTransform", 1);
      }
      return false;
    } else {
      return super.SetActorTransform(t, o, e, r);
    }
  }
  SetActorLocationAndRotationExceptMesh(t, o, e, r, c) {
    var n;
    var i;
    if (this.SkeletalMesh) {
      n = this.SkeletalMesh.D_K2_GetComponentToWorld();
      i = this.SetActorLocationAndRotation(t, o, e, r, c);
      this.SkeletalMesh.D_K2_SetWorldTransform(n, false, undefined, true);
      return i;
    } else {
      return this.SetActorLocationAndRotation(t, o, e, r, c);
    }
  }
  SetActorTransformExceptMesh(t, o, e, r) {
    var c;
    var n;
    if (this.SkeletalMesh) {
      c = this.SkeletalMesh.D_K2_GetComponentToWorld();
      n = this.SetActorTransform(t, o, e, r);
      this.SkeletalMesh.D_K2_SetWorldTransform(c, false, undefined, true);
      return n;
    } else {
      return this.SetActorTransform(t, o, e, r);
    }
  }
  EnterFirstPersonMode() {
    super.EnterFirstPersonMode();
    this.ActorInternal?.CharRenderingComponent?.SetMaterialPropertyFloatV2(RenderConfig_1.RenderConfig.TexMipOffset, TEX_MIP_OFFSET, 0, 0, 17);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 57, "设置摩托第一人称材质参数");
    }
  }
  ExitFirstPersonMode() {
    super.ExitFirstPersonMode();
    this.ActorInternal?.CharRenderingComponent?.SetMaterialPropertyFloatV2(RenderConfig_1.RenderConfig.TexMipOffset, TEX_MIP_OFFSET_DEFAULT, 0, 0, 17);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 57, "还原摩托第一人称材质参数");
    }
  }
  AddActorWorldOffset(t, o, e) {
    if (e) {
      if (!this.CheckIsForbidSettingLocAndRot(true)) {
        VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t);
        this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), Quat_1.Quat.Identity, e);
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(o + ".AddActorWorldOffset", 1);
        }
        this.ResetLocationCachedTime();
      }
    } else {
      super.AddActorWorldOffset(t, o, e);
    }
  }
  AddActorLocalOffset(t, o, e) {
    if (e) {
      if (!this.CheckIsForbidSettingLocAndRot(true)) {
        VehicleActorComponent_1.VehicleActorComponent.TmpVector.FromUeVector(t);
        this.ActorQuatProxy.RotateVector(VehicleActorComponent_1.VehicleActorComponent.TmpVector, VehicleActorComponent_1.VehicleActorComponent.TmpVector);
        this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(VehicleActorComponent_1.VehicleActorComponent.TmpVector.ToUeVectorOld(), Quat_1.Quat.Identity, e);
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(o + ".AddActorLocalOffset", 1);
        }
        this.ResetLocationCachedTime();
      }
    } else {
      super.AddActorLocalOffset(t, o, e);
    }
  }
  AddActorWorldRotation(t, o, e) {
    if (e) {
      MotorcycleActorComponent_1.TmpRotator.FromUeRotator(t);
      this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(Vector_1.Vector.ZeroVector, MotorcycleActorComponent_1.TmpRotator.Quaternion().ToUeQuat(), e);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(o + ".AddActorWorldRotation", 1);
      }
      this.ResetRotationCachedTime();
    } else {
      super.AddActorWorldRotation(t, o, e);
    }
  }
  AddActorLocalRotation(t, o, e) {
    if (e) {
      MotorcycleActorComponent_1.TmpRotator.FromUeRotator(t);
      MotorcycleActorComponent_1.TmpRotator.Quaternion(MotorcycleActorComponent_1.TmpQuat);
      this.ActorQuatProxy.Multiply(MotorcycleActorComponent_1.TmpQuat, MotorcycleActorComponent_1.TmpQuat2);
      this.ActorQuatProxy.Inverse(MotorcycleActorComponent_1.TmpQuat);
      MotorcycleActorComponent_1.TmpQuat2.Multiply(MotorcycleActorComponent_1.TmpQuat, MotorcycleActorComponent_1.TmpQuat3);
      this.VehicleMoveComp.VehicleMovement.MoveMotorcycle(Vector_1.Vector.ZeroVector, MotorcycleActorComponent_1.TmpQuat3.ToUeQuat(), e);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(o + ".AddActorWorldRotation", 1);
      }
      this.ResetRotationCachedTime();
    } else {
      super.AddActorLocalRotation(t, o, e);
    }
  }
};
MotorcycleActorComponent.TmpRotator = Rotator_1.Rotator.Create();
MotorcycleActorComponent.TmpQuat2 = Quat_1.Quat.Create();
MotorcycleActorComponent.TmpQuat3 = Quat_1.Quat.Create();
MotorcycleActorComponent = MotorcycleActorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(263)], MotorcycleActorComponent);
exports.MotorcycleActorComponent = MotorcycleActorComponent; //# sourceMappingURL=MotorcycleActorComponent.js.map