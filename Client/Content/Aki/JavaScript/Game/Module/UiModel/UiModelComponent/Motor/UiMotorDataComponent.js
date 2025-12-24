"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, i);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorDataComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiMotorDataComponent = class UiMotorDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.bVi = 0;
    this.fpf = 0;
    this.FYh = 0;
    this.gpf = 0;
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
  }
  GetSkinId() {
    return this.bVi;
  }
  GetStickerId() {
    return this.fpf;
  }
  GetFrameId() {
    return this.FYh;
  }
  GetDecorateId() {
    return this.gpf;
  }
  SetSkinId(e) {
    this.bVi = e;
    this.ywr.ModelConfigId = e;
  }
  SetStickerId(e) {
    this.fpf = e;
  }
  SetFrameId(e) {
    this.FYh = e;
  }
  SetDecorateId(e) {
    this.gpf = e;
  }
};
UiMotorDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(32)], UiMotorDataComponent);
exports.UiMotorDataComponent = UiMotorDataComponent; //# sourceMappingURL=UiMotorDataComponent.js.map