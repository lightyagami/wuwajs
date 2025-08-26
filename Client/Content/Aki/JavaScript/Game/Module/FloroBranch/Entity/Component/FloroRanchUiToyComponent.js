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
const Log_1 = require("../../../../../Core/Common/Log");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiToyComponent = class FloroRanchUiToyComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.Ppu = undefined;
  }
  async PlayShowAnim() {
    this.Ppu = await this.CreateUiItem();
    if (this.Ppu) {
      await this.Ppu.PlayShowAnim();
      return this.Ppu;
    }
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindToyItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.Ppu) {
      await this.Ppu.PlayHideAnim();
      this.Ppu.UnbindData();
      this.Ppu = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.Ppu) {
      await this.Ppu.PlayNormalAnim();
    }
  }
  GetUiItem() {
    if (!this.Ppu) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanchUiToyComponent GetUiItem 实体不存在", ["entityId", this.OwnerEntity.EntityId]);
      }
    }
    return this.Ppu;
  }
};
FloroRanchUiToyComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(8)], FloroRanchUiToyComponent);
exports.FloroRanchUiToyComponent = FloroRanchUiToyComponent; //# sourceMappingURL=FloroRanchUiToyComponent.js.map