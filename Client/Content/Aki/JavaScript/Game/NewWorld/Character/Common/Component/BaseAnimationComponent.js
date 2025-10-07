"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var a;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (a = t[n]) {
        h = (r < 3 ? a(h) : r > 3 ? a(e, i, h) : a(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAnimationComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const CharacterAnimOptimizationSetting_1 = require("../../../Setting/CharacterAnimOptimizationSetting");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const MontageManager_1 = require("./Anim/MontageManager");
const SPLIT_LINE = -90;
const FORCE_DISABLE_ANIM_OPTIMIZATION_TIME = 100;
const animAssetsSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset));
const RUN_F = "Run_F";
const RUN_POSE_F = "Run_Pose_F";
const WALK_F = "Walk_F";
const WALK_POSE_F = "Walk_Pose_F";
const xAngleLimits = [MathUtils_1.MathUtils.DegToRad * -31, MathUtils_1.MathUtils.DegToRad * 31];
const yAngleLimits = [MathUtils_1.MathUtils.DegToRad * -18, MathUtils_1.MathUtils.DegToRad * 31];
let BaseAnimationComponent = class BaseAnimationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Actor = undefined;
    this.Mesh = undefined;
    this.ActorComp = undefined;
    this.SightTargetItemId = 0;
    this.SightTargetPoint = undefined;
    this.EnableSightDirectInternal = false;
    this.DisableBlink = false;
    this.R2r = [...xAngleLimits];
    this.U2r = [...yAngleLimits];
    this.SightDirect = Vector_1.Vector.Create();
    this.LookAtBlendSpaceVector2D = Vector2D_1.Vector2D.Create();
    this.EnableBlendSpaceLookAtInner = false;
    this.SightDirect2 = Vector_1.Vector.Create();
    this.SightDirectIsEqual = true;
    this.MainAnimInstanceInternal = undefined;
    this.SpecialAnimInstanceInternal = undefined;
    this.IsPlayer = false;
    this.ForceDisableAnimOptimizationSet = new Set();
    this.DefaultVisibilityBasedAnimTickOption = 3;
    this.MontageManager = new MontageManager_1.MontageManager();
    this.NoUpdateMeshes = undefined;
    this.CurMontageTimerHandle = undefined;
  }
  static get Dependencies() {
    return [2, 0];
  }
  get EnableSightDirect() {
    return this.EnableSightDirectInternal;
  }
  set EnableSightDirect(t) {
    if (this.EnableSightDirectInternal !== t && !(this.EnableSightDirectInternal = t)) {
      this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
      this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
      this.SightDirectIsEqual = true;
    }
  }
  get EnableBlendSpaceLookAt() {
    return this.EnableBlendSpaceLookAtInner;
  }
  get MainAnimInstance() {
    return this.MainAnimInstanceInternal;
  }
  get SpecialAnimInstance() {
    return this.SpecialAnimInstanceInternal;
  }
  OnInit() {
    this.R2r = [...xAngleLimits];
    this.U2r = [...yAngleLimits];
    this.MontageManager.Init(this);
    return true;
  }
  OnClear() {
    this.MontageManager.Clear();
    this.NoUpdateMeshes?.clear();
    return true;
  }
  SetSightLimit(t, e) {
    this.R2r = [t[0] * MathUtils_1.MathUtils.DegToRad, t[1] * MathUtils_1.MathUtils.DegToRad];
    this.U2r = [e[0] * MathUtils_1.MathUtils.DegToRad, e[1] * MathUtils_1.MathUtils.DegToRad];
  }
  ResetSightLimit() {
    this.R2r = [...xAngleLimits];
    this.U2r = [...yAngleLimits];
  }
  SetSightTargetItem(t) {
    this.SightTargetPoint = undefined;
    this.SightTargetItemId = t ? t.Entity.Id : 0;
  }
  GetSightTargetItem() {
    var t;
    if (this.SightTargetItemId) {
      if (!(t = EntitySystem_1.EntitySystem.GetComponent(this.SightTargetItemId, 1))) {
        this.SightTargetItemId = 0;
      }
      return t;
    }
  }
  SetSightTargetPoint(t) {
    this.SightTargetItemId = 0;
    this.SightTargetPoint = t;
  }
  GetSightTargetPoint() {
    return this.SightTargetPoint;
  }
  GetSightDirect() {
    return this.SightDirect.ToUeVectorOld();
  }
  GetTsSightDirect() {
    return this.SightDirect;
  }
  GetTsLookAt() {
    return this.LookAtBlendSpaceVector2D;
  }
  GetMontageResPathByName(t) {
    if (!t || t.includes("/")) {
      return t;
    } else if (this.ActorComp.ModelResPath && this.ActorComp.ModelResPath.length > 0) {
      return `${this.ActorComp.ModelResPath}/${t}.${t}`;
    } else {
      return undefined;
    }
  }
  CheckNpcAnimationAssets() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.ActorComp?.Valid && this.Mesh.AnimationMode !== 1 && this.ActorComp.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      var t = this.MainAnimInstance;
      if (t?.IsValid()) {
        (0, puerts_1.$unref)(animAssetsSetRef).Empty();
        UE.KuroStaticLibrary.GetAnimAssetsByAnimInstance(t, animAssetsSetRef);
        var e = (0, puerts_1.$unref)(animAssetsSetRef);
        if (e.Num() !== 0) {
          for (let t = 0; t < e.Num(); ++t) {
            var i;
            var s = e.Get(t);
            if (s.IsA(UE.AnimSequence.StaticClass()) && ((i = (s = s).GetName()).includes(RUN_F) || i.includes(RUN_POSE_F) || i.includes(WALK_F) || i.includes(WALK_POSE_F)) && s.bEnableRootMotion && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Pawn", 29, "Npc移动相关动画资源错误使用了RootMotion", ["AssetName", this.ActorComp.Actor.GetName()], ["AnimName", i]);
            }
          }
        }
      }
    }
  }
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
  ClampSightDirect(t, e) {
    var i = t.Z / t.Size();
    var s = MathUtils_1.MathUtils.Clamp(Math.asin(i), this.U2r[0], this.U2r[1]);
    var i = Math.sin(s);
    var s = Math.cos(s);
    var a = t.Y;
    var t = -t.X;
    var r = Math.abs(a) > MathUtils_1.MathUtils.KindaSmallNumber || Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber ? MathUtils_1.MathUtils.Clamp(Math.atan2(t, a), this.R2r[0], this.R2r[1]) : 0;
    var a = Math.cos(r) * s;
    var t = Math.sin(r) * s;
    e.X = -t;
    e.Y = a;
    e.Z = i;
  }
  A2r() {
    var e = this.ActorComp.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < e.Num(); ++t) {
      var i;
      var s = e.Get(t);
      if (s instanceof UE.SkeletalMeshComponent && ((i = s.GetAnimInstance()) && i instanceof UE.KuroAnimInstance && i !== this.MainAnimInstance && i.OnComponentStart(), i = s.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)) && i instanceof UE.KuroAnimInstance && i !== this.MainAnimInstance) {
        i.OnComponentStart();
      }
    }
  }
  Vwr() {
    if (this.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复", ["Actor", this.ActorComp.Owner.GetName()], ["AnimInstance", this.Actor.Mesh.GetAnimInstance()?.GetName()]);
    }
  }
  static LerpDirect2dByMaxAngle(t, e, i, s) {
    let a = MathUtils_1.MathUtils.GetAngleByVector2D(t);
    if (a < SPLIT_LINE) {
      a += 360;
    }
    let r = MathUtils_1.MathUtils.GetAngleByVector2D(e);
    if (r < SPLIT_LINE) {
      r += 360;
    }
    t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg;
    e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg;
    let h = r - a;
    let n = e - t;
    e = Math.sqrt(h * h + n * n);
    if (i < e) {
      h *= i / e;
      n *= i / e;
    }
    i = a + h;
    e = (t + n) * MathUtils_1.MathUtils.DegToRad;
    s.Z = Math.sin(e);
    t = Math.cos(e);
    s.X = Math.cos(i * MathUtils_1.MathUtils.DegToRad) * t;
    s.Y = Math.sin(i * MathUtils_1.MathUtils.DegToRad) * t;
  }
  static LerpVector2dByAlpha(t, e, i, s) {
    let a = MathUtils_1.MathUtils.GetAngleByVector2D(t);
    if (a < SPLIT_LINE) {
      a += 360;
    }
    let r = MathUtils_1.MathUtils.GetAngleByVector2D(e);
    if (r < SPLIT_LINE) {
      r += 360;
    }
    var t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg;
    var e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg;
    var h = r - a;
    var e = e - t;
    h *= i;
    e *= i;
    var i = a + h;
    var h = (t + e) * MathUtils_1.MathUtils.DegToRad;
    s.Z = Math.sin(h);
    var t = Math.cos(h);
    s.X = Math.cos(i * MathUtils_1.MathUtils.DegToRad) * t;
    s.Y = Math.sin(i * MathUtils_1.MathUtils.DegToRad) * t;
  }
  InitBaseInfo() {}
  GetAnimDefaultTickOption() {
    return this.DefaultVisibilityBasedAnimTickOption;
  }
  StartForceDisableAnimOptimization(t, e = true) {
    if (this.ForceDisableAnimOptimizationSet.has(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 35, "动画优化强制关闭-重复", ["reason", t]);
      }
      return false;
    } else {
      this.ForceDisableAnimOptimizationSet.add(t);
      this.RefreshAnimOptimization();
      if (e) {
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
      this.RefreshAnimOptimization();
    }
  }
  RefreshAnimOptimization() {
    var t = this.Entity.GetComponent(176)?.IsInFighting ?? false;
    var e = this.ForceDisableAnimOptimizationSet.size > 0;
    var i = e || t;
    var s = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    var a = this.RefreshVisibilityBasedAnimTickOption(e, t);
    for (let t = 0; t < s.Num(); t++) {
      var r = s.Get(t);
      r.bEnableUpdateRateOptimizations = !i;
      if (this.NoUpdateMeshes?.has(r)) {
        r.VisibilityBasedAnimTickOption = 3;
      } else {
        r.VisibilityBasedAnimTickOption = a;
      }
    }
  }
  SetNoUpdateMeshes(t) {
    if (this.NoUpdateMeshes) {
      this.NoUpdateMeshes.clear();
    } else {
      this.NoUpdateMeshes = new Set();
    }
    for (const e of t) {
      this.NoUpdateMeshes.add(e);
    }
    this.RefreshAnimOptimization();
  }
  RefreshVisibilityBasedAnimTickOption(t, e) {
    let i = this.DefaultVisibilityBasedAnimTickOption;
    if (t || e) {
      if (e) {
        return 0;
      }
      for (const s of this.ForceDisableAnimOptimizationSet) {
        i = Math.min(i, CharacterAnimOptimizationSetting_1.DisableAnimOptimizationTypeDefines[s]);
      }
    }
    return i;
  }
  UpdateLoopState(s, t) {
    if (t !== undefined) {
      let e = false;
      let i = false;
      for (let t = 0; t < s.CompositeSections.Num(); t++) {
        var a = s.CompositeSections.Get(t);
        if (a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION)) {
          e = true;
          break;
        }
        if (a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME)) {
          i = true;
          break;
        }
      }
      if (t) {
        if (e) {
          this.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, s);
        } else if (i) {
          this.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, s);
        }
      } else if (e) {
        this.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, s);
      } else if (i) {
        this.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION, s);
      }
    }
  }
  StopMontageForLoopState(t, e = true) {
    var i = t.CompositeSections;
    var s = i.Num();
    let a = false;
    for (let t = 0; t < s; t++) {
      if (i.Get(t).SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
        a = true;
        break;
      }
    }
    if (a) {
      if (!this.MainAnimInstance.Montage_GetCurrentSection().op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
        this.MainAnimInstance.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
      }
    } else if (e) {
      this.MainAnimInstance.Montage_Stop(0.5, t);
    } else {
      this.UpdateLoopState(t, false);
    }
  }
  OnTick(t) {
    this.MontageManager.OnTick(t);
  }
};
BaseAnimationComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(44)], BaseAnimationComponent);
exports.BaseAnimationComponent = BaseAnimationComponent; //# sourceMappingURL=BaseAnimationComponent.js.map