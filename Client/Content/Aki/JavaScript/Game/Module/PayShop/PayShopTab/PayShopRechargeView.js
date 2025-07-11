"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRechargeView = undefined;
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const DiscountShopView_1 = require("./DiscountShopView");
const PayShopBigItem_1 = require("./TabItem/PayShopBigItem");
class PayShopRechargeView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments);
    this.r3i = false;
    this.InitItem = () => {
      return new PayShopBigItem_1.PayShopBigItem();
    };
    this.GetProxyData = e => this.PayShopGoodsList[e];
    this.USe = e => {};
    this.l3i = () => {
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
  GetScrollItem() {
    return this.GetItem(6);
  }
  AddEventListener() {
    super.AddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  RemoveEventListener() {
    super.RemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  RefreshLoopScroll(e) {
    var r = ModelManager_1.ModelManager.PayItemModel.GetDataList().sort((e, r) => e.ItemCount - r.ItemCount);
    var t = new Array();
    for (const o of r) {
      if (o.GetIfCanShow()) {
        t.push(o);
      }
    }
    this.PayShopGoodsList = t;
    this.G3a(t);
    this.LoopScrollView.ReloadProxyData(this.GetProxyData, this.PayShopGoodsList.length, false);
    this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(true);
  }
  G3a(e) {
    return !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo() || e.length > 0 || ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(1, () => {
      UiManager_1.UiManager.CloseView("PayShopRootView");
    }), e.IsEscViewTriggerCallBack = false, ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e), this.O3a(), false);
  }
  async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 0);
  }
  async OnBeforeShowAsyncImplement() {
    this.r3i = await ControllerHolder_1.ControllerHolder.PayItemController.SendPayItemInfoRequestAsync();
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce()) {
      await Promise.all([ControllerHolder_1.ControllerHolder.PayItemController.QueryPayItemInfoAsync()]);
    }
    this.l3i();
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(false);
    this.TabGroup.SetActive(false);
  }
  AfterShowUiTabViewFromToggle() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(0);
  }
  AfterHideTabViewBase(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
  }
  OnDiscountShopAfterShow() {
    this.GetText(5).SetUIActive(true);
  }
}
exports.PayShopRechargeView = PayShopRechargeView;
//# sourceMappingURL=PayShopRechargeView.js.map