"use strict";

var __decorate = this && this.__decorate || function (o, e, t, n) {
  var i;
  var s = arguments.length;
  var d = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    d = Reflect.decorate(o, e, t, n);
  } else {
    for (var r = o.length - 1; r >= 0; r--) {
      if (i = o[r]) {
        d = (s < 3 ? i(d) : s > 3 ? i(e, t, d) : i(e, t)) || d;
      }
    }
  }
  if (s > 3 && d) {
    Object.defineProperty(e, t, d);
  }
  return d;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorLoadComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiMotorLoadComponent = class UiMotorLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments);
    this.eSf = undefined;
  }
  OnInit() {
    super.OnInit();
    this.eSf = this.Owner.CheckGetComponent(32);
  }
  OnEnd() {
    super.OnEnd();
    this.eSf = undefined;
  }
  LoadModelBySkinId(o, e, t, n, i) {
    this.eSf.SetSkinId(o);
    this.UiModelDataComponent.ModelConfigId = o;
    this.LoadFinishCallBack = t;
    if (n && i) {
      this.eSf.SetRoleData(n, i);
    }
    this.LoadModel(e, undefined, 1);
  }
};
UiMotorLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(33)], UiMotorLoadComponent);
exports.UiMotorLoadComponent = UiMotorLoadComponent; //# sourceMappingURL=UiMotorLoadComponent.js.map