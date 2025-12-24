"use strict";

var __decorate = this && this.__decorate || function (e, t, r, i) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, r, i);
  } else {
    for (var _ = e.length - 1; _ >= 0; _--) {
      if (o = e[_]) {
        n = (s < 3 ? o(n) : s > 3 ? o(t, r, n) : o(t, r)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleWaterComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CharacterSwimComponent_1 = require("../../Character/Common/Component/CharacterSwimComponent");
const TsBaseVehicle_1 = require("../TsBaseVehicle");
const FIVE_HUNDRED_TO_FIND_SURFACE = 500;
const ONE_HUNDRED_TO_FIND_SURFACE = 100;
const waterAreaDetectExtent = new UE.VectorDouble(500, 500, 5000);
const IMMERSION_DEPTH = -5;
const LEAVE_MOTOR_DEPTH = IMMERSION_DEPTH + 90;
const SEND_LEAVE_PERIOD = 1000;
const PROFILE_DETECT_WATER_DEPTH = "MotorWaterTrace";
const tmpVector = Vector_1.Vector.Create();
let MotorcycleWaterComponent = class MotorcycleWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.TagComp = undefined;
    this.Mao = undefined;
    this.rka = false;
    this.ika = 0;
    this.$Fm = 0;
    this.Ype = false;
    this.BKs = Vector_1.Vector.Create();
    this.WFm = false;
  }
  static get Dependencies() {
    return [247, 249];
  }
  get Immersion() {
    return this.WFm;
  }
  set Immersion(e) {
    if (this.WFm !== e && ((this.WFm = e) ? this.TagComp?.AddTag(1471383626) : this.TagComp?.RemoveTag(1471383626), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Movement", 6, "Motorcycle Immersion", ["v", e]);
    }
  }
  oka() {
    var e;
    var t;
    if (this.MoveComp && !this.MoveComp.IsStandardGravity) {
      this.rka = true;
      this.ika = FIVE_HUNDRED_TO_FIND_SURFACE;
    } else {
      e = (0, puerts_1.$ref)(0);
      t = false;
      t = UE.NavigationSystemV1.D_NavigationGetWaterSurface(this.ActorComp.Owner, this.ActorComp.ActorLocation, waterAreaDetectExtent, e, this.ActorComp.Owner, undefined);
      if (this.rka = t) {
        t = (0, puerts_1.$unref)(e);
        this.ika = t - this.ActorComp.ActorLocationProxy.Z + ONE_HUNDRED_TO_FIND_SURFACE;
      } else {
        this.ika = 0;
      }
    }
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(247);
    this.MoveComp = this.Entity.GetComponent(249);
    this.TagComp = this.Entity.GetComponent(215);
    this.ewr();
    return true;
  }
  OnEnd() {
    return true;
  }
  OnTick(e) {
    var i = this.ActorComp;
    if (!this.BKs.Equals(i.ActorLocationProxy, 1)) {
      this.BKs.DeepCopy(i.ActorLocationProxy);
      this.oka();
      if (this.rka) {
        tmpVector.DeepCopy(i.ActorLocationProxy);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(i, tmpVector, this.ika);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, tmpVector);
        tmpVector.DeepCopy(i.ActorLocationProxy);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(i, tmpVector, IMMERSION_DEPTH);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, tmpVector);
        TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, "MotorTrace");
        var o = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, PROFILE_DETECT_WATER_DEPTH);
        let t = false;
        let r = this.ika + 1;
        if (o) {
          var s;
          var n = this.Mao.HitResult;
          var _ = n.GetHitCount();
          for (let e = 0; e < _; ++e) {
            if (n.Actors.Get(e)?.IsValid()) {
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(n, e, tmpVector);
              tmpVector.SubtractionEqual(i.ActorLocationProxy);
              s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, tmpVector);
              t = true;
              r = Math.min(r, s);
            }
          }
        }
        if (!t || this.Uqf(r)) {
          this.Immersion = false;
        } else if (r > LEAVE_MOTOR_DEPTH) {
          if (this.$Fm <= Time_1.Time.Now) {
            this.$Fm = Time_1.Time.Now + SEND_LEAVE_PERIOD;
            if (o = this.Entity.GetComponent(246)) {
              o.TryLeaveAllAtOnce(1, "MotorcycleWater");
            }
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, "MotorcycleWater", true);
            this.Immersion = false;
          }
        } else if (r > IMMERSION_DEPTH) {
          this.Immersion = true;
        } else {
          this.Immersion = false;
        }
      } else {
        this.Immersion = false;
      }
    }
  }
  ewr() {
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Mao.WorldContextObject = this.ActorComp.Owner;
    this.Mao.Radius = 1;
    this.Mao.bIgnoreSelf = true;
    this.Mao.bIsSingle = false;
    this.Mao.SetDrawDebugTrace(this.Ype ? 2 : 0);
    this.Mao.DrawTime = 0.1;
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Mao, CharacterSwimComponent_1.CharacterSwimUtils.DebugColor3);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Mao, CharacterSwimComponent_1.CharacterSwimUtils.DebugColor4);
  }
  Uqf(e) {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    t.WorldContextObject = this.ActorComp.Owner;
    t.Radius = 5;
    var r = this.ActorComp;
    tmpVector.DeepCopy(r.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, tmpVector);
    tmpVector.DeepCopy(r.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(r, tmpVector, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, tmpVector);
    t.ActorsToIgnore.Empty();
    for (const n of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(n);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(r.Actor.CapsuleComponent, t, PROFILE_DETECT_WATER_DEPTH, PROFILE_DETECT_WATER_DEPTH)) {
      var i = t.HitResult;
      var o = i.GetHitCount();
      for (let e = 0; e < o; ++e) {
        var s = i.Components.Get(e);
        if (s && s.GetCollisionObjectType() !== QueryTypeDefine_1.KuroCollisionChannel.KuroWater) {
          s = i.Actors.Get(e);
          if (s?.IsValid() && !(s instanceof TsBaseCharacter_1.default) && !(s instanceof TsBaseVehicle_1.default)) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
MotorcycleWaterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(266)], MotorcycleWaterComponent);
exports.MotorcycleWaterComponent = MotorcycleWaterComponent; //# sourceMappingURL=MotorcycleWaterComponent.js.map