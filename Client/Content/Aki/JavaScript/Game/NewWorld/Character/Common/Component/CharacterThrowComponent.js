"use strict";

var __decorate = this && this.__decorate || function (t, e, r, o) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, o);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (i = t[c]) {
        s = (n < 3 ? i(s) : n > 3 ? i(e, r, s) : i(e, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterThrowComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
let CharacterThrowComponent = class CharacterThrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.mKr = undefined;
  }
  get ProjectilePathTracer() {
    this.mKr ||= ActorSystem_1.ActorSystem.Get(UE.BP_KuroProjectilePathTracer_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    return this.mKr;
  }
  SetPredictProjectileInfo(t, e, r, o) {
    this.ProjectilePathTracer?.SetPredictProjectileInfo(t, e, r, o);
  }
  SetVisible(t) {
    this.ProjectilePathTracer?.SetVisible(t);
  }
};
CharacterThrowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(81)], CharacterThrowComponent);
exports.CharacterThrowComponent = CharacterThrowComponent; //# sourceMappingURL=CharacterThrowComponent.js.map