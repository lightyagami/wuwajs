"use strict";

var __decorate = this && this.__decorate || function (e, o, n, t) {
  var a;
  var i = arguments.length;
  var c = i < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(e, o, n, t);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (a = e[r]) {
        c = (i < 3 ? a(c) : i > 3 ? a(o, n, c) : a(o, n)) || c;
      }
    }
  }
  if (i > 3 && c) {
    Object.defineProperty(o, n, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEmptyUiComponent = undefined;
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchEmptyUiComponent = class FloroRanchEmptyUiComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  GetUiItem() {}
  async PlayShowAnim() {
    await Promise.resolve();
  }
  async CreateUiItem() {
    await Promise.resolve();
  }
  async PlayHideAnim() {}
  async PlayNormalAnim() {}
  async ShowUiItem() {}
  async HideUiItem() {}
};
FloroRanchEmptyUiComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(11)], FloroRanchEmptyUiComponent);
exports.FloroRanchEmptyUiComponent = FloroRanchEmptyUiComponent; //# sourceMappingURL=FloroRanchEmptyUiComponent.js.map