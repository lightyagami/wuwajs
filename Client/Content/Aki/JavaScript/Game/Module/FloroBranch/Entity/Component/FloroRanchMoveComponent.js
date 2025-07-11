"use strict";

var __decorate = this && this.__decorate || function (o, e, n, t) {
  var r;
  var c = arguments.length;
  var a = c < 3 ? e : t === null ? t = Object.getOwnPropertyDescriptor(e, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(o, e, n, t);
  } else {
    for (var l = o.length - 1; l >= 0; l--) {
      if (r = o[l]) {
        a = (c < 3 ? r(a) : c > 3 ? r(e, n, a) : r(e, n)) || a;
      }
    }
  }
  if (c > 3 && a) {
    Object.defineProperty(e, n, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMoveComponent = undefined;
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityComponentBase_1 = require("./FloroRanchEntityComponentBase");
let FloroRanchMoveComponent = class FloroRanchMoveComponent extends FloroRanchEntityComponentBase_1.FloroRanchEntityComponentBase {};
FloroRanchMoveComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(5)], FloroRanchMoveComponent);
exports.FloroRanchMoveComponent = FloroRanchMoveComponent; //# sourceMappingURL=FloroRanchMoveComponent.js.map