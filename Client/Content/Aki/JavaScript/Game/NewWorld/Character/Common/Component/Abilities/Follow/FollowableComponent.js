"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var l;
  var r = arguments.length;
  var i = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (l = e[s]) {
        i = (r < 3 ? l(i) : r > 3 ? l(t, o, i) : l(t, o)) || i;
      }
    }
  }
  if (r > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowableComponent = undefined;
const EntityComponent_1 = require("../../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
let FollowableComponent = class FollowableComponent extends EntityComponent_1.EntityComponent {};
FollowableComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(236)], FollowableComponent);
exports.FollowableComponent = FollowableComponent; //# sourceMappingURL=FollowableComponent.js.map