"use strict";

var __decorate = this && this.__decorate || function (e, n, i, a) {
  var t;
  var o = arguments.length;
  var r = o < 3 ? n : a === null ? a = Object.getOwnPropertyDescriptor(n, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, n, i, a);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (t = e[s]) {
        r = (o < 3 ? t(r) : o > 3 ? t(n, i, r) : t(n, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(n, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiHuluSkinDataComponent = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const CalabashSkinDefine_1 = require("../../../Skin/Tab/Calabash/CalabashSkinDefine");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const HULU_BASE_ID = 20000000;
const HULU_PARTY_ID = 100000;
let UiHuluSkinDataComponent = class UiHuluSkinDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ModelIdInternal = 0;
    this.SkinIdInternal = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
  }
  RefreshCurrentSkinData(e) {
    if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e)) {
      this.SetSkinId(e, ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId());
    } else {
      this.SetSkinId(e, CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID);
    }
  }
  SetSkinId(e, n) {
    this.SkinIdInternal = n;
    if (this.SkinIdInternal !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      n = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinIdInternal);
      this.ModelIdInternal = n.ModelId;
    } else {
      n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.ModelIdInternal = n.PartyId * HULU_PARTY_ID + HULU_BASE_ID + 1;
    }
  }
  get ModelId() {
    return this.ModelIdInternal;
  }
  get TransformId() {
    if (this.SkinIdInternal !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinIdInternal).TransformId;
    } else {
      return this.ModelIdInternal;
    }
  }
  get EffectPath() {
    if (this.SkinIdInternal !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinIdInternal).SwitchEffect;
    } else {
      return EffectUtil_1.EffectUtil.GetEffectPath(CalabashSkinDefine_1.CALABASH_SWITCH_EFFECT_ID);
    }
  }
};
UiHuluSkinDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(31)], UiHuluSkinDataComponent);
exports.UiHuluSkinDataComponent = UiHuluSkinDataComponent; //# sourceMappingURL=UiHuluSkinDataComponent.js.map