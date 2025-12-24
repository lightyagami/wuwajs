"use strict";

var VehicleCatapultComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var a = arguments.length;
  var s = a < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        s = (a < 3 ? n(s) : a > 3 ? n(e, i, s) : n(e, i)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleCatapultComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const BigJumpUnit_1 = require("../../Character/Common/Component/Move/BigJumpUnit");
let VehicleCatapultComponent = VehicleCatapultComponent_1 = class VehicleCatapultComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.RunTime = -0;
    this.CatapultUnit = undefined;
    this.DisableKey = undefined;
  }
  static get Dependencies() {
    return [247, 249];
  }
  OnInitData() {
    this.CatapultUnit = new BigJumpUnit_1.BigJumpUnit();
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(247);
    this.MoveComp = this.Entity.GetComponent(249);
    this.DisableKey = this.Disable("[VehicleCatapult.OnStart] 默认Disable");
    return true;
  }
  OnEnd() {
    return true;
  }
  OnTick(t) {
    if (!(t < MathUtils_1.MathUtils.SmallNumber)) {
      t = t * MathUtils_1.MathUtils.MillisecondToSecond;
      this.CatapultUnit.GetOffset(this.RunTime, t, VehicleCatapultComponent_1.TmpVector);
      this.ActorComp.AddActorWorldOffset(VehicleCatapultComponent_1.TmpVector.ToUeVector(), "VehicleCatapult", true);
      VehicleCatapultComponent_1.TmpVector.DeepCopy(this.ActorComp.ActorVelocityProxy);
      if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, VehicleCatapultComponent_1.TmpVector) < 0) {
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.ActorComp, VehicleCatapultComponent_1.TmpVector, 0);
        this.MoveComp.SetForceSpeed(VehicleCatapultComponent_1.TmpVector);
      }
      this.RunTime += t;
      if (this.RunTime > this.CatapultUnit.TimeLength && (this.MoveComp.VehicleMovement.EnableFixFlyMode(false, 1), this.DisableKey = this.Disable("[VehicleCatapult.OnTick] Catapult结束"), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Movement", 6, "StopCatapult", ["Actor", this.ActorComp.Actor.GetName()], ["CatapultUnit", this.CatapultUnit]);
      }
    }
  }
  SetConfig(t, e, i, o, n = "", a = BigJumpUnit_1.DEFAULT_GRAVITY, s = undefined, h, l) {
    this.CatapultUnit.SetAll(t, e, i, o, n, a, s, h);
  }
  StartCatapult() {
    this.CatapultUnit.SetStartPoint(this.ActorComp.ActorLocationProxy);
    this.CatapultUnit.Init();
    this.RunTime = 0;
    if (this.DisableKey) {
      this.Enable(this.DisableKey, "VehicleCatapult.StartCatapult");
      this.DisableKey = undefined;
    }
    this.MoveComp.VehicleMovement.EnableFixFlyMode(true, 1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "StartCatapult", ["Actor", this.ActorComp.Actor.GetName()], ["CatapultUnit", this.CatapultUnit]);
    }
  }
};
VehicleCatapultComponent.TmpVector = Vector_1.Vector.Create();
VehicleCatapultComponent = VehicleCatapultComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(327)], VehicleCatapultComponent);
exports.VehicleCatapultComponent = VehicleCatapultComponent; //# sourceMappingURL=VehicleCatapultComponent.js.map