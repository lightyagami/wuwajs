"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureGroupEntityItem = undefined;
const TemplateConfigByBlueprintType_1 = require("../../../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FurnitureSceneItemBase_1 = require("./FurnitureSceneItemBase");
class FurnitureGroupEntityItem extends FurnitureSceneItemBase_1.FurnitureSceneItemBase {
  constructor(e) {
    super(e);
    this.Lag = [];
    this.SceneItemType = 2;
  }
  async LoadAsyncImplement(e) {
    var r = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(this.FurnitureConfigId);
    if (!r) {
      return false;
    }
    r = ModelManager_1.ModelManager.FurnitureModel.GetFurnitureEntityGroupData(r.EntityId);
    if (!r) {
      return false;
    }
    var t = [];
    for (const s of r) {
      var n = s.EntityData;
      var i = TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType.GetConfig(n.BlueprintType);
      var i = JSON.parse(i.ComponentsData);
      var i = (0, IComponent_1.getComponent)(i, "ModelComponent");
      if (!i) {
        return false;
      }
      if (i.ModelType.Type !== "LevelPrefab") {
        return false;
      }
      i = i.ModelType.PrefabPath;
      if (!i || StringUtils_1.StringUtils.IsBlank(i)) {
        return false;
      }
      var o = Transform_1.Transform.Create();
      ModelManager_1.ModelManager.FurnitureModel.CoverTransform(n.Transform).ComposeTransforms(e, o);
      var n = new FurnitureSceneItemBase_1.FurnitureLevelContext(o, i);
      this.Lag.push(n);
      t.push(this.LoadLevelInstanceAsync(n));
    }
    return (await Promise.all(t)).every(e => e);
  }
  ShowImplement() {
    for (const e of this.Lag) {
      this.ShowLevelInstance(e);
    }
  }
  HideImplement() {
    for (const e of this.Lag) {
      this.HideLevelInstance(e);
    }
  }
  UnloadImplement() {
    for (const e of this.Lag) {
      this.UnloadLevelInstance(e);
    }
    this.Lag.length = 0;
  }
}
exports.FurnitureGroupEntityItem = FurnitureGroupEntityItem;
//# sourceMappingURL=FurnitureGroupEntityItem.js.map