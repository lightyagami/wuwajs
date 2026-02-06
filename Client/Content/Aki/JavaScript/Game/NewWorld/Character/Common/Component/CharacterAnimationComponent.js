"use strict";

var CharacterAnimationComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var r = arguments.length;
  var o = r < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, s, h);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (e = t[a]) {
        o = (r < 3 ? e(o) : r > 3 ? e(i, s, o) : e(i, s)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(i, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAnimationComponent = exports.SightCameraData = exports.MIN_BUFFER_TIME_LENGTH = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const PerformanceConditionByIdWithZero_1 = require("../../../../../Core/Define/ConfigQuery/PerformanceConditionByIdWithZero");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TickProcessSystem_1 = require("../../../../../Core/Tick/TickProcessSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AnimController_1 = require("../../../../Module/Anim/AnimController");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants");
const AnimLogicParamsSetter_1 = require("../Blueprint/Utils/AnimLogicParamsSetter");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const BaseAnimationComponent_1 = require("./BaseAnimationComponent");
const RotateBonesToTargetManager_1 = require("./MeshHelper/RotateBonesToTargetManager");
const CreatureModel_1 = require("../../../../World/Model/CreatureModel");
const PERFORMANCE_COUNT = 3;
const ROTATABLE_THREADHOLD = 0.5;
const MIN_SCLOPE_SCALE = 0.5;
const MAX_SCLOPE_SCALE = 1;
const CAMERA_INFEED_ME = 0.3;
const TURN_SPEED = 0.36;
const TURN_RATIO = 0.04;
const WATCH_CAMERA_TIME = 1000;
const WATCH_CAMERA_TIME_2 = 3000;
const HEAD_INTERP_SPEED = 5;
const FIND_SIGHT_TARGET_ITEM_PERIOD = 1000;
const SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD = 2000;
const SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD = SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD * SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD;
const SIGHT_LOCK_YAW_MIN = -23;
const SIGHT_LOCK_YAW_MAX = 23;
const SIGHT_LOCK_PITCH_MIN = -10;
const SIGHT_LOCK_PITCH_MAX = 13;
const SIGHT_LOCK_ASSIT_LIMIT = 5;
const sightDirectInSightBone = new UE.Vector(0.3, -1, 0);
const upAxisInSightBone = new UE.Vector(1, 0.3, 0);
exports.MIN_BUFFER_TIME_LENGTH = 10;
const MAX_BUFFER_TIME_LENGTH = 60000;
const BATLLE_IDLE_TIME = 5000;
const REFRESH_PERFORMANCE_PERIOD = 5000;
const REFRESH_PERFORMANCE_PERIOD_NOT_MOVE = 5000;
const priorityToMaxSquareDistance = [[5, 250000], [10, 1000000], [20, 4000000]];
const WALK_RUN_MIX_LERP = 0.995;
const DEFAULT_CAMERA_HEIGHT_RATE = 1 / 3;
const MODEL_BUFFER_SMOOTH_FACTOR = 0.75;
const limitBlendSpaceY = [-30, 30];
const limitBlendSpaceX = [-90, 90];
const PROFILE_KEY = "CharacterAnimationComponent_Performance";
class PerformanceConditionParams {
  constructor(t, i) {
    this.AnimComp = t;
    this.Config = i;
    this.DisableTagIds = new Array();
    for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
      this.DisableTagIds.push(new Set());
      for (const h of i.DisableTags[t].ArrayString) {
        var s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(h);
        if (s) {
          this.DisableTagIds[t].add(s);
        }
      }
    }
  }
}
class SightCameraData {
  constructor() {
    this.SightMinDistance = -1;
    this.SightMaxDistance = -1;
    this.SightHorizontalAngleL = 0;
    this.SightHorizontalAngleR = 0;
    this.SightVerticalAngleT = 0;
    this.SightVerticalAngleB = 0;
  }
}
exports.SightCameraData = SightCameraData;
let CharacterAnimationComponent = CharacterAnimationComponent_1 = class CharacterAnimationComponent extends BaseAnimationComponent_1.BaseAnimationComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.Gce = undefined;
    this.bre = undefined;
    this.Lie = undefined;
    this.zFr = undefined;
    this.$zo = undefined;
    this.ph_ = undefined;
    this.uwl = undefined;
    this.ZFr = undefined;
    this.e3r = -0;
    this.SlopeStepPeriodicCurve = undefined;
    this.SlopeStepSizeCurve = undefined;
    this.t3r = 0;
    this.i3r = 0;
    this.o3r = Vector_1.Vector.Create();
    this.r3r = 0;
    this.n3r = Vector_1.Vector.Create();
    this.s3r = undefined;
    this.iym = undefined;
    this.EMf = false;
    this.EnableLowerBlend = false;
    this.EnableLeftArmBlend = false;
    this.EnableRightArmBlend = false;
    this.Z_e = Transform_1.Transform.Create();
    this.a3r = Transform_1.Transform.Create();
    this.az = Quat_1.Quat.Create();
    this.KJ = Quat_1.Quat.Create();
    this.dSu = Vector_1.Vector.Create();
    this.mSu = Vector_1.Vector.Create();
    this.h3r = Vector_1.Vector.Create();
    this.l3r = Vector_1.Vector.Create();
    this._3r = Vector_1.Vector.Create();
    this.u3r = -0;
    this.BufferModelTransform = Transform_1.Transform.Create();
    this.BufferOriginTransform = Transform_1.Transform.Create();
    this.BufferShowTransform = Transform_1.Transform.Create();
    this.BufferNowTime = 0;
    this.BufferTimeLength = 0;
    this.LastRemainBufferFrame = 0;
    this.RemainBufferTime = 0;
    this.BufferNowScale = 1;
    this.c3r = false;
    this.BufferLocation = false;
    this.Wnr = Vector_1.Vector.Create();
    this.Kxr = Vector_1.Vector.Create();
    this.m3r = Vector_1.Vector.Create();
    this.d3r = -1;
    this.C3r = 0;
    this.g3r = 0;
    this.b0a = -1;
    this.f3r = false;
    this.dFe = 0;
    this.p3r = -1;
    this.v3r = 2;
    this.M3r = Vector_1.Vector.Create();
    this.AnimLogicParamsSetter = undefined;
    this.vJ = undefined;
    this.BBn = Vector_1.Vector.Create();
    this.EDa = 0;
    this.RotateBonesToTargetMgr = undefined;
    this.AGl = undefined;
    this.fSu = [false, false, false];
    this.m1m = [new Set(), new Set(), new Set()];
    this.MainAnimInstanceRole = undefined;
    this.w3a = Vector_1.Vector.Create(-100000000, -100000000, -100000000);
    this.mn_ = 0;
    this.pth = false;
    this.JTc = false;
    this.ZTc = Vector_1.Vector.Create();
    this.m2c = false;
    this.I3r = (t, i) => {
      var s;
      if (t?.Valid && (s = t.GetComponent(188))?.Valid) {
        if (i) {
          this.T3r();
        } else if (!t.GetComponent(217)?.HasTag(715234113)) {
          if ((i = this.Mesh.GetAnimInstance()) !== (t = this.GetAnimInstance())) {
            i.SyncAnimStates(undefined);
          }
          if (this.SpecialAnimInstance && this.SpecialAnimInstance.CurrentSkeleton?.IsValid()) {
            this.SpecialAnimInstance?.SyncAnimStates(undefined);
          }
          if (s.SpecialAnimInstance && s.SpecialAnimInstance.CurrentSkeleton?.IsValid()) {
            s.SpecialAnimInstance?.SyncAnimStates(undefined);
          }
          if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE) && UE.KuroStaticLibrary.IsObjectClassByName(s.MainAnimInstanceInternal, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
            t.替换角色时同步动作数据(s.MainAnimInstance);
            this.lCa(t);
          } else {
            t?.SyncAnimStates(undefined);
          }
          (i = this.Entity.GetComponent(53))?.ClearOrders();
          i?.AnimationStateInitPush();
          this.T3r();
        }
      }
    };
    this.L3r = () => {
      this.GetAnimInstanceFromMesh();
      this.d6_();
      this.StartAnimInstance();
      this.jIu();
      this.Entity.GetComponent(53)?.RebuildAnimationStates();
      this.Entity.GetComponent(125)?.RefreshCharacterAnimInstance();
    };
    this.bpr = t => {
      if (!t || !!ModelManager_1.ModelManager.LevelLoadingModel?.IsLoading) {
        this.D3r();
      }
    };
    this.Oul = () => {
      this.D3r();
    };
    this.R3r = t => {
      if (!t) {
        this.D3r();
      }
    };
    this.ri_ = 0;
    this.zsf = (t, i) => {
      if (t === this.Entity.Id && i) {
        this.StartForceDisableAnimOptimization(1);
        this.ri_ = 2;
      }
    };
    this.U3r = () => {
      this.StopModelBuffer();
    };
    this.ero = () => {
      this.C3r = 0;
    };
    this.gne = t => {
      this.C3r = 0;
    };
    this.A3r = new Set([CharacterUnifiedStateTypes_1.ECharMoveState.Walk, CharacterUnifiedStateTypes_1.ECharMoveState.Stand, CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop, CharacterUnifiedStateTypes_1.ECharMoveState.RunStop, CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop]);
    this.P3r = (t, i) => {
      if (!this.A3r.has(i)) {
        this.C3r = 0;
      }
    };
    this.B$a = 0;
    this.OnPostEndAnimNotify = () => {
      this.B$a = 0;
      if (this.vJ) {
        this.vJ.RemoveHoldEntity("CharacterAnimationComponent.OnDisable");
      }
      if (!this.Active) {
        this.MainAnimInstance?.ClearMontage();
        UE.KuroAnimLibrary.EndAnimNotifyStates(this.MainAnimInstanceInternal);
        if (this.Mesh) {
          this.Mesh.bBanMontage = false;
        }
        this.ConsumeRootMotion();
      }
    };
    this.EndAnimNotifyStates = () => {
      UE.KuroAnimLibrary.EndAnimNotifyStates(this.MainAnimInstanceInternal);
    };
    this.TagChanged = (s, h) => {
      if (this.AGl) {
        let i = false;
        for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
          if (this.AGl.DisableTagIds[t].has(s)) {
            if (h) {
              this.m1m[t].add(s);
            } else {
              this.m1m[t].delete(s);
            }
            i = true;
          }
        }
        if (i) {
          this.RefreshPerformanceAnimBlueprint();
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 0];
  }
  get DegMovementSlope() {
    return this.t3r;
  }
  get IkMeshOffset() {
    return this.i3r;
  }
  set IkMeshOffset(t) {
    this.i3r = t;
  }
  get MovementTerrainNormal() {
    return this.o3r;
  }
  get BattleIdleEndTime() {
    return this.C3r;
  }
  get HasKuroRootMotion() {
    return !!this.MainAnimInstance && (this.b0a !== Time_1.Time.Frame && (this.f3r = this.MainAnimInstance.HasKuroRootMotionAnim(), this.b0a = Time_1.Time.Frame), this.f3r);
  }
  get vth() {
    return this.pth;
  }
  set vth(t) {
    if (this.pth !== t && (this.pth = t, this.Mesh)) {
      this.Mesh.WeakenKawaiiFollow = t ? 0.3 : 1;
    }
  }
  lCa(t) {
    if (this.AnimLogicParamsSetter) {
      if (t = t.LogicParams) {
        this.AnimLogicParamsSetter.SitDown = t.bSitDown;
        this.AnimLogicParamsSetter.SitDownType = t.SitDownType;
        this.AnimLogicParamsSetter.SitDownDirect = t.SitDownDirect;
        this.AnimLogicParamsSetter.StandUpDirect = t.StandUpDirect;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 36, "状态继承时LogicParams为空");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 36, "状态继承时AnimLogicParamsSetter为空");
    }
  }
  T3r() {
    if (this.g3r) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 57, "人物上场隐藏一帧【重复隐藏】", ["Entity:", this.Entity.Id]);
      }
    } else {
      this.g3r = this.ActorComp.DisableActor("[CharacterAnimationComponent.TemporaryHidden] 短暂消失");
      this.p3r = 1;
      this.GetAnimInstance().ForceSetCurrentMontageBlendTime(0);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 57, "人物上场隐藏一帧 【隐藏开始】", ["Entity:", this.Entity.Id]);
      }
    }
  }
  x3r() {
    if (this.p3r > 0) {
      this.p3r--;
    } else if (this.p3r === 0) {
      this.ActorComp.EnableActor(this.g3r);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 57, "人物上场隐藏一帧 【隐藏结束】", ["Entity:", this.Entity.Id]);
      }
      this.g3r = undefined;
      this.p3r = -1;
    }
  }
  jIu() {
    if (this.AGl) {
      for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
        this.m1m[t].clear();
        for (const i of this.AGl.DisableTagIds[t]) {
          if (this.Lie.HasTag(i)) {
            this.m1m[t].add(i);
          }
        }
      }
    } else {
      for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
        this.m1m[t].clear();
      }
    }
  }
  D3r() {
    this.C3r = 0;
    if (UE.KuroStaticLibrary.IsObjectClassByName(this.MainAnimInstance, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      this.MainAnimInstance.CleanAnimVariable();
    }
  }
  OnInitData() {
    this.AnimLogicParamsSetter = new AnimLogicParamsSetter_1.AnimLogicParamsSetter();
    this.vJ = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
    return true;
  }
  OnClear() {
    var t;
    var i;
    if (UE.KuroStaticLibrary.IsObjectClassByName(this.MainAnimInstanceInternal, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE) && (t = this.MainAnimInstanceInternal.LogicParams)) {
      this.MontageManager.StopMontage({
        Method: 0,
        BlendOutTime: 0
      });
      this.MainAnimInstanceInternal.SyncAnimStates(undefined);
      i = UE.KuroStaticLibrary.GetDefaultObject(t.GetClass());
      t.AccelerationRef = Vector_1.Vector.Create(i.AccelerationRef).ToUeVectorOld();
      t.AcceptedNewBeHitRef = i.AcceptedNewBeHitRef;
      t.BattleIdleTimeRef = i.BattleIdleTimeRef;
      t.BeHitAnimRef = i.BeHitAnimRef;
      t.BeHitDirectRef = Vector_1.Vector.Create(i.BeHitDirectRef).ToUeVectorOld();
      t.BeHitLocationRef = Vector_1.Vector.Create(i.BeHitLocationRef).ToUeVectorOld();
      t.BeHitSocketNameRef = FNameUtil_1.FNameUtil.EMPTY;
      t.CharCameraStateRef = i.CharCameraStateRef;
      t.CharMoveStateRef = i.CharMoveStateRef;
      t.CharPositionStateRef = i.CharPositionStateRef;
      t.ClimbInfoRef = i.ClimbInfoRef;
      t.ClimbOnWallAngleRef = i.ClimbOnWallAngleRef;
      t.ClimbStateRef = i.ClimbStateRef;
      t.DegMovementSlopeRef = i.DegMovementSlopeRef;
      t.DoubleHitInAirRef = i.DoubleHitInAirRef;
      t.EnterFkRef = i.EnterFkRef;
      t.GroundedTimeRef = i.GroundedTimeRef;
      t.HasMoveInputRef = i.HasMoveInputRef;
      t.InputDirectRef = Vector_1.Vector.Create(i.InputDirectRef).ToUeVectorOld();
      t.InputRotatorRef = i.InputRotatorRef;
      t.IsFallingIntoWaterRef = i.IsFallingIntoWaterRef;
      t.IsJumpRef = i.IsJumpRef;
      t.IsMovingRef = i.IsMovingRef;
      t.JumpUpRateRef = i.JumpUpRateRef;
      t.RagQuitStateRef = i.RagQuitStateRef;
      t.SightDirectRef = Vector_1.Vector.Create(i.SightDirectRef).ToUeVectorOld();
      t.SlideForwardRef = Vector_1.Vector.Create(i.SlideForwardRef).ToUeVectorOld();
      t.SlideStandModeRef = i.SlideStandModeRef;
      t.SlideSwitchThisFrameRef = i.SlideSwitchThisFrameRef;
      t.SpeedRef = i.SpeedRef;
      t.SprintSwimOffsetLerpSpeedRef = i.SprintSwimOffsetLerpSpeedRef;
      t.SprintSwimOffsetRef = i.SprintSwimOffsetRef;
    }
    return true;
  }
  OnInit() {
    var t;
    this.fSu = [false, false, false];
    this.m1m = [new Set(), new Set(), new Set()];
    super.OnInit();
    this.SlopeStepPeriodicCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH, UE.CurveFloat);
    this.SlopeStepSizeCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH, UE.CurveFloat);
    return !!this.SlopeStepPeriodicCurve && !!this.SlopeStepSizeCurve && !((t = this.Entity.GetComponent(0).GetModelConfig().注释时的抬升角度) && (this.s3r = Quat_1.Quat.Create(), Quat_1.Quat.FindBetween(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(Math.cos(t * MathUtils_1.MathUtils.DegToRad), 0, Math.sin(t * MathUtils_1.MathUtils.DegToRad)), this.s3r)), 0);
  }
  OnStart() {
    this.ActorComp = this.Entity.CheckGetComponent(3);
    if (!this.ActorComp.Actor?.Mesh) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "模型仍未初始化", ["Entity", this.Entity.Id]);
      }
      return false;
    }
    if (this.ActorComp.Actor.Mesh.SkeletalMesh) {
      this.Actor = this.ActorComp.Actor;
      this.Mesh = this.Actor.Mesh;
      this.Gce = this.Entity.GetComponent(48);
      this.bre = this.Entity.GetComponent(50);
      this.Lie = this.Entity.GetComponent(217);
      this.zFr = this.Entity.GetComponent(86);
      this.$zo = this.Entity.GetComponent(185);
      this.ph_ = this.Entity.GetComponent(49);
      this.uwl = this.Entity.GetComponent(242);
      this.EDa = this.Mesh?.KuroAnimInstanceLod ?? 0;
      if (this.Mesh) {
        this.Mesh.KuroLodMask = ModelManager_1.ModelManager.CreatureModel.KuroLodMask;
      }
      if (!Info_1.Info.EnableForceTick) {
        this.ZFr = this.Actor.GetComponentByClass(UE.KuroCharacterAnimationComponent.StaticClass());
        if (!this.ZFr?.IsValid()) {
          this.ZFr = this.Actor.AddComponentByClass(UE.KuroCharacterAnimationComponent.StaticClass(), false, new UE.Transform(), false);
        }
        this.ZFr.SetComponentTickEnabled(true);
      }
      this.GetAnimInstanceFromMesh();
      if (!this.MainAnimInstanceInternal) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 6, "缺少MainAnimInstance", ["Entity", this.Entity.Id], ["pbDataId", this.ActorComp.CreatureData.GetPbDataId()]);
        }
        return false;
      }
      this.InitBaseInfo();
      this.Ore();
      this.CheckNpcAnimationAssets();
      if (this.Mesh.DoesSocketExist(CharacterAnimationComponent_1.CameraPosition)) {
        this.v3r = 0;
        this.M3r.FromUeVector(this.Mesh.D_GetSocketTransform(CharacterAnimationComponent_1.CameraPosition, 1).GetLocation());
      } else if (this.Mesh.DoesSocketExist(CharacterAnimationComponent_1.HitCase)) {
        this.v3r = 1;
      } else {
        this.v3r = 2;
      }
      if (this.ActorComp.IsRoleAndCtrlByMe) {
        var i;
        var s = this.ActorComp.CreatureData.GetRoleId();
        let t = PerformanceConditionByIdWithZero_1.configPerformanceConditionByIdWithZero.GetConfig(s, s, s);
        if (!t || t.Id === 0) {
          if ((i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(s)) !== s) {
            t = PerformanceConditionByIdWithZero_1.configPerformanceConditionByIdWithZero.GetConfig(i, i, i);
          }
        }
        this.AGl = t ? new PerformanceConditionParams(this, t) : undefined;
        if (t) {
          var h = new Set();
          for (const e of this.AGl.DisableTagIds) {
            for (const r of e) {
              if (!h.has(r)) {
                h.add(r);
                this.Lie.AddTagAddOrRemoveListener(r, this.TagChanged);
              }
            }
          }
        } else {
          for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
            this.MainAnimInstanceRole?.ValidPerformanceIndexes.Add(t);
          }
        }
        this.jIu();
      }
      this.RotateBonesToTargetMgr = new RotateBonesToTargetManager_1.RotateBonesToTargetManager(this.ActorComp);
      this.JTc = this.Actor.GetName().includes("DengDengDoll");
    }
    return true;
  }
  InitBaseInfo() {
    this.e3r = 1;
    this.u3r = 0;
    this.t3r = 0;
    this.IkMeshOffset = 0;
    var t = this.Mesh;
    this.BufferOriginTransform.FromUeTransform(t.D_GetRelativeTransform());
    if (!!this.ActorComp?.IsRoleAndCtrlByMe && (this.BufferOriginTransform.GetLocation().X !== 0 || this.BufferOriginTransform.GetLocation().Y !== 0)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "Animation.InitBaseInfo OriginTransError", ["Actor", this.Actor?.GetName()], ["Origin", this.BufferOriginTransform]);
      }
      this.h3r.Set(0, 0, -this.ActorComp.ScaledHalfHeight);
      this.Z_e.SetLocation(this.h3r);
      (i = Rotator_1.Rotator.Create()).Set(0, -90, 0);
      this.Z_e.SetRotation(i.Quaternion());
      this.Z_e.SetScale3D(Vector_1.Vector.OneVectorProxy);
      t.D_K2_SetRelativeTransform(this.Z_e.ToUeTransform(), false, undefined, false);
    }
    this.BufferShowTransform.FromUeTransform(t.D_GetRelativeTransform());
    var i = this.ActorComp.CreatureData.GetEntityType();
    this.dFe = this.ActorComp.CreatureData.GetRoleId();
    this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
    this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
    if (i === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      this.IsPlayer = true;
    } else {
      this.IsPlayer = false;
    }
    this.w3r();
  }
  GetAnimInstanceFromMesh() {
    super.GetAnimInstanceFromMesh();
    if (this.MainAnimInstanceInternal instanceof UE.KuroAnimInstanceRole) {
      this.MainAnimInstanceRole = this.MainAnimInstanceInternal;
    }
  }
  OnChangeTimeDilation(t) {
    var i;
    var s;
    if (this.ZFr) {
      s = (i = this.O0d()) > 1;
      if (Info_1.Info.EnableForceTick) {
        this.BufferNowTime /= this.BufferNowScale;
        this.BufferTimeLength /= this.BufferNowScale;
        if (s) {
          this.BufferNowTime *= i;
          this.BufferTimeLength *= i;
        }
      } else {
        this.ZFr.BufferNowTime /= this.BufferNowScale;
        this.ZFr.BufferTimeLength /= this.BufferNowScale;
        if (s) {
          this.ZFr.BufferNowTime *= i;
          this.ZFr.BufferTimeLength *= i;
        }
      }
      this.BufferNowScale = i;
    }
  }
  Ore() {
    if (!this.m2c) {
      this.m2c = true;
      if (this.IsPlayer && this.ActorComp.IsAutonomousProxy) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero);
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
        this.c3r = true;
      }
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.bpr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd, this.Oul);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrown, this.R3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer, this.U3r);
      EventSystem_1.EventSystem.AddWithTarget(this.vJ, EventDefine_1.EEventName.OnPreSetActorHidden, this.zsf);
    }
  }
  kre() {
    if (this.m2c) {
      this.m2c = false;
      if (this.c3r) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
      }
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.bpr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd, this.Oul);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrown, this.R3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer, this.U3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.vJ, EventDefine_1.EEventName.OnPreSetActorHidden, this.zsf);
    }
  }
  OnEnd() {
    if (this.ri_ > 0) {
      this.ri_ = 0;
      this.CancelForceDisableAnimOptimization(1);
    }
    AnimController_1.AnimController.UnregisterUpdateAnimInfoEntity(this.Entity.Id);
    this.kre();
    this.StopModelBuffer();
    return true;
  }
  OnActivate() {
    this.StartAnimInstance();
    AnimController_1.AnimController.RegisterUpdateAnimInfoEntity(this.Entity.Id);
    var t = this.Entity.GetComponent(0).GetPbDataId();
    if (AnimController_1.AnimController.ConsumeForceDisableAnimOptimization(t)) {
      this.StartForceDisableAnimOptimization(0, false);
    }
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.JTc) {
      if (!this.ActorComp?.ActorScaleProxy.Equals(Vector_1.Vector.OneVectorProxy)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "DengDengDoll Log1", ["Scale", this.ActorComp?.ActorScaleProxy]);
        }
      }
      this.h3r.FromUeVector(this.Mesh.GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.ROOT).GetScale3D());
      if (!this.h3r.Equals(Vector_1.Vector.OneVectorProxy)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "DengDengDoll Log2", ["Root", this.h3r]);
        }
      }
      this.h3r.FromUeVector(this.Mesh.GetSocketTransform(CharacterAnimationComponent_1.ebc).GetScale3D());
      if (!this.h3r.Equals(this.ZTc)) {
        this.ZTc.DeepCopy(this.h3r);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "DengDengDoll Log3", ["DD_Bip001Pelvis", this.h3r]);
        }
      }
    }
    if (this.ri_ > 0 && (this.ri_ = this.ri_ - 1, this.ri_ <= 0)) {
      this.CancelForceDisableAnimOptimization(1);
    }
    this.yDa();
    this.x3r();
    this.b3r(t);
    this.q3r();
    if (this.IsPlayer && (this.C3r -= t, this.BattleIdleEndTime > 0 && this.ActorComp.InputDirectProxy.SizeSquared2D() > MathUtils_1.MathUtils.SmallNumber && (this.C3r = 0), this.UpdateWalkRunMix(t), this.RefreshPerformancePosition(), this.IsPlayer)) {
      this.vth = this.$zo?.GetBuffById(CharacterBuffIds_1.buffId.ElevatorBuff) !== undefined;
      this.Mesh.KuroLodMask = this.vth ? CreatureModel_1.DISABLE_ON_ELEVATOR_KAWAII_MASK | ModelManager_1.ModelManager.CreatureModel.KuroLodMask : ModelManager_1.ModelManager.CreatureModel.KuroLodMask;
    }
  }
  OnForceAfterTick(t) {
    this.UpdateModelBuffer(t);
  }
  OnEnable() {
    if (this.Mesh) {
      this.Mesh.bBanMontage = false;
    }
    super.OnEnable();
  }
  OnDisable(t) {
    if (this.Mesh) {
      this.Mesh.bBanMontage = true;
    }
    if (this.p3r >= 0 && (this.ActorComp.EnableActor(this.g3r), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 57, "人物上场隐藏一帧 【组件Disable 隐藏结束】", ["Entity:", this.Entity.Id]);
    }
    this.p3r = -1;
    if (!this.Entity.GetComponent(199)?.AnyIdleLoopMontagePlaying) {
      if (this.MainAnimInstanceInternal?.IsValid() && (this.MainAnimInstanceInternal.Montage_Stop(0), this.vJ.AddHoldEntity("CharacterAnimationComponent.OnDisable"), this.B$a === 0)) {
        this.B$a = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, this.OnPostEndAnimNotify);
      }
      this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
      this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
    }
    super.OnDisable(t);
  }
  yDa() {
    var t = Info_1.Info.IsPcPlatform() ? 3000 : 1500;
    if (this.EDa === 0 && this.Entity?.DistanceWithCamera >= t) {
      this.Mesh.KuroAnimInstanceLod = 1;
    } else if (this.EDa === 1 && this.Entity?.DistanceWithCamera < t) {
      this.Mesh.KuroAnimInstanceLod = 0;
    }
  }
  SetBlendSpaceLookAt(t) {
    this.EnableBlendSpaceLookAtInner = t;
    this.LookAtBlendSpaceVector2D.X = MathUtils_1.MathUtils.Clamp(MathCommon_1.MathCommon.RightAngle - this.SightDirect.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg, limitBlendSpaceX[0], limitBlendSpaceX[1]);
    this.LookAtBlendSpaceVector2D.Y = MathUtils_1.MathUtils.Clamp(Math.asin(this.SightDirect.Z) * MathCommon_1.MathCommon.RadToDeg, limitBlendSpaceY[0], limitBlendSpaceY[1]);
  }
  EnterBattleIdle(t) {
    this.C3r = t ?? BATLLE_IDLE_TIME;
  }
  OnJump() {
    var t;
    if (UE.KuroStaticLibrary.IsImplementInterface(this.MainAnimInstanceInternal.GetClass(), UE.BPI_Animation_C.StaticClass())) {
      t = (0, puerts_1.$ref)(0);
      this.MainAnimInstanceInternal.InterfaceJumpPressed(t);
      return (0, puerts_1.$unref)(t);
    } else {
      return 0;
    }
  }
  SimulateJump(t) {
    this.MainAnimInstanceInternal.InterfaceSimulateJump(t);
  }
  AnimCanTurn() {
    return !this.MainAnimInstanceInternal.HasKuroRootMotionAnim() || this.MainAnimInstanceInternal.GetCurveValue(CharacterNameDefines_1.CharacterNameDefines.ROOT_ROTATABLE) >= ROTATABLE_THREADHOLD;
  }
  ClimbDash() {
    if (UE.KuroStaticLibrary.IsObjectClassByName(this.MainAnimInstanceInternal, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      this.MainAnimInstanceInternal.ClimbDash();
    }
  }
  MontageSetPosition(t) {
    if (this.MainAnimInstanceInternal) {
      this.MainAnimInstanceInternal.Montage_SetPosition(this.MainAnimInstanceInternal.GetCurrentActiveMontage(), t);
    }
  }
  MontageGetPosition() {
    if (this.MainAnimInstanceInternal) {
      return this.MainAnimInstanceInternal.Montage_GetPosition(this.MainAnimInstanceInternal.GetCurrentActiveMontage());
    } else {
      return 0;
    }
  }
  AddModelQuat(t, i) {
    var s;
    if (Info_1.Info.EnableForceTick) {
      s = this.BufferShowTransform.GetRotation();
      t.Multiply(s, this.az);
      this.BufferShowTransform.SetRotation(this.az);
      if (i) {
        t.RotateVector(this.BufferShowTransform.GetLocation(), this.h3r);
        this.BufferShowTransform.SetLocation(this.h3r);
      }
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.ZFr.AddModelQuat(t.ToUeQuat(), i);
    }
  }
  AddModelLocation(t) {
    if (Info_1.Info.EnableForceTick) {
      this.BBn.AdditionEqual(t);
      t.Addition(this.BufferShowTransform.GetLocation(), this.h3r);
      this.BufferShowTransform.SetLocation(this.h3r);
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.ZFr.AddModelLocation(t.ToUeVectorOld());
    }
  }
  SetOriginLocation(t) {
    if (t.X !== 0 || t.Y !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "Animation.SetOriginLocation LocationError", ["Actor", this.Actor?.GetName()], ["Loc", t]);
      }
      t.Set(0, 0, -this.ActorComp.ScaledHalfHeight);
    }
    if (Info_1.Info.EnableForceTick) {
      t.Division(this.BufferOriginTransform.GetLocation(), this.h3r);
      this.BufferOriginTransform.SetLocation(t);
      this.BufferShowTransform.GetLocation().AdditionEqual(this.h3r);
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.ZFr.SetOriginLocation(t.ToUeVectorOld());
      if (this.ZFr.BufferNowTime >= this.ZFr.BufferTimeLength) {
        this.Z_e.FromUeTransform(this.Mesh.D_GetRelativeTransform());
        if (this.Z_e.GetLocation().X !== 0 || this.Z_e.GetLocation().Y !== 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 6, "Animation.SetOriginLocation OriginTransError", ["Actor", this.Actor?.GetName()], ["Origin", this.Z_e]);
          }
          this.h3r.Set(0, 0, -this.ActorComp.ScaledHalfHeight);
          this.Z_e.SetLocation(this.h3r);
          (t = Rotator_1.Rotator.Create()).Set(0, -90, 0);
          this.Z_e.SetRotation(t.Quaternion());
          this.Z_e.SetScale3D(Vector_1.Vector.OneVectorProxy);
          this.Mesh.D_K2_SetRelativeTransform(this.Z_e.ToUeTransform(), false, undefined, false);
        }
      }
    }
  }
  ResetModelQuat() {
    if (Info_1.Info.EnableForceTick) {
      this.BBn.Addition(this.BufferOriginTransform.GetLocation(), this.h3r);
      this.BufferShowTransform.SetLocation(this.h3r);
      this.BufferShowTransform.SetRotation(this.BufferOriginTransform.GetRotation());
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.ZFr.ResetModelQuat();
    }
  }
  ResetModelLocation() {
    if (Info_1.Info.EnableForceTick) {
      this.BBn.Reset();
      this.BufferShowTransform.SetLocation(this.BufferOriginTransform.GetLocation());
      if (!(this.BufferNowTime < this.BufferTimeLength)) {
        this.Mesh.D_K2_SetRelativeTransform(this.BufferShowTransform.ToUeTransform(), false, undefined, false);
      }
    } else {
      this.ZFr.ResetModelLocation();
    }
  }
  CheckAndResetModel() {
    this.Z_e.FromUeTransform(this.Mesh.D_GetRelativeTransform());
    var t = this.BufferOriginTransform.GetLocation();
    if (t.X !== 0 || t.Y !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "Animation.CheckAndResetModel Origin Error", ["Actor", this.Actor?.GetName()], ["location", t]);
      }
      t.X = 0;
      t.Y = 0;
    }
    var t = this.Z_e.GetLocation().Equals(t, 0.1) && this.Z_e.GetRotation().Equals(this.BufferOriginTransform.GetRotation(), 0.01);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "Animation.CheckAndResetModel", ["Actor", this.Actor?.GetName()], ["Current", this.Z_e], ["NowTime", (Info_1.Info.EnableForceTick ? this : this.ZFr).BufferNowTime], ["TimeLength", (Info_1.Info.EnableForceTick ? this : this.ZFr).BufferTimeLength]);
      }
      this.Mesh.D_K2_SetRelativeTransform(this.BufferOriginTransform.ToUeTransform(), false, undefined, false);
    }
    return t;
  }
  G3r(t, i, s) {
    if (Info_1.Info.EnableForceTick) {
      this.h3r.FromUeVector(t.GetLocation());
      this.h3r.SubtractionEqual(i.ActorLocationProxy);
      s.SetLocation(this.h3r);
      this.h3r.FromUeVector(t.GetScale3D());
      this.h3r.SubtractionEqual(i.ActorScaleProxy);
      s.SetScale3D(this.h3r);
      this.az.FromUeQuat(t.GetRotation());
      i.ActorQuatProxy.Inverse(this.KJ);
      this.KJ.Multiply(this.az, this.az);
      s.SetRotation(this.az);
    } else {
      this.ZFr.D_GetTransformOffsetInWorld(t, i.ActorTransform);
      s.SetLocation(this.BufferShowTransform.GetLocation());
      s.SetRotation(this.BufferShowTransform.GetRotation());
      s.SetScale3D(this.BufferShowTransform.GetScale3D());
    }
  }
  SetTransformWithModelBuffer(t, i, s = undefined, h = true) {
    var e;
    if (this.Mesh) {
      if (i < exports.MIN_BUFFER_TIME_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
        }
        this.ActorComp.SetActorTransform(t, "移动表现优化，Mesh缓动.没有缓动", true, s);
        this.StopModelBuffer();
      } else if (Math.abs(i) < MAX_BUFFER_TIME_LENGTH) {
        if (Info_1.Info.EnableForceTick) {
          this.BufferNowTime = 0;
          this.BufferTimeLength = i;
        } else {
          this.ZFr.BufferNowTime = 0;
          this.ZFr.BufferTimeLength = i / 1000;
          this.ZFr?.SetComponentTickEnabled(true);
        }
        this.BufferNowScale = this.O0d();
        e = this.Mesh.D_K2_GetComponentToWorld();
        this.ActorComp.SetActorTransformExceptMesh(t, "移动表现优化，Mesh缓动", h, s);
        this.G3r(e, this.ActorComp, this.BufferModelTransform);
        this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Long", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
      }
    } else {
      this.ActorComp.SetActorTransform(t, "移动表现优化，Mesh缓动", h, s);
    }
  }
  SetLocationAndRotatorWithModelBuffer(t, i, s, h, e = 2, r = true) {
    var o;
    if (this.Mesh) {
      if (s < exports.MIN_BUFFER_TIME_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", s]);
        }
        this.ActorComp.SetActorLocationAndRotation(t, i, h + ".移动表现优化.Mesh缓动.没有缓动", r, e);
        this.StopModelBuffer();
      } else if (Math.abs(s) < MAX_BUFFER_TIME_LENGTH) {
        if (Info_1.Info.EnableForceTick) {
          this.BufferNowTime = 0;
          this.BufferTimeLength = s;
        } else if (this.ZFr) {
          this.ZFr.BufferNowTime = 0;
          this.ZFr.BufferTimeLength = s / 1000;
          this.ZFr.SetComponentTickEnabled(true);
        }
        this.BufferNowScale = this.O0d();
        o = this.Mesh.D_K2_GetComponentToWorld();
        this.ActorComp.SetActorLocationAndRotationExceptMesh(t, i, h + "移动表现优化，Mesh缓动", r, e);
        this.G3r(o, this.ActorComp, this.BufferModelTransform);
        this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Long", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", s]);
      }
    } else {
      this.ActorComp.SetActorLocationAndRotation(t, i, h + "移动表现优化，Mesh缓动", r, e);
    }
  }
  SetModelBuffer(t, i) {
    var s;
    if (this.Mesh) {
      s = this.O0d();
      if (i < exports.MIN_BUFFER_TIME_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Short", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
        }
        this.StopModelBuffer();
      } else if (Math.abs(i) < MAX_BUFFER_TIME_LENGTH) {
        if (Info_1.Info.EnableForceTick) {
          this.BufferNowTime = 0;
          this.BufferTimeLength = i;
        } else {
          if (this.LastRemainBufferFrame !== Time_1.Time.Frame) {
            this.RemainBufferTime = this.ZFr.BufferTimeLength - this.ZFr.BufferNowTime;
            this.LastRemainBufferFrame = Time_1.Time.Frame;
          }
          this.ZFr.BufferNowTime = 0;
          this.ZFr.BufferTimeLength = i / 1000;
          if (this.RemainBufferTime > 0) {
            this.ZFr.BufferTimeLength += this.RemainBufferTime / this.BufferNowScale * s * MODEL_BUFFER_SMOOTH_FACTOR;
          }
          this.ZFr?.SetComponentTickEnabled(true);
        }
        this.BufferNowScale = this.O0d();
        this.Mesh.D_K2_SetWorldTransform(t, false, undefined, true);
        this.Mesh.KuroRefreshCacheLocalTransform();
        this.G3r(t, this.ActorComp, this.BufferModelTransform);
        this.BufferLocation = !this.BufferModelTransform.GetLocation().Equals(this.BufferShowTransform.GetLocation(), 10);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 6, "ModelBuffer Time is Too Long", ["Actor", this.ActorComp?.Actor.GetName()], ["timeLength", i]);
      }
    }
  }
  UpdateModelBuffer(t) {
    if (!(this.BufferNowTime < this.BufferTimeLength) || !(this.BufferNowTime = Math.min(this.BufferNowTime + t, this.BufferTimeLength), this.Z_e.FromUeTransform(this.ActorComp.ActorTransform), this.BufferShowTransform.ComposeTransforms(this.Z_e, this.a3r), t = this.BufferNowTime / this.BufferTimeLength, this.ActorComp.ActorLocationProxy.Addition(this.BufferModelTransform.GetLocation(), this.h3r), Vector_1.Vector.Lerp(this.h3r, this.a3r.GetLocation(), t, this.l3r), this.Z_e.SetLocation(this.l3r), this.ActorComp.ActorScaleProxy.Addition(this.BufferModelTransform.GetScale3D(), this.h3r), Vector_1.Vector.Lerp(this.h3r, this.a3r.GetScale3D(), t, this.l3r), this.Z_e.SetScale3D(this.l3r), this.ActorComp.ActorQuatProxy.Multiply(this.BufferModelTransform.GetRotation(), this.az), Quat_1.Quat.Slerp(this.az, this.a3r.GetRotation(), t, this.KJ), this.Z_e.SetRotation(this.KJ), this.Mesh.D_K2_SetWorldTransform(this.Z_e.ToUeTransform(), false, undefined, false), !(this.BufferNowTime >= this.BufferTimeLength - MathUtils_1.MathUtils.KindaSmallNumber))) {
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
      this.ZFr?.StopModelBuffer();
      this.ZFr?.SetComponentTickEnabled(false);
    }
  }
  HasModelBuffer() {
    if (Info_1.Info.EnableForceTick) {
      return this.BufferTimeLength > 0;
    } else {
      return this.ZFr.BufferTimeLength > 0;
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
    } else if (this.ZFr.BufferTimeLength > 0) {
      this.ZFr.BufferTimeLength = 0;
      this.ZFr?.SetComponentTickEnabled(false);
    }
  }
  GetWalkRunMix() {
    return this.e3r;
  }
  UpdateWalkRunMix(t) {
    if (this.Lie?.Valid && this.Lie.HasTag(-1898186757)) {
      this.e3r = this.e3r + (this.GetSlopeScale() - this.e3r) * (1 - Math.pow(WALK_RUN_MIX_LERP, t));
    } else {
      this.e3r = 1;
    }
  }
  GetSlopeScale() {
    return MathUtils_1.MathUtils.Clamp(this.SlopeStepPeriodicCurve.GetFloatValue(this.t3r) * this.SlopeStepSizeCurve.GetFloatValue(this.t3r), MIN_SCLOPE_SCALE, MAX_SCLOPE_SCALE);
  }
  q3r() {
    if (this.Gce?.CharacterMovement) {
      var t = this.Gce.CharacterMovement.MovementMode;
      if (t !== 1 && t !== 2) {
        this.t3r = 0;
        this.o3r.FromUeVector(this.Gce.GravityUp);
      } else {
        var i = this.ActorComp.ActorLocationProxy;
        var s = this.ActorComp.ActorForwardProxy;
        if (t === 1) {
          t = this.Gce.CharacterMovement.CurrentFloor;
          if (!t.bBlockingHit) {
            this.t3r = 0;
            this.o3r.FromUeVector(this.Gce.GravityUp);
            return;
          }
          t = t.HitResult.ImpactNormal;
          this.t3r = Math.asin(MathUtils_1.MathUtils.DotProduct(s, t)) * -1 * MathUtils_1.MathUtils.RadToDeg;
          this.o3r.Set(t.X, t.Y, t.Z);
        } else {
          if (Time_1.Time.Frame - this.d3r != 1) {
            this.t3r = 0;
            this.o3r.FromUeVector(this.Gce.GravityUp);
            this.d3r = Time_1.Time.Frame;
            this.Wnr.FromUeVector(i);
            return;
          }
          i.Subtraction(this.Wnr, this.h3r);
          if (Math.abs(this.h3r.X) < MathUtils_1.MathUtils.SmallNumber && Math.abs(this.h3r.Y) < MathUtils_1.MathUtils.SmallNumber) {
            this.t3r = 0;
            this.o3r.FromUeVector(this.Gce.GravityUp);
          } else {
            this.Gce.GravityUp.CrossProduct(this.h3r, this.l3r);
            this.h3r.CrossProduct(this.l3r, this._3r);
            this._3r.Normalize();
            this.t3r = Math.asin(s.DotProduct(this._3r)) * -1 * MathUtils_1.MathUtils.RadToDeg;
            this.o3r.FromUeVector(this._3r);
          }
        }
        this.d3r = Time_1.Time.Frame;
        this.Wnr.FromUeVector(i);
      }
    }
  }
  b3r(t) {
    if (this.EnableSightDirectInternal) {
      if (this.IsPlayer) {
        if (this.ActorComp.IsAutonomousProxy) {
          if (this.N3r(t)) {
            this.O3r(t);
          }
        } else {
          this.k3r(this.n3r);
          this.O3r(t);
        }
      } else {
        if (!this.ph_?.IsInPlot && ModelManager_1.ModelManager.PerformModel.HasSightTarget(this.Entity.Id)) {
          this.eX_(this.n3r);
        } else if (this.Uwm(this.h3r)) {
          this.F3r(this.n3r);
        } else {
          this.V3r(this.n3r);
        }
        this.Cif(t);
        this.O3r(t);
      }
    }
  }
  N3r(t) {
    if (ModelManager_1.ModelManager.PlotModel.IsInTemplate()) {
      if (this.GetSightTargetItem() ?? this.SightTargetPoint) {
        this.F3r(this.n3r);
      } else {
        this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
      }
    } else {
      var i = ModelManager_1.ModelManager.PerformModel.PlayerSightTarget;
      if (i) {
        this.SightTargetPoint = i;
        this.F3r(this.n3r);
      } else {
        if (!InputDistributeController_1.InputDistributeController.IsAllowHeadRotation()) {
          this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
          this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
          return !(this.SightDirectIsEqual = true);
        }
        if (ControllerHolder_1.ControllerHolder.PhotographController.IsOpenPhotograph()) {
          if (ControllerHolder_1.ControllerHolder.PhotographController.IsPlayerLookAtCamera()) {
            this.UpdateStaticRotation(this.n3r);
          } else {
            this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME;
            this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
          }
        } else if (this.iym) {
          this.rym(this.n3r, this.iym);
        } else if (this.EMf) {
          this.IMf(this.n3r);
        } else {
          if (this.uwl?.Valid) {
            i = this.uwl.VehicleType;
            if (i === "Gongduola" || i === "AutoMoveGongduola" || i === "FishingBoat") {
              this.UpdateStaticRotation(this.n3r);
              return true;
            }
          }
          if (this.Lie?.Valid) {
            if (this.Lie.HasTag(1733479717)) {
              this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy);
              this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy);
              return !(this.SightDirectIsEqual = true);
            }
            if (this.Lie.HasTag(-1371021686) || this.Lie.HasTag(504239013) || !this.Lie.HasTag(-1462404775)) {
              this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
              return true;
            }
          }
          if (this.C3r > 0 || !this.Gce.CanResponseInput()) {
            this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME_2;
            this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
          } else {
            this.H3r();
            if (this.GetSightTargetItem()) {
              this.F3r(this.n3r);
            } else if ((!this.Lie?.Valid || this.Lie.HasTag(-1898186757) || this.Lie.HasTag(855966206)) && this.Gce.HasMoveInput) {
              this.u3r = Time_1.Time.WorldTime + WATCH_CAMERA_TIME;
              this.k3r(this.n3r);
            } else {
              this.n3r.DeepCopy(this.ActorComp.ActorForwardProxy);
            }
          }
        }
      }
    }
    return true;
  }
  SetDirectlySightEnableState(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 57, "设置角色头部注释，是否直接跟随(没有插值)1", ["bEnable", t], ["reason", i]);
    }
    this.EMf = t;
  }
  SetSightBoneLimit(t, i, s, h, e, r, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 57, "设置角色头部注视，有效角度范围", ["yawMin", t], ["yawMax", i], ["pitchMin", s], ["pitchMax", h]);
    }
    if (i < t || h < s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "Invalid SetSightBoneLimit", ["yawMin", t], ["yawMax", i], ["pitchMin", s], ["pitchMax", h]);
      }
    } else if (UE.KuroStaticLibrary.IsObjectClassByName(this.MainAnimInstanceInternal, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      this.MainAnimInstanceInternal.SetSightLockConfig(t, i, s, h, e, r, o);
    }
  }
  RestoreSightBoneLimit() {
    this.SetSightBoneLimit(SIGHT_LOCK_YAW_MIN, SIGHT_LOCK_YAW_MAX, SIGHT_LOCK_PITCH_MIN, SIGHT_LOCK_PITCH_MAX, SIGHT_LOCK_ASSIT_LIMIT, sightDirectInSightBone, upAxisInSightBone);
  }
  O3r(t) {
    this.h3r.FromUeVector(this.n3r);
    this.az.FromUeQuat(this.Mesh.K2_GetComponentQuaternion());
    this.az.Inverse(this.az);
    this.l3r.FromUeVector(this.n3r);
    this.az.RotateVector(this.n3r, this.n3r);
    if (this.EMf) {
      this.SightDirect.DeepCopy(this.n3r);
    } else {
      this.ClampSightDirect(this.n3r, this.n3r);
      if (!this.SightDirectIsEqual || !this.n3r.Equals(this.SightDirect)) {
        BaseAnimationComponent_1.BaseAnimationComponent.LerpDirect2dByMaxAngle(this.SightDirect2, this.n3r, t * TURN_SPEED, this.SightDirect2);
        BaseAnimationComponent_1.BaseAnimationComponent.LerpVector2dByAlpha(this.SightDirect, this.SightDirect2, 1 - Math.pow(TURN_RATIO, t * MathUtils_1.MathUtils.MillisecondToSecond), this.SightDirect);
        this.SightDirectIsEqual = this.SightDirect.Equals(this.SightDirect2);
        if (this.SightDirect.ContainsNaN()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 6, "UpdateHeadRotation Contains Nan.1", ["DegMovementSlopeInternal", this.t3r], ["BeforeRotate", this.h3r], ["BeforeClamp", this.l3r], ["TargetDirect", this.n3r], ["SightDirect", this.SightDirect], ["SightDirect2", this.SightDirect2], ["quatInverse", this.az], ["IsPlayer", this.IsPlayer], ["CanResponseInput", this.Gce.CanResponseInput()], ["Delta", t]);
          }
          this.SightDirect.Set(0, 1, 0);
          this.SightDirect2.Set(0, 1, 0);
        }
        if (this.EnableBlendSpaceLookAt) {
          this.LookAtBlendSpaceVector2D.X = MathUtils_1.MathUtils.Clamp(MathCommon_1.MathCommon.RightAngle - this.SightDirect.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg, limitBlendSpaceX[0], limitBlendSpaceX[1]);
          this.LookAtBlendSpaceVector2D.Y = MathUtils_1.MathUtils.Clamp(Math.asin(this.SightDirect.Z) * MathCommon_1.MathCommon.RadToDeg, limitBlendSpaceY[0], limitBlendSpaceY[1]);
        }
      }
    }
  }
  Cif(t) {
    if (MathUtils_1.MathUtils.IsNearlyEqual(this.HeadBaseYawBuffer, this.HeadBaseYaw)) {
      this.HeadBaseYawBuffer = this.HeadBaseYaw;
    } else {
      this.HeadBaseYawBuffer = MathUtils_1.MathUtils.RotatorAxisInterpTo(this.HeadBaseYawBuffer, this.HeadBaseYaw, t * MathUtils_1.MathUtils.MillisecondToSecond, HEAD_INTERP_SPEED);
    }
  }
  V3r(t) {
    var i;
    if (!this.bre?.Valid || !(i = this.bre.AiController.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(3))?.Valid || (i.ActorLocationProxy.Subtraction(this.ActorComp.ActorLocationProxy, this.h3r), this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight, this.h3r.IsNearlyZero())) {
      t.DeepCopy(this.ActorComp.ActorForwardProxy);
    } else {
      t.DeepCopy(this.h3r);
      this.j3r(t);
    }
  }
  eX_(t) {
    var i = ModelManager_1.ModelManager.PerformModel.GetSightTarget(this.Entity.Id);
    if (!i || (i.Subtraction(this.ActorComp.GetWatchedPoint(), this.h3r), this.h3r.IsNearlyZero())) {
      t.DeepCopy(this.ActorComp.ActorForwardProxy);
    } else {
      t.DeepCopy(this.h3r);
      this.j3r(t);
    }
  }
  Uwm(t) {
    var i;
    if (this.SightTargetPoint) {
      t.DeepCopy(this.SightTargetPoint);
      return true;
    } else if (i = this.GetSightTargetItem()) {
      t.DeepCopy(i.ActorLocationProxy);
      return true;
    } else {
      return !!(i = this.GetSightTargetActor()) && (t.FromUeVector(i.D_K2_GetActorLocation()), true);
    }
  }
  F3r(t) {
    var i;
    if (this.Uwm(this.h3r)) {
      this.h3r.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      i = this.GetSightTargetItem();
      if ((0, RegisterComponent_1.isComponentInstance)(i, 2)) {
        this.h3r.Z += i.ScaledHalfHeight - this.ActorComp.ScaledHalfHeight;
      } else {
        this.h3r.Z -= this.ActorComp.ScaledHalfHeight;
      }
      if (this.h3r.IsNearlyZero()) {
        t.DeepCopy(this.ActorComp.ActorForwardProxy);
      } else {
        t.DeepCopy(this.h3r);
        this.j3r(t);
      }
    }
  }
  H3r() {
    var t;
    if (!(Time_1.Time.Now < this.r3r)) {
      this.r3r = Time_1.Time.Now + FIND_SIGHT_TARGET_ITEM_PERIOD;
      t = [];
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD, 255, t);
      this.W3r(t);
    }
  }
  W3r(t) {
    var i = this.ActorComp.ActorLocationProxy;
    let s = SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD;
    this.SetSightTargetItem(undefined);
    for (const o of t) {
      if (o.Entity?.Active && o.Entity.Id !== this.Entity.Id) {
        var h = o.Entity.GetComponent(0).GetBaseInfo()?.FocusPriority;
        if (h) {
          var e = o.Entity.GetComponent(1);
          if (e?.Valid) {
            e.ActorLocationProxy.Subtraction(i, this.h3r);
            var r = this.h3r.SizeSquared();
            if (h > 0 && r < SQUARE_SIGHT_TARGET_ITEM_DISTANCE_THREAHOLD || h === 0 && r < s) {
              for (const a of priorityToMaxSquareDistance) {
                if (h <= a[0]) {
                  if (r > a[1]) {
                    break;
                  }
                  if (this.h3r.DotProduct(this.ActorComp.ActorForwardProxy) / Math.sqrt(r) < 0.5) {
                    break;
                  }
                  s = r;
                  this.SetSightTargetItem(e);
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
  UpdateStaticRotation(t) {
    if (this.u3r < Time_1.Time.WorldTime) {
      var i = Global_1.Global.CharacterCameraManager;
      var s = i.D_GetCameraLocation();
      var h = this.K3r(s);
      if (h === 1) {
        this.Kxr.FromUeVector(s);
        this.m3r.FromUeVector(this.Mesh.D_GetSocketLocation(CharacterNameDefines_1.CharacterNameDefines.BIP_001_HEAD));
        this.Kxr.Subtraction(this.m3r, t);
        t.Normalize();
        this.j3r(t);
        return;
      }
      if (h === 2) {
        t.FromUeVector(i.GetActorForwardVector());
        this.j3r(t);
        return;
      }
    }
    t.DeepCopy(this.ActorComp.ActorForwardProxy);
  }
  k3r(t) {
    var i = MathUtils_1.MathUtils.DegToRad * this.t3r;
    var s = Math.sin(i);
    var i = Math.cos(i);
    t.X = this.ActorComp.InputDirectProxy.X * i;
    t.Y = this.ActorComp.InputDirectProxy.Y * i;
    t.Z = s;
    if (this.MainAnimInstanceRole && this.MainAnimInstanceRole.WalkRunMix < 0.5) {
      t.Z = -Math.abs(s);
    }
    this.j3r(t);
  }
  rym(t, i) {
    var s = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
    this.Kxr.FromUeVector(s);
    this.m3r.FromUeVector(this.Mesh.D_GetSocketLocation(CharacterNameDefines_1.CharacterNameDefines.BIP_001_HEAD));
    this.Kxr.Subtraction(this.m3r, t);
    var s = t.Size();
    var h = this.ActorComp.ActorForwardProxy;
    if (ModelManager_1.ModelManager.CameraModel.CameraMode === 0 && (!(i.SightMinDistance > 0) || !(s < i.SightMinDistance)) && (!(i.SightMaxDistance > 0) || !(s > i.SightMaxDistance)) && (s = MathUtils_1.MathUtils.SignedAngleOnPlaneDeg(h, t, Vector_1.Vector.UpVectorDouble), MathUtils_1.MathUtils.IsAngleInRange(s, i.SightHorizontalAngleL, i.SightHorizontalAngleR)) && (h.CrossProduct(Vector_1.Vector.UpVectorProxy, this.h3r), s = MathUtils_1.MathUtils.SignedAngleOnPlaneDeg(h, t, this.h3r), MathUtils_1.MathUtils.IsAngleInRange(s, i.SightVerticalAngleB, i.SightVerticalAngleT))) {
      t.Normalize();
      this.j3r(t);
    } else {
      t.DeepCopy(h);
    }
  }
  IMf(t) {
    t.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
    this.j3r(t);
  }
  K3r(t) {
    this.Kxr.FromUeVector(t);
    this.Kxr.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    t = MathUtils_1.MathUtils.DotProduct(this.Kxr, this.ActorComp.ActorForwardProxy) / this.Kxr.Size();
    if (t > CAMERA_INFEED_ME) {
      return 1;
    } else if (t < -CAMERA_INFEED_ME) {
      return 2;
    } else {
      return 0;
    }
  }
  GetMeshTransform() {
    return this.Actor.Mesh.D_K2_GetComponentToWorld();
  }
  GetRandomStandActionIndex() {
    var t;
    var i;
    var s;
    if (this.ActorComp.CreatureData.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)) || !(t = t.GetFavorData()) || !(t = t.GetUnlockActionIndexList()) || (i = t.length) <= 1) {
      return 1;
    } else {
      s = Math.random() * i;
      if ((s = Math.floor(s)) <= i - 1) {
        return t[s];
      } else {
        return t[i - 1];
      }
    }
  }
  j3r(t) {
    if (this.s3r) {
      this.ActorComp.ActorQuatProxy.Inverse(this.az);
      this.az.RotateVector(t, t);
      this.s3r.RotateVector(t, t);
      this.ActorComp.ActorQuatProxy.RotateVector(t, t);
    }
  }
  HideBone(t, i, s = true) {
    CombatLog_1.CombatLog.Info("Animation", this.Entity, "骨骼隐藏", ["boneName", t], ["hide", i], ["sync", s]);
    if (this.Mesh.IsBoneHiddenByName(t) !== i && (i ? this.Mesh.HideBoneByName(t, 0) : this.Mesh.UnHideBoneByName(t), this.zFr?.HideWeaponsWhenHideBones(i, t), ModelManager_1.ModelManager.GameModeModel.IsMulti) && this.ActorComp.IsAutonomousProxy && s) {
      (s = Protocol_1.Aki.Protocol.Me_.create()).nWn = Protocol_1.Aki.Protocol.nWn.create();
      s.nWn.sWn = t.toString();
      s.nWn.aWn = !i;
      CombatMessage_1.CombatNet.Send(22634, this.Entity, s);
    }
  }
  static BoneVisibleChangeNotify(t, i) {}
  w3r(t = true) {
    var i = Info_1.Info.IsMobilePlatform();
    var s = new UE.AnimUpdateRateParameters();
    var h = this.Mesh.LODInfo.Num();
    if (t) {
      s.bShouldUseDistanceMap = true;
      s.BaseVisibleDistanceThresholds.Empty();
      s.BaseVisibleDistanceThresholds.Add(i ? 500 : 800);
      s.BaseVisibleDistanceThresholds.Add(i ? 1000 : 1500);
      s.BaseVisibleDistanceThresholds.Add(i ? 1500 : 4000);
      s.BaseVisibleDistanceThresholds.Add(i ? 2000 : 5000);
      s.BaseVisibleDistanceThresholds.Add(i ? 3000 : 8000);
    } else {
      s.bShouldUseLodMap = true;
      s.LODToFrameSkipMap.Empty();
      for (let t = 0; t < h; t++) {
        var e = t < 2 ? 0 : t - 1;
        s.LODToFrameSkipMap.Add(t, e);
      }
    }
    s.BaseNonRenderedUpdateRate = i ? 15 : 8;
    s.MaxEvalRateForInterpolation = 8;
    var r = (0, puerts_1.$ref)(s);
    var o = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let t = 0; t < o.Num(); t++) {
      o.Get(t).SetAnimUpdateRateParameters(r);
    }
    (0, puerts_1.$unref)(r);
    switch (this.ActorComp.CreatureData.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        this.DefaultVisibilityBasedAnimTickOption = 0;
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        var a = this.Entity.GetComponent(235);
        var a = this.Entity.GetComponent(0).GetSummonerId() || a?.Valid;
        this.DefaultVisibilityBasedAnimTickOption = a ? 1 : 3;
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        this.DefaultVisibilityBasedAnimTickOption = 1;
        break;
      default:
        Protocol_1.Aki.Protocol.kks.Proto_Npc;
        this.DefaultVisibilityBasedAnimTickOption = 3;
    }
    this.RefreshAnimOptimization();
  }
  SetAnimParamsInFight(t) {
    this.RefreshAnimOptimization();
  }
  GetCameraPosition(t) {
    switch (this.v3r) {
      case 0:
        this.ActorComp.ActorQuatProxy.RotateVector(this.M3r, this.h3r);
        this.ActorComp.ActorLocationProxy.Addition(this.h3r, t);
        break;
      case 1:
        t.FromUeVector(this.Mesh.D_GetSocketLocation(CharacterAnimationComponent_1.HitCase));
        break;
      default:
        this.ActorComp.ActorUpProxy.Multiply(DEFAULT_CAMERA_HEIGHT_RATE * this.ActorComp.HalfHeight, this.h3r);
        this.ActorComp.ActorLocationProxy.Addition(this.h3r, t);
    }
  }
  GetCameraTransform() {
    switch (this.v3r) {
      case 0:
        return this.Mesh.D_GetSocketTransform(CharacterAnimationComponent_1.CameraPosition, 0);
      case 1:
        return this.Mesh.D_GetSocketTransform(CharacterAnimationComponent_1.HitCase, 0);
      default:
        return this.ActorComp.ActorTransform;
    }
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
  RefreshPerformancePosition() {
    if (this.ActorComp?.IsRoleAndCtrlByMe && this.AGl && this.MainAnimInstanceRole && this.Lie?.HasTag(248240472)) {
      if (this.w3a.Equals(this.ActorComp.ActorLocationProxy)) {
        if (!(this.mn_ > Time_1.Time.Now)) {
          this.mn_ = Time_1.Time.Now + REFRESH_PERFORMANCE_PERIOD_NOT_MOVE;
          var e;
          var r;
          var o;
          var a;
          var n;
          var _ = this.Gce.CharacterMovement.CurrentFloor.HitResult.ImpactNormal.Z;
          var m = this.Entity.GetComponent(82).WaterHeightAboveMe;
          let s = false;
          let h = 0;
          for (let i = 0; i < PERFORMANCE_COUNT; ++i) {
            let t = this.AGl.Config.StandingNormalZ[i] < _ && this.AGl.Config.WaterHeight[i] > m;
            if (t && (e = this.AGl.Config.Radius[i], t = (!(e > h) || !(r = Math.min(e, this.ActorComp.ScaledRadius * 2), (o = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject = this.Actor, o.Radius = r, a = this.dSu, n = this.mSu, this.ActorComp.ActorForwardProxy.Multiply(e - r, this.h3r), this.ActorComp.ActorLocationProxy.Addition(this.h3r, a), this.ActorComp.ActorLocationProxy.Subtraction(this.h3r, n), TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, a), TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, n), TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, o, PROFILE_KEY, PROFILE_KEY) || (this.ActorComp.ActorRightProxy.Multiply(e - r, this.h3r), this.ActorComp.ActorLocationProxy.Addition(this.h3r, a), this.ActorComp.ActorLocationProxy.Subtraction(this.h3r, n), TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, a), TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, n), TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, o, PROFILE_KEY, PROFILE_KEY)))) && t)) {
              h = e;
            }
            if (t !== this.fSu[i]) {
              this.fSu[i] = t;
              s = true;
            }
          }
          if (s) {
            this.RefreshPerformanceAnimBlueprint();
          }
        }
      } else {
        this.mn_ = Time_1.Time.Now + REFRESH_PERFORMANCE_PERIOD;
        this.w3a.DeepCopy(this.ActorComp.ActorLocationProxy);
      }
    }
  }
  RefreshPerformanceAnimBlueprint() {
    if (this.MainAnimInstanceRole) {
      this.MainAnimInstanceRole.ValidPerformanceIndexes.Empty();
      for (let t = 0; t < PERFORMANCE_COUNT; ++t) {
        if (this.fSu[t] && this.m1m[t].size === 0) {
          this.MainAnimInstanceRole.ValidPerformanceIndexes.Add(t);
        }
      }
    }
  }
  d6_() {
    var t;
    var i;
    var s;
    if (this.AnimLogicParamsSetter && (t = this.MainAnimInstanceRole?.LogicParams)) {
      i = this.AnimLogicParamsSetter;
      t.InputDirectRef = i.InputDirect.ToUeVectorOld();
      t.InputRotatorRef = i.InputRotator.ToUeRotator();
      t.AccelerationRef = i.Acceleration.ToUeVectorOld();
      t.IsMovingRef = i.IsMoving;
      t.HasMoveInputRef = i.HasMoveInput;
      t.SpeedRef = i.Speed;
      t.IsJumpRef = i.IsJump;
      t.GroundedTimeRef = i.GroundedTime;
      t.IsFallingIntoWaterRef = i.IsFallingIntoWater;
      t.JumpUpRateRef = i.JumpUpRate;
      t.ForceExitStateStopRef = i.ForceExitStateStop;
      if ((s = this.Entity.GetComponent(36))?.Valid) {
        t.ClimbInfoRef = s.GetClimbInfoNew();
        t.ClimbStateRef = s.GetClimbStateNew();
      }
      t.ClimbOnWallAngleRef = i.ClimbOnWallAngle;
      t.SprintSwimOffsetRef = i.SprintSwimOffset;
      t.SprintSwimOffsetLerpSpeedRef = i.SprintSwimOffsetLerpSpeed;
      t.SlideForwardRef = i.SlideForward.ToUeVectorOld();
      t.SlideSwitchThisFrameRef = i.SlideSwitchThisFrame;
      t.SlideStandModeRef = i.SlideStandMode;
      t.bIsInSplineMove = i.IsInSplineMove;
      t.CharMoveStateRef = i.CharMoveState;
      t.CharPositionStateRef = i.CharPositionState;
      t.CharCameraStateRef = i.CharCameraState;
      t.bSitDown = i.SitDown;
      t.SitDownType = i.SitDownType;
      t.SitDownDirect = i.SitDownDirect;
      t.StandUpDirect = i.StandUpDirect;
      t.LeftHandIKTargetCS = i.LeftHandIkTarget.ToUeIkTarget();
      t.RightHandIKTargetCS = i.RightHandIkTarget.ToUeIkTarget();
      t.RagQuitStateRef = i.RagQuitState;
      t.IsOnVehicle = i.IsOnVehicle;
      t.VehicleType = i.VehicleType;
      t.IsLeavingVehicle = i.IsLeavingVehicle;
    }
  }
  GetAnimInstance() {
    if (this.ActorComp?.IsChangingMeshAnim) {
      let t = this.Mesh?.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE);
      return t = t || this.Mesh?.GetAnimInstance();
    }
    return this.MainAnimInstanceInternal;
  }
  O0d() {
    return ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1;
  }
  SetSightCameraData(t) {
    this.iym = t;
  }
  GetSightCameraData() {
    return this.iym;
  }
};
CharacterAnimationComponent.CameraPosition = new UE.FName("CameraPosition");
CharacterAnimationComponent.HitCase = new UE.FName("HitCase");
CharacterAnimationComponent.ebc = new UE.FName("DD_Bip001Pelvis");
__decorate([CombatMessage_1.CombatNet.Listen("YFn", true)], CharacterAnimationComponent, "BoneVisibleChangeNotify", null);
CharacterAnimationComponent = CharacterAnimationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(188)], CharacterAnimationComponent);
exports.CharacterAnimationComponent = CharacterAnimationComponent; //# sourceMappingURL=CharacterAnimationComponent.js.map