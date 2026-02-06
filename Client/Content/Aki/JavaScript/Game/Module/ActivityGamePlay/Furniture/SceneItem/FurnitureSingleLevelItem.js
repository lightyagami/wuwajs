"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSingleLevelItem = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const FurnitureSceneItemBase_1 = require("./FurnitureSceneItemBase");
class FurnitureSingleLevelItem extends FurnitureSceneItemBase_1.FurnitureSceneItemBase {
  constructor(e) {
    super(e);
    this.Ooa = undefined;
    this.SceneItemType = 0;
  }
  async LoadAsyncImplement(e) {
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(this.FurnitureConfigId)?.PrefabPath;
    return !!t && !StringUtils_1.StringUtils.IsBlank(t) && (this.Ooa = new FurnitureSceneItemBase_1.FurnitureLevelContext(e, t), this.LoadLevelInstanceAsync(this.Ooa));
  }
  ShowImplement() {
    if (this.Ooa) {
      this.ShowLevelInstance(this.Ooa);
    }
  }
  HideImplement() {
    if (this.Ooa) {
      this.HideLevelInstance(this.Ooa);
    }
  }
  UnloadImplement() {
    if (this.Ooa) {
      this.UnloadLevelInstance(this.Ooa);
      this.Ooa = undefined;
    }
  }
}
exports.FurnitureSingleLevelItem = FurnitureSingleLevelItem;
//# sourceMappingURL=FurnitureSingleLevelItem.js.map