"use strict";

var VehicleActorComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var h = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        h = (s < 3 ? r(h) : s > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleActorComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const JsModelManager_1 = require("../../../../Core/Model/JsModelManager");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const CombatLog_1 = require("../../../Utils/CombatLog");
const FunctionRequestProxy_1 = require("../../Character/Common/Component/Actor/FunctionRequestProxy");
const BaseActorComponent_1 = require("../../Common/Component/BaseActorComponent");
const VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController");
const TsBaseVehicle_1 = require("../TsBaseVehicle");
let VehicleActorComponent = VehicleActorComponent_1 = class VehicleActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments);
    this.InputComp = undefined;
    this.VehicleMoveComp = undefined;
    this.ShowDebug = false;
    this.SetRotationRequestProxy = undefined;
    this.DefaultControllerInternal = undefined;
    this.LastActorRotation = Rotator_1.Rotator.Create();
    this.SimulatedVelocity = Vector_1.Vector.Create();
    this.SimulatedRotYawSpeed = 0;
    this.sFr = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.StartDitherValue = 0;
    this.V2r = Vector_1.Vector.Create(0, 0, 0);
    this.H2r = Rotator_1.Rotator.Create(0, 0, 0);
    this.j2r = Vector_1.Vector.Create(1, 0, 0);
    this.NewestInputFacingType = 0;
    this.OverrideTurnSpeed = 0;
    this.W2r = Vector_1.Vector.Create(0, 0, 0);
    this.OnActorDestroy = () => {
      if (!this.CreatureDataInternal.GetRemoveState()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()]);
        }
      }
    };
  }
  get DefaultController() {
    return this.DefaultControllerInternal;
  }
  get Actor() {
    return this.ActorInternal;
  }
  get SkeletalMesh() {
    return this.Actor.Mesh;
  }
  GetPrimitiveComponent() {
    return this.SkeletalMesh;
  }
  get InputDirectProxy() {
    return this.V2r;
  }
  get InputDirect() {
    return this.V2r.ToUeVectorOld();
  }
  get ActorVelocityProxy() {
    if (this.CachedVelocityTime < Time_1.Time.Frame) {
      this.CachedVelocityTime = Time_1.Time.Frame;
      this.W2r.DeepCopy(this.Actor.D_GetVelocity());
    }
    return this.W2r;
  }
  get ActorVelocity() {
    return this.ActorVelocityProxy.ToUeVectorOld();
  }
  get InputRotatorProxy() {
    if (this.NewestInputFacingType === 2) {
      if (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity) {
        this.H2r.Set(Math.asin(this.j2r.Z) * MathUtils_1.MathUtils.RadToDeg, MathUtils_1.MathUtils.GetAngleByVector2D(this.j2r), 0);
      } else {
        this.VehicleMoveComp.GravityDirect.Multiply(-1, VehicleActorComponent_1.TmpVector);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.j2r, VehicleActorComponent_1.TmpVector, VehicleActorComponent_1.TmpQuat);
        VehicleActorComponent_1.TmpQuat.Rotator(this.H2r);
      }
      this.NewestInputFacingType = 0;
    }
    return this.H2r;
  }
  get InputFacingProxy() {
    var t;
    var e;
    if (this.NewestInputFacingType === 1) {
      if (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity) {
        t = this.H2r.Pitch * MathUtils_1.MathUtils.DegToRad;
        this.j2r.Z = Math.sin(t);
        t = Math.cos(t);
        e = this.H2r.Yaw * MathUtils_1.MathUtils.DegToRad;
        this.j2r.X = Math.cos(e) * t;
        this.j2r.Y = Math.sin(e) * t;
      } else {
        this.H2r.Quaternion(VehicleActorComponent_1.TmpQuat);
        VehicleActorComponent_1.TmpQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.j2r);
      }
      this.NewestInputFacingType = 0;
    }
    return this.j2r;
  }
  get ActorGravityDirectProxy() {
    var t;
    if (this.CachedGravityDirectTime < Time_1.Time.Frame) {
      this.CachedGravityDirectTime = Time_1.Time.Frame;
      if (this.VehicleMoveComp) {
        this.CachedActorGravityDirect.DeepCopy(this.VehicleMoveComp.GravityDirect);
      } else if (t = this.CreatureData.GetInitGravityDirection()) {
        this.CachedActorGravityDirect.FromConfigVector(t);
      }
    }
    return this.CachedActorGravityDirect;
  }
  OnInitData(t) {
    super.OnInitData();
    this.SetRotationRequestProxy = new FunctionRequestProxy_1.FunctionRequestProxy();
    return !!this.InitCreatureData();
  }
  OnInit(t) {
    super.OnInit();
    var e = this.CreatureDataInternal.GetPbModelConfig()?.ModelId;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[SceneItemActorComponent.OnInit] 加载actor失败，无法找到modelId", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
    this.ActorInternal = this.LoadSkeletalMeshAndAnimBlueprint(e);
    if (!this.ActorInternal || !this.ActorInternal.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[VehicleActorComponent.OnInit] 加载actor失败。", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
    if (!this.ActorInternal.IsA(UE.TsBaseVehicle_C.StaticClass())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "[VehicleActorComponent.OnInit] Actor不是TsBaseVehicle", ["Name", this.ActorInternal.GetName()], ["Class", this.ActorInternal.GetClass().GetName()], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", e], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
    if (this.ActorInternal) {
      this.ActorInternal.OnDestroyed.Add(this.OnActorDestroy);
    }
    e = this.ActorInternal;
    e.VehicleActorComponent = this;
    e.SetEntityId(this.Entity.Id);
    this.InitDefaultController(this.ActorInternal);
    this.SetInputFacing(this.ActorForwardProxy);
    this.SetActorVisible(false, "[VehicleActorComponent.OnInit] 默认隐藏");
    this.SetCollisionEnable(false, "[VehicleActorComponent.OnInit] 默认关闭碰撞");
    this.SetTickEnable(false, "[VehicleActorComponent.OnInit] 默认关闭Tick");
    this.cFr();
    e.CharRenderingComponent.Init(e.RenderType);
    this.ActorInternal.SetPrimitiveBlueprintTypeName(new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId));
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      if (this.Entity.GameBudgetManagedToken !== undefined) {
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, this.ActorInternal);
      } else {
        this.Entity.RegisterToGameBudgetController(this.ActorInternal);
      }
    }
    JsModelManager_1.JsModelManager.UpdateEntityActor(this.Entity.Id, this.ActorInternal);
    return true;
  }
  OnStart() {
    return !!super.OnStart() && (this.InputComp = this.Entity.GetComponent(240), this.VehicleMoveComp = this.Entity.GetComponent(236), this.DebugMovementComp = this.Entity.GetComponent(30), true);
  }
  OnActivate() {
    super.OnActivate();
    this.LastActorRotation.DeepCopy(this.ActorRotationProxy);
    this.SetActorVisible(true, "[VehicleActorComponent.OnActivate] Visible");
    this.SetCollisionEnable(true, "[VehicleActorComponent.OnActivate] Visible");
    this.SetTickEnable(true, "[VehicleActorComponent.OnActivate] Visible");
    this.Actor.VehicleMovementComponent.InitVehicleShapes();
    ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(this.CreatureDataInternal, this.ActorInternal);
    var t = VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(this.Entity);
    this.SetAutonomous(!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!t);
  }
  OnEnd() {
    if (this.ActorInternal?.IsValid() && (this.ActorInternal.OnDestroyed.Remove(this.OnActorDestroy), this.ActorInternal instanceof TsBaseVehicle_1.default && (this.ActorInternal.DitherEffectController?.Clear(), this.ActorInternal.DitherEffectController = undefined), this.Actor.PlatformActor?.IsValid())) {
      this.Actor.PlatformActor.K2_DetachFromActor();
    }
    return super.OnEnd();
  }
  OnClear() {
    return super.OnClear();
  }
  OnDisable(t) {
    this.OnSetActorActive(false, t);
  }
  OnEnable() {
    this.OnSetActorActive(true);
    this.ResetAllCachedTime();
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(122)?.CurrentTimeScale ?? 1;
    this.ActorInternal.CustomTimeDilation = t * e;
  }
  SetMoveAutonomous(t, e = "") {
    CombatLog_1.CombatLog.Info("Control", this.Entity, "设置移动主控", [e, t]);
    super.SetMoveAutonomous(t);
    e = this.Entity.GetComponent(235);
    if (e) {
      e.MainAnimInstance?.SetStateMachineNetMode(!t);
      e.SpecialAnimInstance?.SetStateMachineNetMode(!t);
    }
  }
  LoadSkeletalMeshAndAnimBlueprint(t) {
    var e = undefined;
    this.CreatureDataInternal.SetModelConfig(t);
    var i = this.CreatureDataInternal;
    var o = i.D_GetTransform();
    var r = this.CreatureDataInternal.GetModelConfig();
    if (r) {
      if ((e = ActorUtils_1.ActorUtils.LoadActorByModelConfig(r, o))?.IsValid()) {
        ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(e.Mesh, r.网格体, r.动画蓝图);
        if (GlobalData_1.GlobalData.IsPlayInEditor && (o = this.CreatureDataInternal.GetPbDataId())) {
          e.Tags.Add(new UE.FName("PbDataId:" + o));
        }
        return e;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 7, "[VehicleActorComponent.OnInit] 缺少ModelConfig配置", ["CreatureDataId", i.GetCreatureDataId()], ["ModelId", t]);
    }
  }
  cFr() {
    var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(this.Actor.GetClass());
    var t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
    var t = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t)?.PartHitEffect.ToAssetPathName();
    let e = t !== undefined && t.length > 0 && t !== "None";
    if (e) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_PartHitEffect_C, t => {
        if (this.Actor?.IsValid() && (this.sFr = t, e = this.sFr?.IsValid() ?? false) && this.Actor) {
          this.StartHideDistance = this.sFr.StartHideDistance;
          this.CompleteHideDistance = this.sFr.CompleteHideDistance;
          this.StartDitherValue = this.sFr.StartDitherValue;
        }
      });
    }
  }
  SetInputRotator(t) {
    this.SetInputRotatorByNumber(t.Pitch, t.Yaw, t.Roll);
  }
  SetInputRotatorByNumber(t, e, i) {
    this.H2r.Pitch = t;
    this.H2r.Yaw = e;
    this.H2r.Roll = i;
    this.NewestInputFacingType = 1;
  }
  SetInputDirect(t, e = false) {
    if (MathUtils_1.MathUtils.IsValidVector(t)) {
      if (e) {
        if (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity) {
          this.V2r.DeepCopy(t);
          this.V2r.Z = 0;
        } else {
          VehicleActorComponent_1.TmpVector.DeepCopy(t);
          Vector_1.Vector.VectorPlaneProject(VehicleActorComponent_1.TmpVector, this.VehicleMoveComp.GravityDirect, this.V2r);
        }
      } else {
        this.V2r.DeepCopy(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 6, "SetInputDirect has NaN", ["x", t.X], ["y", t.Y], ["z", t.Z]);
    }
  }
  SetInputDirectByNumber(t, e, i) {
    if (MathUtils_1.MathUtils.IsValidNumbers(t, e, i)) {
      this.V2r.X = t;
      this.V2r.Y = e;
      this.V2r.Z = i;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 6, "SetInputDirect has NaN", ["x", t], ["y", e], ["z", i]);
    }
  }
  SetInputFacing(t, e = false) {
    this.j2r.DeepCopy(t);
    if (e) {
      if (!this.VehicleMoveComp || this.VehicleMoveComp.IsStandardGravity) {
        this.j2r.Z = 0;
      } else {
        Vector_1.Vector.VectorPlaneProject(this.j2r, this.VehicleMoveComp.GravityDirect, VehicleActorComponent_1.TmpVector);
        this.j2r.DeepCopy(VehicleActorComponent_1.TmpVector);
      }
    }
    if (!this.j2r.Normalize()) {
      this.j2r.DeepCopy(this.ActorForwardProxy);
    }
    this.NewestInputFacingType = 2;
  }
  SetOverrideTurnSpeed(t) {
    this.OverrideTurnSpeed = t;
  }
  ClearInput() {
    this.SetInputDirect(Vector_1.Vector.ZeroVector);
    this.SetInputFacing(this.ActorForwardProxy);
    this.SetOverrideTurnSpeed(0);
  }
  InitDefaultController(t) {
    this.DefaultControllerInternal = t.GetController();
    if (this.DefaultController) {
      if (!(this.DefaultController instanceof UE.AIController)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 57, "Character初始化的默认Controller基类为非AiController", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["DefaultController", this.DefaultController]);
        }
      }
      if (this.DefaultController instanceof UE.PlayerController) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 57, "Character初始化的默认Controller基类为PlayerController,下场的人将会导致Movement不执行", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()]);
        }
        if (this.DefaultController.Pawn === t) {
          this.DefaultController.Pawn.DetachFromControllerPendingDestroy();
        }
        this.DefaultControllerInternal = undefined;
        this.CreateDefaultController(t);
      }
    } else {
      this.CreateDefaultController(t);
    }
  }
  CreateDefaultController(t) {
    t.AIControllerClass = UE.KuroAIController.StaticClass();
    t.SpawnDefaultController();
    this.DefaultControllerInternal = t.GetController();
  }
  RestoreDefaultController() {
    if (!this.DefaultController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 57, "[VehicleActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController", ["Id", this.Entity.Id]);
      }
    }
    this.DefaultController.Possess(this.Actor);
  }
  OnTeleport() {
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
    this.LastActorRotation.DeepCopy(this.ActorRotationProxy);
  }
  SetActorLocationNoTeleport(t, e = "unknown", i = true) {
    if (!MathUtils_1.MathUtils.IsValidVector(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "SetActorLocation的value无效", ["value", t], ["CreatureDataId", this.CreatureData?.GetCreatureDataId()]);
      }
      return false;
    }
    let o = false;
    if (this.ActorInternal?.IsValid() && (this.CachedDesiredActorLocation.FromUeVector(t), this.IsChangingLocation = true, o = this.ActorInternal.D_K2_SetActorLocation(t, i, undefined, true), this.IsChangingLocation = false, this.CheckIsForbidSettingLocAndRot(true), this.DebugMovementComp)) {
      this.DebugMovementComp.MarkDebugRecord(e + ".SetActorLocation", 1);
    }
    this.ResetLocationCachedTime();
    if (this.ActorInternal?.IsValid() && ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 57, "[SetActorLocation]", ["location:", t], ["owner", this?.Owner.GetName()]);
    }
    return o;
  }
  SetActorRotation(t, e, i = false) {
    if (MathUtils_1.MathUtils.IsValidRotator(t)) {
      e = super.SetActorRotation(t, e, i);
      this.CachedActorRotation.DeepCopy(t);
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorRotation NaN");
      }
      return false;
    }
  }
  SetActorRotationWithPriority(t, e, i, o = false, r = false) {
    var s = new FunctionRequestProxy_1.FunctionRequestWithPriority();
    s.ModuleName = e;
    s.Priority = i;
    return !!this.SetRotationRequestProxy.DecideCall(s) && (this.ShowDebug && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 57, "[CharacterActorComponent.SetActorRotationWithPriority] 修改Rotation", ["EntityId", this.Entity.Id], ["module", e], ["rotation", t], ["oldRotation", this.ActorRotationProxy]), o && EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer), this.SetActorRotation(t, e, r), true);
  }
  SetActorLocationAndRotation(t, e, i, o = false, r = undefined) {
    let s = false;
    var h;
    if (MathUtils_1.MathUtils.IsValidVector(t) && MathUtils_1.MathUtils.IsValidRotator(e)) {
      s = !r || ((h = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = i, h.Priority = r, this.SetRotationRequestProxy.DecideCall(h)) ? super.SetActorLocationAndRotation(t, e, i, o) : super.SetActorLocation(t, i, o);
      this.CachedActorRotation.DeepCopy(e);
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
      this.OnTeleport();
      return s;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorLocationAndRotation NaN");
      }
      return false;
    }
  }
  SetActorTransform(t, e, i = true, o = undefined) {
    var r;
    if (o) {
      (r = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = e;
      r.Priority = o;
      if (!this.SetRotationRequestProxy.DecideCall(r)) {
        t.SetRotation(this.ActorRotation.Quaternion());
      }
    }
    return super.SetActorTransform(t, e, i);
  }
  SetActorTransformExceptMesh(t, e, i = true, o) {
    this.CachedDesiredActorLocation.FromUeVector(t.GetLocation());
    this.IsChangingLocation = true;
    t = this.Actor.SetActorTransformExceptSkelMesh(t, i, undefined, true, true);
    this.IsChangingLocation = false;
    this.CheckIsForbidSettingLocAndRot(true, true);
    if (this.DebugMovementComp) {
      this.DebugMovementComp.MarkDebugRecord(e + ".SetActorTransformExceptMesh", 1);
    }
    this.ResetTransformCachedTime();
    this.OnTeleport();
    return t;
  }
  SetActorLocationAndRotationExceptMesh(t, e, i, o = true, r) {
    this.CachedDesiredActorLocation.FromUeVector(t);
    this.IsChangingLocation = true;
    t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(t, e, o, undefined, true, true);
    this.IsChangingLocation = false;
    this.CheckIsForbidSettingLocAndRot(true, true);
    if (this.DebugMovementComp) {
      this.DebugMovementComp.MarkDebugRecord(i + ".SetActorLocationAndRotationExceptMesh", 1);
    }
    this.ResetTransformCachedTime();
    return t;
  }
  SetActorVelocity(t) {
    var e;
    if (this.Actor.RootComponent) {
      if (MathUtils_1.MathUtils.IsValidVector(t)) {
        e = t.ToUeVectorOld();
        this.Actor.RootComponent.ComponentVelocity = e;
        if (this.Actor.VehicleMovementComponent) {
          this.Actor.VehicleMovementComponent.Velocity = e;
        }
        this.W2r.DeepCopy(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Set Invalid Velocity", ["v", t]);
      }
    }
  }
  FixBornLocation(t = undefined, e = "FixBornLocation") {
    this.Entity.GetComponent(233)?.FixBornLocation(t, e);
  }
};
VehicleActorComponent.TmpVector = Vector_1.Vector.Create(0, 0, 0);
VehicleActorComponent.TmpQuat = Quat_1.Quat.Create();
VehicleActorComponent = VehicleActorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(234)], VehicleActorComponent);
exports.VehicleActorComponent = VehicleActorComponent; //# sourceMappingURL=VehicleActorComponent.js.map