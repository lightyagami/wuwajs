"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeGridItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
class AdvanceNoticeGridItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.AdvertisingPageInfoId = e;
    this.bD = 0;
    this.aFi = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.AdvanceNoticeController?.OpenAdvanceNoticeView(this.AdvertisingPageInfoId, this.bD);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.aFi]];
  }
  RefreshByTabId(e) {
    this.bD = e;
    this.Refresh();
  }
  Refresh() {
    var e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabInfoById(this.bD);
    this.SetTextureByPath(e.EntryButtonImage, this.GetTexture(1));
    this.SetSpriteByPath(e.TabIcon, this.GetSprite(2), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.EntryButtonText);
  }
}
exports.AdvanceNoticeGridItem = AdvanceNoticeGridItem;
//# sourceMappingURL=AdvanceNoticeGridItem.js.map