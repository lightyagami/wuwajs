"use strict";

var RoleSceneInteractComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var h = arguments.length;
  var r = h < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        r = (h < 3 ? s(r) : h > 3 ? s(i, e, r) : s(i, e)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, e, r);
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
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
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
const GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent");
const updateTargetSkillIds = new Set([1208713, 100020, 100021, 100022, 200004, 50170004, 501700042, 501700043, 501700044, 501700045, 50170001, 501700011, 50180004, 210130, 100024, 5021005, 5021008, 5021009, 200006]);
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
  constructor(t, i = 0, e = true) {
    this.Point = t;
    this.PortalPairId = i;
    this.PortalA2B = e;
  }
}
class HookPointUtils {
  static HookPointEqual(t, i) {
    return t.Point === i.Point && t.PortalPairId === i.PortalPairId && t.PortalA2B === i.PortalA2B;
  }
  static HookPointSetAdd(t, i, e = i instanceof HookPointInfo ? i.PortalPairId : 0, o = !(i instanceof HookPointInfo) || i.PortalA2B) {
    var s = i instanceof HookPointInfo ? i.Point : i;
    let h = t.get(s);
    if (h) {
      if (h.findIndex((t, i) => t[0] === e && t[1] === o) !== -1) {
        return t;
      }
    } else {
      h = [];
      t.set(s, h);
    }
    h.push([e, o]);
    return t;
  }
  static HookPointSetHas(t, i, e = i instanceof HookPointInfo ? i.PortalPairId : 0, o = !(i instanceof HookPointInfo) || i.PortalA2B) {
    var s = i instanceof HookPointInfo ? i.Point : i;
    var t = t?.get(s);
    return !!t && t.findIndex((t, i) => t[0] === e && t[1] === o) !== -1;
  }
  static HookPointSetDelete(t, i, e = i instanceof HookPointInfo ? i.PortalPairId : 0, o = !(i instanceof HookPointInfo) || i.PortalA2B) {
    var s;
    var h = i instanceof HookPointInfo ? i.Point : i;
    var r = t.get(h);
    return !!r && ((s = r.findIndex((t, i) => t[0] === e && t[1] === o)) !== -1 && r.splice(s, 1), r.length === 0 && t.delete(h), s !== -1);
  }
  static HookPointSetForEach(t, e) {
    t?.forEach((t, i) => {
      t.forEach(t => {
        e(i, t[0], t[1]);
      });
    });
  }
}
let RoleSceneInteractComponent = RoleSceneInteractComponent_1 = class RoleSceneInteractComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.won = undefined;
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
    this.Oon = undefined;
    this.Lul = false;
    this.CQ1 = false;
    this.kon = t => {
      var i;
      if (this.Hte?.IsAutonomousProxy && updateTargetSkillIds.has(t)) {
        if (this.Hon === undefined || this.Hon.Point === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 31, "使用技能时，没有选中的钩锁点，请检查技能Id配置", ["SkillId", t]);
          }
        } else {
          this.Die = this.Hon;
          if (this.Die.Point.GetHookInteractType() === "FlyingFeather") {
            this.Die.Point.ChangeHookPointState(3);
          }
          this.SimulateHookTargetEntity = undefined;
          this.SimulateHookTargetLocation = undefined;
          this.tKs.length = 0;
          i = this.tKs;
          this.tKs = this.iKs;
          this.iKs = i;
          this.rKs = 0;
          this.Lul = !!this.Die?.Point.GazeNextPointAfterInteract;
          this.SetIsHookEndByInterrupt(false);
          this.Die.Point.BeHooked(t);
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
    this.Qon = (t, i) => {
      if (this.Hte?.IsAutonomousProxy && updateTargetSkillIds.has(i)) {
        if (this.Die === undefined || this.Die.Point === undefined) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 31, "使用技能时，没有选中的钩锁点，请检查技能Id配置", ["SkillId", i]);
          }
        } else {
          HookPointUtils.HookPointSetForEach(this.oKs, (t, i, e) => {
            HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
          });
          HookPointUtils.HookPointSetForEach(this.$on, (t, i, e) => {
            HookPointUtils.HookPointSetAdd(this.eKs, t, i, e);
          });
          if (this.Die?.Point?.Valid) {
            HookPointUtils.HookPointSetAdd(this.eKs, this.Die.Point, this.Die.PortalPairId, this.Die.PortalA2B);
            this.Die.Point.ChangeHookPointState(0);
            this.zlh();
          }
          if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.Fm);
          }
          this.Die = undefined;
          this.tKs.length = 0;
          this.rKs = -1;
          this.Jon = undefined;
          this.SimulateHookTargetEntity = undefined;
          this.SimulateHookTargetLocation = undefined;
          this.zon.clear();
          this.Kon = false;
          this.Lul = false;
          this.CQ1 = false;
        }
      }
    };
    this.vgl = (t, i) => {
      if (t === this.Entity.Id && updateTargetSkillIds.has(i)) {
        this.SetIsHookEndByInterrupt(true);
      }
    };
    this.Fm = (t, i) => {
      if (i.Id === this.Die?.Point.Entity.Id) {
        var e = this.Entity.GetComponent(40);
        this.SetIsHookEndByInterrupt(true);
        for (const o of updateTargetSkillIds) {
          e.EndSkill(o, "CurrentTarget is Remove");
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 31, "钩锁点在勾的时候被删除，请检查配置", ["PbDataId", i.Entity.GetComponent(0)?.GetPbDataId()]);
        }
      }
    };
    this.Die = undefined;
    this.Zon = false;
    this.ern = false;
    this.Hon = undefined;
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
    this.orn = true;
    this.Lie = undefined;
    this.rrn = false;
    this.Kon = false;
    this.Jlh = false;
    this.sKs = false;
    this.aKs = undefined;
    this.hKs = [];
    this.lKs = DEFAULT_MIN_LENGTH;
    this.a7r = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === HOOK_VISION_ID) {
        this.Gon = false;
        if (this.rrn) {
          this.Von(true, this.Hon?.Point.GetTagId(), "切换到钩锁技能且NeedAddTag为真时，添加定点钩索可用标签");
        }
      } else {
        this.Gon = true;
        this.Von(false, undefined, "切换到非钩锁技能时，删除定点钩索可用标签");
        if (this.Hon) {
          this.Hon.Point.ChangeHookPointState(0);
          this.Hon = undefined;
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 18];
  }
  get NeedChangeTargetState() {
    return this.orn;
  }
  set NeedChangeTargetState(t) {
    if ((this.orn = t) && this.Hon?.Point) {
      this.Hon.Point.ChangeHookPointState(this.ern ? 1 : 2);
    }
  }
  GetIsHooking() {
    return this.Kon;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.won = this.Entity.GetComponent(43);
    this.Lie = this.Entity.GetComponent(206);
    this.Lie.ListenForTagAddOrRemove(283451623, (t, i) => {
      if (i) {
        if (this.Hon) {
          this.arn(this.Hon);
        }
        this.Hon = undefined;
        this.hKs.length = 0;
      }
    });
    if (!this.Hte.IsRoleAndCtrlByMe) {
      this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端");
    }
    this.InitTraceInfo();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.kon);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Qon);
    return true;
  }
  InitTraceInfo() {
    this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.bsr.WorldContextObject = this.Hte.Owner;
    this.bsr.bIsSingle = false;
    this.bsr.bIgnoreSelf = true;
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.bsr.Radius = SPHERE_TRACE_RADIUS;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.vgl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.kon);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Qon);
    return true;
  }
  OnTick(t) {
    if (Global_1.Global.BaseCharacter === this.Hte.Actor) {
      if (RoleSceneInteractComponent_1.f7r) {
        if (ModelManager_1.ModelManager.CameraModel && !this.Lie.HasTag(283451623)) {
          if (!this.CQ1) {
            this.hrn();
            this.Rul();
          }
          for (var [i] of this.eKs) {
            if (!i?.Valid) {
              HookPointUtils.HookPointSetDelete(this.eKs, i);
            }
          }
        }
      } else if (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(HOOK_VISION_ID)) {
        RoleSceneInteractComponent_1.f7r = true;
      }
    }
  }
  hrn() {
    let t = false;
    let i = false;
    this.bsr.SetDrawDebugTrace(RoleSceneInteractComponent_1.TraceDebug ? 1 : 0);
    this._rn();
    t = this.sKs;
    e = this.aKs;
    this.iKs.length = 0;
    var e;
    var o = this.iKs;
    this.iKs = this.hKs;
    this.hKs = o;
    if (t && this.won?.Valid) {
      o = this.won.GetVisionIdList();
      t = o.Contains(HOOK_VISION_ID);
      i = true;
    }
    if (this.Zon !== t || this.Hon?.Point !== e?.Point || this.ern !== i) {
      o = this.Hon;
      this.Hon = e;
      this.ern = i;
      this.Zon = t;
      if (!!o?.Point.Valid && o.Point !== e?.Point && (o.Point.GetHookInteractType() !== "FlyingFeather" || !this.Kon)) {
        o.Point.ChangeHookPointState(0);
      }
      this.pQ1(o);
    }
    this.crn();
  }
  pQ1(t) {
    if (this.Hon) {
      if (this.NeedChangeTargetState) {
        this.Hon.Point.ChangeHookPointState(this.ern ? 1 : 2);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFindFixHook, true, this.Hon.Point.HookLocation);
    } else if (t) {
      this.arn(t);
    }
    if (this.Hon !== undefined && this.ern) {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== HOOK_VISION_ID) {
        this.rrn = true;
      } else if (this.Zon) {
        this.Von(true, this.Hon?.Point.GetTagId(), "当前选中的钩锁点有效, 且不需要切换技能");
        this.mqc(true);
      } else {
        if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
          this.Von(false, undefined, "当前选中的钩锁点无效，且不需要切换技能");
        }
        this.mqc(false);
      }
    } else {
      this.rrn = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[RoleSceneInteractComponent] TryRemoveHookTag", ["AutoResetSkillFinished", ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished]);
      }
      if (ModelManager_1.ModelManager.ExploreModel.AutoResetSkillFinished) {
        this.Von(false, undefined, "当前未选中点，且不需要切换技能");
      }
      this.mqc(false);
    }
  }
  arn(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFindFixHook, false, undefined);
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
      let [o, s] = this.uKs();
      let h = 0;
      let r = true;
      ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach((t, i) => {
        var e = this.cKs(i, true);
        if (e[1]) {
          o = e[0];
          s = e[1];
          h = i;
          r = true;
        }
        var e = this.cKs(i, false);
        if (e[1]) {
          o = e[0];
          s = e[1];
          h = i;
          r = false;
        }
      });
      if (s) {
        this.sKs = o;
        this.aKs = new HookPointInfo(s, h, r);
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
    var i;
    var e;
    var o;
    var s = this.jWs;
    var h = this.kue;
    var r = this.WWs;
    var n = this.KWs;
    var a = Math.tan(MathUtils_1.MathUtils.DegToRad * t.FOVAngle);
    var _ = Math.tan(MathUtils_1.MathUtils.DegToRad * (t.FOVAngle / t.AspectRatio));
    this.QWs.FromConfigVector(this.Hte.ActorLocationProxy);
    var l = this.QWs;
    let c = [false, undefined];
    let v = true;
    for (const d of GrapplingHookPointComponent_1.GrapplingHookPointComponent.AllPoints) {
      if (d.Entity.GetComponent(0)?.GetRemoveState() || !d.CheckCondition()) {
        if (d === this.Die?.Point && !this.Kon) {
          d.ChangeHookPointState(0);
          this.Die = undefined;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFindFixHook, false, undefined);
        }
      } else if (d.WasRecentlyRenderOnScreen() && this.x1h(d.MatchRoleOption) && !d.IsInCd && !d.Entity.GetComponent(134)?.IsInState(3) && !d.IsHookDisabled && (d !== this.Die?.Point || this.Die.PortalPairId !== 0 || !this.Die.PortalA2B)) {
        if (d.UseRangeComponent) {
          if (!d.Entity.GetComponent(86)?.IsOverlappingPlayer()) {
            continue;
          }
        } else if (Vector_1.Vector.DistSquared(d.TriggerLocation, l) > d.RadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, d);
          continue;
        }
        HookPointUtils.HookPointSetAdd(this.$on, d);
        if (Vector_1.Vector.DistSquared(d.HookLocation, l) < MIN_DIST_SQUARED) {
          HookPointUtils.HookPointSetDelete(this.zon, d);
        } else {
          if (d.CameraGaze && d.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, d) && !HookPointUtils.HookPointSetHas(this.eKs, d)) {
            HookPointUtils.HookPointSetAdd(this.nKs, d);
          }
          i = this.$Ws;
          d.HookLocation.Subtraction(s, i);
          if (!((e = i.DotProduct(h)) <= 0) && !(o = i.DotProduct(r), Math.abs(o / e) > Math.min(a, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT)) && !(i = i.DotProduct(n), Math.abs(i / e) > Math.min(_, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN)) && !(HookPointUtils.HookPointSetAdd(this.ZWs, d), e = MathUtils_1.MathUtils.Square(o * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(i), this.lKs <= e)) {
            if (v) {
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, l);
              v = false;
            }
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, d.HookLocation);
            o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
            o = this.rAl(o, d, this.bsr.HitResult);
            this.lKs = e;
            this.hKs.length = 0;
            this.hKs.push([this.Hte.ActorLocationProxy, d.HookLocation]);
            c = [!o, d];
          }
        }
      }
    }
    return c;
  }
  cKs(t, i) {
    if (!this.bsr) {
      return [false, undefined];
    }
    var e = ModelManager_1.ModelManager.CameraModel?.CurrentCameraActor;
    if (!e?.IsValid()) {
      return [false, undefined];
    }
    if (!t) {
      return [false, undefined];
    }
    var o = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
    if (!o || !o.Portal1Enable || !o.Portal2Enable) {
      return [false, undefined];
    }
    var s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(216);
    if (!s) {
      return [false, undefined];
    }
    var h = ModelManager_1.ModelManager.CreatureModel?.GetEntity(s.GetPairCreatureDataId())?.Entity?.GetComponent(216);
    if (!h) {
      return [false, undefined];
    }
    this.chh.FromUeTransform(i ? o.PortalWorldTransform1 : o.PortalWorldTransform2);
    var r = this.chh;
    var n = (i ? s : h).PortalBounds;
    var a = r.GetLocation();
    r.GetRotation().GetForwardVector(this.YWs);
    var _ = this.YWs;
    var o = this.Hte.ActorLocationProxy;
    var l = this.QWs;
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, t, i, l);
    var s = e.D_GetTransform();
    var h = PortalUtils_1.PortalUtils.GetMappingTransformToOtherPortal(s, t, i);
    var c = this.jWs;
    c.FromUeVector(h.GetLocation());
    var o = MathUtils_1.MathUtils.CommonTempQuat;
    o.FromUeQuat(h.GetRotation());
    var v = this.kue;
    o.GetForwardVector(v);
    var d = this.WWs;
    o.GetRightVector(d);
    var I = this.KWs;
    o.GetUpVector(I);
    var s = MathUtils_1.MathUtils.DegToRad * (e.FOVAngle / 2);
    var u = Math.tan(s);
    var E = Math.tan(s * e.AspectRatio);
    let T = [false, undefined];
    for (const m of GrapplingHookPointComponent_1.GrapplingHookPointComponent.AllPoints) {
      if (m.Entity.GetComponent(0)?.GetRemoveState() || !m.CheckCondition()) {
        if (m === this.Die?.Point && !this.Kon) {
          m.ChangeHookPointState(0);
          this.Die = undefined;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFindFixHook, false, undefined);
        }
      } else if (m.WasRecentlyRenderOnScreen() && this.x1h(m.MatchRoleOption) && !m.IsInCd && !m.Entity.GetComponent(134)?.IsInState(3) && m.GetHookInteractType() === "FixedPointHook" && !m.IsHookDisabled && (m !== this.Die?.Point || t !== this.Die.PortalPairId || i !== this.Die.PortalA2B)) {
        var f = Vector_1.Vector.DistSquared(m.HookLocation, l);
        if (f > m.RadiusSquared) {
          HookPointUtils.HookPointSetDelete(this.eKs, m, t, i);
        } else {
          HookPointUtils.HookPointSetAdd(this.$on, m, t, i);
          if (f < MIN_DIST_SQUARED) {
            HookPointUtils.HookPointSetDelete(this.zon, m, t, i);
          } else {
            if (m.CameraGaze && m.CameraGaze.LockPriority >= 0 && !HookPointUtils.HookPointSetHas(this.oKs, m, t, i) && !HookPointUtils.HookPointSetHas(this.eKs, m, t, i)) {
              HookPointUtils.HookPointSetAdd(this.nKs, m, t, i);
            }
            var f = this.$Ws;
            m.HookLocation.Subtraction(c, f);
            var C = f.DotProduct(v);
            if (!(C <= 0)) {
              var g = f.DotProduct(d);
              var M = Math.abs(g / C);
              if (!(M > Math.min(u, this.Gon ? MIN_LEFT_RIGHT_SCALE : MIN_LEFT_RIGHT))) {
                M = f.DotProduct(I);
                f = Math.abs(M / C);
                if (!(f > Math.min(E, this.Gon ? MIN_UP_DOWN_SCALE : MIN_UP_DOWN))) {
                  C = this.JWs;
                  if (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(this.Hte.ActorLocationProxy, PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(m.Entity.GetComponent(1).ActorLocationProxy, t, !i, MathUtils_1.MathUtils.CommonTempVector), a, _, C)) {
                    r.InverseTransformPosition(C, MathUtils_1.MathUtils.CommonTempVector);
                    f = MathUtils_1.MathUtils.CommonTempVector;
                    if (!(Math.abs(f.Y) > Math.abs(n.Y)) && !(Math.abs(f.Z) > Math.abs(n.Z))) {
                      f = this.zWs;
                      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(C, t, i, f);
                      HookPointUtils.HookPointSetAdd(this.ZWs, m, t, i);
                      g = MathUtils_1.MathUtils.Square(g * LEFT_RIGHT_SCALE) + MathUtils_1.MathUtils.Square(M);
                      if (!(this.lKs <= g)) {
                        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, this.Hte.ActorLocation);
                        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, C);
                        let t = false;
                        if (!(t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY))) {
                          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, f);
                          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, m.HookLocation);
                          t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
                        }
                        t = this.rAl(t, m, this.bsr.HitResult);
                        this.lKs = g;
                        this.hKs.length = 0;
                        this.hKs.push([this.Hte.ActorLocationProxy, Vector_1.Vector.Create(C)]);
                        this.hKs.push([Vector_1.Vector.Create(f), m.HookLocation]);
                        T = [!t, m];
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
    return T;
  }
  crn() {
    var t = ModelManager_1.ModelManager.CameraModel;
    HookPointUtils.HookPointSetForEach(this.zon, (t, i, e) => {
      if (HookPointUtils.HookPointSetHas(this.oKs, t, i, e)) {
        HookPointUtils.HookPointSetDelete(this.zon, t, i, e);
      }
    });
    HookPointUtils.HookPointSetForEach(this.nKs, (t, i, e) => {
      HookPointUtils.HookPointSetAdd(this.zon, t, i, e);
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
      const h = this.Die !== undefined;
      HookPointUtils.HookPointSetForEach(this.zon, (t, i, e) => {
        var o = t.CameraGaze.GazeInHook;
        if (i === 0) {
          if (o && !h) {
            HookPointUtils.HookPointSetDelete(this.zon, t, i, e);
          } else if (t.CameraGaze.LockPriority > s) {
            this.Jon = new HookPointInfo(t, i, e);
            s = t.CameraGaze.LockPriority;
          }
        }
      });
      if (this.Jon) {
        CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(this.Jon.Point);
      }
    }
  }
  CanActivateFixHook() {
    return this.Zon && this.Hon !== undefined && this.Die !== this.Hon;
  }
  GetCurrentTargetEntity() {
    if (this.Hte?.IsAutonomousProxy) {
      if (this.Die) {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Die.Point.Entity.Id);
      } else {
        return undefined;
      }
    } else {
      return this.SimulateHookTargetEntity;
    }
  }
  GetCurrentTargetLocation() {
    let t = undefined;
    return (t = this.Hte?.IsAutonomousProxy ? this.Die?.Point.HookLocation : this.SimulateHookTargetEntity?.Entity?.GetComponent(85)?.HookLocation ?? this.SimulateHookTargetLocation) ?? this.Hte.ActorLocationProxy;
  }
  OnRoleBeforeTeleportThroughPortal() {
    if (this.Lie?.HasTag(-1009010563) && (!(this.rKs >= 0) || !(this.rKs + 1 < this.tKs.length))) {
      var t = this.Entity.GetComponent(40);
      for (const i of updateTargetSkillIds) {
        t.EndSkill(i, "Portal Stop skill (fix hook without portal)");
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 39, "没有透过传送门勾取钩锁点，但勾的过程中穿过传送门，请检查钩锁点是否离传送门过近", ["PbDataId", this.Die?.Point.Entity.GetComponent(0)?.GetPbDataId()]);
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
    return (t = this.Hte?.IsAutonomousProxy && this.rKs >= 0 && this.rKs < this.tKs.length ? this.tKs[this.rKs][1] : t) ?? this.Die?.Point.HookLocation ?? this.Hte.ActorLocationProxy;
  }
  GetCurrentPathways() {
    return this.tKs;
  }
  GetCurrentTargetEnterPortalCapture() {
    if (this.Die?.Point && this.Die.PortalPairId) {
      var t;
      var i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Die.PortalPairId)?.Entity?.GetComponent(216);
      if (i) {
        i = i?.PortalCapture;
        if (this.Die.PortalA2B) {
          return i;
        } else {
          t = (0, puerts_1.$ref)(undefined);
          i?.GetPair(t);
          return (0, puerts_1.$unref)(t);
        }
      }
    }
  }
  GetCurrentTargetExitPortalCapture() {
    if (this.Die?.Point && this.Die.PortalPairId) {
      var t;
      var i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Die.PortalPairId)?.Entity?.GetComponent(216);
      if (i) {
        i = i?.PortalCapture;
        if (this.Die.PortalA2B) {
          return i;
        } else {
          t = (0, puerts_1.$ref)(undefined);
          i?.GetPair(t);
          return (0, puerts_1.$unref)(t);
        }
      }
    }
  }
  GetNextTarget() {
    return this.Hon?.Point;
  }
  GetCurrentTarget() {
    return this.Die?.Point;
  }
  GetCurrentTargetActor() {
    return this.Die?.Point.Entity.GetComponent(1)?.Owner;
  }
  GetNextTargetLocation() {
    return this.Hon.Point.HookLocation.ToUeVector();
  }
  GetNextTargetVector() {
    return this.Hon.Point.HookLocation;
  }
  GetInheritSpeed() {
    return this.Die.Point.InheritSpeed;
  }
  GetIsClimb() {
    return this.Die.Point.IsClimb;
  }
  GetCurrentTargetForward() {
    var t = this.Die.Point.Entity.GetComponent(0);
    if (t?.Valid) {
      return t.GetRotation().RotateVectorDouble(Vector_1.Vector.ForwardVectorDouble);
    } else {
      return this.Hte.ActorForward;
    }
  }
  IsLegalExceptSkill() {
    return this.ern;
  }
  GetTargetIsSuiGuangType() {
    var t = this.Die?.Point?.GetHookInteractType();
    return !!t && t === "SuiGuangHook";
  }
  GetTargetType() {
    var t = this.Die?.Point?.GetHookInteractType();
    if (!t) {
      return 0;
    }
    if (t === "SlashHook") {
      switch (this.Die?.Point.GetSlashHitType()) {
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
  Von(t, i, e) {
    var o = this.Oon;
    if (t) {
      if (o && i !== o && this.Lie.HasTag(o) && (this.Lie.RemoveTag(o), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, "[RoleSceneInteractComponent] 添加定点钩索可用标签时删除旧的定点钩索标签", ["Reason", e], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)]);
      }
      if (i && !this.Lie.HasTag(i) && (this.Lie.AddTag(i), this.Oon = i, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, "[RoleSceneInteractComponent] 添加定点钩索可用标签", ["Reason", e], ["EntityId", this.Entity.Id], ["Tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i)]);
      }
    } else if (this.Oon && this.Lie.HasTag(this.Oon) && (this.Lie.RemoveTag(this.Oon), this.Oon = undefined, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 79, "[RoleSceneInteractComponent] 删除定点钩索可用标签", ["Reason", e], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)]);
    }
  }
  mqc(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[RoleSceneInteractComponent] UpdateHookHighlightTag", ["Add", t], ["EntityId", this.Entity.Id]);
    }
    var i = 1628786673;
    if (t) {
      if (!this.Lie.HasTag(i)) {
        this.Lie.AddTag(i);
      }
    } else if (this.Lie.HasTag(i)) {
      this.Lie.RemoveTag(i);
    }
  }
  jon() {
    if (this.Hte.IsAutonomousProxy) {
      RoleSceneInteractController_1.RoleSceneInteractController.SendHookMoveRequest(this.Entity, this.Die.Point);
    }
  }
  Won() {
    var t;
    if (this.Hte.IsAutonomousProxy) {
      (t = Protocol_1.Aki.Protocol.dms.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.Die.Point.Entity.GetComponent(0).GetCreatureDataId());
      Net_1.Net.Call(20408, t, t => {
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointConditionNotMet:
            break;
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 31, "钩锁点不存在", ["EntityId", this.Die.Point.Entity.GetComponent(0).GetCreatureDataId()]);
            }
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 20771);
        }
        if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          var i = this.Entity.GetComponent(40);
          this.SetIsHookEndByInterrupt(true);
          for (const e of updateTargetSkillIds) {
            i.EndSkill(e, "HookLockPointRequest请求返回错误，终止钩锁技能");
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 39, "请求勾钩锁返回错误", ["PbDataId", this.Die?.Point.Entity.GetComponent(0)?.GetPbDataId()]);
          }
        }
      });
    }
  }
  zlh() {
    if (this.Die?.Point && this.Hte.IsAutonomousProxy) {
      var t = this.Die.Point.Entity.GetComponent(0).GetCreatureDataId();
      const i = Protocol_1.Aki.Protocol.DC_.create();
      i.F4n = MathUtils_1.MathUtils.NumberToLong(t);
      i.Zlh = this.Jlh ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint;
      Net_1.Net.Call(20047, i, t => {});
      if (this.Die?.Point.WillBeDestroyedAfterHook) {
        const i = Protocol_1.Aki.Protocol.Wgs.create();
        i.F4n = MathUtils_1.MathUtils.NumberToLong(t);
        Net_1.Net.Call(26101, i, t => {});
      } else if (this.Die?.Point.WillBeHideAfterHook) {
        t = this.Die.Point.Entity;
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, false, "RoleSceneInteractComponent.SendHookDestroyRequest", true);
      }
    }
  }
  Rul() {
    if (this.Lul && ModelManager_1.ModelManager.CameraModel && this.Die) {
      var t = this.Die.Point.GazeNextPointAfterInteract;
      if (t && !(Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, this.Die.Point.HookLocation) > MathUtils_1.MathUtils.Square(t?.GazeCondition?.GazeInDistance || DEFAULT_GAZE_IN_DIST))) {
        this.Lul = false;
        var i;
        var e = new Map();
        var o = Quat_1.Quat.Create();
        ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(o);
        o.Inverse(o);
        var s = t?.GazeCondition?.ScanRange?.Height ?? DEFAULT_GAZE_HEIGHT;
        var t = (t?.GazeCondition?.ScanRange?.Radius ?? DEFAULT_GAZE_RADIUS) / s;
        this.Uul(ModelManager_1.ModelManager.CameraModel.CameraLocation, o, s, t, t, e);
        for ([, i] of e) {
          if (i !== this.Die.Point && i.GetHookInteractType() === this.Die.Point.GetHookInteractType()) {
            CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(i, this.Die.Point);
            break;
          }
        }
      }
    }
  }
  Uul(t, i, e, o, s, h, r = true, n = false) {
    if (r) {
      h.clear();
    }
    var a = this.Hte.ActorLocationProxy;
    var _ = o * o;
    var l = s * s;
    let c = true;
    for (const I of GrapplingHookPointComponent_1.GrapplingHookPointComponent.AllPoints) {
      if (I.Entity.GetComponent(0)?.GetRemoveState() || !I.CheckCondition()) {
        if (I === this.Die?.Point && !this.Kon) {
          I.ChangeHookPointState(0);
          this.Die = undefined;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFindFixHook, false, undefined);
        }
      } else if (I.WasRecentlyRenderOnScreen() && !I.IsInCd && !I.Entity.GetComponent(134)?.IsInState(3) && (I !== this.Die?.Point || this.Die.PortalPairId !== 0 || !this.Die.PortalA2B)) {
        var v = this.$Ws;
        I.HookLocation.Subtraction(t, v);
        i.RotateVector(v, v);
        if (!(v.X <= 0) && !(v.X > e)) {
          var d = v.Y / v.X;
          var v = v.Z / v.X;
          if (!(d * d / _ + v * v / l > 1)) {
            if (c) {
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.bsr, a);
              c = false;
            }
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.bsr, I.HookLocation);
            d = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, this.bsr, TRACE_TAG_NAME, PROFILE_KEY);
            d = this.rAl(d, I, this.bsr.HitResult);
            if (!d && (h.set(I.Entity.Id, I), n)) {
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
  rAl(t, i, s) {
    if (t) {
      var h = i.Entity.GetComponent(203)?.Owner;
      if (!h) {
        return true;
      }
      var r = i.IsIgnorePlayerCollision;
      for (let o = 0; o < s.Actors.Num(); o++) {
        let e = s.Actors.Get(o);
        if (e !== undefined) {
          var n = s.Components.Get(o);
          let t = true;
          let i = 10;
          while (e && --i > 0) {
            if (r) {
              var a = n.GetCollisionObjectType();
              if (a === QueryTypeDefine_1.KuroCollisionChannel.Pawn || a === QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer) {
                t = false;
                break;
              }
            }
            if (e === h) {
              return false;
            }
            e = e.GetAttachParentActor();
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
    t = t.Entity.GetComponent(100);
    this.Hon = t.Hon;
    this.Zon = t.Zon;
    if (this.Hon !== undefined && this.Zon) {
      this.Von(true, this.Hon?.Point.GetTagId(), "切换角色从旧角色继承过来");
      this.mqc(true);
    }
  }
  CheckNextTargetCanInteract() {
    var t = this.GetNextTarget();
    return !!t?.Valid && !!this.Zon && t.OnlineTypeCanInteract;
  }
  GetNextTargetIsIgnorePlayerCollision() {
    var t = this.GetNextTarget();
    return !!t?.Valid && t.IsIgnorePlayerCollision;
  }
  SetForceTarget(t) {
    var i;
    return t !== this.Die?.Point && (i = this.Hon, t ? (this.CQ1 = true, this.Hon = new HookPointInfo(t, 0, false), this.iKs.length = 0, this.iKs.push([this.Hte.ActorLocationProxy, t.HookLocation])) : (this.CQ1 = false, this.Hon = undefined), this.ern = true, this.Zon = true, i?.Point.Valid && i.Point !== t && i.Point.ChangeHookPointState(0), this.pQ1(i), true);
  }
  ClearForceTarget() {
    if (this.CQ1) {
      this.CQ1 = false;
      this.Hon = undefined;
      this.ern = false;
      this.Zon = false;
      this.pQ1(undefined);
    }
  }
};
RoleSceneInteractComponent.f7r = false;
RoleSceneInteractComponent.TraceDebug = false;
RoleSceneInteractComponent.DebugLog = false;
RoleSceneInteractComponent.dth = new Map([["FixedPointHook", 0], ["SuiGuangHook", 1], ["KiteHook", 2], ["RagDollJumpingPoint", 3], ["RagDollClimbingPoint", 4], ["MovementPointHook", 5], ["SlashHook", 6], ["ChargeSlashHook", 8]]);
RoleSceneInteractComponent = RoleSceneInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(100)], RoleSceneInteractComponent);
exports.RoleSceneInteractComponent = RoleSceneInteractComponent; //# sourceMappingURL=RoleSceneInteractComponent.js.map