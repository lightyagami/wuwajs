"use strict";

var RoleSceneInteractComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(e, i, r) : s(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSceneInteractComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleSceneInteractController_1 = require("../../../../Module/CombatMessage/RoleSceneInteractController");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const PortalUtils_1 = require("../../../../Utils/PortalUtils");
const GrapplingHookPointDefine_1 = require("../../Custom/Components/Define/GrapplingHookPointDefine");
const GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent");
const notSendHookLockPointSkillIds = new Set([200004, 200006]);
const TRACE_TAG_NAME = "RoleSceneInteract";
const PROFILE_KEY = "RoleSceneInteractComponent_FindBestTarget";
const MIN_DIST = 500;
const MIN_DIST_SQUARED = MIN_DIST * MIN_DIST;
const MIN_LEFT_RIGHT = 0.4142;
const MIN_UP_DOWN = 0.38;
const MIN_LEFT_RIGHT_SCALE = 0.33;
const MIN_UP_DOWN_SCALE = 0.28;
const LEFT_RIGHT_SCALE = MIN_UP_DOWN / MIN_LEFT_RIGHT;
const DEFAULT_MIN_LENGTH = Infinity;
const HOOK_VISION_ID = 1001;
const SPHERE_TRACE_RADIUS = 5;
const DEFAULT_GAZE_IN_DIST = 400;
const DEFAULT_GAZE_HEIGHT = 3000;
const DEFAULT_GAZE_RADIUS = 3000;
class HookPointInfo {
  constructor(t, e = 0, i = true) {
    this.Point = t;
    this.PortalPairId = e;
    this.PortalA2B = i;
  }
}
class HookPointUtils {
  static HookPointEqual(t, e) {
    return t.Point === e.Point && t.PortalPairId === e.PortalPairId && t.PortalA2B === e.PortalA2B;
  }
  static HookPointSetAdd(t, e, i = e instanceof HookPointInfo ? e.PortalPairId : 0, o = !(e instanceof HookPointInfo) || e.PortalA2B) {
    var s = e instanceof HookPointInfo ? e.Point : e;
    let n = t.get(s);
    if (n) {
      if (n.findIndex((t, e) => t[0] === i && t[1] === o) !== -1) {
        return t;
      }
    } else {
      n = [];
      t.set(s, n);
    }
    n.push([i, o]);
    return t;
  }
  static HookPointSetHas(t, e, i = e instanceof HookPointInfo ? e.PortalPairId : 0, o = !(e instanceof HookPointInfo) || e.PortalA2B) {
    var s = e instanceof HookPointInfo ? e.Point : e;
    var t = t?.get(s);
    return !!t && t.findIndex((t, e) => t[0] === i && t[1] === o) !== -1;
  }
  static HookPointSetDelete(t, e, i = e instanceof HookPointInfo ? e.PortalPairId : 0, o = !(e instanceof HookPointInfo) || e.PortalA2B) {
    var s;
    var n = e instanceof HookPointInfo ? e.Point : e;
    var r = t.get(n);
    return !!r && ((s = r.findIndex((t, e) => t[0] === i && t[1] === o)) !== -1 && r.splice(s, 1), r.length === 0 && t.delete(n), s !== -1);
  }
  static HookPointSetForEach(t, i) {
    t?.forEach((t, e) => {
      t.forEach(t => {
        i(e, t[0], t[1]);
      });
    });
  }
}
let RoleSceneInteractComponent = RoleSceneInteractComponent_1 = class RoleSceneInteractComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.P7f = undefined;
    this.Lie = undefined;
    this.jWs = Vector_1.Vector.Create();
    this.kue = Vector_1.Vector.Create();
    this.WWs = Vector_1.Vector.Create();
    this.KWs = Vector_1.Vector.Create();
    this.QWs = Vector_1.Vector.Create();
    this.$Ws = Vector_1.Vector.Create();
    this.YWs = Vector_1.Vector.Create();
    this.chh = Transform_1.Transform.Create();
    this.JWs = Vector_1.Vector.Create();
    this.zWs = Vector_1.Vector.Create();
    this.ZWs = new Map();
    this.Gon = false;
    this.eKs = new Map();
    this.Lul = false;
    this.$Xf = undefined;
    this.WXf = undefined;
    this.Jon = undefined;
    this.SimulateHookTargetEntity = undefined;
    this.SimulateHookTargetLocation = undefined;
    this.oKs = new Map();
    this.$on = new Map();
    this.tKs = [];
    this.rKs = -1;
    this.iKs = [];
    this.nKs = new Map();
    this.zon = new Map();
    this.bsr = undefined;
    this.Kon = false;
    this.Jlh = false;
    this.sKs = false;
    this.aKs = undefined;
    this.hKs = [];
    this.lKs = DEFAULT_MIN_LENGTH;
    this.Ylf = undefined;
    this.dpf = false;
    this.szf = false;
    this.fHe = (t, e) => {
      if (!this.dpf) {
        if (e?.Id === this.Entity.Id) {
          this.OnExploreComponentDisable("OnRoleGoDown");
        } else if (t.Id === this.Entity.Id) {
          this.OnExploreComponentEnable("OnRoleGoUp");
        }
      }
    };
    this.M6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.dpf = true;
        this.OnExploreComponentDisable("主控角色进入载具");
      }
    };
    this.E6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.dpf = false;
        this.OnExploreComponentEnable("主控角色离开载具");
      }
    };
    this.OnFixHookSkill = t => {
      var e;
      var i;
      if (this.ActorComp?.IsAutonomousProxy && GrapplingHookPointDefine_1.updateTargetSkillIds.has(t)) {
        if (this.Hon === undefined || this.Hon.Point === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 31, "使用技能时，没有选中的钩锁点，请检查技能Id配置", ["SkillId", t]);
          }
        } else {
          e = this.Hon;
          this.U7f = e;
          this.P7f.InteractingTarget = e.Point;
          if (e.Point.GetHookInteractType() === "FlyingFeather") {
            e.Point.ChangeHookPointState(3);
          }
          this.SimulateHookTargetEntity = undefined;
          this.SimulateHookTargetLocation = undefined;
          this.tKs.length = 0;
          i = this.tKs;
          this.tKs = this.iKs;
          this.iKs = i;
          this.rKs = 0;
          this.Lul = !!e?.Point.GazeNextPointAfterInteract;
          this.SetIsHookEndByInterrupt(false);
          e.Point.BeHooked(t);
          this.jon();
          if (!notSendHookLockPointSkillIds.has(t)) {
            this.Won();
          }
          CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook();
          this.Kon = true;
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.Fm);
        }
      }
    };
    this.OnFixHookSkillEnd = (t, e) => {
      var i;
      if (this.ActorComp?.IsAutonomousProxy && GrapplingHookPointDefine_1.updateTargetSkillIds.has(e)) {
        if ((i = this.U7f) === undefined || i.Point === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 31, "使用技能时，没有选中的钩锁点，请检查技能Id配置", ["SkillId", e]);
          }
        } else {
          HookPointUtils.HookPointSetForEach(this.oKs, (t, e, i) => {
            HookPointUtils.HookPointSetAdd(this.eKs, t, e, i);
          });
          HookPointUtils.HookPointSetForEach(this.$on, (t, e, i) => {
            HookPointUtils.HookPointSetAdd(this.eKs, t, e, i);
          });
          if (i?.Point?.Valid) {
            HookPointUtils.HookPointSetAdd(this.eKs, i.Point, i.PortalPairId, i.PortalA2B);
            i.Point.OnFixHookSkillEnd();
            this.zlh();
          }
          if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.Fm);
          }
          this.U7f = undefined;
          this.tKs.length = 0;
          this.rKs = -1;
          this.Jon = undefined;
          this.SimulateHookTargetEntity = undefined;
          this.SimulateHookTargetLocation = undefined;
          this.zon.clear();
          this.Kon = false;
          this.Lul = false;
          this.P7f.CancelLockTarget("OnFixHookSkillEnd", false);
        }
      }
    };
    this.vgl = (t, e) => {
      if (t === this.Entity.Id && GrapplingHookPointDefine_1.updateTargetSkillIds.has(e)) {
        this.SetIsHookEndByInterrupt(true);
      }
    };
    this.Fm = (t, e) => {
      if (e.Id === this.U7f?.Point.Entity.Id) {
        var i = this.Entity.GetComponent(41);
        this.SetIsHookEndByInterrupt(true);
        for (const o of GrapplingHookPointDefine_1.updateTargetSkillIds) {
          i.EndSkill(o, "CurrentTarget is Remove");
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 31, "钩锁点在勾的时候被删除，请检查配置", ["PbDataId", e.Entity.GetComponent(0)?.GetPbDataId()]);
        }
      }
    };
    this.a7r = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === HOOK_VISION_ID) {
        this.Gon = false;
      } else {
        this.Gon = true;
      }
    };
  }
  static get Dependencies() {
    return [3, 18];
  }
  get U7f() {
    var t = this.P7f.InteractingTarget;
    if (t) {
      if (this.$Xf) {
        this.$Xf.Point = t;
      } else {
        this.$Xf = new HookPointInfo(t);
      }
      return this.$Xf;
    }
  }
  set U7f(t) {
    this.P7f.InteractingTarget = t?.Point;
  }
  get Zon() {
    return this.P7f.FocusTargetLegal;
  }
  set Zon(t) {
    this.P7f.FocusTargetLegal = t;
  }
  get ern() {
    return this.P7f.NextLegalExceptSkill;
  }
  set ern(t) {
    this.P7f.NextLegalExceptSkill = t;
  }
  get Hon() {
    var t = this.P7f.FocusTarget;
    if (t) {
      if (this.WXf) {
        this.WXf.Point = t;
      } else {
        this.WXf = new HookPointInfo(t);
      }
      return this.WXf;
    }
  }
  set Hon(t) {
    this.P7f.SetFocusTarget(t?.Point);
  }
  GetIsHooking() {
    return this.Kon;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.P7f = this.Entity.GetComponent(56);
    this.Lie = this.Entity.GetComponent(215);
    this.Lie.ListenForTagAddOrRemove(283451623, (t, e) => {
      if (e) {
        this.Hon = undefined;
        this.hKs.length = 0;
      }
    });
    if (!this.ActorComp.IsRoleAndCtrlByMe) {
      this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端");
    }
    this.koe();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    this.OnExploreComponentDisable("OnEnd");
    return true;
  }
  OnExploreComponentEnable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.OnExploreComponentEnable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.szf], ["Reason", t]);
    }
    if (!this.szf) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnFixHookSkill);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.OnFixHookSkillEnd);
      this.szf = true;
    }
  }
  OnExploreComponentDisable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.OnExploreComponentDisable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.szf], ["Reason", t]);
    }
    if (this.szf) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnFixHookSkill);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.OnFixHookSkillEnd);
      this.szf = false;
    }
  }
  OnTick(t) {
    if (this.szf && Global_1.Global.BaseCharacter === this.ActorComp.Actor) {
      if (RoleSceneInteractComponent_1.f7r) {
        if (ModelManager_1.ModelManager.CameraModel && !this.Lie.HasTag(283451623)) {
          if (!this.P7f.IsLockingTarget) {
            this.bsr.SetDrawDebugTrace(RoleSceneInteractComponent_1.TraceDebug ? 1 : 0);
            this._rn();
            this.hrn();
            this.Rul();
          }
          for (var [e] of this.eKs) {
            if (!e?.Valid) {
              HookPointUtils.HookPointSetDelete(this.eKs, e);
            }
          }
        }
      } else if (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(HOOK_VISION_ID)) {
        RoleSceneInteractComponent_1.f7r = true;
      }
    }
  }
  koe() {
    this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.bsr.WorldContextObject = this.ActorComp.Owner;
    this.bsr.bIsSingle = false;
    this.bsr.bIgnoreSelf = true;
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.bsr.Radius = SPHERE_TRACE_RADIUS;
  }
  hrn(t = false) {
    let e = false;
    let i = false;
    e = this.sKs;
    o = this.aKs;
    this.iKs.length = 0;
    var o;
    var s = this.iKs;
    this.iKs = this.hKs;
    this.hKs = s;
    if (e) {
      s = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      e = s === HOOK_VISION_ID;
      i = true;
    }
    if (!!t || this.Zon !== e || this.Hon?.Point !== o?.Point || this.ern !== i) {
      this.Hon = o;
      this.ern = i;
      this.Zon = e;
      this.P7f.SetFocusTarget(o?.Point, e);
    }
    this.crn();
    this.zlf();
  }
  IsInInteractArea(t) {
    return HookPointUtils.HookPointSetHas(this.ZWs, t);
  }
  _rn() {
    this.sKs = false;
    this.aKs = undefined;
    this.lKs = DEFAULT_MIN_LENGTH;
    this.hKs.length = 0;
    this.ZWs.clear();
    this.nKs.clear();
    if (this.bsr) {
      let o = 0;
      let s = true;
      let [n, r] = this.uKs();
      ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach((t, e) => {
        var i = this.cKs(e, true);
        if (i[1]) {
          n = i[0];
          r = i[1];
          o = e;
          s = true;
        }
        var i = this.cKs(e, false);
        if (i[1]) {
          n = i[0];
          r = i[1];
          o = e;
          s = false;
        }
      });
      if (r) {
        this.sKs = n;
        this.aKs = new HookPointInfo(r, o, s);
      }
      this.oKs.clear();
      var t = this.oKs;
      this.oKs = this.$on;
      this.$on = t;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Interaction", 6, "RoleInteract: Missing SphereTrace");
    }
  }
  uKs() {
    if (!this.bsr) {
      return [false, undefined];
    }
    var t = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
    if (!t?.IsValid()) {
      return [false, undefined];
    }
    this.jWs.FromUeVector(t.D_K2_GetActorLocation());
    this.kue.FromUeVector(t.GetActorForwardVector());
    this.WWs.FromUeVector(t.GetActorRightVector());
    this.KWs.FromUeVector(t.GetActorUpVector());
    var e;
    var i;
    var o;
    var s = this.jWs;
    var n = this.kue;
    var r = this.WWs;
    var h = this.KWs;
    var a = Math.tan(MathUtils_1.MathUtils.DegToRad * t.FOVAngle);
    var _ = Math.tan(MathUtils_1.MathUtils.DegToRad * (t.FOVAngle / t.AspectRatio));
    this.QWs.FromConfigVector(this.ActorComp.ActorLocationProxy);
    var l = this.QWs;
    let c = [false, undefined];
    let E = true;
    for (const v of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!v.Entity.GetComponent(0)?.GetRemoveState() && v.CheckCondition() && v.WasRecentlyRenderOnScreen() && this.x1h(v.MatchRoleOption) && !v.IsInCd && !v.Entity.GetComponent(142)?.IsInState(3) && !v.IsHookDisabled && (v !== this.U7f?.Point || this.U7f.PortalPairId !== 0 || !this.U7f.PortalA2B)) {
        if (v.UseRangeComponent) {
          if (!v.Entity.GetComponent(89)?.IsOverlappingPlayer()) {
            HookPointUtils.HookPointSetDelete(this.eKs, v);
            continue;
          }
        } else if (Vector_1.Vector.DistSquared(v.TriggerLocation, l) > v.NormalHookMaxRadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, v);
          continue;
        }
        HookPointUtils.HookPointSetAdd(this.$on, v);
        if (Vector_1.Vector.DistSquared(v.HookLocation, l) < MIN_DIST_SQUARED && v.GetHookInteractType() !== "CableWay") {
          HookPointUtils.HookPointSetDelete(this.zon, v);
        } else {
          if (v.CameraGaze && v.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, v) && !HookPointUtils.HookPointSetHas(this.eKs, v)) {
            HookPointUtils.HookPointSetAdd(this.nKs, v);
          }
          e = this.$Ws;
          v.HookLocation.Subtraction(s, e);
          if (!((i = e.DotProduct(n)) <= 0) && !(o = e.DotProduct(r), Math.abs(o / i) > Math.min(a, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT)) && !(e = e.DotProduct(h), Math.abs(e / i) > Math.min(_, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)) && !(HookPointUtils.HookPointSetAdd(this.ZWs, v), i = MathUtils_1.MathUtils.Square(o * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(e), this.lKs < i)) {
            if (E) {
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, l);
              E = false;
            }
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, v.HookLocation);
            o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
            o = this.rAl(o, v, this.bsr.HitResult);
            this.lKs = i;
            this.hKs.length = 0;
            this.hKs.push([this.ActorComp.ActorLocationProxy, v.HookLocation]);
            c = [!o, v];
          }
        }
      }
    }
    return c;
  }
  cKs(t, e) {
    if (!this.bsr) {
      return [false, undefined];
    }
    var i = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
    if (!i?.IsValid()) {
      return [false, undefined];
    }
    if (!t) {
      return [false, undefined];
    }
    var o = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
    if (!o || !o.Portal1Enable || !o.Portal2Enable) {
      return [false, undefined];
    }
    var s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(226);
    if (!s) {
      return [false, undefined];
    }
    var n = ModelManager_1.ModelManager.CreatureModel?.GetEntity(s.GetPairCreatureDataId())?.Entity?.GetComponent(226);
    if (!n) {
      return [false, undefined];
    }
    this.chh.FromUeTransform(e ? o.PortalWorldTransform1 : o.PortalWorldTransform2);
    var r = this.chh;
    var h = (e ? s : n).PortalBounds;
    var a = r.GetLocation();
    r.GetRotation().GetForwardVector(this.YWs);
    var _ = this.YWs;
    var o = this.ActorComp.ActorLocationProxy;
    var l = this.QWs;
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, t, e, l);
    var s = i.D_GetTransform();
    var n = PortalUtils_1.PortalUtils.GetMappingTransformToOtherPortal(s, t, e);
    var c = this.jWs;
    c.FromUeVector(n.GetLocation());
    var o = MathUtils_1.MathUtils.CommonTempQuat;
    o.FromUeQuat(n.GetRotation());
    var E = this.kue;
    o.GetForwardVector(E);
    var v = this.WWs;
    o.GetRightVector(v);
    var f = this.KWs;
    o.GetUpVector(f);
    var s = MathUtils_1.MathUtils.DegToRad * (i.FOVAngle / 2);
    var u = Math.tan(s);
    var C = Math.tan(s * i.AspectRatio);
    let I = [false, undefined];
    for (const d of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!d.Entity.GetComponent(0)?.GetRemoveState() && d.CheckCondition() && d.WasRecentlyRenderOnScreen() && this.x1h(d.MatchRoleOption) && !d.IsInCd && !d.Entity.GetComponent(142)?.IsInState(3) && d.GetHookInteractType() === "FixedPointHook" && !d.IsHookDisabled && (d !== this.U7f?.Point || t !== this.U7f.PortalPairId || e !== this.U7f.PortalA2B)) {
        var p = Vector_1.Vector.DistSquared(d.HookLocation, l);
        if (p > d.NormalHookMaxRadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, d, t, e);
        } else {
          HookPointUtils.HookPointSetAdd(this.$on, d, t, e);
          if (p < MIN_DIST_SQUARED) {
            HookPointUtils.HookPointSetDelete(this.zon, d, t, e);
          } else {
            if (d.CameraGaze && d.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, d, t, e) && !HookPointUtils.HookPointSetHas(this.eKs, d, t, e)) {
              HookPointUtils.HookPointSetAdd(this.nKs, d, t, e);
            }
            var p = this.$Ws;
            d.HookLocation.Subtraction(c, p);
            var M = p.DotProduct(E);
            if (!(M <= 0)) {
              var m = p.DotProduct(v);
              var T = Math.abs(m / M);
              if (!(T > Math.min(u, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT))) {
                T = p.DotProduct(f);
                p = Math.abs(T / M);
                if (!(p > Math.min(C, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN))) {
                  M = this.JWs;
                  if (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(this.ActorComp.ActorLocationProxy, PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(d.Entity.GetComponent(1).ActorLocationProxy, t, !e, MathUtils_1.MathUtils.CommonTempVector), a, _, M)) {
                    r.InverseTransformPosition(M, MathUtils_1.MathUtils.CommonTempVector);
                    p = MathUtils_1.MathUtils.CommonTempVector;
                    if (!(Math.abs(p.Y) > Math.abs(h.Y)) && !(Math.abs(p.Z) > Math.abs(h.Z))) {
                      p = this.zWs;
                      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(M, t, e, p);
                      HookPointUtils.HookPointSetAdd(this.ZWs, d, t, e);
                      m = MathUtils_1.MathUtils.Square(m * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(T);
                      if (!(this.lKs <= m)) {
                        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, this.ActorComp.ActorLocation);
                        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, M);
                        let t = false;
                        if (!(t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY))) {
                          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, p);
                          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, d.HookLocation);
                          t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
                        }
                        t = this.rAl(t, d, this.bsr.HitResult);
                        this.lKs = m;
                        this.hKs.length = 0;
                        this.hKs.push([this.ActorComp.ActorLocationProxy, Vector_1.Vector.Create(M)]);
                        this.hKs.push([Vector_1.Vector.Create(p), d.HookLocation]);
                        I = [!t, d];
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return I;
  }
  crn() {
    var t = ModelManager_1.ModelManager.CameraModel;
    HookPointUtils.HookPointSetForEach(this.zon, (t, e, i) => {
      if (HookPointUtils.HookPointSetHas(this.oKs, t, e, i)) {
        HookPointUtils.HookPointSetDelete(this.zon, t, e, i);
      }
    });
    HookPointUtils.HookPointSetForEach(this.nKs, (t, e, i) => {
      HookPointUtils.HookPointSetAdd(this.zon, t, e, i);
    });
    this.nKs.clear();
    if (this.Jon) {
      if (!t.FightCamera.LogicComponent.CameraGuideController.IsBlending) {
        HookPointUtils.HookPointSetDelete(this.zon, this.Jon);
      }
      if (!HookPointUtils.HookPointSetHas(this.zon, this.Jon)) {
        this.Jon = undefined;
      }
    }
    if (!(this.Jon ?? this.zon.size === 0)) {
      let s = -1;
      const n = this.U7f !== undefined;
      HookPointUtils.HookPointSetForEach(this.zon, (t, e, i) => {
        var o = t.CameraGaze.GazeInHook;
        if (e === 0) {
          if (o && !n) {
            HookPointUtils.HookPointSetDelete(this.zon, t, e, i);
          } else if (t.CameraGaze.LockPriority > s) {
            this.Jon = new HookPointInfo(t, e, i);
            s = t.CameraGaze.LockPriority;
          }
        }
      });
      if (this.Jon) {
        CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(this.Jon.Point);
      }
    }
  }
  zlf() {
    var t = this.Ylf;
    var e = this.Jlf();
    if (e !== t) {
      this.Ylf = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, t, e);
    }
  }
  Jlf() {
    if (ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable()) {
      if (this.Zon && this.Hon) {
        if ((o = this.Hon.Point.Entity.GetComponent(335))?.Valid && o.GetCanBeWatchSelect()) {
          return o;
        } else {
          return undefined;
        }
      }
      if (this.bsr) {
        var o = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
        if (o?.IsValid()) {
          this.jWs.FromUeVector(o.D_K2_GetActorLocation());
          this.kue.FromUeVector(o.GetActorForwardVector());
          this.WWs.FromUeVector(o.GetActorRightVector());
          this.KWs.FromUeVector(o.GetActorUpVector());
          var s = this.jWs;
          var n = this.kue;
          var r = this.WWs;
          var h = this.KWs;
          var a = Math.tan(MathUtils_1.MathUtils.DegToRad * o.FOVAngle);
          var _ = Math.tan(MathUtils_1.MathUtils.DegToRad * (o.FOVAngle / o.AspectRatio));
          this.QWs.FromConfigVector(this.ActorComp.ActorLocationProxy);
          var l = this.QWs;
          let t = true;
          let e = MathUtils_1.MathUtils.MaxFloat;
          let i = undefined;
          for (const u of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
            if (u.GetHookInteractType() === "SunSpiritLauncher" && !u.Entity.GetComponent(0)?.GetRemoveState()) {
              var c = u.Entity.GetComponent(335);
              if (c?.Valid && c.GetCanBeWatchSelect() && u.WasRecentlyRenderOnScreen() && this.x1h(u.MatchRoleOption) && !u.Entity.GetComponent(142)?.IsInState(3) && !u.IsHookDisabled) {
                if (u.UseRangeComponent) {
                  if (!u.Entity.GetComponent(89)?.IsOverlappingPlayer()) {
                    continue;
                  }
                } else if (Vector_1.Vector.DistSquared(u.TriggerLocation, l) > u.NormalHookMaxRadiusSquared) {
                  continue;
                }
                var E;
                var v = this.$Ws;
                u.HookLocation.Subtraction(s, v);
                var f = v.DotProduct(n);
                if (!(f <= 0) && !(E = v.DotProduct(r), Math.abs(E / f) > Math.min(a, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT)) && !(v = v.DotProduct(h), Math.abs(v / f) > Math.min(_, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)) && !(f = MathUtils_1.MathUtils.Square(E * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(v), e <= f) && !(t && (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, l), t = false), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, u.HookLocation), E = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY), E = this.rAl(E, u, this.bsr.HitResult))) {
                  e = f;
                  i = c;
                }
              }
            }
          }
          return i;
        }
      }
    }
  }
  CanActivateFixHook() {
    return this.Zon && this.Hon !== undefined && this.U7f !== this.Hon;
  }
  GetCurrentTargetEntity() {
    if (this.ActorComp?.IsAutonomousProxy) {
      if (this.U7f) {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.U7f.Point.Entity.Id);
      } else {
        return undefined;
      }
    } else {
      return this.SimulateHookTargetEntity;
    }
  }
  GetCurrentTargetLocation() {
    let t = undefined;
    return (t = this.ActorComp?.IsAutonomousProxy ? this.U7f?.Point.HookLocation : this.SimulateHookTargetEntity?.Entity?.GetComponent(88)?.HookLocation ?? this.SimulateHookTargetLocation) ?? this.ActorComp.ActorLocationProxy;
  }
  OnRoleBeforeTeleportThroughPortal() {
    if (this.Lie?.HasTag(-1009010563) && (!(this.rKs >= 0) || !(this.rKs + 1 < this.tKs.length))) {
      var t = this.Entity.GetComponent(41);
      for (const e of GrapplingHookPointDefine_1.updateTargetSkillIds) {
        t.EndSkill(e, "Portal Stop skill (fix hook without portal)");
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 39, "没有透过传送门勾取钩锁点，但勾的过程中穿过传送门，请检查钩锁点是否离传送门过近", ["PbDataId", this.U7f?.Point.Entity.GetComponent(0)?.GetPbDataId()]);
      }
    }
  }
  OnRoleTeleportThroughPortal() {
    if (this.Lie?.HasTag(-1009010563) && this.rKs >= 0 && this.rKs + 1 < this.tKs.length) {
      this.rKs += 1;
    }
  }
  GetIsInLastPathway() {
    return !(this.rKs >= 0) || !(this.rKs < this.tKs.length) || this.rKs >= this.tKs.length - 1;
  }
  GetCurrentPathwayEndLocation() {
    let t = undefined;
    return (t = this.ActorComp?.IsAutonomousProxy && this.rKs >= 0 && this.rKs < this.tKs.length ? this.tKs[this.rKs][1] : t) ?? this.U7f?.Point.HookLocation ?? this.ActorComp.ActorLocationProxy;
  }
  GetCurrentPathways() {
    return this.tKs;
  }
  GetCurrentTargetEnterPortalCapture() {
    var t = this.U7f;
    if (t?.Point && t.PortalPairId) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.PortalPairId)?.Entity?.GetComponent(226);
      if (e) {
        e = e?.PortalCapture;
        if (t.PortalA2B) {
          return e;
        } else {
          t = (0, puerts_1.$ref)(undefined);
          e?.GetPair(t);
          return (0, puerts_1.$unref)(t);
        }
      }
    }
  }
  GetCurrentTargetExitPortalCapture() {
    var t = this.U7f;
    if (t?.Point && t.PortalPairId) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.PortalPairId)?.Entity?.GetComponent(226);
      if (e) {
        e = e?.PortalCapture;
        if (t.PortalA2B) {
          return e;
        } else {
          t = (0, puerts_1.$ref)(undefined);
          e?.GetPair(t);
          return (0, puerts_1.$unref)(t);
        }
      }
    }
  }
  GetCurrentTarget() {
    return this.U7f?.Point;
  }
  GetCurrentTargetActor() {
    return this.U7f?.Point.Entity.GetComponent(1)?.Owner;
  }
  GetNextTargetLocation() {
    return this.Hon.Point.HookLocation.ToUeVector();
  }
  GetNextTargetVector() {
    return this.Hon.Point.HookLocation;
  }
  GetInheritSpeed() {
    return this.U7f.Point.InheritSpeed;
  }
  GetIsClimb() {
    return this.U7f.Point.IsClimb;
  }
  GetCurrentTargetForward() {
    var t = this.U7f.Point.Entity.GetComponent(0);
    if (t?.Valid) {
      return t.GetRotation().RotateVectorDouble(Vector_1.Vector.ForwardVectorDouble);
    } else {
      return this.ActorComp.ActorForward;
    }
  }
  GetTargetIsSuiGuangType() {
    var t = this.U7f?.Point?.GetHookInteractType();
    return !!t && t === "SuiGuangHook";
  }
  GetTargetType() {
    var t = this.U7f?.Point?.GetHookInteractType();
    if (!t) {
      return 0;
    }
    if (t === "SlashHook") {
      switch (this.U7f?.Point.GetSlashHitType()) {
        case "HeavySlash":
          return 6;
        case "LightSlash":
          return 7;
      }
    }
    return RoleSceneInteractComponent_1.dth.get(t) ?? 0;
  }
  SetIsHookEndByInterrupt(t) {
    this.Jlh = t;
  }
  GetSunSpiritLauncherUiTarget() {
    return this.Ylf;
  }
  jon() {
    if (this.ActorComp.IsAutonomousProxy) {
      RoleSceneInteractController_1.RoleSceneInteractController.SendHookMoveRequest(this.Entity, this.U7f.Point);
    }
  }
  Won() {
    const o = this.U7f?.Point;
    var t;
    if (o?.Valid && this.ActorComp.IsAutonomousProxy) {
      t = Protocol_1.Aki.Protocol.dms.create();
      if (o?.Valid) {
        t.F4n = MathUtils_1.MathUtils.NumberToLong(o.Entity.GetComponent(0).GetCreatureDataId());
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.SendHookTargetRequest", ["EntityConfigId", o.EntityConfigId]);
        }
        Net_1.Net.Call(19182, t, t => {
          switch (t.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
            case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointConditionNotMet:
              break;
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Character", 31, "钩锁点不存在", ["EntityId", o.Entity.GetComponent(0).GetCreatureDataId()]);
              }
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 25582);
          }
          if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            var e = this.Entity.GetComponent(41);
            this.SetIsHookEndByInterrupt(true);
            for (const i of GrapplingHookPointDefine_1.updateTargetSkillIds) {
              e.EndSkill(i, "HookLockPointRequest请求返回错误，终止钩锁技能");
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 39, "请求勾钩锁返回错误", ["EntityConfigId", o.EntityConfigId]);
            }
          }
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 79, "RoleSceneInteractComponent.SendHookTargetRequest Failed, interactingTarget is invalid.", ["EntityConfigId", o?.EntityConfigId]);
      }
    }
  }
  zlh() {
    var t = this.U7f?.Point;
    if (t?.Valid && this.ActorComp.IsAutonomousProxy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.SendHookEndRequest", ["EntityConfigId", t.EntityConfigId]);
      }
      var e = t.Entity.GetComponent(0).GetCreatureDataId();
      const i = Protocol_1.Aki.Protocol.DC_.create();
      i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
      i.Zlh = this.Jlh ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint;
      Net_1.Net.Call(29303, i, t => {});
      if (t?.WillBeDestroyedAfterHook) {
        const i = Protocol_1.Aki.Protocol.Wgs.create();
        i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(20887, i, t => {});
      } else if (t?.WillBeHideAfterHook) {
        e = t.Entity;
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e, false, "RoleSceneInteractComponent.SendHookDestroyRequest", true);
      }
    }
  }
  Rul() {
    if (this.Lul && ModelManager_1.ModelManager.CameraModel) {
      var t = this.U7f;
      if (t) {
        var e = t.Point.GazeNextPointAfterInteract;
        if (e && !(Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, t.Point.HookLocation) > MathUtils_1.MathUtils.Square(e?.GazeCondition?.GazeInDistance || DEFAULT_GAZE_IN_DIST))) {
          this.Lul = false;
          var i;
          var o = new Map();
          var s = Quat_1.Quat.Create();
          ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(s);
          s.Inverse(s);
          var n = e?.GazeCondition?.ScanRange?.Height ?? DEFAULT_GAZE_HEIGHT;
          var e = (e?.GazeCondition?.ScanRange?.Radius ?? DEFAULT_GAZE_RADIUS) / n;
          this.aym(ModelManager_1.ModelManager.CameraModel.CameraLocation, s, n, e, e, o);
          for ([, i] of o) {
            if (i !== t.Point && i.GetHookInteractType() === t.Point.GetHookInteractType()) {
              CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(i, t.Point);
              break;
            }
          }
        }
      }
    }
  }
  aym(t, e, i, o, s, n, r = true, h = false) {
    if (r) {
      n.clear();
    }
    var a = this.ActorComp.ActorLocationProxy;
    var _ = o * o;
    var l = s * s;
    let c = true;
    for (const f of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!f.Entity.GetComponent(0)?.GetRemoveState() && f.CheckHookEnableCondition() && f.WasRecentlyRenderOnScreen() && !f.IsInCd && !f.Entity.GetComponent(142)?.IsInState(3) && (f !== this.U7f?.Point || this.U7f.PortalPairId !== 0 || !this.U7f.PortalA2B)) {
        var E = this.$Ws;
        f.HookLocation.Subtraction(t, E);
        e.RotateVector(E, E);
        if (!(E.X <= 0) && !(E.X > i)) {
          var v = E.Y / E.X;
          var E = E.Z / E.X;
          if (!(v * v / _ + E * E / l > 1)) {
            if (c) {
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, a);
              c = false;
            }
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, f.HookLocation);
            v = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
            v = this.rAl(v, f, this.bsr.HitResult);
            if (!v && (n.set(f.Entity.Id, f), h)) {
              return;
            }
          }
        }
      }
    }
  }
  x1h(t) {
    if (!t || t.length <= 0) {
      return !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
    } else {
      return SceneTeamController_1.SceneTeamController.IsMatchRoleOption(t);
    }
  }
  rAl(t, e, s) {
    if (t) {
      var n = e.Entity.GetComponent(212)?.Owner;
      if (!n) {
        return true;
      }
      var r = e.IsIgnorePlayerCollision;
      for (let o = 0; o < s.Actors.Num(); o++) {
        let i = s.Actors.Get(o);
        if (i !== undefined) {
          var h = s.Components.Get(o);
          let t = true;
          let e = 10;
          while (i && --e > 0) {
            if (r) {
              var a = h.GetCollisionObjectType();
              if (a === QueryTypeDefine_1.KuroCollisionChannel.Pawn || a === QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer) {
                t = false;
                break;
              }
            }
            if (i === n) {
              return false;
            }
            i = i.GetAttachParentActor();
          }
          if (t) {
            return true;
          }
        }
      }
    }
    return false;
  }
  SetDataFromOldRole(t) {
    t = t.Entity.GetComponent(105);
    this.dpf = t.dpf;
    this.Hon = t.Hon;
    this.Zon = t.Zon;
  }
  CheckNextTargetCanInteract() {
    var t = this.P7f.FocusTarget;
    return !!t?.Valid && !!this.Zon && t.OnlineTypeCanInteract;
  }
  GetNextTargetIsIgnorePlayerCollision() {
    var t = this.P7f.FocusTarget;
    return !!t?.Valid && t.IsIgnorePlayerCollision;
  }
};
RoleSceneInteractComponent.f7r = false;
RoleSceneInteractComponent.TraceDebug = false;
RoleSceneInteractComponent.DebugLog = false;
RoleSceneInteractComponent.dth = new Map([["FixedPointHook", 0], ["SuiGuangHook", 1], ["KiteHook", 2], ["RagDollJumpingPoint", 3], ["RagDollClimbingPoint", 4], ["MovementPointHook", 5], ["SlashHook", 6], ["ChargeSlashHook", 8], ["CableWay", 9]]);
RoleSceneInteractComponent = RoleSceneInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(105)], RoleSceneInteractComponent);
exports.RoleSceneInteractComponent = RoleSceneInteractComponent; //# sourceMappingURL=RoleSceneInteractComponent.js.map