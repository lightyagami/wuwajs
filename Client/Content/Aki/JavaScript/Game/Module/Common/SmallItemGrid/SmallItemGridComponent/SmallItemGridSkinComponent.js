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
    this.Aqe(e);
    this.mFe(e);
    this.mbl(e);
    this.dbl(e);
  }
  Aqe(e) {
    var e = this.QSl(e);
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      this.GetTexture(1).SetUIActive(false);
    } else {
      this.GetTexture(1).SetUIActive(true);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetTextureByPath(e, this.GetTexture(1));
    }
  }
  mFe(e) {
    e = this.s5l(e);
    this.SetSpriteByPath(e, this.GetSprite(0), false);
  }
  s5l(e) {
    let t = e.QualityId;
    if (!t) {
      e = e.SkinId;
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      if (e === undefined) {
        return "";
      }
      t = e.QualityId;
    }
    return ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t).SkinItemBg;
  }
  QSl(e) {
    var t;
    var e = e.SkinId;
    if (e) {
      if ((t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)) === 10) {
        return "T_IconFilterSkin3";
      } else if (t === 11) {
        if (ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e).GetSuitWeaponSkinId() > 0) {
          return "T_IconFilterSkin1";
        } else {
          return "T_IconFilterSkin2";
        }
      } else if (t === 14) {
        e = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e);
        return ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinBottomIconResourceId(e.SkinType);
      } else if (t === 17) {
        return "T_IconFilterSkin6";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  mbl(t) {
    var t = t.SkinId;
    if (t) {
      let e = false;
      if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 11 && ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t).GetSuitWeaponSkinId() > 0) {
        e = true;
      }
      this.GetItem(2).SetUIActive(e);
      if (e) {
        t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t).GetPayShopPreviewBuyRoleSuitWeaponTexturePath();
        this.SetTextureByPath(t, this.GetTexture(3));
      }
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  dbl(e) {
    var e = e.BottomText;
    var t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(4).SetUIActive(t);
    if (t) {
      this.GetText(5).SetText(e);
    }
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemGridSkinComponent = SmallItemGridSkinComponent;
//# sourceMappingURL=SmallItemGridSkinComponent.js.map