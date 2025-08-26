"use strict";

var __decorate = this && this.__decorate || function (e, o, n, t) {
  var a;
  var i = arguments.length;
  var r = i < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, o, n, t);
  } else {
    for (var m = e.length - 1; m >= 0; m--) {
      if (a = e[m]) {
        r = (i < 3 ? a(r) : i > 3 ? a(o, n, r) : a(o, n)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(o, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEmptyUiComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchEmptyUiComponent = class FloroRanchEmptyUiComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  GetUiItem() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanchEmptyUiComponent GetUiItem 实体不存在", ["entityId", this.OwnerEntity.EntityId]);
    }
  }
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