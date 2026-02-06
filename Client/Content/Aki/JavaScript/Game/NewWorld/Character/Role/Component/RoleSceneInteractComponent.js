"use strict";

var RoleSceneInteractComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        r = (s < 3 ? n(r) : s > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
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
const FixHookClientLevelEventExecutor_1 = require("../../Common/Component/Explore/FixHookClientLevelEventExecutor");
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
    var n = e instanceof HookPointInfo ? e.Point : e;
    let s = t.get(n);
    if (s) {
      if (s.findIndex((t, e) => t[0] === i && t[1] === o) !== -1) {
        return t;
      }
    } else {
      s = [];
      t.set(n, s);
    }
    s.push([i, o]);
    return t;
  }
  static HookPointSetHas(t, e, i = e instanceof HookPointInfo ? e.PortalPairId : 0, o = !(e instanceof HookPointInfo) || e.PortalA2B) {
    var n = e instanceof HookPointInfo ? e.Point : e;
    var t = t?.get(n);
    return !!t && t.findIndex((t, e) => t[0] === i && t[1] === o) !== -1;
  }
  static HookPointSetDelete(t, e, i = e instanceof HookPointInfo ? e.PortalPairId : 0, o = !(e instanceof HookPointInfo) || e.PortalA2B) {
    var n;
    var s = e instanceof HookPointInfo ? e.Point : e;
    var r = t.get(s);
    return !!r && ((n = r.findIndex((t, e) => t[0] === i && t[1] === o)) !== -1 && r.splice(n, 1), r.length === 0 && t.delete(s), n !== -1);
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
    this._tg = undefined;
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
    this.Rug = undefined;
    this.Lug = undefined;
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
    this.Q0f = undefined;
    this.Yyf = false;
    this.Ofg = false;
    this.fkg = false;
    this.fHe = (t, e) => {
      if (!this.Yyf) {
        if (e?.Id === this.Entity.Id) {
          this.OnExploreComponentDisable("OnRoleGoDown");
        } else if (t.Id === this.Entity.Id) {
          this.OnExploreComponentEnable("OnRoleGoUp");
        }
      }
    };
    this.M6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.Yyf = true;
        this.OnExploreComponentDisable("主控角色进入载具");
      }
    };
    this.E6l = t => {
      if (t.IsDriver && t.PassengerEntity === this.Entity) {
        this.Yyf = false;
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
          this.dtg = e;
          this._tg.InteractingTarget = e.Point;
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
          this.gkg();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 79, "SendHookTargetRequest", ["SyncEnabled", this.t2g], ["SkillId", t]);
          }
          if (!notSendHookLockPointSkillIds.has(t) && this.t2g) {
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
        if ((i = this.dtg) === undefined || i.Point === undefined) {
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
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 79, "SendHookEndRequest", ["SyncEnabled", this.t2g], ["SkillId", e]);
            }
            if (this.t2g) {
              this.zlh();
            }
            this.t2g = true;
          }
          if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.Fm);
          }
          this.dtg = undefined;
          this.tKs.length = 0;
          this.rKs = -1;
          this.Jon = undefined;
          this.SimulateHookTargetEntity = undefined;
          this.SimulateHookTargetLocation = undefined;
          this.zon.clear();
          this.Kon = false;
          this.Lul = false;
          this._tg.CancelLockTarget("OnFixHookSkillEnd", false);
        }
      }
    };
    this.vgl = (t, e) => {
      if (t === this.Entity.Id && GrapplingHookPointDefine_1.updateTargetSkillIds.has(e)) {
        this.SetIsHookEndByInterrupt(true);
      }
    };
    this.Fm = (t, e) => {
      if (e.Id === this.dtg?.Point.Entity.Id) {
        var i = this.Entity.GetComponent(43);
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
  get dtg() {
    var t = this._tg.InteractingTarget;
    if (t) {
      if (this.Rug) {
        this.Rug.Point = t;
      } else {
        this.Rug = new HookPointInfo(t);
      }
      return this.Rug;
    }
  }
  set dtg(t) {
    this._tg.InteractingTarget = t?.Point;
  }
  get Zon() {
    return this._tg.FocusTargetLegal;
  }
  set Zon(t) {
    this._tg.FocusTargetLegal = t;
  }
  get ern() {
    return this._tg.FocusTargetLegalExceptSkill;
  }
  set ern(t) {
    this._tg.FocusTargetLegalExceptSkill = t;
  }
  get t2g() {
    return this._tg.SyncEnabled;
  }
  set t2g(t) {
    this._tg.SyncEnabled = t;
  }
  get Hon() {
    var t = this._tg.FocusTarget;
    if (t) {
      if (this.Lug) {
        this.Lug.Point = t;
      } else {
        this.Lug = new HookPointInfo(t);
      }
      return this.Lug;
    }
  }
  set Hon(t) {
    this._tg.SetFocusTarget(t?.Point);
  }
  GetIsHooking() {
    return this.Kon;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this._tg = this.Entity.GetComponent(58);
    this.Lie = this.Entity.GetComponent(217);
    this.Lie.ListenForTagAddOrRemove(283451623, (t, e) => {
      if (e) {
        this.Hon = undefined;
        this.hKs.length = 0;
      }
    });
    this.fkg = this.ActorComp.IsRoleAndCtrlByMe;
    if (this.fkg) {
      this.koe();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    } else {
      this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端");
    }
    return true;
  }
  OnEnd() {
    if (this.fkg) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      this.OnExploreComponentDisable("OnEnd");
    }
    return true;
  }
  OnExploreComponentEnable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.OnExploreComponentEnable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.Ofg], ["Reason", t]);
    }
    if (!this.Ofg) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnFixHookSkill);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.OnFixHookSkillEnd);
      this.Ofg = true;
    }
  }
  OnExploreComponentDisable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.OnExploreComponentDisable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.Ofg], ["Reason", t]);
    }
    if (this.Ofg) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnFixHookSkill);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.OnFixHookSkillEnd);
      this.Ofg = false;
    }
  }
  OnTick(t) {
    if (this.Ofg && Global_1.Global.BaseCharacter === this.ActorComp.Actor) {
      if (RoleSceneInteractComponent_1.f7r) {
        if (ModelManager_1.ModelManager.CameraModel && !this.Lie.HasTag(283451623)) {
          if (!this._tg.IsLockingTarget) {
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
  OnDetectedTargetChanged() {
    this.hKs.length = 0;
    var t = this.Hon?.Point;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.OnDetectedTargetChanged", ["EntityConfigId", t?.EntityConfigId]);
    }
    if (t?.Valid) {
      this.hKs.push([this.ActorComp.ActorLocationProxy, t.HookLocation]);
    }
    this.iKs.length = 0;
    var t = this.iKs;
    this.iKs = this.hKs;
    this.hKs = t;
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
    var n = this.iKs;
    this.iKs = this.hKs;
    this.hKs = n;
    if (e) {
      n = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      e = n === HOOK_VISION_ID;
      i = true;
    }
    if (!!t || this.Zon !== e || this.Hon?.Point !== o?.Point || this.ern !== i) {
      this.ern = i;
      this._tg.SetFocusTarget(o?.Point, e);
    }
    this.crn();
    this.K0f();
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
      let n = true;
      let [s, r] = this.uKs();
      ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach((t, e) => {
        var i = this.cKs(e, true);
        if (i[1]) {
          s = i[0];
          r = i[1];
          o = e;
          n = true;
        }
        var i = this.cKs(e, false);
        if (i[1]) {
          s = i[0];
          r = i[1];
          o = e;
          n = false;
        }
      });
      if (r) {
        this.sKs = s;
        this.aKs = new HookPointInfo(r, o, n);
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
    var e = this.jWs;
    var i = this.kue;
    var o = this.WWs;
    var n = this.KWs;
    var s = Math.tan(MathUtils_1.MathUtils.DegToRad * t.FOVAngle);
    var r = Math.tan(MathUtils_1.MathUtils.DegToRad * (t.FOVAngle / t.AspectRatio));
    this.QWs.FromConfigVector(this.ActorComp.ActorLocationProxy);
    var h = this.QWs;
    let a = [false, undefined];
    let _ = true;
    for (const v of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!v.Entity.GetComponent(0)?.GetRemoveState() && v.CheckCondition() && v.WasRecentlyRenderOnScreen() && this.x1h(v.MatchRoleOption) && !v.IsInCd && !v.Entity.GetComponent(144)?.IsInState(3) && !v.IsHookDisabled && (v !== this.dtg?.Point || this.dtg.PortalPairId !== 0 || !this.dtg.PortalA2B)) {
        if (v.UseRangeComponent) {
          if (!v.Entity.GetComponent(91)?.IsOverlappingPlayer()) {
            HookPointUtils.HookPointSetDelete(this.eKs, v);
            continue;
          }
        } else if (Vector_1.Vector.DistSquared(v.TriggerLocation, h) > v.NormalHookMaxRadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, v);
          continue;
        }
        HookPointUtils.HookPointSetAdd(this.$on, v);
        var l = Vector_1.Vector.DistSquared(v.HookLocation, h);
        var c = v.NormalHookMinRadiusSquared;
        if (c !== undefined) {
          if (c > 0 && l < c) {
            HookPointUtils.HookPointSetDelete(this.zon, v);
            continue;
          }
        } else if (l < MIN_DIST_SQUARED && v.GetHookInteractType() !== "CableWay") {
          HookPointUtils.HookPointSetDelete(this.zon, v);
          continue;
        }
        if (v.CameraGaze && v.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, v) && !HookPointUtils.HookPointSetHas(this.eKs, v)) {
          HookPointUtils.HookPointSetAdd(this.nKs, v);
        }
        var E;
        var c = this.$Ws;
        v.HookLocation.Subtraction(e, c);
        var l = c.DotProduct(i);
        if (!(l <= 0) && !(E = c.DotProduct(o), Math.abs(E / l) > Math.min(s, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT)) && !(c = c.DotProduct(n), Math.abs(c / l) > Math.min(r, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)) && !(HookPointUtils.HookPointSetAdd(this.ZWs, v), l = MathUtils_1.MathUtils.Square(E * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(c), this.lKs < l)) {
          if (_) {
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, h);
            _ = false;
          }
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, v.HookLocation);
          E = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
          E = this.rAl(E, v, this.bsr.HitResult);
          this.lKs = l;
          this.hKs.length = 0;
          this.hKs.push([this.ActorComp.ActorLocationProxy, v.HookLocation]);
          a = [!E, v];
        }
      }
    }
    return a;
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
    var n = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(228);
    if (!n) {
      return [false, undefined];
    }
    var s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(n.GetPairCreatureDataId())?.Entity?.GetComponent(228);
    if (!s) {
      return [false, undefined];
    }
    this.chh.FromUeTransform(e ? o.PortalWorldTransform1 : o.PortalWorldTransform2);
    var r = this.chh;
    var h = (e ? n : s).PortalBounds;
    var a = r.GetLocation();
    r.GetRotation().GetForwardVector(this.YWs);
    var _ = this.YWs;
    var o = this.ActorComp.ActorLocationProxy;
    var l = this.QWs;
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, t, e, l);
    var n = i.D_GetTransform();
    var s = PortalUtils_1.PortalUtils.GetMappingTransformToOtherPortal(n, t, e);
    var c = this.jWs;
    c.FromUeVector(s.GetLocation());
    var o = MathUtils_1.MathUtils.CommonTempQuat;
    o.FromUeQuat(s.GetRotation());
    var E = this.kue;
    o.GetForwardVector(E);
    var v = this.WWs;
    o.GetRightVector(v);
    var C = this.KWs;
    o.GetUpVector(C);
    var n = MathUtils_1.MathUtils.DegToRad * (i.FOVAngle / 2);
    var f = Math.tan(n);
    var u = Math.tan(n * i.AspectRatio);
    let I = [false, undefined];
    for (const M of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!M.Entity.GetComponent(0)?.GetRemoveState() && M.CheckCondition() && M.WasRecentlyRenderOnScreen() && this.x1h(M.MatchRoleOption) && !M.IsInCd && !M.Entity.GetComponent(144)?.IsInState(3) && M.GetHookInteractType() === "FixedPointHook" && !M.IsHookDisabled && (M !== this.dtg?.Point || t !== this.dtg.PortalPairId || e !== this.dtg.PortalA2B)) {
        var d = Vector_1.Vector.DistSquared(M.HookLocation, l);
        if (d > M.NormalHookMaxRadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, M, t, e);
        } else {
          HookPointUtils.HookPointSetAdd(this.$on, M, t, e);
          if (d < MIN_DIST_SQUARED) {
            HookPointUtils.HookPointSetDelete(this.zon, M, t, e);
          } else {
            if (M.CameraGaze && M.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, M, t, e) && !HookPointUtils.HookPointSetHas(this.eKs, M, t, e)) {
              HookPointUtils.HookPointSetAdd(this.nKs, M, t, e);
            }
            var d = this.$Ws;
            M.HookLocation.Subtraction(c, d);
            var g = d.DotProduct(E);
            if (!(g <= 0)) {
              var p = d.DotProduct(v);
              var m = Math.abs(p / g);
              if (!(m > Math.min(f, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT))) {
                m = d.DotProduct(C);
                d = Math.abs(m / g);
                if (!(d > Math.min(u, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN))) {
                  g = this.JWs;
                  if (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(this.ActorComp.ActorLocationProxy, PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(M.Entity.GetComponent(1).ActorLocationProxy, t, !e, MathUtils_1.MathUtils.CommonTempVector), a, _, g)) {
                    r.InverseTransformPosition(g, MathUtils_1.MathUtils.CommonTempVector);
                    d = MathUtils_1.MathUtils.CommonTempVector;
                    if (!(Math.abs(d.Y) > Math.abs(h.Y)) && !(Math.abs(d.Z) > Math.abs(h.Z))) {
                      d = this.zWs;
                      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(g, t, e, d);
                      HookPointUtils.HookPointSetAdd(this.ZWs, M, t, e);
                      p = MathUtils_1.MathUtils.Square(p * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(m);
                      if (!(this.lKs <= p)) {
                        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, this.ActorComp.ActorLocation);
                        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, g);
                        let t = false;
                        if (!(t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY))) {
                          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, d);
                          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, M.HookLocation);
                          t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
                        }
                        t = this.rAl(t, M, this.bsr.HitResult);
                        this.lKs = p;
                        this.hKs.length = 0;
                        this.hKs.push([this.ActorComp.ActorLocationProxy, Vector_1.Vector.Create(g)]);
                        this.hKs.push([Vector_1.Vector.Create(d), M.HookLocation]);
                        I = [!t, M];
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
      let n = -1;
      const s = this.dtg !== undefined;
      HookPointUtils.HookPointSetForEach(this.zon, (t, e, i) => {
        var o = t.CameraGaze.GazeInHook;
        if (e === 0) {
          if (o && !s) {
            HookPointUtils.HookPointSetDelete(this.zon, t, e, i);
          } else if (t.CameraGaze.LockPriority > n) {
            this.Jon = new HookPointInfo(t, e, i);
            n = t.CameraGaze.LockPriority;
          }
        }
      });
      if (this.Jon) {
        CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(this.Jon.Point);
      }
    }
  }
  K0f() {
    var t = this.Q0f;
    var e = this.X0f();
    if (e !== t) {
      this.Q0f = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, t, e);
    }
  }
  X0f() {
    if (ModelManager_1.ModelManager.SunSpiritModel?.GetIsSunSpiritEnable()) {
      if (this.Zon && this.Hon) {
        if ((o = this.Hon.Point.Entity.GetComponent(337))?.Valid && o.GetCanBeWatchSelect()) {
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
          var n = this.jWs;
          var s = this.kue;
          var r = this.WWs;
          var h = this.KWs;
          var a = Math.tan(MathUtils_1.MathUtils.DegToRad * o.FOVAngle);
          var _ = Math.tan(MathUtils_1.MathUtils.DegToRad * (o.FOVAngle / o.AspectRatio));
          this.QWs.FromConfigVector(this.ActorComp.ActorLocationProxy);
          var l = this.QWs;
          let t = true;
          let e = MathUtils_1.MathUtils.MaxFloat;
          let i = undefined;
          for (const f of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
            if (f.GetHookInteractType() === "SunSpiritLauncher" && !f.Entity.GetComponent(0)?.GetRemoveState()) {
              var c = f.Entity.GetComponent(337);
              if (c?.Valid && c.GetCanBeWatchSelect() && f.WasRecentlyRenderOnScreen() && this.x1h(f.MatchRoleOption) && !f.Entity.GetComponent(144)?.IsInState(3) && !f.IsHookDisabled) {
                if (f.UseRangeComponent) {
                  if (!f.Entity.GetComponent(91)?.IsOverlappingPlayer()) {
                    continue;
                  }
                } else if (Vector_1.Vector.DistSquared(f.TriggerLocation, l) > f.NormalHookMaxRadiusSquared) {
                  continue;
                }
                var E;
                var v = this.$Ws;
                f.HookLocation.Subtraction(n, v);
                var C = v.DotProduct(s);
                if (!(C <= 0) && !(E = v.DotProduct(r), Math.abs(E / C) > Math.min(a, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT)) && !(v = v.DotProduct(h), Math.abs(v / C) > Math.min(_, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)) && !(C = MathUtils_1.MathUtils.Square(E * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(v), e <= C) && !(t && (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, l), t = false), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, f.HookLocation), E = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY), E = this.rAl(E, f, this.bsr.HitResult))) {
                  e = C;
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
    return this.Zon && this.Hon !== undefined && this.dtg !== this.Hon;
  }
  GetCurrentTargetEntity() {
    if (this.ActorComp?.IsAutonomousProxy) {
      if (this.dtg) {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.dtg.Point.Entity.Id);
      } else {
        return undefined;
      }
    } else {
      return this.SimulateHookTargetEntity;
    }
  }
  GetCurrentTargetLocation() {
    let t = undefined;
    return (t = this.ActorComp?.IsAutonomousProxy ? this.dtg?.Point.HookLocation : this.SimulateHookTargetEntity?.Entity?.GetComponent(90)?.HookLocation ?? this.SimulateHookTargetLocation) ?? this.ActorComp.ActorLocationProxy;
  }
  OnRoleBeforeTeleportThroughPortal() {
    if (this.Lie?.HasTag(-1009010563) && (!(this.rKs >= 0) || !(this.rKs + 1 < this.tKs.length))) {
      var t = this.Entity.GetComponent(43);
      for (const e of GrapplingHookPointDefine_1.updateTargetSkillIds) {
        t.EndSkill(e, "Portal Stop skill (fix hook without portal)");
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 39, "没有透过传送门勾取钩锁点，但勾的过程中穿过传送门，请检查钩锁点是否离传送门过近", ["PbDataId", this.dtg?.Point.Entity.GetComponent(0)?.GetPbDataId()]);
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
    return (t = this.ActorComp?.IsAutonomousProxy && this.rKs >= 0 && this.rKs < this.tKs.length ? this.tKs[this.rKs][1] : t) ?? this.dtg?.Point.HookLocation ?? this.ActorComp.ActorLocationProxy;
  }
  GetCurrentPathways() {
    return this.tKs;
  }
  GetCurrentTargetEnterPortalCapture() {
    var t = this.dtg;
    if (t?.Point && t.PortalPairId) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.PortalPairId)?.Entity?.GetComponent(228);
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
    var t = this.dtg;
    if (t?.Point && t.PortalPairId) {
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t.PortalPairId)?.Entity?.GetComponent(228);
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
    return this.dtg?.Point;
  }
  GetCurrentTargetActor() {
    return this.dtg?.Point.Entity.GetComponent(1)?.Owner;
  }
  GetNextTargetLocation() {
    return this.Hon.Point.HookLocation.ToUeVector();
  }
  GetNextTargetVector() {
    return this.Hon.Point.HookLocation;
  }
  GetInheritSpeed() {
    return this.dtg.Point.InheritSpeed;
  }
  GetIsClimb() {
    return this.dtg.Point.IsClimb;
  }
  GetCurrentTargetForward() {
    var t = this.dtg.Point.Entity.GetComponent(0);
    if (t?.Valid) {
      return t.GetRotation().RotateVectorDouble(Vector_1.Vector.ForwardVectorDouble);
    } else {
      return this.ActorComp.ActorForward;
    }
  }
  GetTargetIsSuiGuangType() {
    var t = this.dtg?.Point?.GetHookInteractType();
    return !!t && t === "SuiGuangHook";
  }
  GetTargetType() {
    var t = this.dtg?.Point?.GetHookInteractType();
    if (!t) {
      return 0;
    }
    if (t === "SlashHook") {
      switch (this.dtg?.Point.GetSlashHitType()) {
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
    return this.Q0f;
  }
  gkg() {
    if (this.ActorComp.IsAutonomousProxy) {
      RoleSceneInteractController_1.RoleSceneInteractController.SendHookMovePush(this.Entity, this.dtg.Point);
    }
  }
  Won() {
    const o = this.dtg?.Point;
    var t;
    if (o?.Valid && this.ActorComp.IsAutonomousProxy) {
      t = Protocol_1.Aki.Protocol.dms.create();
      if (o?.Valid) {
        t.F4n = MathUtils_1.MathUtils.NumberToLong(o.Entity.GetComponent(0).GetCreatureDataId());
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.SendHookTargetRequest", ["EntityConfigId", o.EntityConfigId]);
        }
        FixHookClientLevelEventExecutor_1.FixHookClientLevelEventExecutor.ExecuteHookActions(0, o);
        Net_1.Net.Call(23844, t, t => {
          switch (t.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
            case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointConditionNotMet:
              break;
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Character", 79, "SendHookTargetRequest错误, 钩锁点不存在", ["EntityConfigId", o?.EntityConfigId], ["ServerEntityId", o?.ServerEntityId]);
              }
              break;
            default:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Character", 79, "SendHookTargetRequest错误", ["EntityConfigId", o?.EntityConfigId], ["ServerEntityId", o?.ServerEntityId], ["Q4n", t.Q4n]);
              }
          }
          if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            var e = this.Entity.GetComponent(43);
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
    var t = this.dtg?.Point;
    if (t?.Valid && this.ActorComp.IsAutonomousProxy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "RoleSceneInteractComponent.SendHookEndRequest", ["EntityConfigId", t.EntityConfigId]);
      }
      var e = t.Entity.GetComponent(0).GetCreatureDataId();
      const i = Protocol_1.Aki.Protocol.DC_.create();
      i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
      i.Zlh = this.Jlh ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint;
      FixHookClientLevelEventExecutor_1.FixHookClientLevelEventExecutor.ExecuteHookActions(this.Jlh ? 1 : 2, t);
      Net_1.Net.Call(16335, i, t => {});
      if (t?.WillBeDestroyedAfterHook) {
        const i = Protocol_1.Aki.Protocol.Wgs.create();
        i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(23757, i, t => {});
      } else if (t?.WillBeHideAfterHook) {
        e = t.Entity;
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e, false, "RoleSceneInteractComponent.SendHookDestroyRequest", true);
      }
    }
  }
  Rul() {
    if (this.Lul && ModelManager_1.ModelManager.CameraModel) {
      var t = this.dtg;
      if (t) {
        var e = t.Point.GazeNextPointAfterInteract;
        if (e && !(Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, t.Point.HookLocation) > MathUtils_1.MathUtils.Square(e?.GazeCondition?.GazeInDistance || DEFAULT_GAZE_IN_DIST))) {
          this.Lul = false;
          var i;
          var o = new Map();
          var n = Quat_1.Quat.Create();
          ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(n);
          n.Inverse(n);
          var s = e?.GazeCondition?.ScanRange?.Height ?? DEFAULT_GAZE_HEIGHT;
          var e = (e?.GazeCondition?.ScanRange?.Radius ?? DEFAULT_GAZE_RADIUS) / s;
          this.aym(ModelManager_1.ModelManager.CameraModel.CameraLocation, n, s, e, e, o);
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
  aym(t, e, i, o, n, s, r = true, h = false) {
    if (r) {
      s.clear();
    }
    var a = this.ActorComp.ActorLocationProxy;
    var _ = o * o;
    var l = n * n;
    let c = true;
    for (const C of GrapplingHookPointComponent_1.GrapplingHookPointComponent.PlayerDetectableHookPoints) {
      if (!C.Entity.GetComponent(0)?.GetRemoveState() && C.CheckHookEnableCondition() && C.WasRecentlyRenderOnScreen() && !C.IsInCd && !C.Entity.GetComponent(144)?.IsInState(3) && (C !== this.dtg?.Point || this.dtg.PortalPairId !== 0 || !this.dtg.PortalA2B)) {
        var E = this.$Ws;
        C.HookLocation.Subtraction(t, E);
        e.RotateVector(E, E);
        if (!(E.X <= 0) && !(E.X > i)) {
          var v = E.Y / E.X;
          var E = E.Z / E.X;
          if (!(v * v / _ + E * E / l > 1)) {
            if (c) {
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, a);
              c = false;
            }
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, C.HookLocation);
            v = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.ActorComp.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
            v = this.rAl(v, C, this.bsr.HitResult);
            if (!v && (s.set(C.Entity.Id, C), h)) {
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
  rAl(t, e, n) {
    if (t) {
      var s = e.Entity.GetComponent(214)?.Owner;
      if (!s) {
        return true;
      }
      var r = e.IsIgnorePlayerCollision;
      for (let o = 0; o < n.Actors.Num(); o++) {
        let i = n.Actors.Get(o);
        if (i !== undefined) {
          var h = n.Components.Get(o);
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
            if (i === s) {
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
    t = t.Entity.GetComponent(107);
    this.Yyf = t.Yyf;
  }
  CheckNextTargetCanInteract() {
    var t = this._tg.FocusTarget;
    return !!t?.Valid && !!this.Zon && t.OnlineTypeCanInteract;
  }
  GetNextTargetIsIgnorePlayerCollision() {
    var t = this._tg.FocusTarget;
    return !!t?.Valid && t.IsIgnorePlayerCollision;
  }
};
RoleSceneInteractComponent.f7r = false;
RoleSceneInteractComponent.TraceDebug = false;
RoleSceneInteractComponent.DebugLog = false;
RoleSceneInteractComponent.dth = new Map([["FixedPointHook", 0], ["SuiGuangHook", 1], ["KiteHook", 2], ["RagDollJumpingPoint", 3], ["RagDollClimbingPoint", 4], ["MovementPointHook", 5], ["SlashHook", 6], ["ChargeSlashHook", 8], ["CableWay", 9]]);
RoleSceneInteractComponent = RoleSceneInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(107)], RoleSceneInteractComponent);
exports.RoleSceneInteractComponent = RoleSceneInteractComponent; //# sourceMappingURL=RoleSceneInteractComponent.js.map