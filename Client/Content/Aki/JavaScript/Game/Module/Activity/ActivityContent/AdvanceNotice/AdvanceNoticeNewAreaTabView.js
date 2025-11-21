"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeNewAreaTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AdvanceNoticeTabViewBase_1 = require("./AdvanceNoticeTabViewBase");
class AdvanceNoticeNewAreaTabView extends AdvanceNoticeTabViewBase_1.AdvanceNoticeTabViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText]];
  }
  RefreshView() {
    var e = this.ViewModel.CurrentSubTabId;
    var e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabRegionById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SubTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Description);
    this.SetTextureWithPath(this.GetTexture(0), e.MainPic);
  }
}
exports.AdvanceNoticeNewAreaTabView = AdvanceNoticeNewAreaTabView;
//# sourceMappingURL=AdvanceNoticeNewAreaTabView.js.map