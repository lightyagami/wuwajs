"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionTargetSelector = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../../../../Global");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const GrapplingHookPointComponent_1 = require("../../../Custom/Components/GrapplingHookPointComponent");
const SPHERE_TRACE_RADIUS = 5;
const TRACE_TAG_NAME = "RoleSceneInteract";
const PROFILE_KEY = "FindBestTargetForMotorcycle";
class InteractionTargetSelector {
  constructor() {
    this.QWs = Vector_1.Vector.Create();
    this.UVd = Vector_1.Vector.Create();
    this.xVd = Vector_1.Vector.Create();
    this.BVd = Vector_1.Vector.Create();
    this.kVd = Vector_1.Vector.Create();
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.TraceDebugEnabled = false;
    this.P7f = undefined;
    this.SJf = undefined;
    this.uoe = undefined;
    this.n$t = undefined;
    this.qjf = undefined;
    this.DXe = 0;
    this.RXe = 0;
    this.Ojf = 0;
    this.Gjf = 0;
    this.WWf = true;
    this.Fjf = Number.MAX_VALUE;
    this.Njf = Number.MAX_VALUE;
    this.DetectedTargetLegal = false;
    this.DetectedTarget = undefined;
  }
  ClearObject() {
    return true;
  }
  InitForMotorcycle(t) {
    this.P7f = t;
    this.n$t = t.ActorComponent;
    this.qjf = this.n$t.Actor.CapsuleComponent;
    this.SJf = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.SJf.WorldContextObject = this.n$t.Owner;
    this.SJf.bIsSingle = false;
    this.SJf.bIgnoreSelf = true;
    this.SJf.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.SJf.Radius = SPHERE_TRACE_RADIUS;
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.n$t.Owner;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
  }
  DetectBestTargetForMotorcycle() {
    this.Vjf();
    this.SJf.SetDrawDebugTrace(this.TraceDebugEnabled ? 1 : 0);
    this.uoe.SetDrawDebugTrace(this.TraceDebugEnabled ? 1 : 0);
    if (Global_1.Global.CharacterController) {
      this.QWs.FromConfigVector(this.n$t.ActorLocationProxy);
      var t = (0, puerts_1.$ref)(0);
      var e = (0, puerts_1.$ref)(0);
      Global_1.Global.CharacterController.GetViewportSize(t, e);
      this.DXe = (0, puerts_1.$unref)(t);
      this.RXe = (0, puerts_1.$unref)(e);
      this.Ojf = this.DXe / 2;
      this.Gjf = this.RXe / 2;
      this.UVd.FromConfigVector(this.n$t.ActorLocationProxy);
      this.xVd.FromConfigVector(this.n$t.ActorForwardProxy);
      var t = this.n$t.ActorGravityDirectProxy;
      var e = Vector_1.Vector.DotProduct(this.n$t.ActorForwardProxy, t);
      t.Multiply(e, this.kVd);
      this.xVd.Subtraction(this.kVd, this.xVd);
      this.WWf = true;
      for (const i of GrapplingHookPointComponent_1.GrapplingHookPointComponent.MotorcycleDetectableHookPoints) {
        if (this.o1h(i)) {
          if (this.PZf(i) && this.Hjf(i) && this.yzt(i) && this.jjf(i) && this.$jf(i) && this.Ogi(i) && this.x1h(i) && this.Wjf(i) && !(this.Njf > this.Fjf)) {
            this.DetectedTargetLegal = !this.QWf(i);
            this.DetectedTarget = i;
            this.Fjf = this.Njf;
          }
        }
      }
    }
  }
  Vjf() {
    this.Fjf = Number.MAX_VALUE;
    this.Njf = Number.MAX_VALUE;
    this.DetectedTargetLegal = false;
    this.DetectedTarget = undefined;
  }
  Hjf(t) {
    var e;
    return !!UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, t.HookLocation.ToUeVector(), this.S$e, false) && !((t = (0, puerts_1.$unref)(this.S$e)).X < 0) && !(t.X > this.DXe) && !(t.Y < 0) && !(t.Y > this.RXe) && !((t = (e = t.X - this.Ojf) * e + (e = t.Y - this.Gjf) * e) > this.Fjf) && !(this.Njf = t, 0);
  }
  o1h(t) {
    return !!t.Valid && !t.IsHookDisabled && !t.Entity.GetComponent(142)?.IsInState(3) && !t.Entity.GetComponent(0)?.GetRemoveState() && !t.IsInCd;
  }
  PZf(t) {
    var e = this.P7f.InteractingTarget;
    return (!e?.Valid || e.Entity.Id !== t.Entity.Id) && (!(e = this.P7f.PullingTarget)?.Valid || e.Entity.Id !== t.Entity.Id);
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
  jjf(t) {
    if (t.UseRangeComponent) {
      return !!t.Entity.GetComponent(89)?.IsOverlappingPlayer();
    } else {
      return Vector_1.Vector.DistSquared(t.TriggerLocation, this.QWs) < (t.MotorcycleHookMaxRadiusSquared > 0 ? t.MotorcycleHookMaxRadiusSquared : t.NormalHookMaxRadiusSquared);
    }
  }
  $jf(t) {
    var e = Vector_1.Vector.DistSquared(t.TriggerLocation, this.QWs);
    var t = t.MotorcycleHookMinRadiusSquared > 0 ? t.MotorcycleHookMinRadiusSquared : t.NormalHookMinRadiusSquared;
    return t <= 0 || t < e;
  }
  Ogi(t) {
    return t.WasRecentlyRenderOnScreen();
  }
  Wjf(t) {
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
  QWf(t) {
    var e;
    return !!this.uoe && !!this.SJf && (this.WWf && (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.SJf, this.QWs), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, this.QWs), this.WWf = false), t.HookInteractType === "MotorPullInteract" ? (TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, t.TriggerLocation), this.uoe.ActorsToIgnore.Add(t.ActorComp.Owner), e = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY), this.uoe.ActorsToIgnore.Empty(), e) : (TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.SJf, t.TriggerLocation), TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.qjf, this.SJf, TRACE_TAG_NAME, PROFILE_KEY)));
  }
}
exports.InteractionTargetSelector = InteractionTargetSelector;
//# sourceMappingURL=InteractionTargetSelector.js.map