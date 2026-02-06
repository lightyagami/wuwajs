"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureSingleEntityItem = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureSceneItemBase_1 = require("./FurnitureSceneItemBase");
class FurnitureSingleEntityItem extends FurnitureSceneItemBase_1.FurnitureSceneItemBase {
  constructor(e) {
    super(e);
    this.Ooa = undefined;
    this.SceneItemType = 1;
  }
  async LoadAsyncImplement(e) {
    var t = ModelManager_1.ModelManager.FurnitureModel.GetFurnitureSingleEntityPrefabPath(this.FurnitureConfigId);
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
exports.FurnitureSingleEntityItem = FurnitureSingleEntityItem;
//# sourceMappingURL=FurnitureSingleEntityItem.js.map