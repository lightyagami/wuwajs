"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var l = arguments.length;
  var i = l < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        i = (l < 3 ? r(i) : l > 3 ? r(t, o, i) : r(t, o)) || i;
      }
    }
  }
  if (l > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowerComponent = undefined;
const EntityComponent_1 = require("../../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
let FollowerComponent = class FollowerComponent extends EntityComponent_1.EntityComponent {};
FollowerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(233)], FollowerComponent);
exports.FollowerComponent = FollowerComponent; //# sourceMappingURL=FollowerComponent.js.map