"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var r;
  var a = arguments.length;
  var c = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(e, t, n, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        c = (a < 3 ? r(c) : a > 3 ? r(t, n, c) : r(t, n)) || c;
      }
    }
  }
  if (a > 3 && c) {
    Object.defineProperty(t, n, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnInteractBaseComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnInteractBaseComponent = class PawnInteractBaseComponent extends EntityComponent_1.EntityComponent {
  InteractPawn(e = 0) {}
  CloseInteract(e = 0) {}
  ForceUpdate() {}
  IsPawnInteractive() {
    return false;
  }
  get OwenActor() {}
};
PawnInteractBaseComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(122)], PawnInteractBaseComponent);
exports.PawnInteractBaseComponent = PawnInteractBaseComponent; //# sourceMappingURL=PawnInteractBaseComponent.js.map