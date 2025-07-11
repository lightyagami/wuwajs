"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var i;
  var a = arguments.length;
  var s = a < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, o, t, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (i = e[r]) {
        s = (a < 3 ? i(s) : a > 3 ? i(o, t, s) : i(o, t)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(o, t, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDangoDataComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoDataComponent = class UiDangoDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.wpc = 0;
  }
  set DangoId(e) {
    this.wpc = e;
  }
  get DangoId() {
    return this.wpc;
  }
};
UiDangoDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(25)], UiDangoDataComponent);
exports.UiDangoDataComponent = UiDangoDataComponent; //# sourceMappingURL=UiDangoDataComponent.js.map