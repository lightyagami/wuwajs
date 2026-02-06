"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r;
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
exports.VehicleActionComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
let VehicleActionComponent = class VehicleActionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.VehicleCatapultComponent = undefined;
    this.VehicleSkillComponent = undefined;
    this.VehicleActorComponent = undefined;
  }
  static get Dependencies() {
    return [329, 44, 247];
  }
  OnStart() {
    this.VehicleCatapultComponent = this.Entity.CheckGetComponent(329);
    this.VehicleSkillComponent = this.Entity.CheckGetComponent(44);
    this.VehicleActorComponent = this.Entity.CheckGetComponent(247);
    return true;
  }
  async StartBounce(t) {
    if (!this.VehicleSkillComponent?.Valid || !this.VehicleActorComponent?.Valid || !this.VehicleCatapultComponent?.Valid) {
      return false;
    }
    if (this.VehicleActorComponent.ActorGravityDirectProxy.DotProduct(this.VehicleActorComponent.ActorUpProxy) > MathUtils_1.MathUtils.KindaSmallNumber) {
      return false;
    }
    var e = t.CurvePath ?? "";
    if ((MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.VehicleActorComponent.ActorLocationProxy), GravityUtils_1.GravityUtils.AddZnInGravity(this.VehicleActorComponent.ActorGravityDirectProxy, MathUtils_1.MathUtils.CommonTempVector, t.Height), this.VehicleCatapultComponent.SetConfig(t.Time ?? 0, this.VehicleActorComponent.ActorLocationProxy, MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.CommonTempVector, e, 0, undefined, this.VehicleActorComponent.ActorGravityDirectProxy), this.VehicleCatapultComponent.StartCatapult(), t.SkillId) && !(await this.VehicleSkillComponent.BeginSkillAsync(t.SkillId, {
      Reason: "VehicleActionComponent.StartBounce"
    }))) {
      return false;
    }
    return true;
  }
};
VehicleActionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(275)], VehicleActionComponent);
exports.VehicleActionComponent = VehicleActionComponent; //# sourceMappingURL=VehicleActionComponent.js.map