"use strict";

var __decorate = this && this.__decorate || function (o, e, t, n) {
  var i;
  var d = arguments.length;
  var r = d < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(o, e, t, n);
  } else {
    for (var s = o.length - 1; s >= 0; s--) {
      if (i = o[s]) {
        r = (d < 3 ? i(r) : d > 3 ? i(e, t, r) : i(e, t)) || r;
      }
    }
  }
  if (d > 3 && r) {
    Object.defineProperty(e, t, r);
  }
  return r;
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
    this.Cpf = undefined;
  }
  OnInit() {
    super.OnInit();
    this.Cpf = this.Owner.CheckGetComponent(32);
  }
  OnEnd() {
    super.OnEnd();
    this.Cpf = undefined;
  }
  LoadModelBySkinId(o, e, t) {
    this.Cpf.SetSkinId(o);
    this.UiModelDataComponent.ModelConfigId = o;
    this.LoadFinishCallBack = t;
    this.LoadModel(e, undefined, 1);
  }
};
UiMotorLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(33)], UiMotorLoadComponent);
exports.UiMotorLoadComponent = UiMotorLoadComponent; //# sourceMappingURL=UiMotorLoadComponent.js.map