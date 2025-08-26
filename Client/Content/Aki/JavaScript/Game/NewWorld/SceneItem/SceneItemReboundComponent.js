"use strict";

var SceneItemReboundComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        r = (h < 3 ? o(r) : h > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemReboundComponent = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const ModelManager_1 = require("../../Manager/ModelManager");
const PROFILE_BULLECT_TRACK = "SceneItemReboundComponent_CalculateBulletTrackHit";
const REFLECT_START_OFFSET = 30;
const REFLECT_BULLET_EFFECT_CD = 2000;
let SceneItemReboundComponent = SceneItemReboundComponent_1 = class SceneItemReboundComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ovn = undefined;
    this.kvn = undefined;
    this.u9r = undefined;
    this.m9r = undefined;
    this.Fvn = undefined;
    this.cz = undefined;
    this.e7o = undefined;
    this.l9r = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.Vvn = false;
    this.Hvn = "";
    this.cie = undefined;
    this.jvn = 150;
    this.Wvn = true;
    this.Kvn = undefined;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemReboundComponent_1)[0];
    this.Vvn = t.BulletId > 0;
    if (this.Vvn) {
      this.Hvn = t.BulletId.toString();
    }
    this.Kvn = Vector_1.Vector.Create();
    t = t.Option.ReboundPoint;
    this.Kvn.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    this.Lie = this.Entity.GetComponent(197);
    this.Ovn = Vector_1.Vector.Create();
    this.kvn = Vector_1.Vector.Create();
    this.u9r = Vector_1.Vector.Create();
    this.m9r = Vector_1.Vector.Create();
    this.Fvn = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.e7o = Quat_1.Quat.Create();
    return true;
  }
  OnActivate() {
    this.p9r();
  }
  End() {
    this.Hte = undefined;
    this.Ovn = undefined;
    this.kvn = undefined;
    this.u9r = undefined;
    this.m9r = undefined;
    this.Fvn = undefined;
    this.cz = undefined;
    this.l9r = undefined;
    this.cie = undefined;
    return !(this.e7o = undefined);
  }
  p9r() {
    if (!this.l9r) {
      this.l9r = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.l9r.bIsSingle = false;
      this.l9r.bIgnoreSelf = true;
      this.l9r.Radius = 75;
      this.l9r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    }
    this.l9r.WorldContextObject = this.Entity.GetComponent(203)?.Owner;
  }
  CalculateReflectDir(t, e, i = undefined, s = true) {
    if (((i ? (this.cie.DeepCopy(i.K2_GetActorRotation()), this.cie) : this.Hte.ActorRotationProxy).Vector(this.Fvn), Vector_1.Vector.ZeroVectorProxy.Subtraction(t, t), s) && t.DotProduct(this.Fvn) < 0) {
      return false;
    }
    e.DeepCopy(this.Fvn);
    return true;
  }
  ReboundBullet(t, e) {
    if (this.Vvn && e.BulletRowName !== this.Hvn) {
      return false;
    }
    if (!this.Lie.HasTag(-1827668160)) {
      this.Lie.AddTag(-1827668160);
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Lie.RemoveTag(-1827668160);
      }, REFLECT_BULLET_EFFECT_CD);
    }
    e.MoveInfo.BeginSpeedRotator.Vector(this.Ovn);
    this.Ovn.Multiply(this.jvn, this.cz);
    e.ActorComponent.ActorLocationProxy.Addition(this.cz, this.m9r);
    e.CollisionInfo.LastFramePosition.Subtraction(this.cz, this.u9r);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.l9r, this.u9r);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.l9r, this.m9r);
    let i = undefined;
    if (TraceElementCommon_1.TraceElementCommon.SphereTrace(this.l9r, PROFILE_BULLECT_TRACK)) {
      let e = -1;
      for (let t = 0; t < this.l9r.HitResult.GetHitCount(); t++) {
        if (ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(this.l9r.HitResult.Actors.Get(t), true)?.Id === this.Entity.Id) {
          e = t;
          break;
        }
      }
      if (e > -1) {
        i = this.l9r.HitResult.Actors.Get(e);
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.l9r.HitResult, e, this.cz);
      }
    }
    if (!i) {
      if (this.Wvn) {
        return true;
      }
      this.cz.DeepCopy(t.HitPosition);
    }
    t = i.GetAttachParentActor();
    if (t) {
      i = t;
    }
    return !!this.CalculateReflectDir(this.Ovn, this.kvn, i, false) && !(MathUtils_1.MathUtils.LookRotationForwardFirst(this.kvn, Vector_1.Vector.UpVectorProxy, e.MoveInfo.BeginSpeedRotator), this.Wvn ? ((i ? (this.Ovn.DeepCopy(i.D_K2_GetActorLocation()), this.cie.FromUeRotator(i.K2_GetActorRotation()), this.cie) : (this.Ovn.DeepCopy(this.Hte.ActorLocationProxy), this.Hte.ActorRotationProxy)).Quaternion(this.e7o), this.kvn.Multiply(REFLECT_START_OFFSET, this.kvn)) : (this.kvn.Multiply(REFLECT_START_OFFSET, this.kvn), this.Ovn.DeepCopy(this.cz)), this.Ovn.Addition(this.kvn, this.Ovn), this.e7o.RotateVector(this.Kvn, this.cz), this.Ovn.Addition(this.cz, this.Ovn), e.ActorComponent.SetActorLocation(this.Ovn.ToUeVector()), e.ActorComponent.SetActorRotation(e.MoveInfo.BeginSpeedRotator.ToUeRotator()), e.LiveTimeAddDelta = 0, e.LiveTime = 0);
  }
};
SceneItemReboundComponent = SceneItemReboundComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(163)], SceneItemReboundComponent);
exports.SceneItemReboundComponent = SceneItemReboundComponent; //# sourceMappingURL=SceneItemReboundComponent.js.map