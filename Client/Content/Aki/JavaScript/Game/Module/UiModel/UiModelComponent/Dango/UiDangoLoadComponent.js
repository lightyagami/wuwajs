"use strict";
var __decorate = this && this.__decorate || function(o, e, n, t) {
  var i, a = arguments.length,
    r = a < 3 ? e : null === t ? t = Object.getOwnPropertyDescriptor(e, n) : t;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(o, e, n, t);
  else
    for (var d = o.length - 1; 0 <= d; d--)(i = o[d]) && (r = (a < 3 ? i(r) : 3 < a ? i(e, n, r) : i(e, n)) || r);
  return 3 < a && r && Object.defineProperty(e, n, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiDangoLoadComponent = void 0;
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiDangoLoadComponent = class UiDangoLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments), this.Rpc = void 0
  }
  OnInit() {
    super.OnInit(), this.Rpc = this.Owner.CheckGetComponent(25)
  }
  OnEnd() {
    super.OnEnd(), this.Rpc = void 0
  }
  LoadModelByDangoId(o, e, n) {
    this.Rpc.DangoId = o;
    o = DangoManager_1.DangoManager.GetDangoData(o);
    this.UiModelDataComponent.ModelConfigId = o.ModelId, this.LoadFinishCallBack = n, this.LoadModel(e, void 0, 1)
  }
};
UiDangoLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(24)], UiDangoLoadComponent), exports.UiDangoLoadComponent = UiDangoLoadComponent;
//# sourceMappingURL=UiDangoLoadComponent.js.map