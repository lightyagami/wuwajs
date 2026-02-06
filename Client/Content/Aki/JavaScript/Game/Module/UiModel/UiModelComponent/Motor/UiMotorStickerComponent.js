"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(t, i, s) : n(t, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorStickerComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiMotorStickerComponent = class UiMotorStickerComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.uGg = new Map();
    this.cGg = undefined;
    this.dGg = undefined;
  }
  OnInit() {
    this.cGg = this.Owner.CheckGetComponent(2);
    this.dGg = this.Owner.CheckGetComponent(5);
  }
  RemoveStickerMaterial(e) {
    var t = this.uGg.get(e);
    if (t !== undefined && this.dGg) {
      this.dGg.RemoveRenderingMaterial(t);
      this.uGg.delete(e);
    }
  }
  AddStickerMaterial(e) {
    var t;
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
    if (i) {
      if (t = this.cGg.GetLoadedResource(i.MaterialDA)) {
        this.RemoveStickerMaterial(i.PartId);
        t = this.dGg.AddRenderingMaterialByData(t);
        this.uGg.set(i.PartId, t);
      } else {
        this.AddStickerMaterialAsync(e);
      }
    }
  }
  async AddStickerMaterialAsync(e) {
    const t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
    if (t) {
      await new LoadAsyncPromise_1.LoadAsyncPromise(t.MaterialDA, UE.PD_CharacterControllerData_C, 102).Promise.then(e => {
        if (e) {
          this.RemoveStickerMaterial(t.PartId);
          e = this.dGg.AddRenderingMaterialByData(e);
          this.uGg.set(t.PartId, e);
        }
      });
    }
  }
};
UiMotorStickerComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(36)], UiMotorStickerComponent);
exports.UiMotorStickerComponent = UiMotorStickerComponent; //# sourceMappingURL=UiMotorStickerComponent.js.map