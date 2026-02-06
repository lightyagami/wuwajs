"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSkinView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
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
    this.$Mg = [];
    this.XRg = false;
    this.x4e = true;
    this.fqe = (e, i) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = e => {
      this.CurrentSelectTabId = this.TabList[e];
      var i = this.CurrentSelectTabId;
      var t = PayShopDefine_1.skinTabView[i];
      var e = this.TabGroup.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(i, t, e, this._3i);
      var t = new LogReportDefine_1.OnClickPayShopTabLogEvent();
      t.i_shop_id = this._3i;
      t.i_tab_id = i;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
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
    this.WMg();
  }
  OnHideUiTabViewBase(e) {
    if (e) {
      this.TabGroup.ResetSelectIndex();
    }
    this.$Mg = [];
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
    var e;
    var i;
    var t = this.TabList.length;
    await this.TabGroup.RefreshTabItemByLengthAsync(t);
    var t = this.TabGroup.GetTabItemMap();
    for ([e, i] of t) {
      i.UpdateView(this._3i, this.TabList[e]);
      i.BindRedDot("PayShopTab", this.TabList[e]);
    }
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy();
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
  }
  RefreshView(e) {
    this.WMg();
  }
  OnTickUiTabViewBase(e) {
    if (this.XRg) {
      if (!this.$Mg || this.$Mg.length <= 0) {
        this.XRg = false;
      } else {
        var i = [];
        var t = [];
        for (const o of this.$Mg) {
          if (o.NeedUpdate() || o.NeedDown()) {
            (o.IsDirect() ? i : t).push(o.GetGoodsId());
          }
        }
        if (!(t.length <= 0) || !(i.length <= 0)) {
          this.XRg = false;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Shop", 27, "PayShop:Skin 请求刷新商品", ["goodsList", t]);
          }
          if (t.length > 0) {
            ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopItemUpdate(t);
          }
          if (i.length > 0) {
            ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequest(true);
          }
        }
      }
    }
  }
  QMg() {
    var e = [];
    for (const i of ModelManager_1.ModelManager.PayShopModel.GetPayShopGoodsByTabType(6, 3)) {
      if (i.IsShowInShop() && (i.InUpdateTime() || i.InUnPermanentSellTime() || i.WillSell())) {
        e.push(i);
      }
    }
    this.$Mg = e;
    this.XRg = this.$Mg.length > 0;
  }
  WMg() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTableList(6);
    this.QMg();
    this.TabList = e.filter(e => e !== 3 || ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(6, e).length > 0);
    let i = 0;
    if (this.ExtraParams && this.x4e) {
      var t = this.ExtraParams;
      for (let e = 0; e < this.TabList.length; e++) {
        if (this.TabList[e] === t) {
          i = e;
          break;
        }
      }
      this.x4e = false;
    } else {
      i = this.TabGroup.TryGetSelectedIndex(i);
    }
    this.CHe().finally(() => {
      this.TabGroup.SelectToggleByIndex(i, true);
      this.TabViewComponent.SetCurrentTabViewState(true);
    });
  }
}
exports.PayShopSkinView = PayShopSkinView;
//# sourceMappingURL=PayShopSkinView.js.map