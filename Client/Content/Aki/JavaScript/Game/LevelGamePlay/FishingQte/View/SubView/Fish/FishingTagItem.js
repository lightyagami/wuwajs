"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTagItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class FishingTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  Refresh(e) {
    if (e === 0) {
      this.SetActive(false);
    } else {
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigById(e);
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(e.UnlockTech);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
      e = UE.Color.FromHex(e.Color);
      this.GetSprite(1).SetColor(e);
      this.SetActive(true);
    }
  }
}
exports.FishingTagItem = FishingTagItem;
//# sourceMappingURL=FishingTagItem.js.map