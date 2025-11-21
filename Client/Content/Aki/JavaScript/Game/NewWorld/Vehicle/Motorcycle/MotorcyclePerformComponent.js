"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (r = e[c]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcyclePerformComponent = undefined;
const UE = require("ue");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const VehiclePerformComponent_1 = require("../Common/VehiclePerformComponent");
let MotorcyclePerformComponent = class MotorcyclePerformComponent extends VehiclePerformComponent_1.VehiclePerformComponent {
  OnSetDriver() {
    if (this.AnimComp?.MainAnimInstance && this.AnimComp.MainAnimInstance instanceof UE.KuroAnimInstanceVehicle) {
      e = this.DriverInternal?.GetComponent(3);
      this.AnimComp.MainAnimInstance.SetDriver(e ? e.Actor : undefined);
      this.AnimComp.MainAnimInstance.ConsumeExtractedRootMotion(1);
    }
    var e = this.ActorComp?.Actor.VehicleMovementComponent;
    if (e) {
      e.Velocity = Vector_1.Vector.ZeroVector;
      e.SetMotorRotateSpeed(Vector_1.Vector.ZeroVector, 0);
    }
    this.ActorComp?.Actor.VehicleMovementComponent?.ResetMotorcycle();
  }
  OnEnter(e, t) {
    if (t &&= e.GetComponent(102)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, t.OnFixHookSkill);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, t.OnFixHookSkillEnd);
    }
  }
  OnLeave(e, t) {
    if (t &&= e.GetComponent(102)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, t.OnFixHookSkill);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, t.OnFixHookSkillEnd);
    }
  }
};
MotorcyclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(254)], MotorcyclePerformComponent);
exports.MotorcyclePerformComponent = MotorcyclePerformComponent; //# sourceMappingURL=MotorcyclePerformComponent.js.map