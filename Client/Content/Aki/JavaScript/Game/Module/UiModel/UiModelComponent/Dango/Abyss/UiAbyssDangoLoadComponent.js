"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var i;
  var s = arguments.length;
  var d = s < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    d = Reflect.decorate(e, o, t, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (i = e[r]) {
        d = (s < 3 ? i(d) : s > 3 ? i(o, t, d) : i(o, t)) || d;
      }
    }
  }
  if (s > 3 && d) {
    Object.defineProperty(o, t, d);
  }
  return d;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAbyssDangoLoadComponent = undefined;
const UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine");
const UiModelLoadComponent_1 = require("../../Common/UiModelLoadComponent");
let UiAbyssDangoLoadComponent = class UiAbyssDangoLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments);
    this.Rpc = undefined;
  }
  OnInit() {
    super.OnInit();
    this.Rpc = this.Owner.CheckGetComponent(25);
  }
  OnEnd() {
    super.OnEnd();
    this.Rpc = undefined;
  }
  LoadModelByDangoId(e, o, t, n) {
    this.Rpc.DangoId = e;
    this.UiModelDataComponent.ModelConfigId = o;
    this.LoadFinishCallBack = n;
    this.LoadModel(t, undefined, 1);
  }
};
UiAbyssDangoLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(28)], UiAbyssDangoLoadComponent);
exports.UiAbyssDangoLoadComponent = UiAbyssDangoLoadComponent; //# sourceMappingURL=UiAbyssDangoLoadComponent.js.map