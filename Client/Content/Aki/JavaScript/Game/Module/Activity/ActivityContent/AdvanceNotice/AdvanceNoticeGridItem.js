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
  constructor(i) {
    super();
    this.AdvertisingPageInfoId = i;
    this.bD = 0;
    this.WOf = undefined;
    this.aFi = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.AdvanceNoticeController?.OpenAdvanceNoticeView(this.AdvertisingPageInfoId, this.bD);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.aFi]];
  }
  OnStart() {
    this.WOf = this.GetTexture(1).GetOwner().GetComponentByClass(UE.UITextureTransitionComponent.StaticClass());
  }
  RefreshByTabId(i) {
    this.bD = i;
    this.Refresh();
  }
  Refresh() {
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabInfoById(this.bD);
    this.SetTextureByPath(i.EntryButtonImage, this.GetTexture(1), undefined, () => {
      this.WOf.SetAllStateTexture(this.GetTexture(1).GetTexture());
    });
    this.SetSpriteByPath(i.TabIcon, this.GetSprite(2), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.EntryButtonText);
  }
}
exports.AdvanceNoticeGridItem = AdvanceNoticeGridItem;
//# sourceMappingURL=AdvanceNoticeGridItem.js.map