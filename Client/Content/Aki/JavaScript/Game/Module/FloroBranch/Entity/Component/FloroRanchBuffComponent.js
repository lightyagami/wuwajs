"use strict";

var __decorate = this && this.__decorate || function (o, e, n, t) {
  var r;
  var c = arguments.length;
  var f = c < 3 ? e : t === null ? t = Object.getOwnPropertyDescriptor(e, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(o, e, n, t);
  } else {
    for (var a = o.length - 1; a >= 0; a--) {
      if (r = o[a]) {
        f = (c < 3 ? r(f) : c > 3 ? r(e, n, f) : r(e, n)) || f;
      }
    }
  }
  if (c > 3 && f) {
    Object.defineProperty(e, n, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchBuffComponent = undefined;
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityComponentBase_1 = require("./FloroRanchEntityComponentBase");
let FloroRanchBuffComponent = class FloroRanchBuffComponent extends FloroRanchEntityComponentBase_1.FloroRanchEntityComponentBase {
  async ShowAddBuff(o) {}
};
FloroRanchBuffComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(13)], FloroRanchBuffComponent);
exports.FloroRanchBuffComponent = FloroRanchBuffComponent; //# sourceMappingURL=FloroRanchBuffComponent.js.map