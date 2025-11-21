"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var n;
  var r = arguments.length;
  var l = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, o, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        l = (r < 3 ? n(l) : r > 3 ? n(t, o, l) : n(t, o)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(t, o, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSkillComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const BaseSkillComponent_1 = require("../../Character/Common/Component/Skill/BaseSkillComponent");
let VehicleSkillComponent = class VehicleSkillComponent extends BaseSkillComponent_1.BaseSkillComponent {
  constructor() {
    super(...arguments);
    this.oRe = undefined;
    this.Gce = undefined;
  }
  OnInit() {
    return !!super.OnInit() && (this.oRe = this.Entity.GetComponent(239), this.Gce = this.Entity.GetComponent(240), true);
  }
  GetMainAnimInstance() {
    return this.oRe.MainAnimInstance;
  }
  DoSkillBeginMoveAction(e, t) {
    if (this.TagComp?.HasTag(1616400338)) {
      this.Gce?.SetForceSpeed(Vector_1.Vector.ZeroVector);
    }
  }
};
VehicleSkillComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(41)], VehicleSkillComponent);
exports.VehicleSkillComponent = VehicleSkillComponent; //# sourceMappingURL=VehicleSkillComponent.js.map