"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinGridData = undefined;
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class FlySkinGridData {
  constructor(e, t, i, r = undefined) {
    this.SkinId = e;
    this.RoleDataId = t;
    this.SkinType = i;
    this.SkinConfig = r;
  }
  get IsEmptyData() {
    return this.SkinId === 0;
  }
  GetIsLock() {
    return !this.IsEmptyData && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.SkinId) <= 0;
  }
  IsCurrentEquipSkinId() {
    return ModelManager_1.ModelManager.FlySkinModel.GetRoleEquipFlySkinId(this.RoleDataId, this.SkinType) === this.SkinId;
  }
  GetName() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinName(this.SkinType);
    } else {
      return this.SkinConfig.Name;
    }
  }
  GetTypeDescription() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinTypeDescription(this.SkinType);
    } else {
      return this.SkinConfig.TypeDescription;
    }
  }
  GetDescription() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinDescription(this.SkinType);
    } else {
      return this.SkinConfig.BgDescription;
    }
  }
  GetModelId() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(this.SkinType);
    } else {
      return this.SkinConfig.ModelId;
    }
  }
  GetStandAnimPath() {
    if (this.IsEmptyData) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinStandAnimPath(this.SkinType);
    } else {
      return this.SkinConfig.StandAnim;
    }
  }
  GetIsNew() {
    return !this.IsEmptyData && ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, this.SkinId);
  }
}
exports.FlySkinGridData = FlySkinGridData;
//# sourceMappingURL=FlySkinGridData.js.map