"use strict";

var __decorate = this && this.__decorate || function (o, e, n, t) {
  var i;
  var a = arguments.length;
  var r = a < 3 ? e : t === null ? t = Object.getOwnPropertyDescriptor(e, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(o, e, n, t);
  } else {
    for (var d = o.length - 1; d >= 0; d--) {
      if (i = o[d]) {
        r = (a < 3 ? i(r) : a > 3 ? i(e, n, r) : i(e, n)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDangoLoadComponent = undefined;
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiDangoLoadComponent = class UiDangoLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
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
  LoadModelByDangoId(o, e, n) {
    this.Rpc.DangoId = o;
    o = DangoManager_1.DangoManager.GetDangoData(o);
    this.UiModelDataComponent.ModelConfigId = o.ModelId;
    this.LoadFinishCallBack = n;
    this.LoadModel(e, undefined, 1);
  }
};
UiDangoLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(24)], UiDangoLoadComponent);
exports.UiDangoLoadComponent = UiDangoLoadComponent; //# sourceMappingURL=UiDangoLoadComponent.js.map