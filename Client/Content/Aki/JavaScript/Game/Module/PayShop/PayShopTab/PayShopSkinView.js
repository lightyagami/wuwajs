"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSkinView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const PayShopDefine_1 = require("../PayShopDefine");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class PayShopSkinView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabGroup = undefined;
    this.TabViewComponent = undefined;
    this.TabList = [];
    this.CurrentSelectTabId = 0;
    this._3i = 0;
    this.fqe = (i, e) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = i => {
      this.CurrentSelectTabId = this.TabList[i];
      var e = this.CurrentSelectTabId;
      var t = PayShopDefine_1.skinTabView[e];
      var i = this.TabGroup.GetTabItemByIndex(i);
      this.TabViewComponent.ToggleCallBack(e, t, i, this._3i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [3, UE.UIItem], [2, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.TabGroup = new TabComponent_1.TabComponent(this.GetHorizontalLayout(2).GetRootComponent(), this.fqe, this.pqe, this.GetItem(3));
    this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(false);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7));
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 27, "PayShop:TabView 界面Start", ["ViewName", this.GetViewName()]);
    }
  }
  OnBeforeShow() {
    this._3i = this.Params;
    this.GetText(5).SetUIActive(false);
    var i = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTableList(6);
    this.TabList = i;
    let e = 0;
    if (this.ExtraParams) {
      if ((e = this.ExtraParams) >= i.length) {
        e = 0;
      }
    } else {
      e = this.TabGroup.TryGetSelectedIndex(e);
    }
    this.CHe().finally(() => {
      this.TabGroup.SelectToggleByIndex(e, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
    });
  }
  OnHideUiTabViewBase(i) {
    if (i) {
      this.TabGroup.ResetSelectIndex();
    }
  }
  OnAfterShow() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 27, "PayShop:TabView 界面AfterShow", ["ViewName", this.GetViewName()]);
    }
  }
  OnBeforeHide() {
    this.TabViewComponent.SetCurrentTabViewState(false);
  }
  async CHe() {
    var i;
    var e;
    var t = this.TabList.length;
    await this.TabGroup.RefreshTabItemByLengthAsync(t);
    var t = this.TabGroup.GetTabItemMap();
    for ([i, e] of t) {
      e.UpdateView(this._3i, this.TabList[i]);
      e.BindRedDot("PayShopTab", this.TabList[i]);
    }
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy();
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
}
exports.PayShopSkinView = PayShopSkinView;
//# sourceMappingURL=PayShopSkinView.js.map