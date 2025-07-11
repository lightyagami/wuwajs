"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareRewardInfo = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ShareRewardInfo extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  SetItemInfo(e, a) {
    this.GetText(1).SetText(a.toString());
    this.GetTexture(2).SetUIActive(false);
    a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).Icon;
    this.SetTextureByPath(a, this.GetTexture(2), undefined, () => {
      this.GetTexture(2).SetUIActive(true);
    });
  }
}
exports.ShareRewardInfo = ShareRewardInfo;
//# sourceMappingURL=ShareRewardInfo.js.map