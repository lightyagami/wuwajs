"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        r = (h < 3 ? o(r) : h > 3 ? o(i, e, r) : o(i, e)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseActorComponent = exports.DisableEntityHandle = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Entity_1 = require("../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseActorForbidSettingLocAndRotConfig_1 = require("../../Setting/BaseActorForbidSettingLocAndRotConfig");
class DisableEntityHandle {
  constructor(t) {
    this.E9 = t;
    this.vW = 0;
    this.DW = new Map();
  }
  get Empty() {
    return this.DW.size === 0;
  }
  Disable(t, i) {
    if (t) {
      if (t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "Disable的Reason字符串长度必须大于等于限制字符数量", ["ConstructorName", i], ["Reason", t], ["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", ["ConstructorName", i]);
    }
    i = ++this.vW;
    this.DW.set(i, t);
    return i;
  }
  Enable(t, i) {
    if (this.DW.get(t)) {
      return this.DW.delete(t);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "激活句柄不存在", ["Type", this.E9], ["ConstructorName", i], ["handle", t]);
      }
      return false;
    }
  }
  Clear() {
    this.DW.clear();
  }
  DumpDisableInfo() {
    var t;
    var i;
    var e = new Array();
    let s = "";
    for ([t, i] of this.DW) {
      e.push(`${s}{Type:${this.E9},Handle:${t},Reason:${i}}`);
      s = " ";
    }
    return e.join("");
  }
}
exports.DisableEntityHandle = DisableEntityHandle;
let BaseActorComponent = class BaseActorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.MoveComp = undefined;
    this.VehicleMoveComp = undefined;
    this.ActorInternal = undefined;
    this.CachedActorTransform = undefined;
    this.CachedActorLocation = Vector_1.Vector.Create();
    this.CachedActorRotation = Rotator_1.Rotator.Create(0, 0, 0);
    this.CachedActorScale = Vector_1.Vector.Create();
    this.CachedActorQuat = Quat_1.Quat.Create(0, 0, 0, 1);
    this.CachedActorForward = Vector_1.Vector.Create(1, 0, 0);
    this.CachedActorRight = Vector_1.Vector.Create(0, 1, 0);
    this.CachedActorUp = Vector_1.Vector.Create(0, 0, 1);
    this.CachedActorGravityDirect = Vector_1.Vector.Create(0, 0, -1);
    this.CachedActorInitNotStandardGravity = undefined;
    this.CachedActorInitGravityRotation = undefined;
    this.CachedLocationTime = -1;
    this.CachedForwardTime = -1;
    this.CachedScaleTime = -1;
    this.CachedRotationTime = -1;
    this.CachedTransformTime = -1;
    this.CachedRightTime = -1;
    this.CachedUpTime = -1;
    this.CachedVelocityTime = -1;
    this.CachedGravityDirectTime = -1;
    this.CachedDesiredActorLocation = Vector_1.Vector.Create();
    this.IsChangingLocation = false;
    this.CreatureDataInternal = undefined;
    this.DebugMovementComp = undefined;
    this.Nrn = true;
    this.Orn = true;
    this.IsInSequenceBinding = false;
    this.DisableActorHandle = undefined;
    this.DisableCollisionHandle = undefined;
    this.krn = undefined;
    this.Frn = undefined;
    this.Vrn = undefined;
    this.Hrn = undefined;
    this.jrn = undefined;
    this.LastActorLocation = Vector_1.Vector.Create();
    this.vJ = undefined;
    this.D3c = new Set();
    this.B3c = new Set();
    this.OwnedBasePlatform = undefined;
  }
  get IsAutonomousProxy() {
    return this.Nrn;
  }
  get IsMoveAutonomousProxy() {
    return this.Orn;
  }
  OnCreate() {
    this.DisableActorHandle = new DisableEntityHandle("SetActorHiddenInGame");
    this.DisableCollisionHandle = new DisableEntityHandle("SetActorEnableCollision");
    this.AddUnResetProperty("DisableActorHandle", "DisableCollisionHandle", "DisableTickHandle");
    return true;
  }
  OnInitData(t) {
    this.CachedActorForward.Set(1, 0, 0);
    this.CachedActorRight.Set(0, 1, 0);
    this.CachedActorUp.Set(0, 0, 1);
    return true;
  }
  OnStart() {
    this.MoveComp = this.Entity.GetComponent(45);
    this.VehicleMoveComp = this.Entity.GetComponent(236);
    this.vJ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id);
    return true;
  }
  OnActivate() {
    this.ActorInternal.Kuro_SetRole(this.Orn ? 2 : 1);
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
    this.ActorInternal.SetActorHiddenInGame(!this.DisableActorHandle.Empty);
    this.ActorInternal.SetActorEnableCollision(this.DisableCollisionHandle.Empty);
  }
  SetAutonomous(t, i = undefined) {
    this.Nrn = t;
    this.SetMoveAutonomous(i === undefined ? t : i, "切换逻辑主控");
  }
  SetMoveAutonomous(t, i = 0) {
    this.Orn = t;
    this.ActorInternal?.Kuro_SetRole(this.Orn ? 2 : 1);
  }
  SetMoveControlled(t, i = 0, e = "") {
    this.SetMoveAutonomous(t, e);
  }
  ResetMoveControlled(t = "") {
    this.SetMoveAutonomous(this.IsAutonomousProxy, t);
  }
  InitCreatureData() {
    this.CreatureDataInternal = this.Entity.GetComponent(0);
    return !!this.CreatureDataInternal?.Valid || (Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 3, "creature数据加载失败。"), false);
  }
  get CreatureData() {
    return this.CreatureDataInternal;
  }
  get ActorQuat() {
    return this.ActorQuatProxy.ToUeQuat();
  }
  get ActorQuatProxy() {
    if (this.CachedRotationTime < Time_1.Time.Frame && this.ActorInternal?.IsValid()) {
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.DeepCopy(this.ActorInternal.K2_GetActorRotation());
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
    }
    return this.CachedActorQuat;
  }
  get ActorRotationProxy() {
    if (this.CachedRotationTime < Time_1.Time.Frame && this.ActorInternal?.IsValid()) {
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.DeepCopy(this.ActorInternal.K2_GetActorRotation());
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
    }
    return this.CachedActorRotation;
  }
  get ActorRotation() {
    return this.ActorRotationProxy.ToUeRotator();
  }
  get ActorScaleProxy() {
    if (this.CachedScaleTime <= 0 && this.ActorInternal?.IsValid()) {
      this.CachedScaleTime = 1;
      this.CachedActorScale.FromUeVector(this.ActorInternal.D_GetActorScale3D());
    }
    return this.CachedActorScale;
  }
  get ActorScale() {
    return this.ActorScaleProxy.ToUeVector();
  }
  get ActorTransform() {
    if (this.CachedTransformTime < Time_1.Time.Frame && this.ActorInternal?.IsValid()) {
      this.CachedTransformTime = Time_1.Time.Frame;
      this.CachedActorTransform = this.ActorInternal.D_GetTransform();
    }
    return this.CachedActorTransform;
  }
  get ActorLocation() {
    return this.ActorLocationProxy.ToUeVector();
  }
  get ActorLocationProxy() {
    if (this.IsChangingLocation) {
      return this.CachedDesiredActorLocation;
    } else {
      if (this.CachedLocationTime < Time_1.Time.Frame && this.ActorInternal?.IsValid()) {
        this.CachedLocationTime = Time_1.Time.Frame;
        this.Krn(true);
        this.CachedActorLocation.FromUeVector(this.ActorInternal.D_K2_GetActorLocation());
        this.Krn(false);
      }
      return this.CachedActorLocation;
    }
  }
  Krn(t) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      Object.defineProperty(this.CachedActorLocation.Tuple, "0", {
        writable: t
      });
      Object.defineProperty(this.CachedActorLocation.Tuple, "1", {
        writable: t
      });
      Object.defineProperty(this.CachedActorLocation.Tuple, "2", {
        writable: t
      });
    }
  }
  get ActorLocationProxyNoUpdate() {
    if (this.CachedLocationTime <= 0) {
      return this.ActorLocationProxy;
    } else {
      return this.CachedActorLocation;
    }
  }
  get ActorForwardProxy() {
    if (this.CachedForwardTime < Time_1.Time.Frame) {
      this.CachedForwardTime = Time_1.Time.Frame;
      this.ActorQuatProxy.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.CachedActorForward);
    }
    return this.CachedActorForward;
  }
  get ActorRight() {
    return this.ActorRightProxy.ToUeVector();
  }
  get ActorRightProxy() {
    if (this.CachedRightTime < Time_1.Time.Frame) {
      this.CachedRightTime = Time_1.Time.Frame;
      this.ActorQuatProxy.RotateVector(Vector_1.Vector.RightVectorProxy, this.CachedActorRight);
    }
    return this.CachedActorRight;
  }
  get ActorForward() {
    return this.ActorForwardProxy.ToUeVector();
  }
  get ActorUpProxy() {
    if (this.CachedUpTime < Time_1.Time.Frame) {
      this.CachedUpTime = Time_1.Time.Frame;
      this.ActorQuatProxy.RotateVector(Vector_1.Vector.UpVectorProxy, this.CachedActorUp);
    }
    return this.CachedActorUp;
  }
  get ActorUp() {
    return this.ActorUpProxy.ToUeVector();
  }
  get ActorGravityDirectProxy() {
    var t;
    if (this.CachedGravityDirectTime < Time_1.Time.Frame) {
      this.CachedGravityDirectTime = Time_1.Time.Frame;
      if (this.MoveComp) {
        this.CachedActorGravityDirect.DeepCopy(this.MoveComp.GravityDirect);
      } else if (t = this.CreatureData.GetInitGravityDirection()) {
        this.CachedActorGravityDirect.FromConfigVector(t);
      }
    }
    return this.CachedActorGravityDirect;
  }
  get ActorGravityDirection() {
    return this.ActorGravityDirectProxy.ToUeVector();
  }
  get ActorInitNotStandardGravity() {
    if (this.CachedActorInitNotStandardGravity === undefined) {
      this.kec();
    }
    return this.CachedActorInitNotStandardGravity;
  }
  get ActorInitGravityRotationProxy() {
    if (this.CachedActorInitGravityRotation === undefined) {
      this.kec();
    }
    return this.CachedActorInitGravityRotation;
  }
  get ActorInitGravityRotation() {
    if (this.CachedActorInitGravityRotation === undefined) {
      this.kec();
    }
    return this.CachedActorInitGravityRotation.ToUeRotator();
  }
  kec() {
    var t = this.CreatureData.GetInitGravityDirection();
    if (t) {
      var i;
      var e = Vector_1.Vector.Create();
      e.FromConfigVector(t);
      if (e.Normalize() && !MathUtils_1.MathUtils.IsNearlyEqual(t.Z, -1)) {
        t = Vector_1.Vector.Create();
        i = Quat_1.Quat.Create();
        e.UnaryNegation(t);
        if (Math.abs(t.DotProduct(Vector_1.Vector.ForwardVectorProxy)) < 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
          MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, t, i);
        } else {
          MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.UpVectorProxy, t, i);
        }
        this.CachedActorInitNotStandardGravity = true;
        this.CachedActorInitGravityRotation = i.Rotator();
        return;
      }
    }
    this.CachedActorInitNotStandardGravity = false;
    this.CachedActorInitGravityRotation = Rotator_1.Rotator.Create(0, 0, 0);
  }
  GetRadius() {
    return 0;
  }
  get Owner() {
    if (this.ActorInternal?.IsValid()) {
      return this.ActorInternal;
    }
  }
  get SkeletalMesh() {}
  HasMesh() {
    return false;
  }
  OnTeleport() {
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
  }
  SetActorLocation(t, i = "unknown", e = true) {
    if (!MathUtils_1.MathUtils.IsValidVector(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "SetActorLocation的value无效", ["value", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    }
    let s = false;
    if (this.ActorInternal?.IsValid() && (this.CachedDesiredActorLocation.FromUeVector(t), this.IsChangingLocation = true, s = this.ActorInternal.D_K2_SetActorLocation(t, e, undefined, true), this.IsChangingLocation = false, this.CheckIsForbidSettingLocAndRot(true), this.DebugMovementComp)) {
      this.DebugMovementComp.MarkDebugRecord(i + ".SetActorLocation", 1);
    }
    this.ResetLocationCachedTime();
    this.OnTeleport();
    if (this.ActorInternal?.IsValid() && ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 57, "[SetActorLocation]", ["location:", t], ["owner", this?.Owner.GetName()]);
    }
    return s;
  }
  TeleportTo(t, i, e = "unknown") {
    if (!MathUtils_1.MathUtils.IsValidVector(t) || !MathUtils_1.MathUtils.IsValidRotator(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "TeleportTo的location无效", ["location", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    }
    let s = false;
    if (this.ActorInternal?.IsValid() && (this.CachedDesiredActorLocation.FromUeVector(t), this.IsChangingLocation = true, s = this.ActorInternal.D_K2_KuroTeleportTo(t, i), this.IsChangingLocation = false, this.CheckIsForbidSettingLocAndRot(true, true), this.DebugMovementComp)) {
      this.DebugMovementComp.MarkDebugRecord(e + ".TeleportTo", 1, true);
    }
    this.ResetLocationCachedTime();
    this.OnTeleport();
    if (this.ActorInternal?.IsValid() && ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 57, "[TeleportTo]", ["location:", t], ["owner", this?.Owner]);
    }
    return s;
  }
  ResetLocationCachedTime() {
    this.CachedTransformTime = -1;
    this.CachedLocationTime = -1;
  }
  SetActorRotation(t, i = "unknown", e = true) {
    let s = false;
    if (this.ActorInternal?.IsValid() && (s = this.ActorInternal.K2_KuroSetActorRotation(t, e, false), this.CheckIsForbidSettingLocAndRot(false, true), this.DebugMovementComp)) {
      this.DebugMovementComp.MarkDebugRecord(i + ".SetActorRotation", 1);
    }
    this.Qrn();
    return s;
  }
  Qrn() {
    this.CachedTransformTime = 0;
    this.CachedRotationTime = 0;
    this.CachedUpTime = 0;
    this.CachedRightTime = 0;
    this.CachedForwardTime = 0;
  }
  SetActorLocationAndRotation(t, i, e = "unknown", s = false) {
    var o;
    if (MathUtils_1.MathUtils.IsValidVector(t)) {
      o = false;
      this.CachedDesiredActorLocation.FromUeVector(t);
      this.IsChangingLocation = true;
      o = this.ActorInternal.D_K2_SetActorLocationAndRotation(t, i, s, undefined, true);
      this.IsChangingLocation = false;
      this.ResetTransformCachedTime();
      this.OnTeleport();
      this.CheckIsForbidSettingLocAndRot(true, true);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(e + ".SetActorLocationAndRotation", 1);
      }
      if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 57, "[SetActorLocationAndRotation]", ["location:", t], ["rotation:", i], ["owner", this?.Owner]);
      }
      return o;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "SetActorLocationAndRotation的location无效", ["location", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    }
  }
  SetActorTransform(t, i = "unknown", e = true) {
    let s = false;
    var o = t.GetLocation();
    if (MathUtils_1.MathUtils.IsValidVector(o)) {
      this.CachedDesiredActorLocation.FromUeVector(t.GetLocation());
      if (this.ActorLocationProxy.Equals(this.CachedDesiredActorLocation)) {
        s = this.SetActorRotation(t.GetRotation().Rotator(), i, e);
      } else {
        this.IsChangingLocation = true;
        s = this.ActorInternal.D_K2_SetActorTransform(t, e, undefined, true);
        this.IsChangingLocation = false;
      }
      this.CheckIsForbidSettingLocAndRot(true, true);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".SetActorTransform", 1);
      }
      this.ResetTransformCachedTime();
      this.OnTeleport();
      return s;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "SetActorTransform的value参数", ["value", t], ["Location", o], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    }
  }
  AddActorWorldOffset(t, i = "unknown", e = true) {
    if (!this.CheckIsForbidSettingLocAndRot(true)) {
      this.ActorInternal.D_K2_AddActorWorldOffset(t, e, undefined, false);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldOffset", 1);
      }
      this.ResetLocationCachedTime();
    }
  }
  AddActorLocalOffset(t, i = "unknown", e = true) {
    if (!this.CheckIsForbidSettingLocAndRot(true)) {
      this.ActorInternal.D_K2_AddActorLocalOffset(t, e, undefined, false);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalOffset", 1);
      }
      this.ResetLocationCachedTime();
    }
  }
  AddActorWorldRotation(t, i = "unknown", e = false) {
    if (!this.CheckIsForbidSettingLocAndRot(false, true)) {
      this.ActorInternal.K2_AddActorWorldRotation(t, e, undefined, false);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldRotation", 1);
      }
      this.Qrn();
    }
  }
  AddActorLocalRotation(t, i = "unknown", e = false) {
    if (!this.CheckIsForbidSettingLocAndRot(false, true)) {
      this.ActorInternal.K2_AddActorLocalRotation(t, e, undefined, false);
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalRotation", 1);
      }
      this.Qrn();
    }
  }
  ResetTransformCachedTime() {
    this.CachedTransformTime = 0;
    this.CachedLocationTime = 0;
    this.CachedRotationTime = 0;
    this.CachedUpTime = 0;
    this.CachedRightTime = 0;
    this.CachedForwardTime = 0;
    this.CachedGravityDirectTime = 0;
  }
  ResetAllCachedTime() {
    this.CachedTransformTime = -1;
    this.CachedLocationTime = -1;
    this.CachedRotationTime = -1;
    this.CachedUpTime = -1;
    this.CachedRightTime = -1;
    this.CachedForwardTime = -1;
    this.CachedVelocityTime = -1;
    this.CachedGravityDirectTime = -1;
  }
  ResetCachedVelocityTime() {
    this.CachedVelocityTime = -1;
  }
  ResetGravityRelatedCachedTime() {
    this.CachedGravityDirectTime = -1;
  }
  k3c(t, i, e) {
    if (t) {
      e.add(i);
    } else {
      e.delete(i);
    }
  }
  SetForbidSettingLocAndRot(t, i) {
    switch (BaseActorForbidSettingLocAndRotConfig_1.ForbidSettingLocAndRotTypeDefines[i]) {
      case 1:
        this.k3c(t, i, this.D3c);
        break;
      case 2:
        this.k3c(t, i, this.B3c);
        break;
      case 4:
        this.k3c(t, i, this.D3c);
        this.k3c(t, i, this.B3c);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 50, "[BaseActorComp] SetForbidSettingLocation", ["PbDataId", this.CreatureData.GetPbDataId()], ["CreatureId", this.CreatureData.GetCreatureDataId()], ["Forbid", t], ["Reason", i]);
    }
  }
  CheckIsForbidSettingLocAndRot(t = false, i = false, e = true) {
    i = !!this.B3c.size && i;
    t = !!this.D3c.size && t;
    return (!!i || !!t) && !(e && Log_1.Log.CheckError() && Log_1.Log.Error("Test", 50, "[BaseActorComp] 检测到异常的设置位置或旋转行为", ["PbDataId", this.CreatureData.GetPbDataId()], ["CreatureId", this.CreatureData.GetCreatureDataId()], ["TargetLoc", this.ActorLocationProxy], ["TargetRot", this.ActorRotationProxy]), 0);
  }
  OnSetActorActive(t, i) {
    if (t) {
      this.EnableActor(this.Hrn);
      this.EnableCollision(this.jrn);
      this.Hrn = undefined;
      this.jrn = undefined;
    } else {
      this.Hrn = this.DisableActor(i);
      this.jrn = this.DisableCollision(i);
    }
  }
  SetSequenceBinding(t) {
    this.IsInSequenceBinding = t;
  }
  GetSequenceBinding() {
    return this.IsInSequenceBinding;
  }
  DisableActor(t) {
    var i = this.DisableActorHandle.Disable(t, this.constructor.name);
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "DisableActor", ["CreatureDataId", this.CreatureData?.GetCreatureDataId()], ["PbDataId", this.CreatureData?.GetPbDataId()], ["Handle", i], ["Reason", t]);
    }
    if (this.ActorInternal?.IsValid() && !this.ActorInternal.bHidden && (this.ActorInternal.SetActorHiddenInGame(true), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetActorHidden, this.Entity.Id, false), this.vJ)) {
      EventSystem_1.EventSystem.EmitWithTarget(this.vJ, EventDefine_1.EEventName.OnSetActorHidden, this.Entity.Id, false);
    }
    return i;
  }
  DisableCollision(t) {
    var i = this.DisableCollisionHandle.Disable(t, this.constructor.name);
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "DisableCollision", ["CreatureDataId", this.CreatureData?.GetCreatureDataId()], ["PbDataId", this.CreatureData?.GetPbDataId()], ["Handle", i], ["Reason", t]);
    }
    if (this.ActorInternal?.IsValid() && this.ActorInternal.bActorEnableCollision) {
      this.ActorInternal.SetActorEnableCollision(false);
    }
    return i;
  }
  EnableActor(t) {
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "EnableActor", ["CreatureDataId", this.CreatureData?.GetCreatureDataId()], ["PbDataId", this.CreatureData?.GetPbDataId()], ["Handle", t]);
    }
    var i;
    var t = this.DisableActorHandle.Enable(t, this.constructor.name);
    if (t && this.ActorInternal?.IsValid() && this.ActorInternal.bHidden !== !this.DisableActorHandle.Empty) {
      i = this.DisableActorHandle.Empty;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetActorHidden, this.Entity.Id, i);
      EventSystem_1.EventSystem.EmitWithTarget(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity), EventDefine_1.EEventName.OnSetActorHidden, this.Entity.Id, i);
      if (this.Entity.GetComponent(114)) {
        TimerSystem_1.TimerSystem.Next(() => {
          if (this.ActorInternal?.IsValid()) {
            this.ActorInternal.SetActorHiddenInGame(!this.DisableActorHandle.Empty);
          }
        });
      } else {
        this.ActorInternal.SetActorHiddenInGame(!i);
      }
    }
    return t;
  }
  EnableCollision(t) {
    if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.CreatureData?.GetEntityType()) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "EnableCollision", ["CreatureDataId", this.CreatureData?.GetCreatureDataId()], ["PbDataId", this.CreatureData?.GetPbDataId()], ["Handle", t]);
    }
    t = this.DisableCollisionHandle.Enable(t, this.constructor.name);
    if (t && this.ActorInternal?.IsValid() && this.ActorInternal.bActorEnableCollision !== this.DisableCollisionHandle.Empty) {
      this.ActorInternal.SetActorEnableCollision(this.DisableCollisionHandle.Empty);
    }
    return t;
  }
  DumpDisableActorInfo() {
    return this.DisableActorHandle.DumpDisableInfo();
  }
  DumpDisableCollisionInfo() {
    return this.DisableCollisionHandle.DumpDisableInfo();
  }
  DumpDisableTickInfo() {
    var t = this.Entity.GetComponent(111);
    if (t) {
      return t.DumpDisableTickInfo();
    } else {
      return "";
    }
  }
  SetActorVisible(t, i) {
    if (t) {
      if (this.krn) {
        this.EnableActor(this.krn);
        this.krn = undefined;
      }
    } else {
      this.krn ||= this.DisableActor(i);
    }
  }
  SetCollisionEnable(t, i) {
    if (t) {
      if (this.Frn) {
        this.EnableCollision(this.Frn);
        this.Frn = undefined;
      }
    } else {
      this.Frn ||= this.DisableCollision(i);
    }
  }
  SetTickEnable(t, i) {
    if (t) {
      if (this.Vrn) {
        this.Entity.GetComponent(111)?.EnableTickWithLog(this.Vrn, i);
        this.Vrn = undefined;
      }
    } else {
      this.Vrn ||= this.Entity.GetComponent(111)?.DisableTickWithLog(i);
    }
  }
  OnClear() {
    this.Krn(true);
    if (this.CreatureDataInternal) {
      this.CreatureDataInternal.Reset();
      this.CreatureDataInternal = undefined;
    }
    this.DisableActorHandle.Clear();
    this.DisableCollisionHandle.Clear();
    this.ResetAllCachedTime();
    return true;
  }
  GetSocketTransform(t) {
    return this.ActorTransform;
  }
  GetSocketLocation(t) {
    return this.ActorLocation;
  }
  GetWatchedPoint() {
    return this.ActorLocationProxy;
  }
};
BaseActorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(1)], BaseActorComponent);
exports.BaseActorComponent = BaseActorComponent; //# sourceMappingURL=BaseActorComponent.js.map