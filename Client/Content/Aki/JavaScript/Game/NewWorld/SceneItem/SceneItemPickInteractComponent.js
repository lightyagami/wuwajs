"use strict";

var SceneItemPickInteractComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, o) {
  var c;
  var i = arguments.length;
  var r = i < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, n, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (c = t[s]) {
        r = (i < 3 ? c(r) : i > 3 ? c(e, n, r) : c(e, n)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(e, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemPickInteractComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
let SceneItemPickInteractComponent = SceneItemPickInteractComponent_1 = class SceneItemPickInteractComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.DGa = undefined;
    this.xGa = new Array();
    this.PGa = undefined;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemPickInteractComponent_1)[0];
    if (t) {
      this.PGa = t.PickInteractType.AvailablePosEffect;
    }
    return true;
  }
  OnStart() {
    this.DGa = this.Entity.GetComponent(139);
    return true;
  }
  get Index() {
    return this.DGa?.PutDownIndex;
  }
  get Item() {
    return this.DGa;
  }
  OnSelect() {
    if (this.DGa) {
      var t = this.DGa.PutDownBase?.OnItemTicTacToeSelect(this);
      if (t && this.PGa) {
        for (const n of t) {
          var e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.PGa, "PickInteractComponent.OnSelect", new EffectContext_1.EffectContext(this.Entity.Id));
          if (EffectSystem_1.EffectSystem.IsValid(e)) {
            EffectSystem_1.EffectSystem.GetEffectActor(e)?.D_K2_SetActorLocation(n.ToUeVector(), false, undefined, true);
            this.xGa.push(e);
          }
        }
      }
    }
  }
  OnSelectEnd() {
    for (const t of this.xGa) {
      EffectSystem_1.EffectSystem.StopEffectById(t, "PickInteractComponent.OnSelectEnd", false);
    }
    this.xGa.length = 0;
  }
};
SceneItemPickInteractComponent = SceneItemPickInteractComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(257)], SceneItemPickInteractComponent);
exports.SceneItemPickInteractComponent = SceneItemPickInteractComponent; //# sourceMappingURL=SceneItemPickInteractComponent.js.map