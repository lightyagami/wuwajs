"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var i;
  var r = arguments.length;
  var a = r < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, o, t, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (r < 3 ? i(a) : r > 3 ? i(o, t, a) : i(o, t)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(o, t, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiTerrainComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchUiItemBaseComponent_1 = require("./FloroRanchUiItemBaseComponent");
let FloroRanchUiTerrainComponent = class FloroRanchUiTerrainComponent extends FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent {
  constructor() {
    super(...arguments);
    this.Apu = undefined;
  }
  async PlayShowAnim() {
    this.Apu = await this.CreateUiItem();
    if (this.Apu) {
      await this.Apu.PlayShowAnim();
      return this.Apu;
    }
  }
  async CreateUiItem() {
    var e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (e) {
      return e.BindTerrainItem(this.OwnerEntity);
    }
  }
  async PlayHideAnim() {
    if (this.Apu) {
      await this.Apu.PlayHideAnim();
      this.Apu.UnbindData();
      this.Apu = undefined;
    }
  }
  async PlayNormalAnim() {
    if (this.Apu) {
      await this.Apu.PlayNormalAnim();
    }
  }
  GetUiItem() {
    if (!this.Apu) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanchUiTerrainComponent GetUiItem 实体不存在", ["entityId", this.OwnerEntity.EntityId]);
      }
    }
    return this.Apu;
  }
};
FloroRanchUiTerrainComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(7)], FloroRanchUiTerrainComponent);
exports.FloroRanchUiTerrainComponent = FloroRanchUiTerrainComponent; //# sourceMappingURL=FloroRanchUiTerrainComponent.js.map