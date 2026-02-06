"use strict";

var SceneItemBeamCastComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        r = (o < 3 ? h(r) : o > 3 ? h(e, i, r) : h(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBeamCastComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const RoleTriggerController_1 = require("../Character/Role/RoleTriggerController");
const MANUAL_DELAY_UPDATE_MS = 100;
const BEAM_WALL_OVERLAP_RANGE_OFFSET = 20;
class BeamCastInfo {
  constructor(t, e, i, s, h) {
    this.BeamStartPosRel = Vector_1.Vector.Create();
    this.BeamEndPosRel = Vector_1.Vector.Create();
    this.BeamSpinePointStartPosRel = Vector_1.Vector.Create();
    this.BeamSpinePointEndPosRel = Vector_1.Vector.Create();
    this.TraceStartRel = Vector_1.Vector.Create();
    this.TraceEndRel = Vector_1.Vector.Create();
    this.BeamSplineActor = undefined;
    this.BeamSplineComp = undefined;
    this.BeamEffectHandle = undefined;
    this.HitEffectHandle = undefined;
    this.StartEffectHandle = undefined;
    this.CastingEntity = undefined;
    this.CastingActor = undefined;
    this.BeamLen = 0;
    this.BeamStartPosRel = Vector_1.Vector.Create(t);
    this.BeamEndPosRel = Vector_1.Vector.Create(e);
    this.TraceStartRel = Vector_1.Vector.Create(i);
    this.TraceEndRel = Vector_1.Vector.Create(s);
    this.BeamSpinePointStartPosRel = Vector_1.Vector.Create();
    e.Subtraction(t, this.BeamSpinePointEndPosRel);
    this.BeamStartPosRel.Y = h;
    this.BeamEndPosRel.Y = h;
    this.TraceStartRel.Y = h;
    this.TraceEndRel.Y = h;
  }
}
let SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 = class SceneItemBeamCastComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.vtn = undefined;
    this.mBe = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.Smn = undefined;
    this.Imn = -0;
    this.Tmn = undefined;
    this.mWi = undefined;
    this.Rmn = -0;
    this.bmn = undefined;
    this.Uai = false;
    this.j4a = undefined;
    this.nxe = 1;
    this.n$m = 0;
    this.s$m = 0;
    this.a$m = [];
    this.h$m = 0;
    this.l$m = undefined;
    this._$m = undefined;
    this.u$m = 0;
    this.c$m = false;
    this.c$l = undefined;
    this.d$m = undefined;
    this.Rnn = () => {
      this.Uai = true;
      if (!this.mBe.IsInState(0)) {
        this.g_n();
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      }
    };
    this.g_n = () => {
      this.Gmn();
    };
    this.Nmn = (t, e) => {
      var i = this.ftn(e);
      if (!i || i.Id !== this.Entity.Id) {
        if (t) {
          this.Tmn.add(e);
          if (i && e === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTrigger()) {
            this.m$m(i);
          }
        } else {
          this.Tmn.delete(e);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 39, "[BeamCastComp] OnActorOverlapCallback", ["isEnter", t], ["actor", e.GetName()]);
        }
        this.Gmn();
        if (this.n$m === 1) {
          this.W4a();
        }
      }
    };
    this.f$m = () => {
      var t;
      var e = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), this.Hte.Owner.D_GetTransform());
      if (e?.IsValid()) {
        ((t = this.a$m[this.h$m]).BeamSplineActor = e).K2_AttachToActor(this.Hte.Owner, undefined, 2, 2, 2, false);
        e.D_K2_SetActorRelativeLocation(t.BeamStartPosRel.ToUeVector(), false, undefined, false);
        (e = e.GetComponentByClass(UE.SplineComponent.StaticClass())).ClearSplinePoints();
        e.D_SetSplinePoints(this.bmn, 0, true);
        t.BeamSplineComp = e;
        this.jDg(this.h$m);
        this.h$m++;
        if (this.h$m >= this.n$m && this.l$m && (TimerSystem_1.TimerSystem.Remove(this.l$m), this.l$m = undefined, this.c$m)) {
          this.g$m();
        }
      } else {
        this.C$m("[BeamCastComp] BeamSplineActor创建失败");
      }
    };
    this.u$l = (t, e, i, s) => {
      if (this.d$m?.has(s)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 93, "[BeamCastComp] TraceHitResultHandle 处理异步Trace结果", ["frame", i], ["index", s], ["hitResult", e.HitResult], ["isHit", t]);
        }
        i = this.d$m.get(s)[0];
        this.Kmn(e, i);
        e.ClearCacheData();
        this.d$m?.delete(s);
      }
    };
  }
  OnInitData(t) {
    this.EIe = this.Entity.GetComponent(0);
    t = t.GetParam(SceneItemBeamCastComponent_1)[0];
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] 组件配置缺失", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    this.Lo = t;
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Lo.TargetState);
    if (!t) {
      return false;
    }
    this.Imn = t;
    this.Rmn = this.Lo.Range.Height;
    var t = Vector_1.Vector.Create();
    t.FromConfigVector(this.Lo.Range.Center);
    if (this.Lo.BeamLayout) {
      if (this.Lo.BeamLayout.Type === IComponent_1.EBeamLayoutType.BeamWall) {
        this.n$m = this.Lo.BeamLayout.Count;
        this.s$m = this.Lo.BeamLayout.Distance;
      }
    } else {
      this.n$m = 1;
    }
    var e = Vector_1.Vector.Create();
    var i = Vector_1.Vector.Create();
    e.FromConfigVector(t);
    i.FromConfigVector(t);
    e.Z -= this.Lo.Range.Height / 2 - this.Lo.Range.Radius;
    i.Z += this.Lo.Range.Height / 2 - this.Lo.Range.Radius;
    var s = Vector_1.Vector.Create();
    var h = Vector_1.Vector.Create();
    s.FromConfigVector(t);
    h.FromConfigVector(t);
    s.Z -= this.Lo.Range.Height / 2;
    h.Z = s.Z;
    for (let t = 0; t < this.n$m; t++) {
      var o = new BeamCastInfo(s, h, e, i, this.s$m * t);
      this.a$m.push(o);
    }
    this.bmn = UE.NewArray(UE.VectorDouble);
    this.bmn.Add(e.ToUeVector());
    this.bmn.Add(i.ToUeVector());
    this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l);
    this.d$m = new Map();
    return true;
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(91);
    this.mBe = this.Entity.GetComponent(144);
    this.Hte = this.Entity.GetComponent(214);
    this.Lie = this.Entity.GetComponent(208);
    if (this.vtn && this.mBe && this.Hte && this.Lie) {
      this.Tmn = new Set();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] 组件缺失", ["PbDataId", this.EIe?.GetPbDataId()], ["RangeComponent", !!this.vtn], ["SceneItemStateComponent", !!this.mBe], ["SceneItemActorComponent", !!this.Hte], ["EntityCommonTagComponent", !!this.Lie]);
      }
      return false;
    }
  }
  OnActivate() {
    this.Omn("[BeamCastComp] 初始停止Tick");
    var t = this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1;
    this.nxe = this.TimeDilation * t;
    if (this.Hte.GetIsSceneInteractionLoadCompleted()) {
      this.Rnn();
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
  }
  OnEnd() {
    this.Q4a();
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    for (const t of this.a$m) {
      if (t.BeamSplineActor?.IsValid()) {
        t.BeamSplineActor.K2_DetachFromActor();
        ActorSystem_1.ActorSystem.Put("SceneItemBeamCastComponent.OnEnd", t.BeamSplineActor);
      }
      if (t.BeamEffectHandle && EffectSystem_1.EffectSystem.IsValid(t.BeamEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(t.BeamEffectHandle, "[BeamCastComp.OnEnd]", true);
      }
      if (t.HitEffectHandle && EffectSystem_1.EffectSystem.IsValid(t.HitEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(t.HitEffectHandle, "[BeamCastComp.OnEnd]", true);
      }
      if (t.StartEffectHandle && EffectSystem_1.EffectSystem.IsValid(t.StartEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(t.StartEffectHandle, "[BeamCastComp.OnEnd]", true);
      }
    }
    this.a$m = [];
    this.bmn.Empty();
    this.Tmn = undefined;
    this.mWi = undefined;
    if (this.l$m) {
      TimerSystem_1.TimerSystem.Remove(this.l$m);
      this.l$m = undefined;
    }
    if (this._$m) {
      TimerSystem_1.TimerSystem.Remove(this._$m);
      this._$m = undefined;
    }
    this.d$m?.clear();
    this.h$m = 0;
    this.u$m = 0;
    (this.c$m = false, puerts_1.releaseManualReleaseDelegate)(this.u$l);
    return !(this.c$l = undefined);
  }
  OnTick(t) {
    if (!!this.kmn() && !(this.Tmn.size < 0)) {
      this.Fmn(false);
    }
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1;
    this.nxe = t * e;
    for (const i of this.a$m) {
      if (i.BeamEffectHandle && EffectSystem_1.EffectSystem.IsValid(i.BeamEffectHandle)) {
        EffectSystem_1.EffectSystem.SetTimeScale(i.BeamEffectHandle, this.nxe);
      }
      if (i.HitEffectHandle && EffectSystem_1.EffectSystem.IsValid(i.HitEffectHandle)) {
        EffectSystem_1.EffectSystem.SetTimeScale(i.HitEffectHandle, this.nxe);
      }
      if (i.StartEffectHandle && EffectSystem_1.EffectSystem.IsValid(i.StartEffectHandle)) {
        EffectSystem_1.EffectSystem.SetTimeScale(i.StartEffectHandle, this.nxe);
      }
    }
  }
  Gmn() {
    if (this.kmn()) {
      this.Vmn();
      this.p$m();
      if (this.n$m > 1) {
        this.c$m = true;
        this.g$m();
      } else if (this.Tmn.size < 0) {
        this.Omn("[BeamCastComp] 范围内无Actor，停止Tick");
      } else {
        this.Hmn();
      }
    } else {
      this.v$m();
      this.jmn();
      this.WUn(-1);
      this.Omn("[BeamCastComp] 不在活跃状态，停止Tick");
    }
  }
  kmn() {
    return this.Uai && this.Lie.HasTag(this.Imn);
  }
  Wmn() {
    return this.Smn === undefined;
  }
  Hmn() {
    if (!this.Wmn()) {
      this.Enable(this.Smn, "SceneItemBeamCastComponent.EnableTraceTick");
      this.Smn = undefined;
    }
  }
  Omn(t) {
    if (this.Wmn()) {
      this.Smn = this.Disable(t);
    }
  }
  W4a() {
    if (this.j4a && TimerSystem_1.GameplayTimerSystem.Has(this.j4a)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j4a);
      this.j4a = undefined;
    }
    this.j4a = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (this.kmn()) {
        this.Fmn(false);
        this.j4a = undefined;
      }
    }, MANUAL_DELAY_UPDATE_MS);
  }
  Q4a() {
    if (this.j4a && TimerSystem_1.GameplayTimerSystem.Has(this.j4a)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j4a);
    }
    this.j4a = undefined;
  }
  WYr(t, e) {
    if (!this.mWi) {
      this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.mWi.bIsSingle = true;
      this.mWi.ActorsToIgnore.Empty();
      var i = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
      if (i) {
        for (let t = 0; t < i.Num(); t++) {
          this.mWi.ActorsToIgnore.Add(i.Get(t));
        }
      }
      this.mWi.bIgnoreSelf = true;
      this.mWi.Radius = this.Lo.Range.Radius;
      var s = UE.NewArray(UE.BuiltinByte);
      s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      if (!this.Lo?.IgnoreMonsterCollision) {
        s.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
      }
      var s = (0, puerts_1.$ref)(s);
      this.mWi.SetObjectTypesQuery(s);
    }
    this.mWi.WorldContextObject = this.Hte.Owner;
    s = MathUtils_1.MathUtils.CommonTempVector;
    MathUtils_1.MathUtils.TransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, t, s);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, s);
    t = MathUtils_1.MathUtils.CommonTempVector;
    MathUtils_1.MathUtils.TransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, e, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, t);
  }
  Fmn(t) {
    if (!(this.u$m >= this.a$m.length)) {
      this.WYr(this.a$m[this.u$m].TraceStartRel, this.a$m[this.u$m].TraceEndRel);
      if (t) {
        t = TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.mWi, "[BeamCastComp.TraceAndUpdate]", this.c$l);
        this.d$m.set(t.Index, [this.u$m, t]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 93, "[BeamCastComp] TraceAndUpdate 发起异步Trace", ["frame", t.Frame], ["index", t.Index], ["CurTraceIndex", this.u$m]);
        }
      } else {
        TraceElementCommon_1.TraceElementCommon.SphereTrace(this.mWi, "[BeamCastComp.TraceAndUpdate]");
        this.Kmn(this.mWi, this.u$m);
      }
      this.u$m++;
      if (this.u$m >= this.n$m) {
        this.u$m = 0;
        if (this._$m) {
          TimerSystem_1.TimerSystem.Remove(this._$m);
          this._$m = undefined;
        }
        this.c$m = false;
      }
      this.mWi.ClearCacheData();
    }
  }
  Kmn(t, e, i, s) {
    if (!(e >= this.a$m.length)) {
      var h = this.a$m[e];
      var o = t?.HitResult;
      if (o?.bBlockingHit) {
        let e = this.Rmn;
        let i = undefined;
        for (let t = 0; t < o.GetHitCount(); ++t) {
          var r;
          var a;
          var n;
          var _ = o.Actors.Get(t);
          if (_?.IsValid()) {
            if ((!(r = this.ftn(_)) || r.Id !== this.Entity.Id) && !(r = o.ImpactPointX_Array.Get(t), a = o.ImpactPointY_Array.Get(t), n = o.ImpactPointZ_Array.Get(t), r = Vector_1.Vector.Create(r, a, n), a = MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.InverseTransformPosition(this.Hte.ActorLocationProxy, this.Hte.ActorRotationProxy, this.Hte.ActorScaleProxy, r, a), (n = a.Z - h.BeamStartPosRel.Z) < 0) && !(n > e)) {
              i = _;
              e = n;
            }
          }
        }
        h.CastingActor = i;
        h.BeamLen = e;
      } else {
        h.CastingActor = undefined;
        h.BeamLen = i ?? this.Rmn;
      }
      if (!s) {
        this.Xmn(e);
        this.KUn(e);
      }
      this.y$m(e);
    }
  }
  S$m(t) {
    var e;
    var i;
    var s;
    if (this.vtn) {
      s = this.a$m[t].BeamLen + BEAM_WALL_OVERLAP_RANGE_OFFSET;
      s = Math.min(s, this.Rmn);
      if (this.Lo?.BeamLayout) {
        if (this.Lo?.BeamLayout?.Type === IComponent_1.EBeamLayoutType.BeamWall) {
          (e = {
            ...this.Lo.Range.Center
          }).Z -= (this.Rmn - s) * 0.5;
          e.Y = t * this.s$m;
          (i = Vector_1.Vector.Create()).FromConfigVector(e);
          e = new UE.VectorDouble(this.Lo.Range.Radius, this.Lo.Range.Radius, s * 0.5);
          this.vtn.UpdateCombinationBoxRange(t, i.ToUeVector(), e);
        }
      } else {
        (t = {
          ...this.Lo.Range.Center
        }).Z -= (this.Rmn - s) * 0.5;
        i = {
          Type: "Cylinder",
          Center: t,
          Radius: this.Lo.Range.Radius,
          Height: s
        };
        this.vtn.UpdateCylinderShape(i);
      }
    }
  }
  jmn() {
    var t = !!this.Lo?.DelayDestroyEffect;
    let e = 0;
    for (const i of this.a$m) {
      this.Kmn(undefined, e, t ? i.BeamLen : 0, true);
      if (i.BeamEffectHandle && EffectSystem_1.EffectSystem.IsValid(i.BeamEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(i.BeamEffectHandle, "[BeamCastComp.StopBeam]", !t);
      }
      if (i.StartEffectHandle && EffectSystem_1.EffectSystem.IsValid(i.StartEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(i.StartEffectHandle, "[BeamCastComp.StopBeam]", !t);
      }
      i.StartEffectHandle = undefined;
      i.BeamEffectHandle = undefined;
      e++;
    }
  }
  jDg(t) {
    var e;
    var i;
    var s;
    var h;
    if (!!this.Hte?.Owner && !!(e = this.Lo.StartEffectPath) && (!(t = this.a$m[t]).StartEffectHandle || !EffectSystem_1.EffectSystem.IsValid(t.StartEffectHandle))) {
      h = (i = this.Hte.ActorTransform).TransformPosition(t.TraceStartRel.ToUeVector());
      s = i.TransformPosition(t.TraceEndRel.ToUeVector());
      s = Vector_1.Vector.Create(s.op_Subtraction(h));
      s = MathUtils_1.MathUtils.GetAngleByVectorDot(Vector_1.Vector.LeftVectorProxy, s);
      s = new UE.Rotator(0, s, 0);
      s = new UE.TransformDouble(s, h, i.GetScale3D());
      h = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, s, e, "[BeamCastComp.UpdateHitEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (EffectSystem_1.EffectSystem.IsValid(h)) {
        EffectSystem_1.EffectSystem.SetTimeScale(h, this.nxe);
        EffectSystem_1.EffectSystem.GetEffectActor(h).K2_AttachToActor(this.Hte.Owner, undefined, 1, 1, 1, false);
        t.StartEffectHandle = h;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] HitEffect创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    }
  }
  hst(t) {
    var e;
    var i;
    var s;
    var h;
    if (!!this.Hte?.Owner && !!(e = this.Lo.HitEffectPath) && (!(t = this.a$m[t]).HitEffectHandle || !EffectSystem_1.EffectSystem.IsValid(t.HitEffectHandle))) {
      h = (i = this.Hte.ActorTransform).TransformPosition(t.BeamEndPosRel.ToUeVector());
      s = MathUtils_1.MathUtils.CommonTempQuat;
      Vector_1.Vector.UpVectorProxy.ToOrientationQuat(s);
      s = i.TransformRotation(s.ToUeQuat());
      s = new UE.TransformDouble(s, h, i.GetScale3D());
      h = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, s, e, "[BeamCastComp.UpdateHitEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      if (EffectSystem_1.EffectSystem.IsValid(h)) {
        EffectSystem_1.EffectSystem.SetTimeScale(h, this.nxe);
        EffectSystem_1.EffectSystem.GetEffectActor(h).K2_AttachToActor(this.Hte.Owner, undefined, 1, 1, 1, false);
        t.HitEffectHandle = h;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamCastComp] HitEffect创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    }
  }
  WUn(t) {
    if (t === -1) {
      for (const e of this.a$m) {
        if (e.HitEffectHandle && EffectSystem_1.EffectSystem.IsValid(e.HitEffectHandle)) {
          EffectSystem_1.EffectSystem.StopEffectById(e.HitEffectHandle, "[BeamCastComp.StopHitEffect]", true);
        }
        e.HitEffectHandle = undefined;
      }
    } else {
      const e = this.a$m[t];
      if (e.HitEffectHandle && EffectSystem_1.EffectSystem.IsValid(e.HitEffectHandle)) {
        EffectSystem_1.EffectSystem.StopEffectById(e.HitEffectHandle, "[BeamCastComp.StopHitEffect]", true);
        e.HitEffectHandle = undefined;
      }
    }
  }
  Xmn(t) {
    t = this.a$m[t];
    t.BeamEndPosRel.Z = t.BeamStartPosRel.Z + t.BeamLen;
    t.BeamSpinePointEndPosRel.Z = t.BeamSpinePointStartPosRel.Z + t.BeamLen;
    this.bmn.Empty();
    this.bmn.Add(t.BeamSpinePointStartPosRel.ToUeVector());
    this.bmn.Add(t.BeamSpinePointEndPosRel.ToUeVector());
    if (t.BeamSplineActor?.IsValid() && t.BeamSplineComp?.IsValid()) {
      if (t.BeamEffectHandle && EffectSystem_1.EffectSystem.IsValid(t.BeamEffectHandle)) {
        EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(t.BeamEffectHandle, t.BeamLen > 0);
      } else {
        var e = this.Lo.EffectPath;
        if (e) {
          e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t.BeamSplineActor.D_GetTransform(), e, "[BeamCastComp.SpawnSingleBeam]", new EffectContext_1.EffectContext(this.Entity.Id));
          if (!EffectSystem_1.EffectSystem.IsValid(e)) {
            this.C$m("[BeamCastComp] BeamEffect创建失败");
            return;
          }
          EffectSystem_1.EffectSystem.SetTimeScale(e, this.nxe);
          t.BeamEffectHandle = e;
          EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToActor(t.BeamSplineActor, undefined, 2, 2, 2, false);
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(t.BeamEffectHandle, t.BeamLen > 0);
        }
      }
      t.BeamSplineComp.D_SetSplinePoints(this.bmn, 0, true);
    }
  }
  KUn(t) {
    var e;
    var i;
    if (this.Hte?.Owner?.IsValid()) {
      if ((e = this.a$m[t]).BeamLen >= this.Rmn) {
        this.WUn(t);
      } else {
        this.hst(t);
        if (e.HitEffectHandle && EffectSystem_1.EffectSystem.IsValid(e.HitEffectHandle) && (t = EffectSystem_1.EffectSystem.GetEffectActor(e.HitEffectHandle))) {
          (i = MathUtils_1.MathUtils.CommonTempRotator).Set(90, 0, 0);
          t.D_K2_SetActorRelativeLocation(e.BeamEndPosRel.ToUeVector(), false, undefined, false);
          t.K2_SetActorRelativeRotation(i.ToUeRotator(), false, undefined, false);
        }
      }
    }
  }
  y$m(t) {
    var e = this.a$m[t];
    var i = this.EIe.GetEntityOnlineInteractType();
    var i = LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(i, false);
    var s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    var h = this.ftn(e.CastingActor);
    this.S$m(t);
    if (!!e.CastingEntity?.Valid && (!h?.Valid || h.Id !== e.CastingEntity.Id)) {
      t = e.CastingEntity.Entity;
      e.CastingEntity = undefined;
      if (i) {
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.BeamCastStop, s);
      }
    }
    if (h?.Valid && !e.CastingEntity?.Valid && (t = h.Entity, e.CastingEntity = h, i)) {
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.BeamCastStart, s);
    }
  }
  ftn(t) {
    if (t?.IsValid()) {
      if (UE.KismetMathLibrary.EqualEqual_ObjectObject(t, RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger())) {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId);
      } else {
        return ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
      }
    }
  }
  ToggleDebugMode(t) {
    if (this.mWi) {
      if (t) {
        this.mWi.DrawTime = 0.5;
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.mWi, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.mWi, ColorUtils_1.ColorUtils.LinearRed);
      }
      this.mWi.SetDrawDebugTrace(t ? 2 : 0);
    }
  }
  Vmn() {
    if (!!this.Hte?.Owner && !(this.h$m >= this.n$m)) {
      if (this.n$m > 1) {
        if (this.h$m < this.n$m && !this.l$m) {
          this.l$m = TimerSystem_1.TimerSystem.Loop(this.f$m, MANUAL_DELAY_UPDATE_MS, this.n$m);
        }
      } else {
        this.f$m();
        this.Fmn(false);
      }
    }
  }
  C$m(t) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, t, ["PbDataId", this.EIe?.GetPbDataId()]);
    }
    if (this.l$m) {
      TimerSystem_1.TimerSystem.Remove(this.l$m);
      this.l$m = undefined;
    }
  }
  g$m() {
    if (!!this.c$m && !(this.h$m < this.n$m) && !!this.kmn()) {
      if (this._$m) {
        TimerSystem_1.TimerSystem.Remove(this._$m);
        this._$m = undefined;
      }
      this.u$m = 0;
      this.d$m?.clear();
      this._$m = TimerSystem_1.TimerSystem.Loop(() => {
        this.Fmn(true);
      }, TimerSystem_1.MIN_TIME, this.n$m);
    }
  }
  m$m(t) {
    var e;
    if (this.Lo?.TriggerActions?.length && Global_1.Global.BaseCharacter?.EntityId === t.Id) {
      (e = Protocol_1.Aki.Protocol.l2m.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 93, "玩家接触光线，发送触发行为请求", ["实体Id", this.Entity.Id], ["进入光线角色实体Id", t.Id], ["实体CreatureDataId", this.EIe.GetCreatureDataId()]);
      }
      Net_1.Net.Call(16435, e, t => {
        if (t) {
          if (t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 93, "玩家接触光线，收到触发行为请求的答复，请求失败", ["实体Id", this.Entity.Id], ["错误码", t.Cvs]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneItem", 93, "玩家接触光线，收到触发行为请求的答复，请求成功", ["实体Id", this.Entity.Id]);
          }
        }
      });
    }
  }
  p$m() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
  }
  v$m() {
    if (this.Tmn) {
      this.Tmn.clear();
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
  }
};
SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(227)], SceneItemBeamCastComponent);
exports.SceneItemBeamCastComponent = SceneItemBeamCastComponent; //# sourceMappingURL=SceneItemBeamCastComponent.js.map