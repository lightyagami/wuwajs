"use strict";

var GrapplingHookPointComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrapplingHookPointComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../../Effect/TsEffectActor");
const Global_1 = require("../../../../Global");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const HOOK_VISION_ID = 1001;
const OVERWRITE_HOOK_LOCATION_KEY = "OverwriteLocation";
const hookPointStateTagMap = new Map([[0, 1888174838], [1, -1156116864], [2, -43463105]]);
const hookTypeTagMap = new Map([["FixedPointHook", -833935142], ["SuiGuangHook", 561771029], ["KiteHook", -1526637662], ["RagDollJumpingPoint", -1347421268], ["RagDollClimbingPoint", 1978109078], ["MovementPointHook", -1771378495], ["SlashHook", -105059496], ["ChargeSlashHook", -105059496]]);
const slashLeftQteTag = 898914517;
const slashRightQteTag = 2102950531;
let GrapplingHookPointComponent = GrapplingHookPointComponent_1 = class GrapplingHookPointComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cql = -1;
    this.mql = undefined;
    this.dql = false;
    this.Ihu = undefined;
    this.mjl = false;
    this.Lo = undefined;
    this.Lie = undefined;
    this.RadiusSquared = 0;
    this.ac = 3;
    this.Hte = undefined;
    this.N1_ = undefined;
    this.Hfn = undefined;
    this.fen = false;
    this.d6o = undefined;
    this.Ful = 0;
    this.ggl = 0;
    this.pgl = () => {
      ++this.Ful;
    };
    this.fgl = () => {
      ++this.ggl;
      ++this.Ful;
    };
    this.Rnn = () => {
      var t = this.Hte?.GetActorInSceneInteraction(OVERWRITE_HOOK_LOCATION_KEY)?.D_K2_GetActorLocation();
      this.dql = !!t;
    };
    this.pen = t => {
      if (t === HOOK_VISION_ID) {
        this.Lie.AddTag(1888174838);
        this.ac = 0;
      }
    };
  }
  get HookLocation() {
    return this.Cql ?? this.Hte?.ActorLocationProxy ?? Vector_1.Vector.ZeroVectorProxy;
  }
  get Cql() {
    var t;
    if (this.dql) {
      if (this.cql < Time_1.Time.Frame) {
        this.cql = Time_1.Time.Frame;
        if (t = this.Hte?.GetActorInSceneInteraction(OVERWRITE_HOOK_LOCATION_KEY)?.D_K2_GetActorLocation()) {
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
    var t = this.Hte.ActorTransform;
    var e = Vector_1.Vector.Create(this.Lo?.Range.Center.X ?? 0, this.Lo?.Range.Center.Y ?? 0, this.Lo?.Range.Center.Z ?? 0);
    return Vector_1.Vector.Create(t.TransformPosition(e.ToUeVector()));
  }
  get Radius() {
    return this.Lo?.Range.Radius ?? 0;
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
    return t === undefined || t === "FixedPointHook";
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
  get SplineMoveEndCount() {
    return this.Ful;
  }
  get SplineMoveBrokenCount() {
    return this.ggl;
  }
  OnInitData(t) {
    var t = t.GetParam(GrapplingHookPointComponent_1)[0];
    this.Lo = t || undefined;
    if (this.Lo.PlayerStateRestritionId) {
      t = {
        Type: "CheckPlayerStateRestriction",
        RestrictionId: this.Lo.PlayerStateRestritionId
      };
      this.N1_ ||= [];
      this.N1_.push({
        Type: 0,
        Conditions: [t]
      });
    }
    if (this.Lo.HookEnableCondition) {
      this.N1_ ||= [];
      this.N1_.push(this.Lo.HookEnableCondition);
    }
    this.Lie = this.Entity.GetComponent(197);
    if (this.Lie?.Valid) {
      this.Lie.AddTag(-254251760);
    }
    if (this.Lo.HookInteractConfig) {
      this.d6o = hookTypeTagMap.get(this.Lo.HookInteractConfig.Type);
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
    this.RadiusSquared = MathUtils_1.MathUtils.Square(this.Radius);
    t = this.Entity.GetComponent(0);
    this.mjl = t.PbHookLockPointDisabled;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    var e = this.Entity.GetComponent(0);
    if (e) {
      e = e.GetBaseInfo();
      this.Hfn = e?.OnlineInteractType;
      if (!GrapplingHookPointComponent_1.ven) {
        if (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(HOOK_VISION_ID)) {
          GrapplingHookPointComponent_1.ven = true;
        }
      }
      let t = false;
      if (GrapplingHookPointComponent_1.ven) {
        for (const i of hookPointStateTagMap.keys()) {
          if (this.Lie.HasTag(i)) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.Lie.AddTag(1888174838);
          this.ac = 0;
        }
      }
      GrapplingHookPointComponent_1.AllPoints.push(this);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddExploreVisionSkill, this.pen);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.fgl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.pgl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    return true;
  }
  OnEnd() {
    var t = GrapplingHookPointComponent_1.AllPoints.indexOf(this);
    if (t >= 0) {
      GrapplingHookPointComponent_1.AllPoints.splice(t, 1);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddExploreVisionSkill, this.pen);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.fgl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.pgl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
  UpdateHookPointInfoByNotify(t) {
    this.mjl = t.UI_;
  }
  IsMovable() {
    return !!this.Entity.GetComponent(67) || this.GetHookInteractType() === "SuiGuangHook";
  }
  ChangeHookPointState(t) {
    if (this.ac !== t) {
      this.Lie.RemoveTag(hookPointStateTagMap.get(this.ac));
      if (this.ac === 1) {
        this.Entity.GetComponent(203).PlaySceneInteractionEndEffect(0);
      }
      this.ac = t;
      this.Lie.AddTag(hookPointStateTagMap.get(this.ac));
    }
  }
  CheckCondition() {
    return this.N1_ === undefined || this.N1_.length === 0 || this.N1_.every(t => ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t, this.Hte.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
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
    var o = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(206);
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
    let t = this.Hte?.CurLevelPrefabShowActor;
    if (t?.IsValid()) {
      if (t instanceof TsEffectActor_1.default) {
        var e = t.GetHandle();
        if (!EffectSystem_1.EffectSystem.IsValid(e) && (this.Hte.RefreshShowActor(), !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())) {
          return false;
        }
      } else if (t.IsA(UE.EffectSystemActor.StaticClass())) {
        e = t.GetHandle();
        if (!EffectSystem_1.EffectSystem.IsValid(e) && (this.Hte.RefreshShowActor(), !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())) {
          return false;
        }
      }
      if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM) && (this.Hte.RefreshShowActor(), !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())) {
        return false;
      } else {
        return t.WasRecentlyRenderedOnScreen(0.5);
      }
    }
    return false;
  }
  GetTagId() {
    return this.d6o;
  }
  GetHookInteractType() {
    return this.Lo.HookInteractConfig?.Type ?? "FixedPointHook";
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
  GetHookInteractConfig() {
    return this.Lo.HookInteractConfig;
  }
};
GrapplingHookPointComponent.AllPoints = [];
GrapplingHookPointComponent.ven = false;
GrapplingHookPointComponent = GrapplingHookPointComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(85)], GrapplingHookPointComponent);
exports.GrapplingHookPointComponent = GrapplingHookPointComponent; //# sourceMappingURL=GrapplingHookPointComponent.js.map