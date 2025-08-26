"use strict";

var __decorate = this && this.__decorate || function (t, e, r, n) {
  var o;
  var i = arguments.length;
  var s = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, r) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, n);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (o = t[c]) {
        s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(e, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractItemComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const POSITION_TAG = new UE.FName("Position");
let InteractItemComponent = class InteractItemComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cC = undefined;
    this.Yrn = undefined;
    this.IsInit = false;
  }
  OnStart() {
    var t;
    var e = WorldFunctionLibrary_1.default.GetDynamicEntity(this.Entity.Id);
    if (e) {
      if ((t = e.GetComponentsByTag(UE.ChildActorComponent.StaticClass(), POSITION_TAG)) && t.Num() > 0) {
        this.cC = t.Get(0);
      }
      this.Yrn = e.GetComponentByClass(UE.ArrowComponent.StaticClass());
      this.IsInit = true;
    }
    return true;
  }
  GetInteractPosition() {
    if (this.cC) {
      return this.cC.D_K2_GetComponentLocation();
    }
  }
  GetInteractRotator() {
    if (this.Yrn) {
      return this.Yrn.K2_GetComponentRotation();
    }
  }
};
InteractItemComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(104)], InteractItemComponent);
exports.InteractItemComponent = InteractItemComponent; //# sourceMappingURL=InteractItemComponent.js.map