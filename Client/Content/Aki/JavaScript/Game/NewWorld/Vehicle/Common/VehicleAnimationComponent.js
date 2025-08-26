"use strict";

var VehicleAnimationComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var n = arguments.length;
  var o = n < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, s, h);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (e = t[r]) {
        o = (n < 3 ? e(o) : n > 3 ? e(i, s, o) : e(i, s)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(i, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleAnimationComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AnimLogicParamsSetter_1 = require("../../Character/Common/Blueprint/Utils/AnimLogicParamsSetter");
const CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
const CharacterAnimOptimizationSetting_1 = require("../../Setting/CharacterAnimOptimizationSetting");
const FORCE_DISABLE_ANIM_OPTIMIZATION_TIME = 100;
const MIN_BUFFER_TIME_LENGTH = 10;
const MODEL_BUFFER_SMOOTH_FACTOR = 0.75;
const BLINK_MOVE_MIN_TIME = 5;
const DEFAULT_CAMERA_HEIGHT_RATE = 0.5;
let VehicleAnimationComponent = VehicleAnimationComponent_1 = class VehicleAnimationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Actor = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.PerformComp = undefined;
    this.Mesh = undefined;
    this.AnimationComp = undefined;
    this.MainAnimInstanceInternal = undefined;
    this.SpecialAnimInstanceInternal = undefined;
    this.IsPlayer = false;
    this.AnimLogicParamsSetter = undefined;
    this.d3r = -1;
    this.Wnr = Vector_1.Vector.Create();
    this.MovementNormal = Vector_1.Vector.Create();
    this.BufferModelTransform = Transform_1.Transform.Create();
    this.BufferOriginTransform = Transform_1.Transform.Create();
    this.BufferShowTransform = Transform_1.Transform.Create();
    this.BufferNowTime = 0;
    this.BufferTimeLength = 0;
    this.LastRemainBufferFrame = 0;
    this.RemainBufferTime = 0;
    this.MeshLocationOffset = Vector_1.Vector.Create();
    this.BufferLocation = false;
    this.Handle = undefined;
    this.ForceDisableAnimOptimizationSet = new Set();
    this.DefaultVisibilityBasedAnimTickOption = 3;
    this.TemporaryHiddenHandle = 0;
    this.HiddenCount = -1;
    this.CameraPositionType = 2;
    this.M3r = Vector_1.Vector.Create();
    this.TmpTransform = Transform_1.Transform.Create();
    this.TmpTransform2 = Transform_1.Transform.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.TmpDirect = Vector_1.Vector.Create();
    this.TmpDirect2 = Vector_1.Vector.Create();
    this.TmpDirect3 = Vector_1.Vector.Create();
    this.kYs = false;
    this.GYs = (t, i) => {
      if (t === this.Entity.Id && i) {
        this.StartForceDisableAnimOptimization(1);
        this.kYs = true;
      }
    };
    this.OnRequestClearMeshRotationBuffer = () => {
      this.StopModelBuffer();
    };
  }
  static get Dependencies() {
    return [235, 0];
  }
  get MainAnimInstance() {
    return this.MainAnimInstanceInternal;
  }
  get SpecialAnimInstance() {
    return this.SpecialAnimInstanceInternal;
  }
  OnInitData(t) {
    this.AnimLogicParamsSetter = new AnimLogicParamsSetter_1.AnimLogicParamsSetter();
    this.Handle = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
    return true;
  }
  OnInit() {
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.CheckGetComponent(235);
    if (this.ActorComp.Actor?.Mesh) {
      this.Actor = this.ActorComp.Actor;
      this.Mesh = this.Actor.Mesh;
      this.MoveComp = this.Entity.GetComponent(237);
      this.PerformComp = this.Entity.GetComponent(238);
      if (!Info_1.Info.EnableForceTick) {
        this.AnimationComp = this.Actor.GetComponentByClass(UE.KuroCharacterAnimationComponent.StaticClass());
        if (!this.AnimationComp?.IsValid()) {
          this.AnimationComp = this.Actor.AddComponentByClass(UE.KuroCharacterAnimationComponent.StaticClass(), false, new UE.Transform(), false);
        }
        this.AnimationComp.SetComponentTickEnabled(true);
      }
      this.GetAnimInstanceFromMesh();
      return !!this.MainAnimInstanceInternal && (this.IsPlayer = false, this.DefaultVisibilityBasedAnimTickOption = 3, this.Grn(), this.pie(), this.AddEvents(), this.Mesh.DoesSocketExist(VehicleAnimationComponent_1.CameraPosition) ? (this.CameraPositionType = 0, this.M3r.FromUeVector(this.Mesh.D_GetSocketTransform(VehicleAnimationComponent_1.CameraPosition, 1).GetLocation())) : this.Mesh.DoesSocketExist(VehicleAnimationComponent_1.SeatProp01) ? (this.CameraPositionType = 1, this.M3r.FromUeVector(this.Mesh.D_GetSocketTransform(VehicleAnimationComponent_1.SeatProp01, 1).GetLocation())) : this.CameraPositionType = 2, true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "模型仍未初始化", ["Entity", this.Entity.Id]);
      }
      return false;
    }
  }
  pie() {
    this.BufferOriginTransform.FromUeTransform(this.Mesh.D_GetRelativeTransform());
    this.BufferShowTransform.FromUeTransform(this.Mesh.D_GetRelativeTransform());
  }
  OnActivate() {
    this.StartAnimInstance();
  }
  OnTick(t) {
    if (this.kYs) {
      this.kYs = false;
      this.CancelForceDisableAnimOptimization(1);
    }
    this.ResetTemporaryHidden();
    if (this.PerformComp?.HasRoleAndCtrlByMe) {
      this.L6l();
    }
  }
  OnForceAfterTick(t) {
    this.UpdateModelBuffer(t);
  }
  OnEnd() {
    if (this.kYs) {
      this.kYs = false;
      this.CancelForceDisableAnimOptimization(1);
    }
    this.RemoveEvents();
    this.StopModelBuffer();
    return true;
  }
  OnClear() {
    return true;
  }
  OnDisable(t) {
    if (this.HiddenCount >= 0 && (this.ActorComp.EnableActor(this.TemporaryHiddenHandle), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Vehicle", 57, "Actor上场隐藏一帧 【组件Disable 隐藏结束】", ["Entity:", this.Entity.Id]);
    }
    this.HiddenCount = -1;
    if (this.MainAnimInstanceInternal?.IsValid()) {
      this.StopMontage();
      this.Handle.AddHoldEntity("VehicleAnimationComponent.OnDisable");
      TimerSystem_1.TimerSystem.Next(() => {
        if (this.Handle) {
          this.Handle.RemoveHoldEntity("VehicleAnimationComponent.OnDisable");
        }
        if (!this.Active) {
          this.MainAnimInstance?.ClearMontage();
          UE.KuroAnimLibrary.EndAnimNotifyStates(this.MainAnimInstanceInternal);
        }
      });
    }
  }
  OnEnable() {}
  GetAnimInstanceFromMesh() {
    this.Vwr();
    this.MainAnimInstanceInternal = this.Mesh.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE);
    this.MainAnimInstanceInternal ||= this.Mesh.GetAnimInstance();
    this.SpecialAnimInstanceInternal = this.Mesh.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_SPECIAL);
  }
  StartAnimInstance() {
    if (this.MainAnimInstanceInternal instanceof UE.KuroAnimInstance) {
      this.MainAnimInstanceInternal.OnComponentStart();
    }
    if (this.SpecialAnimInstanceInternal && this.SpecialAnimInstanceInternal instanceof UE.KuroAnimInstance) {
      this.SpecialAnimInstanceInternal.OnComponentStart();
    }
    this.A2r();
  }
  A2r() {
    var i = this.ActorComp.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < i.Num(); ++t) {
      var s;
      var h = i.Get(t);
      if (h instanceof UE.SkeletalMeshComponent && ((s = h.GetAnimInstance()) && s instanceof UE.KuroAnimInstance && s !== this.MainAnimInstance && s.OnComponentStart(), s = h.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)) && s instanceof UE.KuroAnimInstance && s !== this.MainAnimInstance) {
        s.OnComponentStart();
      }
    }
  }
  Vwr() {
    if (this.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复", ["Actor", this.ActorComp.Owner.GetName()], ["AnimInstance", this.Actor.Mesh.GetAnimInstance()?.GetName()]);
    }
  }
  IsMontagePlaying() {
    return this.MainAnimInstanceInternal.IsAnyMontagePlaying();
  }
  LoadAsync(t, i) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, i);
  }
  Play(t, i) {
    this.MainAnimInstanceInternal.Montage_Play(t);
    if (i) {
      this.MainAnimInstanceInternal.OnMontageEnded.Add(i);
    }
  }
  PlayOnce(t, i) {
    this.MainAnimInstanceInternal.Montage_Play(t);
    this.MainAnimInstanceInternal.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
    if (i) {
      this.MainAnimInstanceInternal.OnMontageEnded.Add(i);
    }
  }
  PlayFromLoop(t, i) {
    this.MainAnimInstanceInternal.Montage_Play(t);
    this.MainAnimInstanceInternal.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, t);
    if (i) {
      this.MainAnimInstanceInternal.OnMontageEnded.Add(i);
    }
  }
  PlayFromEnd(t, i) {
    this.MainAnimInstanceInternal.Montage_Play(t);
    this.MainAnimInstanceInternal.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
    if (i) {
      this.MainAnimInstanceInternal.OnMontageEnded.Add(i);
    }
  }
  Stop(t = false, i) {
    if (t) {
      this.MainAnimInstanceInternal.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, i);
    } else {
      this.MainAnimInstanceInternal.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, i);
    }
  }
  StopMontage(t = 0) {
    this.MainAnimInstanceInternal.Montage_Stop(t);
  }
  ForceStop(t, i) {
    this.MainAnimInstanceInternal.Montage_Stop(t ?? 0, i);
  }
  ForceStopWithBlendOut(t, i) {
    var s = this.MainAnimInstanceInternal.Montage_GetPosition(i);
    var s = i.SequenceLength - s;
    var t = t * 1000;
    if (t < s) {
      this.MainAnimInstanceInternal.Montage_SetPlayRate(i, s / t);
    }
    this.MainAnimInstanceInternal.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, i);
  }
  AddOnMontageEnded(t) {
    if (t) {
      this.MainAnimInstanceInternal?.OnMontageEnded.Add(t);
    }
  }
  RemoveOnMontageEnded(t) {
    if (t) {
      this.MainAnimInstanceInternal?.OnMontageEnded.Remove(t);
    }
  }
  ClearOnMontageEnded() {
    if (this.MainAnimInstanceInternal?.OnMontageEnded) {
      this.MainAnimInstanceInternal?.OnMontageEnded.Clear();
    }
  }
  GetCurrentSection() {
    return this.MainAnimInstanceInternal.Montage_GetCurrentSection();
  }
  PlayMontageById(t, i) {
    let s = undefined;
    return !!(s = t.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(t.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(t.MontageId)) && this.LoadAsync(s.ActionMontage, i) !== ResourceSystem_1.ResourceSystem.InvalidId;
  }
  GetAnimDefaultTickOption() {
    return this.DefaultVisibilityBasedAnimTickOption;
  }
  ChangeAnimDefaultTickOption(t) {
    if (this.DefaultVisibilityBasedAnimTickOption !== t) {
      this.DefaultVisibilityBasedAnimTickOption = t;
      this.RefreshAnimOptimization();
    }
  }
  StartForceDisableAnimOptimization(t, i = true) {
    if (this.ForceDisableAnimOptimizationSet.has(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 35, "动画优化强制关闭-重复", ["reason", t]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 35, "动画优化强制关闭-开始", ["reason", t]);
      }
      this.ForceDisableAnimOptimizationSet.add(t);
      this.RefreshAnimOptimization();
      if (i) {
        TimerSystem_1.TimerSystem.Delay(() => {
          this.CancelForceDisableAnimOptimization(t);
        }, FORCE_DISABLE_ANIM_OPTIMIZATION_TIME);
      }
      return true;
    }
  }
  StartForceDisableAnimOptimization2(t) {
    return !this.ForceDisableAnimOptimizationSet.has(t) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 35, "动画优化强制关闭-开始", ["reason", t]), this.ForceDisableAnimOptimizationSet.add(t), this.RefreshAnimOptimization(), true);
  }
  CancelForceDisableAnimOptimization(t) {
    if (this.ForceDisableAnimOptimizationSet.delete(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 35, "动画优化强制关闭-结束", ["reason", t]);
      }
      this.RefreshAnimOptimization();
    }
  }
  RefreshAnimOptimization() {
    var i = this.Entity.GetComponent(176)?.IsInFighting ?? false;
    var s = this.ForceDisableAnimOptimizationSet.size > 0;
    var h = s || i;
    var e = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < e.Num(); t++) {
      var n = e.Get(t);
      n.bEnableUpdateRateOptimizations = !h;
      n.VisibilityBasedAnimTickOption = this.RefreshVisibilityBasedAnimTickOption(s, i);
    }
  }
  RefreshVisibilityBasedAnimTickOption(t, i) {
    let s = this.DefaultVisibilityBasedAnimTickOption;
    if (t || i) {
      if (i) {
        return 0;
      }
      for (const h of this.ForceDisableAnimOptimizationSet) {
        s = Math.min(s, CharacterAnimOptimizationSetting_1.DisableAnimOptimizationTypeDefines[h]);
      }
    }
    return s;
  }
  Grn(t = true) {
    var i = Info_1.Info.IsMobilePlatform();
    var s = new UE.AnimUpdateRateParameters();
    var h = this.Mesh.LODInfo.Num();
    if (t) {
      s.bShouldUseDistanceMap = true;
      s.BaseVisibleDistanceThresholds.Empty();
      s.BaseVisibleDistanceThresholds.Add(i ? 200 : 800);
      s.BaseVisibleDistanceThresholds.Add(i ? 700 : 2000);
      s.BaseVisibleDistanceThresholds.Add(i ? 1500 : 4000);
      s.BaseVisibleDistanceThresholds.Add(i ? 2500 : 5000);
      s.BaseVisibleDistanceThresholds.Add(i ? 3500 : 8000);
    } else {
      s.bShouldUseLodMap = true;
      s.LODToFrameSkipMap.Empty();
      for (let t = 0; t < h; t++) {
        s.LODToFrameSkipMap.Add(t, t < 2 ? 0 : t - 1);
      }
    }
    s.BaseNonRenderedUpdateRate = 8;
    s.MaxEvalRateForInterpolation = 8;
    var e = (0, puerts_1.$ref)(s);
    var n = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < n.Num(); t++) {
      var o = n.Get(t);
      o.bEnableUpdateRateOptimizations = true;
      o.SetAnimUpdateRateParameters(e);
      o.VisibilityBasedAnimTickOption = this.DefaultVisibilityBasedAnimTickOption;
    }
    (0, puerts_1.$unref)(e);
  }
  ResetTemporaryHidden() {
    if (this.HiddenCount > 0) {
      this.HiddenCount--;
    } else if (this.HiddenCount === 0) {
      this.ActorComp.EnableActor(this.TemporaryHiddenHandle);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 57, "Actor上场隐藏一帧 【隐藏结束】", ["Entity:", this.Entity.Id]);
      }
      this.TemporaryHiddenHandle = undefined;
      this.ActorComp.Actor.Mesh.VisibilityBasedAnimTickOption = this.DefaultVisibilityBasedAnimTickOption;
      this.HiddenCount = -1;
    }
  }
  AddModelQuat(t, i) {
    var s;
    if (Info_1.Info.EnableForceTick) {
      s = this.BufferShowTransform.GetRotation();
      t.Multiply(s, this.TmpQuat);
      this.BufferShowTransform.SetRotation(this.TmpQuat);
      if (i) {
        t.RotateVector(this.BufferShowTransform.GetLocation(), this.TmpDirect);
        this.BufferShowTransform.SetLocation(this.TmpDirect);
      }
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.AnimationComp.AddModelQuat(t.ToUeQuat(), i);
    }
  }
  AddModelLocation(t) {
    if (Info_1.Info.EnableForceTick) {
      this.MeshLocationOffset.AdditionEqual(t);
      t.Addition(this.BufferShowTransform.GetLocation(), this.TmpDirect);
      this.BufferShowTransform.SetLocation(this.TmpDirect);
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.AnimationComp.AddModelLocation(t.ToUeVectorOld());
    }
  }
  ResetModelQuat() {
    if (Info_1.Info.EnableForceTick) {
      this.MeshLocationOffset.Addition(this.BufferOriginTransform.GetLocation(), this.TmpDirect);
      this.BufferShowTransform.SetLocation(this.TmpDirect);
      this.BufferShowTransform.SetRotation(this.BufferOriginTransform.GetRotation());
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.AnimationComp.ResetModelQuat();
    }
  }
  ResetModelLocation() {
    if (Info_1.Info.EnableForceTick) {
      this.MeshLocationOffset.Reset();
      this.BufferShowTransform.SetLocation(this.BufferOriginTransform.GetLocation());
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.AnimationComp.ResetModelLocation();
    }
  }
  G3r(t, i, s) {
    if (Info_1.Info.EnableForceTick) {
      this.TmpDirect.FromUeVector(t.GetLocation());
      this.TmpDirect.SubtractionEqual(i.ActorLocationProxy);
      s.SetLocation(this.TmpDirect);
      this.TmpDirect.FromUeVector(t.GetScale3D());
      this.TmpDirect.SubtractionEqual(i.ActorScaleProxy);
      s.SetScale3D(this.TmpDirect);
      this.TmpQuat.FromUeQuat(t.GetRotation());
      i.ActorQuatProxy.Inverse(this.TmpQuat2);
      this.TmpQuat2.Multiply(this.TmpQuat, this.TmpQuat);
      s.SetRotation(this.TmpQuat);
    } else {
      this.AnimationComp.D_GetTransformOffsetInWorld(t, i.ActorTransform);
      s.SetLocation(this.BufferShowTransform.GetLocation());
      s.SetRotation(this.BufferShowTransform.GetRotation());
      s.SetScale3D(this.BufferShowTransform.GetScale3D());
    }
  }
  SetTransformWithModelBuffer(t, i, s = undefined) {
    if (i < MIN_BUFFER_TIME_LENGTH) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
      }
      this.ActorComp.SetActorTransform(t, "移动表现优化，Mesh缓动.没有缓动", true, s);
      this.StopModelBuffer();
    } else {
      if (Info_1.Info.EnableForceTick) {
        this.BufferNowTime = 0;
        this.BufferTimeLength = i;
      } else {
        this.AnimationComp.BufferNowTime = 0;
        this.AnimationComp.BufferTimeLength = i / 1000;
        this.AnimationComp?.SetComponentTickEnabled(true);
      }
      i = this.Mesh.D_K2_GetComponentToWorld();
      this.ActorComp.SetActorTransformExceptMesh(t, "移动表现优化，Mesh缓动", true, s);
      this.G3r(i, this.ActorComp, this.BufferModelTransform);
      this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
    }
  }
  SetLocationAndRotatorWithModelBuffer(t, i, s, h, e = 2) {
    if (s < MIN_BUFFER_TIME_LENGTH) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", s]);
      }
      this.ActorComp.SetActorLocationAndRotation(t, i, "移动表现优化，Mesh缓动.没有缓动", true, e);
      this.StopModelBuffer();
    } else {
      if (Info_1.Info.EnableForceTick) {
        this.BufferNowTime = 0;
        this.BufferTimeLength = s;
      } else {
        this.AnimationComp.BufferNowTime = 0;
        this.AnimationComp.BufferTimeLength = s / 1000;
        this.AnimationComp?.SetComponentTickEnabled(true);
      }
      s = this.Mesh.D_K2_GetComponentToWorld();
      this.ActorComp.SetActorLocationAndRotationExceptMesh(t, i, "移动表现优化，Mesh缓动", true, e);
      this.G3r(s, this.ActorComp, this.BufferModelTransform);
      this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
    }
  }
  SetLocationAndRotatorWithKeepingModelBuffer(t, i, s, h, e = 2) {
    if (Info_1.Info.EnableForceTick) {
      this.BufferNowTime = 0;
      this.BufferTimeLength = s;
    } else {
      this.RemainBufferTime = this.AnimationComp.BufferTimeLength - this.AnimationComp.BufferNowTime;
      this.LastRemainBufferFrame = Time_1.Time.Frame;
      this.BufferNowTime = 0;
      this.BufferTimeLength = s / 1000;
      if (this.RemainBufferTime > 0) {
        this.BufferTimeLength += this.RemainBufferTime;
      }
    }
    if (this.BufferTimeLength * 1000 < MIN_BUFFER_TIME_LENGTH || this.BufferTimeLength > BLINK_MOVE_MIN_TIME) {
      if (this.HasModelBuffer()) {
        this.StopModelBuffer();
      }
      if (this.BufferTimeLength > BLINK_MOVE_MIN_TIME) {
        this.ActorComp.SetActorLocation(t, h, false);
      } else {
        this.ActorComp.SetActorLocationNoTeleport(t, h, false);
      }
      this.ActorComp.SetActorRotation(i, h, true);
    } else {
      s = this.Mesh.D_K2_GetComponentToWorld();
      this.ActorComp.SetActorLocationAndRotationExceptMesh(t, i, h, false, e);
      this.AnimationComp.BufferNowTime = 0;
      this.AnimationComp.BufferTimeLength = this.BufferTimeLength;
      this.AnimationComp.SetComponentTickEnabled(true);
      this.G3r(s, this.ActorComp, this.BufferModelTransform);
      this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
    }
  }
  SetModelBuffer(t, i) {
    if (i < MIN_BUFFER_TIME_LENGTH) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
      }
      this.StopModelBuffer();
    } else {
      if (Info_1.Info.EnableForceTick) {
        this.BufferNowTime = 0;
        this.BufferTimeLength = i;
      } else {
        if (this.LastRemainBufferFrame !== Time_1.Time.Frame) {
          this.RemainBufferTime = this.AnimationComp.BufferTimeLength - this.AnimationComp.BufferNowTime;
          this.LastRemainBufferFrame = Time_1.Time.Frame;
        }
        this.AnimationComp.BufferNowTime = 0;
        this.AnimationComp.BufferTimeLength = i / 1000;
        if (this.RemainBufferTime > 0) {
          this.AnimationComp.BufferTimeLength += this.RemainBufferTime * MODEL_BUFFER_SMOOTH_FACTOR;
        }
        this.AnimationComp?.SetComponentTickEnabled(true);
      }
      this.Mesh.D_K2_SetWorldTransform(t, false, undefined, true);
      this.Mesh.KuroRefreshCacheLocalTransform();
      this.G3r(t, this.ActorComp, this.BufferModelTransform);
      this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
    }
  }
  UpdateModelBuffer(t) {
    if (!(this.BufferNowTime < this.BufferTimeLength) || !(this.BufferNowTime = Math.min(this.BufferNowTime + t, this.BufferTimeLength), this.TmpTransform.FromUeTransform(this.ActorComp.ActorTransform), this.BufferShowTransform.ComposeTransforms(this.TmpTransform, this.TmpTransform2), t = this.BufferNowTime / this.BufferTimeLength, this.ActorComp.ActorLocationProxy.Addition(this.BufferModelTransform.GetLocation(), this.TmpDirect), Vector_1.Vector.Lerp(this.TmpDirect, this.TmpTransform2.GetLocation(), t, this.TmpDirect2), this.TmpTransform.SetLocation(this.TmpDirect2), this.ActorComp.ActorScaleProxy.Addition(this.BufferModelTransform.GetScale3D(), this.TmpDirect), Vector_1.Vector.Lerp(this.TmpDirect, this.TmpTransform2.GetScale3D(), t, this.TmpDirect2), this.TmpTransform.SetScale3D(this.TmpDirect2), this.ActorComp.ActorQuatProxy.Multiply(this.BufferModelTransform.GetRotation(), this.TmpQuat), Quat_1.Quat.Slerp(this.TmpQuat, this.TmpTransform2.GetRotation(), t, this.TmpQuat2), this.TmpTransform.SetRotation(this.TmpQuat2), this.Mesh.D_K2_SetWorldTransform(this.TmpTransform.ToUeTransform(), false, undefined, false), !(this.BufferNowTime >= this.BufferTimeLength - MathUtils_1.MathUtils.KindaSmallNumber))) {
      this.BufferTimeLength = 0;
      this.BufferLocation = false;
    }
  }
  StopModelBuffer() {
    if (Info_1.Info.EnableForceTick) {
      if (this.BufferTimeLength > 0) {
        this.BufferTimeLength = 0;
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.AnimationComp?.StopModelBuffer();
      this.AnimationComp?.SetComponentTickEnabled(false);
    }
  }
  HasModelBuffer() {
    if (Info_1.Info.EnableForceTick) {
      return this.BufferTimeLength > 0;
    } else {
      return this.AnimationComp.BufferTimeLength > 0;
    }
  }
  HasLocationModelBuffer() {
    return this.HasModelBuffer() && this.BufferLocation;
  }
  ClearModelBuffer() {
    if (Info_1.Info.EnableForceTick) {
      if (this.BufferTimeLength > 0) {
        this.BufferTimeLength = 0;
      }
    } else if (this.AnimationComp.BufferTimeLength > 0) {
      this.AnimationComp.BufferTimeLength = 0;
      this.AnimationComp?.SetComponentTickEnabled(false);
    }
  }
  GetMeshTransform() {
    return this.Actor.Mesh.D_K2_GetComponentToWorld();
  }
  AddEvents() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer, this.OnRequestClearMeshRotationBuffer);
    EventSystem_1.EventSystem.AddWithTarget(this.Handle, EventDefine_1.EEventName.OnSetActorHidden, this.GYs);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer, this.OnRequestClearMeshRotationBuffer);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Handle, EventDefine_1.EEventName.OnSetActorHidden, this.GYs);
  }
  ConsumeRootMotion() {
    this.Mesh?.GetAnimInstance()?.ConsumeExtractedRootMotion(1);
    var i = this.Mesh?.LinkedInstances;
    if (i) {
      for (let t = 0; t < i.Num(); ++t) {
        i.Get(t).ConsumeExtractedRootMotion(1);
      }
    }
  }
  L6l() {
    var t;
    if (this.MoveComp.VehicleMovement.MovementMode !== 2) {
      this.MovementNormal.FromUeVector(this.MoveComp.GravityUp);
    } else {
      t = this.ActorComp.ActorLocationProxy;
      if (Time_1.Time.Frame - this.d3r != 1) {
        this.d3r = Time_1.Time.Frame;
        this.Wnr.FromUeVector(t);
        this.MovementNormal.FromUeVector(this.MoveComp.GravityUp);
      } else {
        t.Subtraction(this.Wnr, this.TmpDirect);
        if (this.TmpDirect.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) {
          this.MovementNormal.FromUeVector(this.MoveComp.GravityUp);
        } else {
          this.MoveComp.GravityUp.CrossProduct(this.TmpDirect, this.TmpDirect2);
          this.TmpDirect.CrossProduct(this.TmpDirect2, this.TmpDirect3);
          this.TmpDirect3.Normalize();
          this.MovementNormal.FromUeVector(this.TmpDirect3);
        }
        this.d3r = Time_1.Time.Frame;
        this.Wnr.FromUeVector(t);
      }
    }
  }
  GetCameraPosition(t) {
    switch (this.CameraPositionType) {
      case 0:
      case 1:
        (this.HasModelBuffer() ? (this.TmpQuat.DeepCopy(this.Mesh.D_K2_GetComponentToWorld().GetRotation()), this.BufferShowTransform.GetRotation().Inverse(this.TmpQuat2), this.TmpQuat2.Multiply(this.TmpQuat, this.TmpQuat), this.TmpQuat) : this.ActorComp.ActorQuatProxy).RotateVector(this.M3r, this.TmpDirect);
        this.ActorComp.ActorLocationProxy.Addition(this.TmpDirect, t);
        break;
      default:
        this.ActorComp.ActorUpProxy.Multiply(DEFAULT_CAMERA_HEIGHT_RATE * this.ActorComp.Actor.VehicleMovementComponent.VehicleShapeBounds.BoxExtent.Z, this.TmpDirect);
        this.ActorComp.ActorLocationProxy.Addition(this.TmpDirect, t);
    }
  }
};
VehicleAnimationComponent.CameraPosition = new UE.FName("CameraPosition");
VehicleAnimationComponent.SeatProp01 = new UE.FName("SeatProp01");
VehicleAnimationComponent = VehicleAnimationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(236)], VehicleAnimationComponent);
exports.VehicleAnimationComponent = VehicleAnimationComponent; //# sourceMappingURL=VehicleAnimationComponent.js.map