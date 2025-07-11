"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoSaveMarkItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhotoSaveMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DateText = undefined;
    this.LogoConfigName = "PhotoLogo";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
    if (this.DateText) {
      this.ComponentRegisterInfos.push([3, UE.UIText]);
    }
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(this.LogoConfigName);
    const a = this.GetTexture(0);
    a.SetUIActive(false);
    this.SetTextureByPath(e, this.GetTexture(0), undefined, () => {
      if (a) {
        a.SetUIActive(true);
        a.SetSizeFromTexture();
      }
    });
    this.GetText(1).SetText(ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ?? "");
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "FriendMyUid", ModelManager_1.ModelManager.FunctionModel.PlayerId);
    e = this.GetText(3);
    if (this.DateText && e) {
      e.SetText(this.DateText);
    }
  }
  OnAfterShow() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName, true);
    this.SetUiActive(e);
  }
}
exports.PhotoSaveMarkItem = PhotoSaveMarkItem;
//# sourceMappingURL=PhotoSaveMarkItem.js.map