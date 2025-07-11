"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var i;
  var r = arguments.length;
  var a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiTerrainComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiTerrainComponent = class FloroRanchUiTerrainComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.P0u = undefined;
  }
  async PlayShowAnim() {
    this.P0u = await this.CreateUiItem();
    if (this.P0u) {
      await this.P0u.PlayShowAnim();
      return this.P0u;
    }
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindTerrainItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.P0u) {
      await this.P0u.PlayHideAnim();
      this.P0u.UnbindData();
      this.P0u = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.P0u) {
      await this.P0u.PlayNormalAnim();
    }
  }
  GetUiItem() {
    return this.P0u;
  }
};
FloroRanchUiTerrainComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(7)], FloroRanchUiTerrainComponent);
exports.FloroRanchUiTerrainComponent = FloroRanchUiTerrainComponent; //# sourceMappingURL=FloroRanchUiTerrainComponent.js.map