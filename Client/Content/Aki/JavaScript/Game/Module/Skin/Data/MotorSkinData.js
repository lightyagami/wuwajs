"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinData = undefined;
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class MotorSkinData {
  constructor(e) {
    this.ItemId = undefined;
    this.k7f = undefined;
    this.ItemId = e;
    this.k7f = ConfigManager_1.ConfigManager.SkinConfig.GetMotorSkinShowConfig(this.ItemId);
  }
  GetName() {
    return this.k7f?.Name ?? "";
  }
  GetItemId() {
    return this.ItemId;
  }
  GetQualityA() {
    return 1;
  }
  GetQualityB() {
    return 1;
  }
  GetMotorSkinShow() {
    return this.k7f;
  }
  GetPreviewTextureInPayShop() {
    return this.k7f?.Icon ?? "";
  }
  GetHasNewFlag() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, this.GetItemId());
  }
}
exports.MotorSkinData = MotorSkinData;
//# sourceMappingURL=MotorSkinData.js.map