"use strict";
var __decorate = this && this.__decorate || function(t, e, r, o) {
  var i, n = arguments.length,
    s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, o);
  else
    for (var c = t.length - 1; 0 <= c; c--)(i = t[c]) && (s = (n < 3 ? i(s) : 3 < n ? i(e, r, s) : i(e, r)) || s);
  return 3 < n && s && Object.defineProperty(e, r, s), s
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterThrowComponent = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
let CharacterThrowComponent = class CharacterThrowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.mKr = void 0
  }
  get ProjectilePathTracer() {
    return this.mKr || (this.mKr = ActorSystem_1.ActorSystem.Get(UE.BP_KuroProjectilePathTracer_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble)), this.mKr
  }
  SetPredictProjectileInfo(t, e, r, o) {
    this.ProjectilePathTracer?.SetPredictProjectileInfo(t, e, r, o)
  }
  SetVisible(t) {
    this.ProjectilePathTracer?.SetVisible(t)
  }
};
CharacterThrowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(78)], CharacterThrowComponent), exports.CharacterThrowComponent = CharacterThrowComponent;
//# sourceMappingURL=CharacterThrowComponent.js.map