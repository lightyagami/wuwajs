"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridSkinComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridSkinComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemBSkin";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnRefresh(e) {
    this.SetActive(true);
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.QSl(e));
    this.SetTextureByPath(r, this.GetTexture(1));
    var r = this.s5l(e);
    this.SetSpriteByPath(r, this.GetSprite(0), false);
    this.mbl(e);
    this.dbl(e);
  }
  s5l(e) {
    var e = e.SkinId;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (e === undefined) {
      return "";
    } else {
      e = e.QualityId;
      return ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e).SkinItemBg;
    }
  }
  QSl(e) {
    var e = e.SkinId;
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    if (r === 10) {
      return "T_IconFilterSkin3";
    } else if (r === 11) {
      if (ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetSuitWeaponSkinId() > 0) {
        return "T_IconFilterSkin1";
      } else {
        return "T_IconFilterSkin2";
      }
    } else if (r === 14) {
      e = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e);
      return ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinBottomIconResourceId(e.SkinType);
    } else if (r === 17) {
      return "T_IconFilterSkin6";
    } else {
      return "";
    }
  }
  mbl(e) {
    var e = e.SkinId;
    let r = false;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 11 && ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetSuitWeaponSkinId() > 0) {
      r = true;
    }
    this.GetItem(2).SetUIActive(r);
    if (r) {
      e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
      this.SetTextureByPath(e, this.GetTexture(3));
    }
  }
  dbl(e) {
    var e = e.BottomText;
    var r = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(4).SetUIActive(r);
    if (r) {
      this.GetText(5).SetText(e);
    }
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemGridSkinComponent = SmallItemGridSkinComponent;
//# sourceMappingURL=SmallItemGridSkinComponent.js.map