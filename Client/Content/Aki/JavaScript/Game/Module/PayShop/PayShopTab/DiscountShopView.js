"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountShopView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PayShopGoods_1 = require("../PayShopData/PayShopGoods");
const PayShopItem_1 = require("./TabItem/PayShopItem");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
const TIMEGAP = 1000;
class DiscountShopView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.TabGroup = undefined;
    this.PayShopGoodsList = [];
    this.CurrentSelectTabId = 0;
    this.LoopScrollView = undefined;
    this.CurrentShopId = 0;
    this.CurTabNum = 0;
    this.TDe = undefined;
    this.Uhh = false;
    this.t3i = (e, t, i) => {
      if (this.CurrentShopId === t && this.CurrentSelectTabId === i) {
        this.TryRefreshTabs();
        this.LoopScrollView.RefreshAllGridProxies();
      }
    };
    this.i3i = e => {
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    };
    this.InitItem = () => {
      return new PayShopItem_1.PayShopItem();
    };
    this.fqe = (e, t) => {
      return new PayShopSwitchItem_1.PayShopSwitchItem();
    };
    this.pqe = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:TabView 点击刷新商品", ["ViewName", this.GetViewName()]);
      }
      var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this.CurrentShopId);
      this.CurrentSelectTabId = t[e];
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    };
    this.CheckIfNeedShowPlayStationStoreIcon = () => {
      if (this.Uhh) {
        let e = false;
        for (const t of this.PayShopGoodsList) {
          if (e = !(t instanceof PayShopGoods_1.PayShopGoods) || t.IsDirect()) {
            break;
          }
        }
        if (e) {
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(0);
        } else {
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
        }
      }
    };
    this.GetProxyData = e => this.PayShopGoodsList[e];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [3, UE.UIItem], [2, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkPayEnd, this.CheckIfNeedShowPlayStationStoreIcon);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkPayEnd, this.CheckIfNeedShowPlayStationStoreIcon);
  }
  OnStart() {
    this.TabGroup = new TabComponent_1.TabComponent(this.GetHorizontalLayout(2).GetRootComponent(), this.fqe, this.pqe, this.GetItem(3));
    var e = this.GetScrollItem();
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), e.GetOwner(), this.InitItem);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面Start", ["ViewName", this.GetViewName()]);
    }
  }
  GetScrollItem() {
    return this.GetItem(0);
  }
  RefreshLoopScroll(e) {
    this.PayShopGoodsList = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this.CurrentShopId, e);
    this.LoopScrollView.ReloadProxyData(this.GetProxyData, this.PayShopGoodsList.length, false);
    this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(this.PayShopGoodsList.length > 0);
    this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0);
    this.CheckIfNeedShowPlayStationStoreIcon();
  }
  OnAfterShow() {
    this.CurrentShopId = this.Params;
    let e = 0;
    if (this.ExtraParams) {
      const i = this.ExtraParams;
      var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this.CurrentShopId);
      e = t.findIndex(e => e === i);
      e = MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1);
    }
    this.GetText(5).SetUIActive(false);
    this.UpdateTabs(e);
    this.kot();
    this.OnDiscountShopAfterShow();
    this.Shh();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面AfterShow", ["ViewName", this.GetViewName()]);
    }
  }
  OnDiscountShopAfterShow() {}
  kot() {
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.o3i();
    }, TIMEGAP);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  o3i() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DiscountShopTimerRefresh);
  }
  TryRefreshTabs() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this.CurrentShopId);
    if (this.CurTabNum !== e.length) {
      e = e.findIndex(e => e === this.CurTabNum);
      this.UpdateTabs(e === -1 ? 0 : e);
    }
  }
  UpdateTabs(i) {
    const s = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(this.CurrentShopId);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 页签数据", ["ViewName", this.GetViewName()], ["Data", s]);
    }
    var e = s.length;
    this.CurTabNum = e;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      var e;
      var t;
      for ([e, t] of this.TabGroup.GetTabItemMap()) {
        t.UpdateView(this.CurrentShopId, s[e]);
        t.BindRedDot("PayShopTab", s[e]);
      }
      this.TabGroup.SelectToggleByIndex(i, true);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 选择页签", ["ViewName", this.GetViewName()]);
    }
  }
  RefreshView(e) {
    if (typeof e != "number") {
      this.TryRefreshTabs();
      this.RefreshLoopScroll(this.CurrentSelectTabId);
    }
  }
  OnShowUiTabViewFromToggle() {
    this.Uhh = true;
    this.AfterShowUiTabViewFromToggle();
  }
  AfterShowUiTabViewFromToggle() {}
  AfterHideTabViewBase(e) {}
  OnHideUiTabViewBase(e) {
    this.xHe();
    this.Uhh = false;
    this.AfterHideTabViewBase(e);
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy();
    this.LoopScrollView.ClearGridProxies();
  }
  async Shh() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce();
    if (!e) {
      var t = new Array();
      for (const i of this.PayShopGoodsList) {
        if (i instanceof PayShopGoods_1.PayShopGoods) {
          if (i.IsDirect() && i.GetGoodsData().GetProductId() !== "") {
            t.push(i.GetGoodsData().GetProductId());
          }
        } else {
          t.push(i.ProductId);
        }
      }
      await ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(t);
      this.LoopScrollView.RefreshAllGridProxies();
    }
  }
}
exports.DiscountShopView = DiscountShopView;
//# sourceMappingURL=DiscountShopView.js.map