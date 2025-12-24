"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var r;
  var s = arguments.length;
  var a = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, n, o);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a;
      }
    }
  }
  if (s > 3 && a) {
    Object.defineProperty(t, n, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnGamePlayComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let PawnGamePlayComponent = class PawnGamePlayComponent extends EntityComponent_1.EntityComponent {
  ScanResponse() {}
  WeightResponse() {}
  GrabResponse() {}
};
PawnGamePlayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(125)], PawnGamePlayComponent);
exports.PawnGamePlayComponent = PawnGamePlayComponent; //# sourceMappingURL=PawnGamePlayComponent.js.map