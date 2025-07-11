"use strict";

var CharacterClimbComponent_1;
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
exports.CharacterClimbComponent = exports.SClimbState = exports.SClimbInfo = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../Core/Common/Time");
const ClimbById_1 = require("../../../../../../Core/Define/ConfigQuery/ClimbById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../../../../../World/WorldGlobal");
const LocomotionUtils_1 = require("../../../LocomotionUtils");
const RoleAudioController_1 = require("../../../Role/RoleAudioController");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const PROFILE_KEY = "CharacterClimbComponent_DetectClimbFromTop";
const THREAHOLD_JUMP_LEAVE = -0.707;
const THREADHOLD_ENTER_CLIMB_FORWARD_NEED = 0.707;
const THREAHOLD_ENTER_CLIMB_MIN_Z_SPEED = -500;
const FIVE_SECONDS = 5;
const NORMAL_CACHE_TIME = 200;
const FAST_CACHE_TIME = 100;
const CACHE_TIME_FROM_TOP = 400;
const CACHE_TIME_UP_ARRIVE = 300;
const EXIT_CLIMB_CACHE_TIME = 300;
const INPUT_ADD_LENGTH = 500;
const DOUBLE_HALFHEIGHT = 2;
const ONE_POINT_FIVE_HALFHRIGHT = 1.5;
const KINDA_LESS_THAN_ONE = 0.85;
const STRENGTH_THREADHOLD = 10;
const THREADHOLD_FORWARD_BLOCK = -0.707;
const THREADHOLD_MODEL_BUFFER = 0.9;
const NORMAL_GROUP_ID = 1;
const SHORT_DRAW_TIME = 0.1;
const LONG_DRAW_TIME = 5;
const CAN_ENTER_CLIMB_CD = 500;
const CLIMBING_CAPSULE_SIZE = 5;
const MAX_ROLE_HALF_HEIGHT = 85;
const MAX_ROLE_RADIUS = 25;
const MAX_ROLE_CYLINDER_HALF_HEIGHT = MAX_ROLE_HALF_HEIGHT - MAX_ROLE_RADIUS;
const MAX_SAFETY_DIST = 100;
const ENTER_CLIMB_ANGLE = 35;
const ENTER_SPINT_VAULT_ANGLE = 45;
const DEFAULT_DETECT_LENGTH = 150;
const EXIT_CLIMB_TIME = 800;
const traceColor = new UE.LinearColor(1, 0, 0, 1);
const traceSuccessColor = new UE.LinearColor(0, 1, 0, 1);
const canEnterClimbAirStates = new Set([CharacterUnifiedStateTypes_1.ECharMoveState.Other, CharacterUnifiedStateTypes_1.ECharMoveState.Flying, CharacterUnifiedStateTypes_1.ECharMoveState.Glide, CharacterUnifiedStateTypes_1.ECharMoveState.Slide]);
class SClimbInfo {
  constructor(t, i, s) {
    this.攀爬移动中 = true;
    this.攀爬输入向量 = undefined;
    this.OnWallAngle = 0;
    this.攀爬移动中 = t ?? false;
    this.攀爬输入向量 = Vector2D_1.Vector2D.Create(i);
    this.OnWallAngle = s ?? 0;
  }
  Equals(t) {
    return t !== undefined && this.攀爬移动中 === t.攀爬移动中 && this.攀爬输入向量.Equals(t.攀爬输入向量) && this.OnWallAngle === t.OnWallAngle;
  }
  DeepCopy(t) {
    this.攀爬移动中 = t.攀爬移动中;
    this.攀爬输入向量.DeepCopy(t.攀爬输入向量);
    this.OnWallAngle = t.OnWallAngle;
  }
  Copy() {
    var t = Vector2D_1.Vector2D.Create(this.攀爬输入向量.X, this.攀爬输入向量.Y);
    return new SClimbInfo(this.攀爬移动中, t, this.OnWallAngle);
  }
}
exports.SClimbInfo = SClimbInfo;
class SClimbState {
  constructor(t, i, s) {
    this.攀爬状态 = 0;
    this.进入攀爬类型 = 0;
    this.退出攀爬类型 = 0;
    this.攀爬状态 = t ?? 0;
    this.进入攀爬类型 = i ?? 0;
    this.退出攀爬类型 = s ?? 0;
  }
  Equals(t) {
    return t !== undefined && this.攀爬状态 === t.攀爬状态 && this.进入攀爬类型 === t.进入攀爬类型 && this.退出攀爬类型 === t.退出攀爬类型;
  }
  DeepCopy(t) {
    this.攀爬状态 = t.攀爬状态;
    this.进入攀爬类型 = t.进入攀爬类型;
    this.退出攀爬类型 = t.退出攀爬类型;
  }
  Copy() {
    return new SClimbState(this.攀爬状态, this.进入攀爬类型, this.退出攀爬类型);
  }
}
exports.SClimbState = SClimbState;
let CharacterClimbComponent = CharacterClimbComponent_1 = class CharacterClimbComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.b$r = t => {
      this.q$r(t);
    };
    this.I3r = (t, i) => {
      if (!i) {
        if (t?.Valid && (i = t.GetComponent(34))?.Valid && (i.G$r.ContainsNaN() && (Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 6, "OnStateInherit ClimbInput is Nan.", ["ClimbInput", i.G$r]), i.G$r.Reset()), this.G$r.DeepCopy(i.G$r), this.N$r.DeepCopy(i.N$r), this.O$r = i.O$r, this.k$r = i.k$r, this.F$r = i.F$r, this.V$r = i.V$r, this.y5a.DeepCopy(i.y5a), this.SetClimbState(i.H$r), this.SetEnterClimbType(i.j$r), this.SetExitClimbType(i.W$r), this.K$r = i.K$r, this.H$r !== 0)) {
          this.Q$r.SyncFromOther(i.Q$r);
          this.Hte.ResetCachedVelocityTime();
        }
      }
    };
    this.ero = (t, i, s) => {
      if (this.Gce.CharacterMovement?.MovementMode === 6 && this.Gce.CharacterMovement?.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB && !(i = this.Entity.GetComponent(40).GetSkillInfo(i), NORMAL_GROUP_ID !== i.GroupId) && (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb || this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb)) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 1,
          Context: "[CharacterClimbComponent.OnUseSkill]"
        });
      }
    };
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.X$r = undefined;
    this.$$r = undefined;
    this.Y$r = undefined;
    this.J$r = undefined;
    this.z$r = undefined;
    this.Z$r = undefined;
    this.eYr = undefined;
    this.tYr = undefined;
    this.iYr = undefined;
    this.oYr = undefined;
    this.F$r = undefined;
    this.V$r = Vector_1.Vector.Create();
    this.rYr = undefined;
    this.nYr = undefined;
    this.sYr = Vector_1.Vector.Create();
    this.G$r = Vector2D_1.Vector2D.Create();
    this.N$r = Vector2D_1.Vector2D.Create();
    this.aYr = 0;
    this.k$r = false;
    this.hYr = false;
    this.O$r = false;
    this.H$r = 0;
    this.W$r = 5;
    this.j$r = 0;
    this.K$r = 0;
    this.lYr = false;
    this._Yr = 0;
    this.uYr = undefined;
    this.cYr = undefined;
    this.y5a = Vector_1.Vector.Create();
    this.DVr = (t, i) => {
      var s;
      if (t !== i) {
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb && i === CharacterUnifiedStateTypes_1.ECharPositionState.Air && this.W$r !== 4 && this.W$r !== 10 && (s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy)) > 1) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Movement", 6, "错误的退出攀爬", ["退出模式", this.W$r], ["速度", this.Hte.ActorVelocityProxy], ["动作", this.oRe.MainAnimInstance.GetMainAnimsDebugText()]);
          }
          this.Lz.DeepCopy(this.Hte.ActorVelocityProxy);
          GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, -s);
          this.Gce.SetForceSpeed(this.Lz);
        }
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
          let t = undefined;
          let i = false;
          if (Math.abs(this.Hte.ActorForwardProxy.DotProduct(this.Gce.GravityUp)) > MathUtils_1.MathUtils.SmallNumber && (MathUtils_1.MathUtils.LookRotationUpFirst(this.Hte.ActorForwardProxy, this.Gce.GravityUp, this.az), this.az.Rotator(this.Gue), this.Hte?.SetActorRotation(this.Gue.ToUeRotator(), "ExitClimb", false), i = true, this.oRe) && !t) {
            t = this.oRe.GetMeshTransform();
          }
          if (!this.Hte.IsDefaultCapsule) {
            if ((s = LocomotionUtils_1.LocomotionUtils.FindSpaceForExitClimb(this.Hte, this.Hte.DefaultHalfHeight, this.Hte.DefaultRadius, CLIMBING_CAPSULE_SIZE, this.Lz)) === 2) {
              this.Hte.SetActorLocation(this.Lz.ToUeVector(), "ExitClimb Capsule Safety", false);
              i = true;
              if (this.oRe && !t) {
                t = this.oRe.GetMeshTransform();
              }
            } else if (s === 1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 6, "ExitClimb Capsule NotSafety", ["CurrentLocation", this.Hte?.ActorLocationProxy], ["Last", this.y5a]), this.Hte.SetActorLocation(this.y5a.ToUeVector(), "ExitClimb Capsule NotSafety", false), i = true, this.oRe) && !t) {
              t = this.oRe.GetMeshTransform();
            }
          }
          if (i && t) {
            this.oRe.SetModelBuffer(t, FAST_CACHE_TIME);
          }
          this.Hte.ResetCapsuleRadiusAndHeight();
          this.mYr();
        } else if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
          this.Hte.SetRadiusAndHalfHeight(CLIMBING_CAPSULE_SIZE, CLIMBING_CAPSULE_SIZE, false);
        }
      }
    };
    this.Xte = undefined;
    this.HBr = undefined;
    this.dYr = Vector_1.Vector.Create();
    this.CYr = undefined;
    this.gYr = -0;
    this.Y8c = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.az = Quat_1.Quat.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.Z_e = Transform_1.Transform.Create();
    this.Q$r = undefined;
    this.DebugNoTop = false;
    this.pYr = 0;
    this.vYr = 0;
    this.MYr = 0;
    this.EYr = 0;
    this.mWi = undefined;
    this.SYr = 0;
    this.yYr = undefined;
    this.IYr = t => {
      if (t) {
        if (!this.yYr) {
          this.yYr = this.Disable("[CharacterClimbComponent.OnForbiddenClimbChanged] 禁用攀爬");
          if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
            this.TYr();
          }
        }
      } else if (this.yYr) {
        this.Enable(this.yYr, "[CharacterClimbComponent.OnForbiddenClimbChanged] 启用攀爬");
        this.yYr = undefined;
      }
    };
    this.LYr = t => {
      if (t && this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
        this.TYr();
      }
    };
    this.DYr = Vector_1.Vector.Create();
    this.RYr = Stats_1.Stat.Create("OnTick1");
    this.UYr = Stats_1.Stat.Create("OnTick2");
    this.AYr = Stats_1.Stat.Create("OnTick3");
    this.PYr = Stats_1.Stat.Create("DetectClimb1");
    this.xYr = Stats_1.Stat.Create("DetectClimb2");
    this.wYr = Stats_1.Stat.Create("DetectClimb3");
    this.BYr = Stats_1.Stat.Create("DetectUpArriveBothVaultAndOnTop1");
    this.bYr = Stats_1.Stat.Create("DetectUpArriveBothVaultAndOnTop2");
    this.qYr = Stats_1.Stat.Create("DetectClimbWalking1");
    this.GYr = Rotator_1.Rotator.Create(0, 180, 0);
    this.NYr = Stats_1.Stat.Create("DetectEnterClimb1");
    this.OYr = Stats_1.Stat.Create("DetectEnterClimb2");
    this.kYr = undefined;
    this.FYr = new Set([2, 7, 9, 8]);
    this.AwakeClimbInput = t => {
      this.k$r = t;
    };
    this.VYr = Stats_1.Stat.Create("ClimbingExitPositionFix1");
    this.HYr = Stats_1.Stat.Create("ClimbingExitPositionFix2");
    this.jYr = Stats_1.Stat.Create("ClimbingExitPositionFix3");
  }
  static get Dependencies() {
    return [3, 178];
  }
  get ClimbBlocking() {
    return this.lYr;
  }
  set ClimbBlocking(t) {
    if (this.lYr !== t) {
      this.lYr = t;
      if (this.lYr) {
        this.Xte.AddTag(-787153509);
      } else {
        this.Xte.RemoveTag(-787153509);
      }
    }
  }
  UpdateClimbDebug() {
    var t;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      t = this.Hte.Actor.TsCharacterDebugComponent;
      this.DebugNoTop = t.NoTop;
      this.pYr = t.EnterClimbTrace;
      this.vYr = t.VaultClimbTrace;
      this.MYr = t.UpArriveClimbTrace;
      this.EYr = t.ClimbingTrace;
    }
  }
  OnInitData() {
    this.F$r = new UE.Transform(Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.ZeroVector, Vector_1.Vector.OneVector);
    this.nYr = new UE.Transform(Quat_1.Quat.Identity, Vector_1.Vector.ZeroVector, Vector_1.Vector.OneVector);
    this.uYr = (0, puerts_1.$ref)(undefined);
    this.cYr = (0, puerts_1.$ref)(undefined);
    return true;
  }
  OnInit() {
    this.Xte = this.Entity.GetComponent(205);
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.Gce = this.Entity.CheckGetComponent(178);
    this.oRe = this.Entity.GetComponent(177);
    this.HBr = this.Entity.CheckGetComponent(175);
    this.k$r = true;
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveClimb, this.b$r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero);
    this.X$r = ClimbById_1.configClimbById.GetConfig(this.Hte.CreatureData.GetRoleConfig().RoleBody);
    if (!this.X$r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "没有配置攀爬", ["RoleBody", this.Hte.CreatureData.GetRoleConfig().RoleBody]);
      }
      return false;
    }
    this.Q$r = UE.NewObject(UE.KuroClimbObject.StaticClass(), this.Hte.Actor);
    var t = UE.NewArray(UE.Vector);
    for (const h of this.X$r.ClimbDetectPoints) {
      t.Add(WorldGlobal_1.WorldGlobal.ToUeVectorOld(h));
    }
    this.Q$r.InitBase(this.Hte.Actor.CapsuleComponent, QueryTypeDefine_1.KuroCollisionChannel.Climb, t, this.X$r.DetectRadius, this.X$r.ClimbRadius, DEFAULT_DETECT_LENGTH);
    this.Q$r.InitClimbSafety(MAX_ROLE_RADIUS, MAX_ROLE_HALF_HEIGHT, MAX_SAFETY_DIST);
    this.$$r = WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.ClimbVault);
    this.Y$r = WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.ClimbOnTop);
    this.J$r = WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.ClimbFromTop);
    this.rYr = WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.ClimbSprintVault);
    this.z$r = new UE.SClimbInfo(Vector_1.Vector.ZeroVector, false, new UE.Vector2D(0, 0), false);
    this.Z$r = new UE.ClimbInfoStruct();
    this.eYr = new SClimbInfo();
    this.tYr = new UE.SClimbState();
    this.iYr = new UE.ClimbStateStruct();
    this.oYr = new SClimbState();
    t.Empty();
    var i = UE.NewArray(UE.BuiltinFloat);
    var s = UE.NewArray(UE.BuiltinFloat);
    t.Add(this.Y$r);
    i.Add(this.X$r.UpArriveRange.Min);
    s.Add(this.X$r.UpArriveRange.Max);
    t.Add(this.$$r);
    i.Add(this.X$r.VaultRange.Min);
    s.Add(this.X$r.VaultRange.Max);
    this.Q$r.InitUpArrives(t, i, s);
    this.Q$r.InitSprintVault(this.X$r.ForwardBlockHeight, this.X$r.ForwardBlockRadius, this.X$r.ForwardBlockDistance.Min, this.X$r.ForwardBlockDistance.Max, this.rYr, this.X$r.SprintVaultRange.Min, this.X$r.SprintVaultRange.Max, this.X$r.SprintVaultLongNeedDistance, this.X$r.SprintVaultLongHeight, QueryTypeDefine_1.KuroTraceTypeQuery.AcrossBlock, this.X$r.SprintVaultLongRange.Min, this.X$r.SprintVaultLongRange.Max, ENTER_SPINT_VAULT_ANGLE);
    this.Q$r.InitBlockUps(WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.BlockUpOffset), this.X$r.BlockUpDetectRadius, this.X$r.BlockUpDetectDistance, this.X$r.BlockUpBackDistance, this.X$r.BlockUpBackMinDist, WorldGlobal_1.WorldGlobal.ToUeVectorOld(this.X$r.BlockUpFinalMove), this.X$r.BlockUpVerticalRange.Min, this.X$r.BlockUpVerticalRange.Max);
    this.hYr = true;
    this.WYr();
    if (this.Xte?.Valid) {
      if (this.Xte.HasTag(1448371427)) {
        this.yYr = this.Disable("[CharacterClimbComponent.OnStart] 包含了禁止攀爬Tag");
      }
      this.Xte.ListenForTagAnyCountChanged(1448371427, this.IYr);
      this.Xte.ListenForTagAnyCountChanged(-866600078, this.LYr);
    }
    this.y5a.DeepCopy(this.Hte.ActorLocationProxy);
    return true;
  }
  WYr() {
    this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.mWi.WorldContextObject = this.Hte.Owner;
    this.mWi.bIgnoreSelf = true;
    this.mWi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    this.mWi.SetDrawDebugTrace(this.pYr);
    this.mWi.DrawTime = FIVE_SECONDS;
    this.mWi.Radius = this.X$r.ClimbRadius * KINDA_LESS_THAN_ONE;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.mWi, traceColor);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.mWi, traceSuccessColor);
  }
  OnActivate() {
    this.aYr = this.Hte.ScaledHalfHeight;
    this.UpdateClimbDebug();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveClimb, this.b$r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero);
    return true;
  }
  OnTick(t) {
    if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn) {
      i = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.DYr);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "TickMove", ["Entity", this.Entity.Id], ["PrevLocation", this.DYr], ["CurrentLocation", this.Hte.ActorLocationProxy], ["MovementMode", this.Gce.CharacterMovement.MovementMode], ["CustomMode", this.Gce.CharacterMovement.CustomMovementMode], ["Delta", t], ["Dist", i], ["MainAnim", this.oRe.MainAnimInstance.GetDebugAnimNodeString()]);
      }
      if (t * 2 < i && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "OverSpeed", ["Velocity", this.Hte.ActorVelocityProxy]);
      }
      if (i > 500 && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "OverSpeed2", ["Velocity", this.Hte.ActorVelocityProxy]);
      }
      (i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject = this.Hte.Actor;
      i.Radius = CLIMBING_CAPSULE_SIZE;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.DYr);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Hte.ActorLocationProxy);
      if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, i, PROFILE_KEY, PROFILE_KEY) && (i = i.HitResult, Log_1.Log.CheckWarn())) {
        Log_1.Log.Warn("Test", 6, "MoveHit Something", ["Actor", i.Actors.Get(0)?.GetName()], ["Comp", i.Components.Get(0)?.GetName()]);
      }
      this.DYr.DeepCopy(this.Hte.ActorLocationProxy);
    }
    this.RYr.Start();
    var i = this.Hte.InputDirectProxy;
    if (this.H$r !== 0) {
      if (i.ContainsNaN()) {
        this.G$r.Reset();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 6, "Set Climb Input Nan.", ["Input", i]);
        }
      } else {
        this.G$r.X = i.X;
        this.G$r.Y = i.Y;
      }
      if (this._Yr) {
        if (this.N$r.IsNearlyZero()) {
          this.N$r.DeepCopy(this.G$r);
        } else if (!this.N$r.Equals(this.G$r)) {
          this._Yr = 0;
        }
      }
    } else {
      this.G$r.Reset();
      this.N$r.Reset();
    }
    this.RYr.Stop();
    this.UYr.Start();
    let s = this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
    if (s) {
      if (this.H$r !== 3) {
        this.y5a.FromUeVector(this.Q$r.D_GetSafetyLocation());
      }
    } else {
      this.y5a.DeepCopy(this.Hte.ActorLocationProxy);
    }
    if (s) {
      if (this.K$r > 0 && (this.K$r -= t, this.K$r <= 0)) {
        this.OnExitClimb();
        s = false;
      }
    } else {
      this.K$r = 0;
    }
    if (!s && !this.O$r && (!!this.Gce.HasMoveInput || this.HBr?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) && (!!this.Xte.HasTag(-1462404775) || !!(MathUtils_1.MathUtils.DotProduct(i, this.Hte.ActorForwardProxy) > THREADHOLD_ENTER_CLIMB_FORWARD_NEED))) {
      this.SetClimbState(0);
      this.KYr(t);
    }
    this.UYr.Stop();
    this.AYr.Start();
    if (s && FormationAttributeController_1.FormationAttributeController.GetValue(1) <= 0 && this.H$r !== 3 && !this.Xte.HasTag(-976785652)) {
      this.TYr();
    }
    this.O$r = s;
    this.AYr.Stop();
    if (CharacterClimbComponent_1.DebugLogController && s) {
      this.foc();
    }
  }
  GetExitClimbType() {
    return this.W$r;
  }
  KYr(t) {
    var i;
    if ((!this.Xte.HasTag(-1371021686) || !!this.Xte.HasTag(1781274524)) && (!(i = this.QYr()) || this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide || this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || !(this.wYr.Start(), this.XYr(), this.wYr.Stop(), this.H$r !== 0))) {
      if (i || this.Xte.HasTag(400631093)) {
        this.PYr.Start();
        this.$Yr(true);
        this.PYr.Stop();
        i = this.Hte?.Entity?.GetComponent(40);
        if (this.H$r !== 0) {
          this.xYr.Start();
          i.StopGroup1Skill("攀爬打断技能");
          this.xYr.Stop();
        }
      } else {
        this.PYr.Start();
        this.$Yr(false);
        this.PYr.Stop();
      }
    }
  }
  $Yr(t) {
    switch (this.HBr.PositionState) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        this.YYr(t);
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        if (canEnterClimbAirStates.has(this.HBr.MoveState)) {
          if (this.JYr() && (this.zYr(), this.H$r === 0)) {
            this.ZYr(t ? 4 : this.Gce.IsJump ? 2 : 0);
          }
        } else {
          if (this.HBr.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
            break;
          }
          this.zYr();
          if (this.H$r !== 0) {
            return;
          }
          this.Y8c.FromUeVector(this.Hte.ActorVelocityProxy);
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Y8c);
          this.sJr(t ? 4 : 0, this.Y8c);
        }
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        if (this.JYr() && this.Entity.GetComponent(77).CheckCanEnterClimbFromSwim() && (this.zYr(), this.H$r === 0)) {
          this.ZYr(1);
        }
    }
  }
  zYr() {
    this.BYr.Start();
    var t = this.Q$r.D_TryUpArrives(this.Hte.ActorForward, this.eJr(this.vYr), this.uYr);
    this.BYr.Stop();
    this.bYr.Start();
    switch (t) {
      case 1:
        this.tJr(2, (0, puerts_1.$unref)(this.uYr));
        break;
      case 2:
        this.tJr(7, (0, puerts_1.$unref)(this.uYr));
    }
    this.bYr.Stop();
  }
  YYr(t) {
    if (!this.Xte.HasTag(498191540) || !(this.qYr.Start(), this.iJr(), this.qYr.Stop(), this.H$r !== 0)) {
      if (this.JYr() && (this.zYr(), this.H$r === 0)) {
        this.ZYr(t ? 4 : 2);
      }
    }
  }
  mYr() {
    this.Q$r.ExitClimb();
    this.SetClimbState(0);
    this.SetExitClimbType(5);
    this.sYr.Set(0, 0, 0);
    this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
    this.ClimbBlocking = false;
  }
  CanClimbPress() {
    return true;
  }
  TYr() {
    var t;
    var i;
    if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy) > 0) {
      this.Lz.DeepCopy(this.Hte.ActorVelocityProxy);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz);
      this.Gce.SetForceSpeed(this.Lz);
    }
    if (this.H$r === 2) {
      this.oJr();
    }
    if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb) {
      this.Lz.DeepCopy(this.Hte.InputDirectProxy);
      if (!this.Lz.IsNearlyZero()) {
        if (Math.abs(this.Lz.Y) > MathUtils_1.MathUtils.SmallNumber) {
          i = this.Hte.ActorForwardProxy;
          t = this.Hte.ActorRightProxy;
          i.Multiply(Math.abs(this.Lz.X), this.Tz);
          t.Multiply(this.Lz.Y, this.fHo);
          this.Tz.AdditionEqual(this.fHo);
          MathUtils_1.MathUtils.LookRotationUpFirst(this.Tz, this.Gce.GravityUp, this.az);
          (i = this.Hte.ActorTransform).SetRotation(this.az.ToUeQuat());
          this.SetCharacterTransformAndBuffer(i, EXIT_CLIMB_CACHE_TIME);
        }
      }
    }
    this.Hte.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterClimbComponent.NormalExitClimb]"
    });
  }
  ClimbPress(t) {
    if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb && this.H$r === 2) {
      this.TYr();
      this.SYr = Time_1.Time.Now + CAN_ENTER_CLIMB_CD;
    }
  }
  rJr(t, i) {
    this.Lz.DeepCopy(i);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz);
    this.Lz.Normalize();
    return GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.Hte, i, t);
  }
  NeedProcessTransform() {
    return (this.H$r !== 1 || !!this.hYr) && (this.H$r === 2 || this.H$r === 1);
  }
  nJr(t, i = NORMAL_CACHE_TIME) {
    this.Lz.FromUeVector(t.GetLocation());
    if (this.oRe?.Valid && MathUtils_1.MathUtils.DotProduct(t.GetRotation().GetForwardVector(), this.nYr.GetRotation().GetForwardVector()) < THREADHOLD_MODEL_BUFFER) {
      this.SetCharacterTransformAndBuffer(t, i);
    } else {
      this.Hte.SetActorTransform(t, "攀爬.ConfirmMove", true);
    }
    this.Q$r.ConfirmMove();
  }
  JYr() {
    this.Lz.FromUeVector(this.Gce.CharacterMovement.Kuro_GetBlockDirectWhenMove());
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz);
    return !!this.Lz.Normalize() && !(this.Hte.InputDirectProxy.DotProduct(this.Lz) > THREADHOLD_FORWARD_BLOCK);
  }
  tJr(t, i, s = true) {
    if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      this.Gce.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_StepAcross);
    } else {
      this.Gce.PlayerMotionRequest(Protocol_1.Aki.Protocol.t8s.Proto_ClimbTop);
    }
    if (s) {
      this.Hte?.Actor.KuroSetMovementMode({
        Mode: 6,
        CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
        Context: "[CharacterClimbComponent.UpArrive]"
      });
    }
    this.SetClimbState(3);
    this.K$r = EXIT_CLIMB_TIME;
    this.SetExitClimbType(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharClimbStartExit, this.Entity.Id, t);
    if (this.QYr()) {
      if (t === 2) {
        this.SetExitClimbType(6);
      } else if (t === 7) {
        this.SetExitClimbType(9);
        this.Lz.Set(0, 0, this.$$r.Z - this.rYr.Z);
        s = i.TransformPosition(this.Lz.ToUeVector());
        i.SetLocation(s);
      }
    }
    this.V$r.FromUeVector(i.GetLocation());
    var s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorForwardProxy);
    if (s <= 0) {
      i.SetLocation(this.Hte.ActorLocation);
      this.V$r.Subtraction(this.Hte.ActorLocationProxy, this.Lz);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, 2);
    } else {
      this.Lz.DeepCopy(this.V$r);
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, this.Lz, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorLocationProxy));
      i.SetLocation(this.Lz.ToUeVector());
      this.Lz.Reset();
      this.V$r.Subtraction(this.Hte.ActorLocationProxy, this.Tz);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Tz) + 2);
    }
    BlackboardController_1.BlackboardController.SetVectorValueByEntity(this.Entity.Id, "ClimbOnTopMove", this.Lz.X, this.Lz.Y, this.Lz.Z);
    if (t === 10) {
      s = this.Q$r.GetSecondMoveOffset();
      BlackboardController_1.BlackboardController.SetVectorValueByEntity(this.Entity.Id, "ClimbBlockUpSecondMove", s.X, s.Y, s.Z);
    }
    if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "UpArrive", ["NewLocation", i.GetLocation()], ["From", this.Hte.ActorLocationProxy], ["Forward", this.Hte.ActorForwardProxy], ["ExitClimbType", this.W$r]);
    }
    if (this.W$r === 9 || this.W$r === 8 || this.W$r === 6) {
      this.SetCharacterTransformAndBuffer(i, FAST_CACHE_TIME);
    } else {
      this.SetCharacterTransformAndBuffer(i, CACHE_TIME_UP_ARRIVE);
    }
    if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "UpArrive2", ["Location", this.Hte.ActorLocationProxy]);
    }
  }
  eJr(t) {
    switch (t) {
      case 1:
        return SHORT_DRAW_TIME;
      case 2:
        return LONG_DRAW_TIME;
      default:
        return 0;
    }
  }
  iJr() {}
  ZYr(t) {
    this.NYr.Start();
    if (this.SYr > Time_1.Time.Now || FormationAttributeController_1.FormationAttributeController.GetValue(1) <= STRENGTH_THREADHOLD) {
      this.NYr.Stop();
    } else if (this.Xte.HasTag(-866600078)) {
      this.NYr.Stop();
    } else {
      if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && this.Xte.HasTag(-1371021686)) {
        this.Y8c.DeepCopy(this.Hte.InputDirectProxy);
      } else {
        var i = this.Hte.ActorVelocityProxy;
        if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, i) < THREAHOLD_ENTER_CLIMB_MIN_Z_SPEED) {
          this.NYr.Stop();
          return;
        }
        this.Hte.InputDirectProxy.Multiply(INPUT_ADD_LENGTH, this.Y8c);
        this.Y8c.AdditionEqual(i);
      }
      this.NYr.Stop();
      this.OYr.Start();
      this.sJr(t, this.Y8c);
      this.OYr.Stop();
    }
  }
  sJr(i, t, s = false) {
    if (t.Normalize()) {
      this.kYr ||= Transform_1.Transform.Create();
      this.kYr.SetLocation(this.Hte.ActorLocationProxy);
      this.kYr.SetScale3D(this.Hte.ActorScaleProxy);
      MathUtils_1.MathUtils.LookRotationForwardFirst(t, this.Gce.GravityUp, this.kYr.GetRotation());
      if (this.Q$r.D_TryStartClimb(this.kYr.ToUeTransform(), this.eJr(this.pYr), this.uYr)) {
        const h = (0, puerts_1.$unref)(this.uYr);
        this.az.FromUeQuat(h.GetRotation());
        this.az.GetForwardVector(this.Lz);
        if (GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbsForActor(this.Hte, this.Lz, t) > ENTER_CLIMB_ANGLE) {
          if (s && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "超过一定角度则不允许进入攀爬");
          }
        } else {
          this.Hte.Actor.KuroSetMovementMode({
            Mode: 6,
            CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
            Context: "CharacterClimbComponent.DetectEnterClimbWithDirectInternal",
            Callback: () => {
              var t;
              if (this.Xte.HasTag(388142570)) {
                this.SetClimbState(2);
              } else {
                this.SetClimbState(1);
              }
              this.SetEnterClimbType(i);
              if (i === 4) {
                this.HBr.SwitchFastClimb(true);
                (t = Vector_1.Vector.Create(h.GetRotation().GetForwardVector())).Normalize(MathUtils_1.MathUtils.SmallNumber);
                this._Yr = this.rJr(this.Hte.ActorForwardProxy, t);
              } else {
                this._Yr = 0;
              }
              this.nJr(h, NORMAL_CACHE_TIME);
              this.hYr = true;
              if (s && Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 42, "成功进入攀爬状态");
              }
            }
          });
        }
      } else if (s && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "TryStartClimb检测非法，进入攀爬失败");
      }
    }
  }
  aJr() {
    this.TYr();
  }
  XYr() {
    switch (this.Q$r.D_TrySprintVault(this.eJr(this.vYr), this.uYr, this.cYr)) {
      case 1:
        this.tJr(9, (0, puerts_1.$unref)(this.uYr));
        break;
      case 2:
        var t = (0, puerts_1.$unref)(this.uYr);
        this.tJr(8, t);
        this.az.FromUeQuat(t.GetRotation());
        this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Lz);
        this.Lz.MultiplyEqual((0, puerts_1.$unref)(this.cYr));
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(this.Entity.Id, "ClimbAddMove", this.Lz.X, this.Lz.Y, this.Lz.Z);
        break;
      default:
        return;
    }
    RoleAudioController_1.RoleAudioController.PlayRoleAudio(this.Entity, 1003);
  }
  DealClimbUpStart() {}
  DealClimbUpFinish() {
    var t = LocomotionUtils_1.LocomotionUtils.FindSpaceForExitClimb(this.Hte, this.Hte.DefaultHalfHeight, this.Hte.DefaultRadius, CLIMBING_CAPSULE_SIZE, this.Lz);
    if (t === 2) {
      this.Z_e.Set(this.Lz, this.Hte.ActorQuatProxy, this.Hte.ActorScaleProxy);
      this.SetCharacterTransformAndBuffer(this.Z_e.ToUeTransform(), FAST_CACHE_TIME, undefined, false);
    } else if (t === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "DealClimbUpFinish NotSafety", ["CurrentLocation", this.Hte?.ActorLocationProxy], ["Last", this.y5a]);
      }
      this.Z_e.Set(this.y5a, this.Hte.ActorQuatProxy, this.Hte.ActorScaleProxy);
      this.SetCharacterTransformAndBuffer(this.Z_e.ToUeTransform(), FAST_CACHE_TIME, undefined, false);
    }
    this.Hte.ResetCapsuleRadiusAndHeight();
  }
  q$r(i) {
    CharacterClimbComponent_1.wz.Start();
    var t = this.NeedProcessTransform();
    if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "ProcessClimbing", ["Entity", this.Entity.Id], ["Location", this.Hte.ActorLocationProxy], ["HasKuroRootMotionAnim", this.oRe.MainAnimInstance.HasKuroRootMotionAnim()], ["MoveSpeed", this.Gce.CharacterMovement.AnimRootMotionVelocity], ["DeltaTime", i], ["NeedProcess", t]);
    }
    this.Lz.DeepCopy(this.oRe.MainAnimInstance.HasKuroRootMotionAnim() ? this.Gce.CharacterMovement.AnimRootMotionVelocity : Vector_1.Vector.ZeroVector);
    if (this.CYr) {
      this.gYr += i;
      let t = 0;
      t = this.gYr > this.CYr ? (this.CYr - this.gYr + i) / i : 1;
      this.dYr.Multiply(t, this.Tz);
      this.Lz.AdditionEqual(this.Tz);
      if (this.gYr > this.CYr) {
        this.CYr = undefined;
      }
    }
    if (this.Q$r.D_ProcessClimbing(this.Lz.ToUeVector(), i, t, this.eJr(this.EYr), this.uYr)) {
      this.ClimbBlocking = this.Q$r.ClimbBlock();
      if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "ProcessClimbing Success", ["Location", this.Hte.Actor.D_K2_GetActorLocation()]);
      }
      this.Hte.ResetLocationCachedTime();
      CharacterClimbComponent_1.wz.Stop();
      if (t) {
        CharacterClimbComponent_1.Bz.Start();
        i = this.Q$r.D_TryClimbingArrives(this.Hte.InputDirect, this.eJr(this.MYr), this.uYr, this.QYr());
        CharacterClimbComponent_1.Bz.Stop();
        CharacterClimbComponent_1.bz.Start();
        switch (i) {
          case 1:
            this.tJr(2, (0, puerts_1.$unref)(this.uYr), false);
            break;
          case 2:
            this.tJr(7, (0, puerts_1.$unref)(this.uYr), false);
            break;
          case 3:
            this.aJr();
            break;
          case 4:
            this.tJr(10, (0, puerts_1.$unref)(this.uYr), false);
        }
        CharacterClimbComponent_1.bz.Stop();
      }
    } else {
      if (ModelManager_1.ModelManager.SundryModel.SceneCheckOn && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "ProcessClimbing Failed", ["Location", this.Hte.Actor.D_K2_GetActorLocation()]);
      }
      this.TYr();
      CharacterClimbComponent_1.wz.Stop();
    }
  }
  GetClimbInfo() {
    if (this.G$r.ContainsNaN()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", ["ClimbInput", this.G$r]);
      }
      this.G$r.Reset();
    }
    this.z$r.攀爬移动中 = !this.k$r;
    this.z$r.攀爬输入向量 = this.G$r.ToUeVector2D();
    return this.z$r;
  }
  GetClimbInfoNew() {
    if (this.G$r.ContainsNaN()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", ["ClimbInput", this.G$r]);
      }
      this.G$r.Reset();
    }
    this.Z$r.IsClimbMoving = !this.k$r;
    this.Z$r.ClimbInput = this.G$r.ToUeVector2D();
    this.Z$r.OnWallAngle = this._Yr;
    return this.Z$r;
  }
  GetTsClimbInfo() {
    if (this.G$r.ContainsNaN()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "GetClimbInfo Nan.", ["ClimbInput", this.G$r]);
      }
      this.G$r.Reset();
    }
    this.eYr.攀爬移动中 = !this.k$r;
    this.eYr.攀爬输入向量.DeepCopy(this.G$r);
    this.eYr.OnWallAngle = this._Yr;
    return this.eYr;
  }
  FinishClimbDown() {
    this.hYr = true;
    if (this.Q$r.D_TryStartClimb(this.Hte.ActorTransform, 0, this.uYr)) {
      this.nJr((0, puerts_1.$unref)(this.uYr));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "下爬动作完成后停留在了一个不太适合攀爬的地点");
      }
      this.Hte?.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterClimbComponent.FinishClimbDown]"
      });
    }
  }
  SetCharacterTransformAndBuffer(t, i, s = undefined, h = true) {
    this.CYr = undefined;
    if (s) {
      if (i > 0) {
        this.Lz.FromUeVector(t.GetTranslation());
        s.Subtraction(this.Lz, this.dYr);
        this.dYr.DivisionEqual(i * TimeUtil_1.TimeUtil.Millisecond);
        this.gYr = 0;
        this.CYr = i * TimeUtil_1.TimeUtil.Millisecond;
      } else {
        t.SetLocation(s.ToUeVector());
      }
    }
    if (this.oRe?.Valid) {
      this.oRe.SetTransformWithModelBuffer(t, i, undefined, h);
    } else {
      this.Hte.SetActorTransform(t, "攀爬.SetCharacterTransformAndBuffer", h);
    }
  }
  KickWallExit() {
    this.SetExitClimbType(4);
    this.SetClimbState(3);
  }
  SetClimbState(t) {
    if (this.H$r !== t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 6, "SetClimbState", ["Entity", this.Entity.Id], ["From", this.H$r], ["To", t]), this.H$r = t, this.oYr.攀爬状态 = t, this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb)) {
      switch (t) {
        case 2:
          if (this.G$r.IsNearlyZero()) {
            this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
          } else {
            this.HBr.SwitchFastClimb(this.Xte.HasTag(388142570), true);
          }
          break;
        case 1:
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb);
          break;
        case 3:
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb);
      }
    }
  }
  SetEnterClimbType(t) {
    this.j$r = t;
    this.oYr.进入攀爬类型 = t;
  }
  SetExitClimbType(t) {
    var i = this.FYr.has(this.W$r);
    var s = this.FYr.has(t);
    if (i) {
      if (!s) {
        this.Xte.RemoveTag(1313414424);
      }
    } else if (s) {
      this.Xte.AddTag(1313414424);
    }
    this.W$r = t;
    this.oYr.退出攀爬类型 = t;
  }
  GetClimbState() {
    this.tYr.攀爬状态 = this.H$r;
    this.tYr.进入攀爬类型 = this.j$r;
    this.tYr.退出攀爬类型 = this.W$r;
    return this.tYr;
  }
  GetClimbStateNew() {
    this.iYr.ClimbState = this.H$r;
    this.iYr.EnterClimbType = this.j$r;
    this.iYr.ExitClimbType = this.W$r;
    return this.iYr;
  }
  GetTsClimbState() {
    return this.oYr;
  }
  GetOnWallAngle() {
    return this._Yr;
  }
  OnEnterClimb() {
    if (this.H$r === 1) {
      this.SetClimbState(2);
      this.SetExitClimbType(5);
    }
  }
  OnExitClimb() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "OnExitClimb", ["Entity", this.Entity.Id]);
    }
    if (this.H$r !== 0) {
      switch (this.W$r) {
        case 2:
        case 7:
        case 3:
        case 6:
        case 9:
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 1,
            Context: "[CharacterClimbComponent.OnExitClimb] Walking"
          });
          break;
        default:
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterClimbComponent.OnExitClimb] Falling"
          });
      }
      if (this.CYr) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 6, "ClimbUp Buffer is not finished", ["Now", this.gYr], ["TimeLength", this.CYr]);
        }
        this.CYr = undefined;
      }
    }
  }
  ClimbKeyPressed(t) {
    this.ClimbPress(t);
  }
  KickExitCheck() {
    var t;
    if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      if (this.G$r.X < THREAHOLD_JUMP_LEAVE) {
        this.KickWallExit();
      } else if ((t = this.Entity.GetComponent(177)).Valid) {
        t.ClimbDash();
      }
    }
  }
  GetClimbRadius() {
    if (this.X$r) {
      return this.X$r.ClimbRadius;
    } else {
      return 0;
    }
  }
  DetectClimbWithDirect(t, i, s = false) {
    if (!this.Active || this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      if (s && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "已处于攀爬状态，进入攀爬检测失败");
      }
      return false;
    }
    this.SetClimbState(0);
    switch (this.Q$r.D_TryUpArrives(i, this.eJr(this.pYr), this.uYr)) {
      case 1:
        this.tJr(2, (0, puerts_1.$unref)(this.uYr));
        if (s && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "到顶退出，进入攀爬失败");
        }
        return true;
      case 2:
        this.tJr(7, (0, puerts_1.$unref)(this.uYr));
        if (s && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "地面登上，进入攀爬失败");
        }
        return true;
    }
    this.Y8c.FromUeVector(i);
    this.sJr(t ? 4 : this.Gce.IsJump ? 2 : 0, this.Y8c, s);
    return this.H$r !== 0;
  }
  oJr() {
    this.VYr.Start();
    this.Tz.FromUeVector(this.Q$r.D_GetSafetyLocation());
    this.Hte.ActorLocationProxy.Subtraction(this.Tz, this.Lz);
    var t = this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius;
    var t = MAX_ROLE_CYLINDER_HALF_HEIGHT - t;
    let i = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.Lz);
    this.VYr.Stop();
    this.HYr.Start();
    var s = this.Lz.SizeSquared();
    var h = MAX_ROLE_RADIUS - this.Hte.DefaultRadius;
    if (h <= 0) {
      this.Lz.Reset();
    } else if (h * h < s) {
      h = h / Math.sqrt(s);
      this.Lz.MultiplyEqual(h);
    }
    if (t <= 0) {
      i = 0;
    } else if (i > t) {
      i = t;
    } else if (i < -t) {
      i = -t;
    }
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.Hte, this.Lz, i);
    this.Lz.AdditionEqual(this.Tz);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.Hte.ActorForwardProxy, this.Gce.GravityUp, this.az);
    this.Z_e.Set(this.Lz, this.az, this.Hte.ActorScaleProxy);
    this.HYr.Stop();
    this.jYr.Start();
    this.SetCharacterTransformAndBuffer(this.Z_e.ToUeTransform(), NORMAL_CACHE_TIME, undefined, false);
    this.jYr.Stop();
    this.Hte.ResetCapsuleRadiusAndHeight();
  }
  QYr() {
    return this.Xte.HasTag(388142570) && !this.Xte.HasTag(1098729489);
  }
  foc() {
    var s = this.Entity.GetComponent(177).MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(s, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      var h = s.LogicParams.ClimbInfoRef.ClimbInput;
      let t = 180 / Math.PI * Math.atan2(h.Y, h.X);
      if (t < 0) {
        t += 360;
      }
      t += s.LogicParams.ClimbOnWallAngleRef;
      let i = 0;
      i = t < 90 ? t / 90 : t < 180 ? 1 : t < 270 ? -1 : (t - 360) / 90;
      i = MathUtils_1.MathUtils.Clamp(i, -1, 1);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "CalculateClimbDirection", ["ClimbInput", h], ["ClimbOnWallAngle", s.LogicParams.ClimbOnWallAngleRef], ["Angle", t], ["TmpClimbLR", i], ["FastClimbMix", s.FastClimbMix], ["ClimbBrakeMix", s.ClimbBrakeMix], ["ClimbDirection", s.ClimbDirection], ["LocationProxy", s.LocationProxy], ["Velocity", s.Velocity], ["ActorForward", s.ActorForward], ["Acceleration", s.Acceleration], ["LowerBodyRotator", s.LowerBodyRotator]);
      }
    }
  }
};
CharacterClimbComponent.wz = Stats_1.Stat.Create("ClimbStat1");
CharacterClimbComponent.Bz = Stats_1.Stat.Create("ClimbStat2");
CharacterClimbComponent.bz = Stats_1.Stat.Create("ClimbStat3");
CharacterClimbComponent.DebugLogController = false;
CharacterClimbComponent = CharacterClimbComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(34)], CharacterClimbComponent);
exports.CharacterClimbComponent = CharacterClimbComponent; //# sourceMappingURL=CharacterClimbComponent.js.map