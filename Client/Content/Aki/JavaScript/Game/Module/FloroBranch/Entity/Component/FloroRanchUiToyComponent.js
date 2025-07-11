"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var i;
  var a = arguments.length;
  var r = a < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, o, t, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        r = (a < 3 ? i(r) : a > 3 ? i(o, t, r) : i(o, t)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(o, t, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiToyComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiToyComponent = class FloroRanchUiToyComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.x0u = undefined;
  }
  async PlayShowAnim() {
    this.x0u = await this.CreateUiItem();
    if (this.x0u) {
      await this.x0u.PlayShowAnim();
      return this.x0u;
    }
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindToyItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.x0u) {
      await this.x0u.PlayHideAnim();
      this.x0u.UnbindData();
      this.x0u = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.x0u) {
      await this.x0u.PlayNormalAnim();
    }
  }
  GetUiItem() {
    return this.x0u;
  }
};
FloroRanchUiToyComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(8)], FloroRanchUiToyComponent);
exports.FloroRanchUiToyComponent = FloroRanchUiToyComponent; //# sourceMappingURL=FloroRanchUiToyComponent.js.map