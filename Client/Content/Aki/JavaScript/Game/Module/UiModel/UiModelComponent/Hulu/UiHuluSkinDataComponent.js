"use strict";

var __decorate = this && this.__decorate || function (e, a, t, i) {
  var n;
  var r = arguments.length;
  var o = r < 3 ? a : i === null ? i = Object.getOwnPropertyDescriptor(a, t) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, a, t, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        o = (r < 3 ? n(o) : r > 3 ? n(a, t, o) : n(a, t)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(a, t, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiHuluSkinDataComponent = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterUtils_1 = require("../../../../NewWorld/Character/CharacterUtils");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const CalabashSkinDefine_1 = require("../../../Skin/Tab/Calabash/CalabashSkinDefine");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
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
  SetSkinId(e, a) {
    this.SkinIdInternal = a;
    if (this.SkinIdInternal !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      a = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinIdInternal);
      this.ModelIdInternal = a.ModelId;
    } else {
      a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.ModelIdInternal = CharacterUtils_1.CharacterUtils.GetHuluModelId(a.PartyId);
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