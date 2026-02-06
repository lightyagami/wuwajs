"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTraceWaterCapability = exports.MOTORCYCLE_WATER_DEBUG_KEY = exports.FIVE_HUNDRED = exports.ONE_HUNDRED = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CharacterSwimComponent_1 = require("../../Character/Common/Component/CharacterSwimComponent");
const TsBaseVehicle_1 = require("../TsBaseVehicle");
const PROFILE_DETECT_WATER_DEPTH = "MotorWaterTrace";
exports.ONE_HUNDRED = 100;
exports.FIVE_HUNDRED = 500;
exports.MOTORCYCLE_WATER_DEBUG_KEY = "MotorWater";
class MotorcycleTraceWaterCapability {
  constructor(e) {
    this.Hte = e;
    this.Mao = undefined;
    this.ImpactPoint = Vector_1.Vector.Create();
    this.ImpactNormal = Vector_1.Vector.Create();
  }
  Activate() {
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Mao.WorldContextObject = this.Hte.Owner;
    this.Mao.Radius = 1;
    this.Mao.bIgnoreSelf = true;
    this.Mao.bIsSingle = false;
    this.Mao.DrawTime = 0.1;
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.Mao, CharacterSwimComponent_1.CharacterSwimUtils.DebugColor3);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.Mao, CharacterSwimComponent_1.CharacterSwimUtils.DebugColor4);
  }
  Deactivate() {
    this.Mao?.Dispose();
    this.Mao = undefined;
  }
  TraceWater(e, t) {
    var r = this.Hte;
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(r.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(r, MathUtils_1.MathUtils.CommonTempVector, e);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(r.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(r, MathUtils_1.MathUtils.CommonTempVector, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, MathUtils_1.MathUtils.CommonTempVector);
    this.Mao.SetDrawDebugTrace(ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(exports.MOTORCYCLE_WATER_DEBUG_KEY) > 0 ? 2 : 0);
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, PROFILE_DETECT_WATER_DEPTH);
    let i = false;
    let a = e + 1;
    if (t) {
      var s;
      var o = this.Mao.HitResult;
      var _ = o.GetHitCount();
      for (let e = 0; e < _; ++e) {
        if (o.Actors.Get(e)?.IsValid() && (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(o, e, MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(r.ActorLocationProxy), s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, MathUtils_1.MathUtils.CommonTempVector), i = true, s < a)) {
          a = s;
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(o, e, this.ImpactPoint);
          TraceElementCommon_1.TraceElementCommon.GetImpactNormal(o, e, this.ImpactNormal);
        }
      }
    }
    return {
      FoundWater: i,
      MinWaterHeight: a,
      ImpactPoint: this.ImpactPoint,
      ImpactNormal: this.ImpactNormal
    };
  }
  CeilingCheck(e) {
    var t = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    var r = this.Hte;
    t.WorldContextObject = this.Hte.Owner;
    t.Radius = 5;
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(r.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(r.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(r, MathUtils_1.MathUtils.CommonTempVector, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, MathUtils_1.MathUtils.CommonTempVector);
    t.ActorsToIgnore.Empty();
    for (const o of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      t.ActorsToIgnore.Add(o);
    }
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(r.Actor.CapsuleComponent, t, PROFILE_DETECT_WATER_DEPTH, PROFILE_DETECT_WATER_DEPTH)) {
      var i = t.HitResult;
      var a = i.GetHitCount();
      for (let e = 0; e < a; ++e) {
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
}
exports.MotorcycleTraceWaterCapability = MotorcycleTraceWaterCapability;
//# sourceMappingURL=MotorcycleTraceWaterCapability.js.map