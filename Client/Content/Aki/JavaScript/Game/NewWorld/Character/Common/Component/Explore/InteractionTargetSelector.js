"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionTargetSelector = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../../../../Global");
const LevelGamePlayController_1 = require("../../../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const GrapplingHookPointComponent_1 = require("../../../Custom/Components/GrapplingHookPointComponent");
const LockOnUtils_1 = require("../LockOn/LockOnUtils");
const SPHERE_TRACE_RADIUS = 5;
const NORMAL_HOOK_MIN_RADIUS = 500;
const NORMAL_HOOK_MIN_RADIUS_SQUARED = NORMAL_HOOK_MIN_RADIUS * NORMAL_HOOK_MIN_RADIUS;
const TRACE_TAG_NAME = "RoleSceneInteract";
const PROFILE_KEY = "FindBestTargetForMotorcycle";
const DEBUG_KEY = "MotorcycleExploreComponent";
class InteractionTargetSelector {
  constructor() {
    this.QWs = Vector_1.Vector.Create();
    this.UVd = Vector_1.Vector.Create();
    this.xVd = Vector_1.Vector.Create();
    this.BVd = Vector_1.Vector.Create();
    this.kVd = Vector_1.Vector.Create();
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.TraceDebugEnabled = false;
    this._tg = undefined;
    this.fCg = undefined;
    this.uoe = undefined;
    this.n$t = undefined;
    this.trg = undefined;
    this.DXe = 0;
    this.RXe = 0;
    this.irg = 0;
    this.rrg = 0;
    this.Xng = true;
    this.nrg = Number.MAX_VALUE;
    this.srg = Number.MAX_VALUE;
    this.DetectedTargetLegal = false;
    this.DetectedTarget = undefined;
  }
  ClearObject() {
    return true;
  }
  InitForMotorcycle(t) {
    this._tg = t;
    this.n$t = t.ActorComponent;
    this.trg = this.n$t.Actor.CapsuleComponent;
    this.fCg = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.fCg.WorldContextObject = this.n$t.Owner;
    this.fCg.bIsSingle = false;
    this.fCg.bIgnoreSelf = true;
    this.fCg.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.fCg.Radius = SPHERE_TRACE_RADIUS;
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.n$t.Owner;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
  }
  DetectEntityByRestrictTags(t, e, i, r = true) {
    let s = undefined;
    if (Global_1.Global.CharacterController) {
      var h = [];
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(t, e, h);
      if (h.length !== 0) {
        t = (0, puerts_1.$ref)(0);
        e = (0, puerts_1.$ref)(0);
        Global_1.Global.CharacterController.GetViewportSize(t, e);
        this.DXe = (0, puerts_1.$unref)(t);
        this.RXe = (0, puerts_1.$unref)(e);
        this.irg = this.DXe / 2;
        this.rrg = this.RXe / 2;
        this.nrg = Number.MAX_VALUE;
        this.srg = Number.MAX_VALUE;
        for (const n of h) {
          var o = n.Entity?.CheckGetComponent(1);
          var _ = n.Entity?.CheckGetComponent(0);
          if (o?.Owner?.IsValid() && _) {
            if ((!r || !!LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(_.GetEntityOnlineInteractType(), false)) && !!LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(n, i, undefined, true) && !!(_ = LockOnUtils_1.LockOnUtils.GetLockOnTargetLocation(o.Owner)) && !!this.hrg(_) && !this.h6g(_, o.Owner) && !(this.srg > this.nrg)) {
              s = o.Owner;
              this.nrg = this.srg;
            }
          }
        }
      }
    }
    return s;
  }
  DetectBestTargetForMotorcycle() {
    this.arg();
    this.fCg.SetDrawDebugTrace(this.TraceDebugEnabled ? 1 : 0);
    this.uoe.SetDrawDebugTrace(this.TraceDebugEnabled ? 1 : 0);
    if (Global_1.Global.CharacterController) {
      this.QWs.FromConfigVector(this.n$t.ActorLocationProxy);
      var t = (0, puerts_1.$ref)(0);
      var e = (0, puerts_1.$ref)(0);
      Global_1.Global.CharacterController.GetViewportSize(t, e);
      this.DXe = (0, puerts_1.$unref)(t);
      this.RXe = (0, puerts_1.$unref)(e);
      this.irg = this.DXe / 2;
      this.rrg = this.RXe / 2;
      this.UVd.FromConfigVector(this.n$t.ActorLocationProxy);
      this.xVd.FromConfigVector(this.n$t.ActorForwardProxy);
      var t = this.n$t.ActorGravityDirectProxy;
      var e = Vector_1.Vector.DotProduct(this.n$t.ActorForwardProxy, t);
      t.Multiply(e, this.kVd);
      this.xVd.Subtraction(this.kVd, this.xVd);
      this.Xng = true;
      for (const i of GrapplingHookPointComponent_1.GrapplingHookPointComponent.MotorcycleDetectableHookPoints) {
        if (this.o1h(i)) {
          if (this.ZGg(i) && this.DSg(i) && this.hrg(i.HookLocation.ToUeVector()) && this.yzt(i) && this.lrg(i) && this._rg(i) && this.Ogi(i) && this.x1h(i) && this.urg(i) && !(this.srg > this.nrg)) {
            this.DetectedTargetLegal = !this.Yng(i);
            this.DetectedTarget = i;
            this.nrg = this.srg;
          }
        }
      }
    }
  }
  arg() {
    this.nrg = Number.MAX_VALUE;
    this.srg = Number.MAX_VALUE;
    this.DetectedTargetLegal = false;
    this.DetectedTarget = undefined;
  }
  hrg(t) {
    var e;
    return !!UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, t, this.S$e, false) && !((t = (0, puerts_1.$unref)(this.S$e)).X < 0) && !(t.X > this.DXe) && !(t.Y < 0) && !(t.Y > this.RXe) && !((t = (e = t.X - this.irg) * e + (e = t.Y - this.rrg) * e) > this.nrg) && !(this.srg = t, 0);
  }
  o1h(t) {
    return !!t.Valid && !t.IsHookDisabled && !t.Entity.GetComponent(144)?.IsInState(3) && !t.Entity.GetComponent(0)?.GetRemoveState() && !t.IsInCd;
  }
  ZGg(t) {
    return t.EntityType !== "HookPullSoundBox" || !ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
  }
  DSg(t) {
    var e = this._tg.InteractingTarget;
    return (!e?.Valid || e.Entity.Id !== t.Entity.Id) && (!(e = this._tg.PullingTarget)?.Valid || e.Entity.Id !== t.Entity.Id);
  }
  yzt(t) {
    return t.CheckCondition();
  }
  x1h(t) {
    t = t.MatchRoleOption;
    if (!t || t.length <= 0) {
      return !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
    } else {
      return SceneTeamController_1.SceneTeamController.IsMatchRoleOption(t);
    }
  }
  lrg(t) {
    if (t.UseRangeComponent) {
      return !!t.Entity.GetComponent(91)?.IsOverlappingPlayer();
    } else {
      return Vector_1.Vector.DistSquared(t.TriggerLocation, this.QWs) < (t.MotorcycleHookMaxRadiusSquared > 0 ? t.MotorcycleHookMaxRadiusSquared : t.NormalHookMaxRadiusSquared);
    }
  }
  _rg(t) {
    var e = Vector_1.Vector.DistSquared(t.TriggerLocation, this.QWs);
    var t = t.MotorcycleHookMinRadiusSquared > 0 ? t.MotorcycleHookMinRadiusSquared : t.NormalHookMinRadiusSquared ?? NORMAL_HOOK_MIN_RADIUS_SQUARED;
    return t <= 0 || t < e;
  }
  Ogi(t) {
    return t.WasRecentlyRenderOnScreen();
  }
  urg(t) {
    var e = t.MotorInteractConstraintTarget;
    if (e) {
      var i = this.UVd;
      (e === t.Entity ? t.HookLocation : e.GetComponent(1).ActorLocationProxy).Subtraction(i, this.BVd);
      var e = this.n$t.ActorGravityDirectProxy;
      var i = Vector_1.Vector.DotProduct(this.BVd, e);
      e.Multiply(i, this.kVd);
      this.BVd.SubtractionEqual(this.kVd);
      this.BVd.Normalize();
      var e = Vector_1.Vector.DotProduct(this.BVd, this.xVd);
      if (Math.abs(Math.acos(e) * MathUtils_1.MathUtils.RadToDeg) > t.MotorInteractConstraintAngle / 2) {
        return false;
      }
    }
    return true;
  }
  Yng(t) {
    var e;
    return !!this.uoe && !!this.fCg && (this.Xng && (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.fCg, this.QWs), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, this.QWs), this.Xng = false), t.HookInteractType === "MotorPullInteract" ? (TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, t.TriggerLocation), this.uoe.ActorsToIgnore.Add(t.ActorComp.Owner), e = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY), this.uoe.ActorsToIgnore.Empty(), e) : (TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.fCg, t.TriggerLocation), TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.trg, this.fCg, TRACE_TAG_NAME, PROFILE_KEY)));
  }
  h6g(t, e) {
    if (!this.uoe?.IsValid() || !this.n$t || !this.n$t.Owner) {
      return false;
    }
    var i = ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) > 0;
    this.uoe.SetDrawDebugTrace(i ? 2 : 0);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, this.n$t.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, t);
    this.uoe.ActorsToIgnore.Add(e);
    var i = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    this.uoe.ActorsToIgnore.Empty();
    if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) > 0) {
      var r = [];
      if (this.uoe.HitResult) {
        for (let t = 0, e = this.uoe.HitResult.Actors.Num(); t < e; t++) {
          var s = this.uoe.HitResult.Actors.Get(t);
          if (s?.IsValid()) {
            r.push(s.GetName());
          }
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Motor", 72, "InteractionTargetSelector.CheckBlockMidwayByLocation", ["Actors", r]);
      }
    }
    return i && this.uoe.HitResult.bBlockingHit;
  }
}
exports.InteractionTargetSelector = InteractionTargetSelector;
//# sourceMappingURL=InteractionTargetSelector.js.map