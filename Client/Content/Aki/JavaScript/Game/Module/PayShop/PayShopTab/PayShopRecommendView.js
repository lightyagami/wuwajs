"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRecommendView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const PayShopDefine_1 = require("../PayShopDefine");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class RecommendData {
  constructor() {
    this.TabViewName = undefined;
    this.Param = undefined;
    this.TabName = "";
    this.Id = 0;
    this.Sort = 0;
  }
}
class PayShopRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabGroup = undefined;
    this.TabViewComponent = undefined;
    this.CurrentSelectTabId = 0;
    this.$Sl = [];
    this.fqe = (e, t) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = e => {
      var t = this.$Sl[e];
      var i = t.TabViewName;
      var o = this.TabGroup.GetTabItemByIndex(e);
      var t = t.Id;
      this.TabViewComponent.ToggleCallBack(e, i, o, t, e);
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
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(7), 1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面Start", ["ViewName", this.GetViewName()]);
    }
  }
  OnShowUiTabViewFromToggle() {
    this.GetText(5).SetUIActive(false);
    this.XSl();
    let e = 0;
    if (this.ExtraParams && (e = this.ExtraParams) >= this.$Sl.length) {
      e = 0;
    }
    this.TabGroup.ResetLastSelectTab();
    this.CHe().finally(() => {
      this.TabGroup.SelectToggleByIndex(e, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
    });
  }
  XSl() {
    this.$Sl = [];
    for (const t of ModelManager_1.ModelManager.PayShopModel.GetNeedShowRecommendData()) {
      var e = new RecommendData();
      if (t.RecommendType === 1) {
        e.TabViewName = PayShopDefine_1.recommendTabView[2];
      } else if (t.RecommendType === 2) {
        e.TabViewName = PayShopDefine_1.recommendTabView[3];
      }
      e.TabName = t.TabName;
      e.Param = t.RecommendId;
      e.Id = t.Id;
      e.Sort = t.Sort;
      this.$Sl.push(e);
    }
    this.$Sl.sort((e, t) => e.Sort - t.Sort);
  }
  OnAfterShow() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面AfterShow", ["ViewName", this.GetViewName()]);
    }
  }
  async CHe() {
    var e;
    var t;
    var i = this.$Sl.length;
    await this.TabGroup.RefreshTabItemByLengthAsync(i);
    var i = this.TabGroup.GetTabItemMap();
    for ([e, t] of i) {
      t.BindRedDot("PayShopTab", this.$Sl[e].Id);
      t.UpdateTitle(this.$Sl[e].TabName);
      t.GetRootItem().SetUIActive(false);
      t.GetRootItem().SetUIActive(true);
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
exports.PayShopRecommendView = PayShopRecommendView;
//# sourceMappingURL=PayShopRecommendView.js.map