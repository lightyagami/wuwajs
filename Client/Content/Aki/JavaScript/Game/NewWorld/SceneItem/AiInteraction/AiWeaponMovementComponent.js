"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, r);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (o = t[_]) {
        n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWeaponMovementComponent = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const COLLISION_PROFILE_NAME = new UE.FName("DropItem");
const GROUND_MAX_XY_VEL_SQUARED = 4;
const GROUND_MAX_Z_VEL = 2;
const MAX_DROP_HEIGHT = 10000;
const ON_WATER_MAX_DIST = 5;
let AiWeaponMovementComponent = class AiWeaponMovementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.EIe = undefined;
    this.EnableMovement = undefined;
    this.jhn = 1;
    this.Whn = -0;
    this.mWi = undefined;
  }
  OnInitData() {
    this.EIe = this.Entity.GetComponent(0);
    this.Whn = 0.01;
    var t = this.EIe.GetPbEntityInitData();
    var t = (0, IComponent_1.getComponent)(t.ComponentsData, "WeaponComponent");
    if (t?.WeaponId) {
      t = ModelManager_1.ModelManager.AiWeaponModel.GetStaticWeaponConfig(t.WeaponId);
      this.Whn = t.Mass;
    }
    this.EnableMovement = true;
    return !(this.jhn = 0);
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    return true;
  }
  OnTick(t) {
    if (this.EnableMovement) {
      this.UpdateMovement(t);
    }
  }
  UpdateMovement(t) {
    this.Hte.SetActorLocation(this.Hte.StaticMesh.D_K2_GetComponentLocation());
    switch (this.jhn) {
      case 0:
        this.UpdateItemBorn(t);
        break;
      case 1:
        this.UpdateItemFall(t);
        break;
      case 2:
        this.UpdateItemStay(t);
    }
  }
  UpdateItemBorn(t) {
    var e = MathUtils_1.MathUtils.CommonTempVector;
    e.FromConfigVector(this.EIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector);
    if (e.IsNearlyZero()) {
      this.jhn = 2;
    } else {
      this.Khn();
      this.jhn = 1;
    }
  }
  UpdateItemFall(t) {
    if (this.Qhn() || this.Xhn() || this.$hn()) {
      this.jhn = 2;
      this.Yhn();
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.Entity.GetComponent(159)?.CollectSampleAndSend(true);
      }
    }
  }
  UpdateItemStay(t) {
    this.EnableMovement = false;
  }
  Khn() {
    var t;
    var e = this.Hte.StaticMesh;
    e.SetCollisionProfileName(COLLISION_PROFILE_NAME);
    e.SetCollisionEnabled(2);
    e.SetSimulatePhysics(true);
    if (this.Whn >= 0) {
      e.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, this.Whn, true);
    }
    e.SetEnableGravity(true);
    e.SetConstraintMode(6);
    e.SetUseCCD(true);
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.FromConfigVector(this.EIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector);
    if (i.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED) {
      t = Vector_1.Vector.Create();
      i.GetSignVector(t);
      t.MultiplyEqual(Math.sqrt(GROUND_MAX_XY_VEL_SQUARED + 1));
      t.Z = 0;
      i.AdditionEqual(t);
    }
    e.SetPhysicsLinearVelocity(i.ToUeVectorOld());
  }
  Yhn() {
    var t = this.Hte.StaticMesh;
    t.SetCollisionEnabled(0);
    t.SetSimulatePhysics(false);
    t.SetEnableGravity(false);
    t.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector);
    t.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector);
    t.SetConstraintMode(0);
    t.SetUseCCD(false);
  }
  Jhn() {
    this.mWi ||= UE.NewObject(UE.TraceLineElement.StaticClass());
    this.mWi.WorldContextObject = GlobalData_1.GlobalData.World;
    this.mWi.bIsSingle = true;
    this.mWi.bIgnoreSelf = true;
    this.mWi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    this.mWi.SetDrawDebugTrace(2);
    this.mWi.DrawTime = 5;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.mWi, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.mWi, ColorUtils_1.ColorUtils.LinearRed);
  }
  zhn(t) {
    this.Jhn();
    var e = this.Hte.ActorLocationProxy;
    this.mWi.SetStartLocation(e.X, e.Y, e.Z);
    this.mWi.SetEndLocation(e.X, e.Y, e.Z + t);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(this.mWi, "AiWeaponMovementComponent.TraceHitWater");
    var t = e && !!this.mWi.HitResult?.bBlockingHit;
    this.mWi.ClearCacheData();
    return t;
  }
  Qhn() {
    var t;
    return !(this.Hte.StaticMesh.GetComponentVelocity().Z > 0) && (t = (t = this.EIe.GetInitLocation()) ? this.Hte.ActorLocationProxy.Z - t.Z : 0, Math.abs(t) > MAX_DROP_HEIGHT || (t = (t = Global_1.Global.BaseCharacter?.CharacterActorComponent.ActorLocation) ? this.Hte.ActorLocationProxy.Z - t.Z : 0, Math.abs(t) > MAX_DROP_HEIGHT));
  }
  Xhn() {
    var t = this.Hte.StaticMesh.GetComponentVelocity();
    return t.Z <= 0 && Math.abs(t.Z) <= GROUND_MAX_Z_VEL && t.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED;
  }
  $hn() {
    return !!(this.Hte.StaticMesh.GetComponentVelocity().Z <= 0) && !!this.zhn(-ON_WATER_MAX_DIST);
  }
};
AiWeaponMovementComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(124)], AiWeaponMovementComponent);
exports.AiWeaponMovementComponent = AiWeaponMovementComponent; //# sourceMappingURL=AiWeaponMovementComponent.js.map