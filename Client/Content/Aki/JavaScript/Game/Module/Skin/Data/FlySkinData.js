"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlySkinData = void 0;
const QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class FlySkinData {
  constructor(e) {
    this.ItemId = void 0, this.NN1 = void 0, this.Rjt = !0, this.ItemId = e, this.NN1 = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(this.ItemId)
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId)
  }
  GetItemId() {
    return this.ItemId
  }
  GetName() {
    return this.GetItemConfig().Name
  }
  GetDesc() {
    return this.GetItemConfig().BgDescription
  }
  GetQuality() {
    return this.GetItemConfig().QualityId
  }
  IsLocked() {
    return this.Rjt
  }
  UnlockSkin() {
    this.Rjt = !1
  }
  GetItemCount() {
    return this.IsLocked() ? 0 : 1
  }
  GetFlySkinConfig() {
    return this.NN1
  }
  GetUiMeshId() {
    return this.NN1.ModelId
  }
  GetTitleName() {
    return this.GetFlySkinConfig().Name
  }
  GetSubTitle() {
    return this.GetFlySkinConfig().TypeDescription
  }
  GetSkinGrade() {
    return this.GetFlySkinConfig().SkinGrade
  }
  GetPreviewTextureInPayShop() {
    return this.GetFlySkinConfig().PreviewTextureInPayShop
  }
  GetPreviewTextureInBuyView() {
    return this.GetFlySkinConfig().PreviewTextureInBuyView
  }
  GetPreviewTextureInPop() {
    return this.GetFlySkinConfig().PreviewTextureInPop
  }
  GetBuyPreviewQualityBgPath() {
    var e = this.GetQuality();
    return QualityInfoById_1.configQualityInfoById.GetConfig(e).RoleSkinQualityBg
  }
  GetObtainFrameColor1() {
    return this.GetFlySkinConfig().SkinObtainColor1
  }
  GetObtainFrameColor2() {
    return this.GetFlySkinConfig().SkinObtainColor2
  }
  GetTextureInSkinObtainView() {
    return this.GetFlySkinConfig().SkinObtainImage
  }
  GetHasNewFlag() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, this.GetItemId())
  }
}
exports.FlySkinData = FlySkinData;
//# sourceMappingURL=FlySkinData.js.map