"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPackageShopView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const DiscountShopView_1 = require("./DiscountShopView");
const PayShopBigItem_1 = require("./TabItem/PayShopBigItem");
class PayPackageShopView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments);
    this.r3i = false;
    this.InitItem = () => {
      return new PayShopBigItem_1.PayShopBigItem();
    };
    this.USe = e => {
      this.TryRefreshTabs();
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    };
    this.n3i = () => {
      var e;
      if (this.r3i) {
        this.RefreshLoopScroll(this.CurrentSelectTabId);
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(138)).FunctionMap.set(1, () => {
          this.RefreshLoopScroll(this.CurrentSelectTabId);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
      this.r3i = false;
    };
  }
  AddEventListener() {
    super.AddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  RemoveEventListener() {
    super.RemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  GetScrollItem() {
    return this.GetItem(6);
  }
  RefreshLoopScroll(e) {
    if (!this.IsDestroyOrDestroying) {
      this.PayShopGoodsList = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(3, e);
      this.LoopScrollView.ReloadProxyData(this.GetProxyData, this.PayShopGoodsList.length, false);
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(this.PayShopGoodsList.length > 0);
      this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0);
      this.CheckIfNeedShowPlayStationStoreIcon();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayPackageShopView Reload");
      }
    }
  }
  UpdateTabs(t) {
    const r = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this.CurrentShopId);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 页签数据", ["ViewName", this.GetViewName()], ["Data", r]);
    }
    var e = r.length;
    this.CurTabNum = e;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      var e;
      var o;
      for ([e, o] of this.TabGroup.GetTabItemMap()) {
        o.UpdateView(this.CurrentShopId, r[e]);
        o.BindRedDot("PayShopTab", r[e]);
      }
      this.TabGroup.SelectToggleByIndex(t, true);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 选择页签", ["ViewName", this.GetViewName()]);
    }
  }
  async OnBeforeShowAsyncImplement() {
    var e = await Promise.all([ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync(), ControllerHolder_1.ControllerHolder.PayItemController.SendPayItemInfoRequestAsync()]);
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Shop", 10, "PayPackageShopView ifNeedQueryProductInfoForce");
      }
      await Promise.all([ControllerHolder_1.ControllerHolder.PayGiftController.QueryPayGiftInfoAsync(), ControllerHolder_1.ControllerHolder.PayItemController.QueryPayItemInfoAsync()]);
    }
    this.r3i = e.every(e => e);
    this.n3i();
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(true);
    this.TabGroup.SetActive(true);
  }
}
exports.PayPackageShopView = PayPackageShopView;
//# sourceMappingURL=PayPackageShopView.js.map