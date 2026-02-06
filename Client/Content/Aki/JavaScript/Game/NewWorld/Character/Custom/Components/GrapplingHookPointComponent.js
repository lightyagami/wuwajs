"use strict";

var GrapplingHookPointComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(e, i, n) : r(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrapplingHookPointComponent = exports.PULL_COLLECTION_MOVE_MAX_SPEED = exports.PULL_COLLECTION_ACCELERATION = exports.CAPTURE_LENGTH_SQUARE = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../../Effect/TsEffectActor");
const Global_1 = require("../../../../Global");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const GrapplingHookPointDefine_1 = require("./Define/GrapplingHookPointDefine");
const OVERWRITE_HOOK_LOCATION_KEY = "OverwriteLocation";
const CAPTURE_LENGTH = 150;
exports.CAPTURE_LENGTH_SQUARE = CAPTURE_LENGTH * CAPTURE_LENGTH;
const CAPTURE_LENGTH_LIMIT = 10000;
const CAPTURE_LENGTH_LIMIT_SQUARE = CAPTURE_LENGTH_LIMIT * CAPTURE_LENGTH_LIMIT;
const NORMALIZE = 0.01;
const PULL_COLLECTION_MOVE_SPEED = 4000;
exports.PULL_COLLECTION_ACCELERATION = 500;
exports.PULL_COLLECTION_MOVE_MAX_SPEED = 6000;
const defaultStateTagId = -1152559349;
const PULL_COLLECTION_MOVE_DURATION = 500;
const slashLeftQteTag = 898914517;
const slashRightQteTag = 2102950531;
const tmpRotator = Rotator_1.Rotator.Create();
const tmpQuat = Quat_1.Quat.Create();
let GrapplingHookPointComponent = GrapplingHookPointComponent_1 = class GrapplingHookPointComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.Lie = undefined;
    this.EIe = undefined;
    this.i4o = undefined;
    this.cql = -1;
    this.mql = undefined;
    this.dql = false;
    this.Ihu = undefined;
    this.mjl = false;
    this.Lo = undefined;
    this.NormalHookMinRadiusSquared = undefined;
    this.MotorcycleHookMinRadiusSquared = 0;
    this.NormalHookMaxRadiusSquared = 0;
    this.MotorcycleHookMaxRadiusSquared = 0;
    this.ac = 4;
    this.N1_ = [];
    this.Hfn = undefined;
    this.fen = false;
    this.d6o = undefined;
    this.Ful = 0;
    this.ggl = 0;
    this.igf = undefined;
    this.Lz = undefined;
    this.rgf = 0;
    this.mDg = 0;
    this.ogf = false;
    this.ngf = 0;
    this.sgf = true;
    this.btg = undefined;
    this.R4g = undefined;
    this.Rnn = () => {
      var t = this.ActorComp?.GetActorInSceneInteraction(OVERWRITE_HOOK_LOCATION_KEY)?.D_K2_GetActorLocation();
      this.dql = !!t;
    };
    this.zZd = t => {
      if (t === GrapplingHookPointDefine_1.HOOK_VISION_ID) {
        this.Lie.AddTag(1888174838);
        this.ac = 0;
      }
    };
    this.pgl = () => {
      ++this.Ful;
    };
    this.fgl = () => {
      ++this.ggl;
      ++this.Ful;
    };
  }
  get ServerEntityId() {
    return this.EIe?.GetCreatureDataId() ?? 0;
  }
  get EntityConfigId() {
    return this.EIe?.GetPbDataId() ?? 0;
  }
  get HookInteractType() {
    return this.Lo?.HookInteractConfig?.Type;
  }
  get HookLocation() {
    return this.Cql ?? this.ActorComp?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy;
  }
  get HookTransform() {
    return this.ActorComp?.ActorTransform;
  }
  get Cql() {
    var t;
    if (this.dql) {
      if (this.cql < Time_1.Time.Frame) {
        this.cql = Time_1.Time.Frame;
        if (t = this.ActorComp?.GetActorInSceneInteraction(OVERWRITE_HOOK_LOCATION_KEY)?.D_K2_GetActorLocation()) {
          this.mql ||= Vector_1.Vector.Create();
          this.mql.FromUeVector(t);
        } else {
          this.mql = undefined;
          this.dql = false;
        }
      }
      return this.mql;
    }
  }
  get TriggerLocation() {
    var t = this.ActorComp.ActorTransform;
    var e = Vector_1.Vector.Create(this.Lo?.Range.Center.X ?? 0, this.Lo?.Range.Center.Y ?? 0, this.Lo?.Range.Center.Z ?? 0);
    return Vector_1.Vector.Create(t.TransformPosition(e.ToUeVector()));
  }
  get Radius() {
    return this.Lo?.Range?.Radius ?? 0;
  }
  get CameraGaze() {
    return this.Lo?.CameraGaze;
  }
  get InheritSpeed() {
    return this.Lo?.InheritSpeed ?? false;
  }
  get IsClimb() {
    return this.Lo?.IsClimb ?? false;
  }
  get IsInCd() {
    return this.fen;
  }
  get WillBeDestroyedAfterHook() {
    return this.Lo?.IsDestroyedSelf ?? false;
  }
  get WillBeHideAfterHook() {
    return this.Lo?.IsHideSelf ?? false;
  }
  get UseRangeComponent() {
    return this.Lo?.UseRangeComponent ?? false;
  }
  get GazeNextPointAfterInteract() {
    return this.Lo?.GazeNextPointAfterInteract;
  }
  get MatchRoleOption() {
    return this.Lo?.MatchRoleOption;
  }
  get IsSummitPoint() {
    return (this.Lo?.HookInteractConfig?.Type === "RagDollClimbingPoint" && this.Lo.HookInteractConfig.IsSummitPoint) ?? false;
  }
  get IsNormalHookPoint() {
    var t = this.Lo?.HookInteractConfig?.Type;
    return t === undefined || t === "FixedPointHook" || t === "PilotThrow" || t === "MotorPullInteract" || t === "SpaceStationEnergyCore";
  }
  get IsGravityHookPoint() {
    return this.Lo?.HookInteractConfig?.Type === "GravityHook";
  }
  get OnlineTypeCanInteract() {
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.Hfn);
  }
  get IsHookDisabled() {
    return this.mjl;
  }
  get IsIgnorePlayerCollision() {
    return this.Lo?.IgnorePlayCollision ?? false;
  }
  get MotorInteractConstraintTarget() {
    var t = this.Lo?.MotorHookConfig?.InteractConstraint?.Target;
    if (t) {
      return this.DVd(t);
    }
  }
  get MotorInteractConstraintAngle() {
    return this.Lo?.MotorHookConfig?.InteractConstraint?.Angle ?? 180;
  }
  get HookOverrideSpeed() {
    var t = this.Lo?.HookInteractConfig;
    var e = t?.Type;
    let i = -1;
    if ((i = e === "SpaceStationEnergyCore" ? t.HookSpeed ?? -1 : i) > GrapplingHookPointDefine_1.HOOK_MAX_SPEED) {
      return GrapplingHookPointDefine_1.HOOK_MAX_SPEED;
    } else {
      return i;
    }
  }
  get SplineMoveEndCount() {
    return this.Ful;
  }
  get SplineMoveBrokenCount() {
    return this.ggl;
  }
  get EntityType() {
    return this.igf;
  }
  get PullCollectionWithProgress() {
    return this.Lo?.HookInteractConfig?.Type === "MotorPullInteract" && (this.Lo.HookInteractConfig.IsPlayPullProgress ?? false);
  }
  get AllowBatchCollect() {
    return this.Lo?.HookInteractConfig?.Type === "MotorPullInteract" && !this.Lo.HookInteractConfig.DisableAreaEffect;
  }
  get MoveFinish() {
    return this.sgf;
  }
  get PlayerDetectable() {
    return this.Lo?.HookInteractConfig?.Type !== "MotorPullInteract" || (this.Lo.HookInteractConfig.IsFixedWhenNotRide ?? false);
  }
  get MotorcycleDetectable() {
    var t;
    if (this.btg !== undefined) {
      return this.btg;
    } else if ((t = this.Lo?.HookInteractConfig?.Type) && GrapplingHookPointDefine_1.motorcycleDetectableHookType.has(t)) {
      return this.btg = true;
    } else if (this.btg || this.Lo?.MotorHookConfig === undefined) {
      return this.btg = false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 79, "钩锁类型不在MotorcycleDetectableHookType里, 但是又包含了MotorHookConfig配置", ["EHookInteractType", t]);
      }
      return this.btg = true;
    }
  }
  OnInitData(t) {
    var e = this.Entity.GetComponent(0);
    var i = e.GetPbEntityInitData();
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 79, "GrapplingHookPointComponent.OnInitData Failed, GetPbEntityInitData is undefined.");
      }
      return false;
    }
    var i = (0, IComponent_1.getComponent)(i.ComponentsData, "HookLockPoint");
    this.Lo = i;
    this.Lz = Vector_1.Vector.Create(0, 0, 0);
    this.ActorComp = this.Entity.GetComponent(214);
    this.Lie = this.Entity.GetComponent(208);
    this.EIe = this.Entity.GetComponent(0);
    this.i4o = this.Entity.GetComponent(209);
    if (this.Lo?.NonInteractiveInnerRadius !== undefined) {
      this.NormalHookMinRadiusSquared = MathUtils_1.MathUtils.Square(this.Lo.NonInteractiveInnerRadius);
    }
    this.MotorcycleHookMinRadiusSquared = MathUtils_1.MathUtils.Square(this.Lo?.MotorHookConfig?.NonInteractiveInnerRadius ?? 0);
    this.NormalHookMaxRadiusSquared = MathUtils_1.MathUtils.Square(this.Lo?.Range.Radius ?? 0);
    this.MotorcycleHookMaxRadiusSquared = MathUtils_1.MathUtils.Square(this.Lo?.MotorHookConfig?.Radius ?? 0);
    if (this.Lo?.HookInteractConfig?.Type === "MotorPullInteract") {
      this.rgf = this.Lo.HookInteractConfig.PullMoveSpeed ?? PULL_COLLECTION_MOVE_SPEED;
      this.mDg = this.rgf;
    }
    this.igf = e.GetPbModelConfig()?.EntityType;
    this.mjl = e.PbHookLockPointDisabled;
    this.Hfn = e.GetBaseInfo()?.OnlineInteractType;
    this.N1_.length = 0;
    if (this.Lo.PlayerStateRestritionId) {
      i = {
        Type: "CheckPlayerStateRestriction",
        RestrictionId: this.Lo.PlayerStateRestritionId
      };
      this.N1_.push({
        Type: 0,
        Conditions: [i]
      });
    }
    if (this.Lo.HookEnableCondition) {
      this.N1_.push(this.Lo.HookEnableCondition);
    }
    if (this.Lie?.Valid) {
      this.Lie.AddTag(-254251760);
    }
    if (this.Lo.HookInteractConfig) {
      this.d6o = GrapplingHookPointDefine_1.normalHookTagMap.get(this.Lo.HookInteractConfig.Type);
      if (this.Lo.HookInteractConfig.Type === "SlashHook") {
        switch (this.Lo.HookInteractConfig.SlashHitType) {
          case "QTELeft":
            this.d6o = slashLeftQteTag;
            break;
          case "QTERight":
            this.d6o = slashRightQteTag;
        }
      }
    } else {
      this.d6o = -833935142;
    }
    return true;
  }
  OnStart() {
    if (ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(GrapplingHookPointDefine_1.HOOK_VISION_ID)) {
      let t = false;
      for (const e of GrapplingHookPointDefine_1.hookPointStateToTagMap.values()) {
        if (this.Lie.HasTag(e)) {
          t = true;
          break;
        }
      }
      if (!t) {
        this.zZd(GrapplingHookPointDefine_1.HOOK_VISION_ID);
      }
    }
    if (this.PlayerDetectable) {
      GrapplingHookPointComponent_1.PlayerDetectableHookPoints.push(this);
    }
    if (this.MotorcycleDetectable) {
      GrapplingHookPointComponent_1.MotorcycleDetectableHookPoints.push(this);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddExploreVisionSkill, this.zZd);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.fgl);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.pgl);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
  OnEnd() {
    var t;
    if (this.PlayerDetectable && (t = GrapplingHookPointComponent_1.PlayerDetectableHookPoints.indexOf(this)) >= 0) {
      GrapplingHookPointComponent_1.PlayerDetectableHookPoints.splice(t, 1);
    }
    if (this.MotorcycleDetectable && (t = GrapplingHookPointComponent_1.MotorcycleDetectableHookPoints.indexOf(this)) >= 0) {
      GrapplingHookPointComponent_1.MotorcycleDetectableHookPoints.splice(t, 1);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddExploreVisionSkill, this.zZd);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.fgl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.pgl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
  OnTick(t) {
    this.agf(t);
  }
  agf(t) {
    var e;
    if (this.ogf) {
      if (this.PullCollectionWithProgress) {
        if ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(3)) && this.ActorComp) {
          this.Lz.DeepCopy(e.ActorLocationProxy);
          if ((e = this.Lz.SubtractionEqual(this.ActorComp.ActorLocationProxy).SizeSquared()) < exports.CAPTURE_LENGTH_SQUARE || e > CAPTURE_LENGTH_LIMIT_SQUARE) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 79, "摩托车拉取采集物被捕获", ["LengthSquared", e], ["超出最大距离被捕获", e > CAPTURE_LENGTH_LIMIT_SQUARE]);
            }
            this.ogf = false;
            this.sgf = true;
            this.R4g?.();
            this.R4g = undefined;
            LevelGeneralCommons_1.LevelGeneralCommons.RollbackDestroyState(this.EntityConfigId, defaultStateTagId);
          } else {
            this.Lz.Normalize(NORMALIZE);
            this.mDg = Math.min(this.mDg + exports.PULL_COLLECTION_ACCELERATION, exports.PULL_COLLECTION_MOVE_MAX_SPEED);
            this.Lz.MultiplyEqual(this.mDg * t * MathUtils_1.MathUtils.MillisecondToSecond).AdditionEqual(this.ActorComp.ActorLocationProxy);
            this.ActorComp.SetActorLocation(this.Lz.ToUeVector());
          }
        }
      } else {
        this.ngf += t;
        if (this.ngf > PULL_COLLECTION_MOVE_DURATION) {
          this.ogf = false;
          this.sgf = true;
          this.ngf = 0;
        }
      }
    }
  }
  UpdateHookPointInfoByNotify(t) {
    this.mjl = t.UI_;
  }
  IsMovable() {
    return !!this.Entity.GetComponent(72) || this.GetHookInteractType() === "SuiGuangHook" || this.GetHookInteractType() === "FlyingFeather" || this.GetHookInteractType() === "PilotThrow";
  }
  OnFixHookSkillEnd() {
    this.ChangeHookPointState(0);
  }
  ChangeHookPointState(t) {
    if (this.ac !== t) {
      this.Lie.RemoveTag(GrapplingHookPointDefine_1.hookPointStateToTagMap.get(this.ac));
      if (this.ac === 1) {
        this.Entity.GetComponent(214).PlaySceneInteractionEndEffect(0);
      }
      this.ac = t;
      this.Lie.AddTag(GrapplingHookPointDefine_1.hookPointStateToTagMap.get(this.ac));
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnHookPointStateChanged, this.ac);
    }
  }
  GetCurrentHookPointState() {
    return this.ac;
  }
  CheckCondition() {
    return this.N1_ === undefined || this.N1_.length === 0 || this.N1_.every(t => ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t, this.ActorComp.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
  }
  CheckHookEnableCondition() {
    var t = this.Lo.HookEnableCondition;
    return !t || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t, this.ActorComp.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
  }
  BeHooked(t) {
    this.zNc();
    if (this.Lo?.HookInteractConfig?.Type === "SlashHook") {
      this.JNc(t);
    }
  }
  zNc() {
    if (this.Lo.HookLockCd) {
      this.fen = true;
      TimerSystem_1.TimerSystem.Delay(() => {
        this.fen = false;
      }, this.Lo.HookLockCd * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  JNc(t) {
    var e = this.Lo?.HookInteractConfig;
    var i = e.SlashAngleType;
    var e = e.DefaultSlashDir;
    var o = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(217);
    if (o) {
      switch (i) {
        case "Slash30":
          o.AddTag(-1342468038);
          break;
        case "Slash45":
          o.AddTag(-1374150200);
      }
      switch (e) {
        case "Vertical":
          o.AddTag(1233515695);
          break;
        case "Horizontal":
          o.AddTag(438239602);
          break;
        case "Positive30":
        case "Positive45":
          o.AddTag(-1479782439);
          break;
        case "Negative30":
        case "Negative45":
          o.AddTag(-278703698);
      }
    }
  }
  WasRecentlyRenderOnScreen() {
    let t = this.ActorComp?.CurLevelPrefabShowActor;
    if (t?.IsValid()) {
      if (t instanceof TsEffectActor_1.default) {
        var e = t.GetHandle();
        if (!EffectSystem_1.EffectSystem.IsValid(e) && (this.ActorComp.RefreshShowActor(), !(t = this.ActorComp?.CurLevelPrefabShowActor)?.IsValid())) {
          return false;
        }
      } else if (t.IsA(UE.EffectSystemActor.StaticClass())) {
        e = t.GetHandle();
        if (!EffectSystem_1.EffectSystem.IsValid(e) && (this.ActorComp.RefreshShowActor(), !(t = this.ActorComp?.CurLevelPrefabShowActor)?.IsValid())) {
          return false;
        }
      }
      if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM) && (this.ActorComp.RefreshShowActor(), !(t = this.ActorComp?.CurLevelPrefabShowActor)?.IsValid())) {
        return false;
      } else {
        return t.WasRecentlyRenderedOnScreen(0.5);
      }
    }
    return false;
  }
  GetTagId() {
    var t;
    if (this.MotorcycleDetectable && (t = this.GetHookInteractType()) && (t = GrapplingHookPointDefine_1.multipurposeHookTagMap.get(t))) {
      if (ModelManager_1.ModelManager.ExploreModel.IsPlayerDrivingMotorcycle) {
        return t[1];
      } else {
        return t[0];
      }
    } else {
      return this.d6o;
    }
  }
  GetHighlightTagId() {
    var t = this.GetHookInteractType();
    if (t) {
      return GrapplingHookPointComponent_1.zjg.get(t) ?? GrapplingHookPointComponent_1.Zjg;
    } else {
      return GrapplingHookPointComponent_1.Zjg;
    }
  }
  GetHookInteractType() {
    if (this.Lo) {
      return this.Lo.HookInteractConfig?.Type ?? "FixedPointHook";
    }
  }
  GetHookActions() {
    return this.Lo.HookInteractConfig?.HookActions;
  }
  GetInterruptHookActions() {
    return this.Lo.HookInteractConfig?.ExitHookActions;
  }
  GetFinishHookActions() {
    return this.Lo.HookInteractConfig?.FinishActions;
  }
  GetSlashHookCharacterLookAtPoint() {
    var t;
    var e = Vector_1.Vector.Create();
    if ((this.Lo.HookInteractConfig?.Type === "SlashHook" || this.Lo.HookInteractConfig?.Type === "ChargeSlashHook") && (t = this.Lo?.HookInteractConfig.CharacterLookAtPointId) && (t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t)) && t.Transform) {
      e.FromConfigVector(t.Transform.Pos);
      return e;
    } else {
      return undefined;
    }
  }
  GetLevelPlayTakeOverCamera() {
    return (this.Lo.HookInteractConfig?.Type === "SlashHook" || this.Lo.HookInteractConfig?.Type === "ChargeSlashHook") && (this.Lo?.HookInteractConfig.IsAdjustCameraConfig ?? false);
  }
  GetSafePointLocation() {
    var t = Vector_1.Vector.Create();
    if (this.Lo.HookInteractConfig?.Type === "SlashHook" || this.Lo.HookInteractConfig?.Type === "ChargeSlashHook") {
      var e = this.Thu();
      if (!e) {
        return t;
      }
      t.Set(e.Transform?.Pos.X ?? 0, e.Transform?.Pos.Y ?? 0, e.Transform?.Pos.Z ?? 0);
    }
    return t;
  }
  GetSafePointRotation() {
    var t = Rotator_1.Rotator.Create();
    if (this.Lo.HookInteractConfig?.Type === "SlashHook" || this.Lo.HookInteractConfig?.Type === "ChargeSlashHook") {
      var e = this.Thu();
      if (!e) {
        return t;
      }
      t.Set(e.Transform?.Rot?.Y ?? 0, e.Transform?.Rot?.Z ?? 0, e.Transform?.Rot?.X ?? 0);
    }
    return t;
  }
  Thu() {
    if (this.Ihu) {
      return this.Ihu;
    }
    if (this.Lo.HookInteractConfig?.Type === "SlashHook" || this.Lo.HookInteractConfig?.Type === "ChargeSlashHook") {
      var t = this.Lo?.HookInteractConfig?.SlashBackSafePointId;
      var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
      if (e) {
        this.Ihu = e;
        return this.Ihu;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[GetSafePointEntityData] entityData is null", ["safePointId", t]);
      }
    }
  }
  GetSlashHitType() {
    if (this.Lo?.HookInteractConfig?.Type === "SlashHook") {
      return this.Lo.HookInteractConfig.SlashHitType ?? "HeavySlash";
    }
  }
  GetHookBindEntityConfig() {
    if (this.Lo?.HookInteractConfig?.Type === "FlyingFeather") {
      return this.Lo?.HookInteractConfig?.EntityId ?? 0;
    } else {
      return 0;
    }
  }
  GetHookInteractConfig() {
    return this.Lo.HookInteractConfig;
  }
  DVd(t) {
    let e = undefined;
    switch (t.Type) {
      case "Player":
        e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
        break;
      case "Self":
        return this.Entity;
      case "Target":
        e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t.EntityId)?.Entity;
    }
    return e;
  }
  GetMotorcycleFixHookParams(t, e, i, o, r) {
    var s = this.Lo?.MotorHookConfig;
    if (s?.MotorHookAcceleration) {
      (0, puerts_1.$set)(t, s.MotorHookAcceleration.MaxSpeed);
      (0, puerts_1.$set)(e, ResourceSystem_1.ResourceSystem.Load(s.MotorHookAcceleration.SpeedSampleCurve, UE.CurveFloat));
      if (s.HookEndDir) {
        tmpRotator.Set(s.HookEndDir.EndRot.Y ?? 0, s.HookEndDir.EndRot.Z ?? 0, s.HookEndDir.EndRot.X ?? 0);
        tmpRotator.Quaternion(tmpQuat);
        (0, puerts_1.$set)(i, true);
        (0, puerts_1.$set)(o, tmpQuat.ToUeQuat());
        (0, puerts_1.$set)(r, ResourceSystem_1.ResourceSystem.Load(s.HookEndDir.TransitionCurve, UE.CurveFloat));
      } else {
        (0, puerts_1.$set)(i, false);
      }
    }
  }
  StartPullMove(t) {
    this.sgf = false;
    if (this.ogf || this.sgf) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 79, "钩锁点已经在拉取中或已拉取完成", ["MoveFinishInternal", this.sgf]);
      }
      return this.ogf = false;
    } else {
      this.ogf = true;
      this.i4o?.SetInteractionState(false, "摩托车采集物移动时关闭交互组件");
      this.R4g = t;
      return true;
    }
  }
  StopPullMove() {
    this.ogf = false;
    this.i4o?.SetInteractionState(true, "摩托车采集物停止移动打开交互组件");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 79, "停止拉取采集物并还原位置", ["EntityConfigId", this.EIe?.GetPbDataId()], ["Location", this.EIe.GetPbLocation()]);
    }
    this.ActorComp.SetActorLocation(this.EIe.GetPbLocation());
    this.R4g = undefined;
  }
};
GrapplingHookPointComponent.PlayerDetectableHookPoints = [];
GrapplingHookPointComponent.MotorcycleDetectableHookPoints = [];
GrapplingHookPointComponent.Zjg = 1628786673;
GrapplingHookPointComponent.zjg = new Map([["SpaceStationEnergyCore", 0]]);
GrapplingHookPointComponent = GrapplingHookPointComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(90)], GrapplingHookPointComponent);
exports.GrapplingHookPointComponent = GrapplingHookPointComponent; //# sourceMappingURL=GrapplingHookPointComponent.js.map