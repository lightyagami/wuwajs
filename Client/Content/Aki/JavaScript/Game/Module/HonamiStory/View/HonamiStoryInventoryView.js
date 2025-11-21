"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryInventoryView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CalabashTabItem_1 = require("../../Calabash/New/CalabashTabItem");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
class HonamiStoryInventoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = undefined;
    this.lqe = undefined;
    this.Tvt = undefined;
    this.fqe = e => new CalabashTabItem_1.CalabashTabItem();
    this.pqe = e => {
      var a = this.yvt[e];
      var o = a.ChildViewName;
      var e = this.lqe.GetTabItemByIndex(e);
      this.Tvt.ToggleCallBack(a, o, e);
    };
    this.xli = () => {
      if (!this.g1c()) {
        this.CloseMe();
      }
    };
    this.yqe = e => {
      e = ModelManager_1.ModelManager.CalabashModel.GetViewTabList()[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.yvt = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("HonamiStoryBackpackView");
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    await Promise.all([this.zDn()]);
  }
  OnBeforeShow() {
    this.lqe?.SelectToggleByIndex(0, true);
  }
  async zDn() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.lqe = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.xli);
    await this.lqe.RefreshTabItemByLengthAsync(1);
  }
  g1c() {
    return false;
  }
}
exports.HonamiStoryInventoryView = HonamiStoryInventoryView;
//# sourceMappingURL=HonamiStoryInventoryView.js.map