"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinData = undefined;
const QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WeaponSkinDefine_1 = require("../Tab/Weapon/WeaponSkinDefine");
class RoleSkinData {
  constructor(e) {
    this.ItemId = undefined;
    this.qIl = undefined;
    this.Rjt = true;
    this.ItemId = e;
    this.qIl = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.ItemId);
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId);
  }
  GetItemId() {
    return this.ItemId;
  }
  GetName() {
    return this.GetItemConfig().Name;
  }
  GetTitleName() {
    return this.GetRoleSkinConfig().TitleName;
  }
  GetSubTitle() {
    return this.GetRoleSkinConfig().SubDecName;
  }
  GetDesc() {
    return this.GetItemConfig().BgDescription;
  }
  GetFunctionDesc() {
    return this.GetRoleSkinConfig().FunctionDesc;
  }
  GetQuality() {
    return this.GetItemConfig().QualityId;
  }
  IsLocked() {
    return this.Rjt;
  }
  UnlockSkin() {
    this.Rjt = false;
  }
  IsWear() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.GetRoleId());
    return e !== undefined && e.GetRoleSkinId() === this.ItemId;
  }
  IsOriginalSkin() {
    var e = this.qIl.RoleId;
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).SkinId === this.ItemId;
  }
  GetItemCount() {
    if (this.IsLocked()) {
      return 0;
    } else {
      return 1;
    }
  }
  GetRoleSkinConfig() {
    return this.qIl;
  }
  GetRoleId() {
    return this.GetRoleSkinConfig().RoleId;
  }
  GetUiMeshId() {
    return this.qIl.UiMeshId;
  }
  GetIfHaveRole() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.GetRoleId()) !== undefined;
  }
  IsWearWeaponSkin() {
    var e;
    return !this.IsLocked() && !!this.IsWear() && !((e = this.qIl.SuitWeaponSkinId) <= 0) && ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.GetRoleId()) === e;
  }
  GetBuyPreviewRoleCardPath() {
    return this.GetRoleSkinConfig().PreviewRoleCard;
  }
  GetBuyPreviewRoleQualityBgPath() {
    var e = this.GetQuality();
    return QualityInfoById_1.configQualityInfoById.GetConfig(e).RoleSkinQualityBg;
  }
  GetShopBuyPreviewCardPath() {
    return this.GetRoleSkinConfig().BuyShopPreviewRoleCard;
  }
  GetSuitWeaponPreviewTexturePath() {
    return this.GetSuitWeaponSkinConfig()?.CardIconPath ?? "";
  }
  GetSuitWeaponQualityBgPath() {
    var e = this.GetSuitWeaponSkinConfig()?.QualityId ?? 0;
    return QualityInfoById_1.configQualityInfoById.GetConfig(e).WeaponSkinQualityBg;
  }
  GetSuitWeaponSkinConfig() {
    var e = this.GetSuitWeaponSkinId();
    if (!(e <= 0)) {
      return ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(this.GetSuitWeaponSkinId());
    }
  }
  GetSuitWeaponMeshData() {
    return this.GetSuitWeaponSkinConfig()?.Models ?? [];
  }
  GetRoleMeshId() {
    return this.GetRoleSkinConfig().MeshId;
  }
  GetRoleUiMeshId() {
    return this.GetRoleSkinConfig().UiMeshId;
  }
  GetRoleBody() {
    return this.GetRoleSkinConfig().RoleBody;
  }
  GetSuitWeaponSkinId() {
    var e = this.GetRoleSkinConfig().SuitWeaponSkinId;
    if (e <= 0) {
      return WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
    } else {
      return e;
    }
  }
  GetRoleStandPath() {
    return this.GetRoleSkinConfig().RoleStand;
  }
  GetSpineSkeletonData() {
    return this.GetRoleSkinConfig().SpineSkeletonData;
  }
  GetSmallSpineAtlas() {
    return this.GetRoleSkinConfig().SmallSpineAtlas;
  }
  GetPayShopPreviewRoleTexturePath() {
    return this.GetRoleSkinConfig().PayShopPreviewRoleTexturePath;
  }
  GetPayShopPreviewRoleTextureBgPath() {
    return this.GetRoleSkinConfig().PayShopPreviewRoleTextureBgPath;
  }
  GetPayShopPreviewWeaponTexturePath() {
    return this.GetRoleSkinConfig().PayShopPreviewWeaponTexturePath;
  }
  GetObtainFrameColor1() {
    return this.GetRoleSkinConfig().RoleObtainColor1;
  }
  GetObtainFrameColor2() {
    return this.GetRoleSkinConfig().RoleObtainColor2;
  }
  GetPayShopPreviewBuyRoleTexturePath() {
    return this.GetRoleSkinConfig().PayShopPreviewBuyRoleTexturePath;
  }
  GetPayShopPreviewBuyRoleSuitWeaponTexturePath() {
    return this.GetRoleSkinConfig().PayShopPreviewBuyRoleSuitWeaponTexturePath;
  }
  GetShareTexturePath() {
    return this.GetRoleSkinConfig().ShareTexturePath;
  }
  GetHasNewFlag() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, this.GetItemId());
  }
}
exports.RoleSkinData = RoleSkinData;
//# sourceMappingURL=RoleSkinData.js.map