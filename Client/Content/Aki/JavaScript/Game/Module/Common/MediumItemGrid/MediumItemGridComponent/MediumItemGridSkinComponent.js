"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridSkinComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSkinComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemASkin";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnRefresh(e) {
    this.SetActive(true);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.QSl(e));
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  QSl(e) {
    var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    if (n === 10) {
      return "T_IconFilterSkin3";
    } else if (n === 11) {
      if (ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetSuitWeaponSkinId() > 0) {
        return "T_IconFilterSkin1";
      } else {
        return "T_IconFilterSkin2";
      }
    } else if (n === 14) {
      n = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e);
      return ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinBottomIconResourceId(n.SkinType);
    } else {
      return "";
    }
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridSkinComponent = MediumItemGridSkinComponent;
//# sourceMappingURL=MediumItemGridSkinComponent.js.map