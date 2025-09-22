"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinData = undefined;
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
class CalabashSkinData {
  constructor(e) {
    this.SkinId = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.SkinId = e;
  }
  get IsEmptyData() {
    return this.SkinId === CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
  }
  get QualityId() {
    if (!this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.SkinId)?.QualityId;
    }
  }
  get SortIndex() {
    if (this.IsEmptyData) {
      return 0;
    } else {
      return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinId).SortIndex;
    }
  }
  GetIsLock() {
    return !this.IsEmptyData && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.SkinId) <= 0;
  }
  IsCurrentEquipSkinId() {
    var e = ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId();
    return this.SkinId === e;
  }
  get Name() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultCalabashSkinName();
    } else {
      return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinId).Name;
    }
  }
  get Description() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultCalabashSkinDescription();
    } else {
      return ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(this.SkinId).BgDescription;
    }
  }
  get IsNew() {
    return !this.IsEmptyData && ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot, this.SkinId);
  }
}
exports.CalabashSkinData = CalabashSkinData;
//# sourceMappingURL=CalabashSkinData.js.map