"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelSystem = undefined;
const UiModelDefine_1 = require("../Define/UiModelDefine");
const UiModelBase_1 = require("./UiModelBase");
class UiModelSystem {
  static CreateUiModelByUseWay(e, i) {
    var t = (0, UiModelDefine_1.getUiModelCreateDataPreDefine)()[e];
    return this.CreateUiModelByCreateData(t, i, e);
  }
  static CreateUiModelByCreateData(e, i, t) {
    var s = new UiModelBase_1.UiModelBase(this.vLm++, t);
    for (const o of e.Components) {
      s.AddComponent(o);
    }
    t = s.CheckGetComponent(0);
    if (t) {
      t.ModelType = e.ModelType;
      t.ModelActorType = e.ModelActorType;
      t.ModelUseWay = e.ModelUseWay;
    }
    t = s.CheckGetComponent(1);
    if (t) {
      t.Actor = i;
    }
    return s;
  }
}
(exports.UiModelSystem = UiModelSystem).vLm = 0;
//# sourceMappingURL=UiModelSystem.js.map