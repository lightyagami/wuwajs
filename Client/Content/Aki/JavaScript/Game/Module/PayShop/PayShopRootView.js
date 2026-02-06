"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopRootView = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const TotalTopUpPageActivityEnterPanel_1 = require("../Activity/ActivityContent/TotalTopUp/View/TotalTopUpPageActivityEnterPanel");
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const PayShopTabItem_1 = require("../Common/TabComponent/TabItem/PayShopTabItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const PayShopGoods_1 = require("./PayShopData/PayShopGoods");
const PayShopViewData_1 = require("./PayShopData/PayShopViewData");
const PayShopDefine_1 = require("./PayShopDefine");
const PayShopAccumulateItem_1 = require("./PayShopTab/TabItem/PayShopAccumulateItem");
class PayShopRootView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.PayShopId = 1;
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.TabShopList = [];
    this.CountDownTextActive = false;
    this.CountDownText = undefined;
    this.UpdateInterval = 0;
    this.GoodsList = [];
    this.AllowTick = false;
    this.kFi = false;
    this.PayShopViewData = undefined;
    this.uah = undefined;
    this.Ox1 = undefined;
    this.Uxg = undefined;
    this.FFi = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:Root 打开客服反馈");
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(3);
    };
    this.mVa = () => {
      var e = ConfigManager_1.ConfigManager.CommonConfig.GetKoShopRuleUrl();
      if (e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Shop", 10, "PayShop:Root 打开商城规则", ["url", e]);
        }
        ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Shop", 10, "PayShop:Root 打开商城规则失败，没有配置链接", ["url", e]);
      }
    };
    this.W7t = () => {
      this.CloseMe();
    };
    this.fqe = (e, t) => {
      return new PayShopTabItem_1.PayShopTabItem();
    };
    this.pqe = e => {
      var e = this.TabShopList[e];
      var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopInfoDynamicTabId(e);
      var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(t).ChildViewName;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:Root 点击切换界面", ["ViewName", t]);
      }
      this.VFi(e);
      this.uah = e;
      ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdate(e, true);
    };
    this.yqe = e => {
      e = this.TabShopList[e];
      e = ModelManager_1.ModelManager.PayShopModel.GetTabInfoByPayShopIdId(e);
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.HFi = e => {
      this.jFi(this.TabShopList, 0);
    };
    this.SwitchPayShopTabItem = (e, t) => {
      var i = this.TabShopList.indexOf(e);
      if (!this.PayShopViewData) {
        this.PayShopViewData = new PayShopViewData_1.PayShopViewData();
        this.PayShopViewData.PayShopId = e;
      }
      this.PayShopViewData.SwitchId = t;
      this.TabComponent.SelectToggleByIndex(i, true);
    };
    this.KFi = (e, t, i) => {
      if (t === this.PayShopId) {
        this.TabViewComponent.GetCurrentTabView().RefreshView?.(i);
      }
    };
    this.QFi = e => {
      var t;
      var i;
      if (this.uah === e && (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon(), t = ModelManager_1.ModelManager.PayShopModel.GetPayShopInfoDynamicTabId(e), t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(t).ChildViewName, Log_1.Log.CheckInfo() && Log_1.Log.Info("Shop", 10, "PayShop:Root 切换界面", ["ViewName", t], ["Switch", this.PayShopViewData?.SwitchId]), this.TabComponent?.SetTitleIconVisible(true), this.PayShopId = e, this.RefreshCurrency(e), i = this.TabShopList.indexOf(e), i = this.TabComponent.GetTabItemByIndex(i), this.TabViewComponent.ToggleCallBack(e, t, i, this.PayShopViewData?.SwitchId), this.UpdateGoodsList(), this.qsa(), this.UpdateInterval = 0, this.PayShopViewData && (this.PayShopViewData.SwitchId = undefined), e === 100)) {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopRechargeRedDot, true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShopInstanceRedDot, e);
      }
    };
    this.XFi = (e, t) => {
      if (t && ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131)).FunctionMap.set(1, () => {
        this.$Fi();
        this.coh();
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Shop", 10, "PayShop:Root 商品数据不同步,打开弹窗");
      }
    };
    this.YFi = e => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
      t.FunctionMap.set(1, () => {
        this.TabViewComponent.GetCurrentTabView().RefreshView?.(e);
        this.UpdateGoodsList();
        this.coh();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.ekn = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(131);
      e.FunctionMap.set(1, () => {
        this.CloseMe();
        this.coh();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:Root 商品VersionCode不同步,打开弹窗");
      }
    };
    this.qx1 = (e, ...t) => {
      this.Ox1?.SetUiActive(true);
      this.Ox1?.RefreshTextById(e, ...t);
    };
    this.JFi = e => {
      e = e.get(this.PayShopId);
      if (e) {
        this.TabViewComponent.GetCurrentTabView().RefreshView?.(e);
      }
    };
  }
  OnBeforeCreate() {
    this.PayShopViewData = this.OpenParam;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[6, this.FFi], [9, this.mVa]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopInfo(), ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.RequestScoreInfoAsync()]);
    this.Ox1 = new PayShopAccumulateItem_1.PayShopAccumulateItem();
    var e = [];
    var t = this.Ox1.CreateByActorAsync(this.GetItem(10).GetOwner());
    e.push(t);
    if (ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.CheckCurrentTotalUpRunning()) {
      this.Uxg = new TotalTopUpPageActivityEnterPanel_1.TotalTopUpPageActivityEnterPanel();
      t = this.Uxg.CreateByResourceIdAsync("UiItem_CumulativeRechargeActivityEnter", this.GetItem(1));
      e.push(t);
    }
    await Promise.all(e);
    this.Uxg?.SetUiActive(false);
  }
  OnBeforeShow() {
    this.Uxg?.PlayStartSequence();
  }
  OnStart() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.W7t);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
    this.zFi();
    this.PayShopId = undefined;
    this.GetButton(6).RootUIComp.SetRaycastTarget(true);
    this.CountDownText = this.GetText(3);
    this.CountDownTextActive = this.GetItem(2).bIsUIActive;
    this.TabComponent.SetTitle("");
    this.TabComponent.SetTitleIconVisible(false);
    this.ZFi();
    this.qsa();
    this.dVa();
    this.xxg();
  }
  ZFi() {
    RedDotController_1.RedDotController.BindRedDot("CustomerService", this.GetItem(7));
  }
  e3i() {
    RedDotController_1.RedDotController.UnBindGivenUi("CustomerService", this.GetItem(7));
  }
  dVa() {
    var e = LanguageSystem_1.LanguageSystem.PackageLanguage === CommonDefine_1.KOREAN_ISO639_1;
    this.GetButton(9).RootUIComp.SetUIActive(e);
  }
  xxg() {
    var e = (this.PayShopViewData?.ShowShopIdList?.length ?? 0) === 0;
    var t = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.CheckCurrentTotalUpRunning() ?? false;
    this.Uxg?.SetUiActive(e && t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshAllPayShop, this.HFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchPayShopTabItem, this.SwitchPayShopTabItem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.KFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchPayShopView, this.QFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshPayShop, this.XFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoodsList, this.YFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnLockGoods, this.JFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShopVersionCodeChange, this.ekn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, this.qx1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshAllPayShop, this.HFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchPayShopTabItem, this.SwitchPayShopTabItem);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.KFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchPayShopView, this.QFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshPayShop, this.XFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoodsList, this.YFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnLockGoods, this.JFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShopVersionCodeChange, this.ekn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshShopAccumulateCurrency, this.qx1);
  }
  OnAfterShow() {
    if (this.PayShopId) {
      this.TabViewComponent.SetCurrentTabViewState(true);
    } else {
      this.SelectDefaultPayShop();
      this.RefreshCountDownText();
    }
  }
  VFi(e) {
    var t = this.GetItem(5);
    if (e && ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()) {
      t.SetUIActive(e === 100);
    } else {
      t.SetUIActive(false);
    }
  }
  zFi() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "FriendMyUid", ModelManager_1.ModelManager.FunctionModel.PlayerId.toString());
  }
  OnAfterHide() {
    this.TabViewComponent.SetCurrentTabViewState(false);
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
  }
  OnBeforeDestroy() {
    this.e3i();
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
    this.TabShopList = [];
  }
  async RefreshCurrency(e) {
    e = ModelManager_1.ModelManager.PayShopModel.GetPayShopInfoMoney(e);
    await this.TabComponent.SetCurrencyItemList(e);
    this.Ox1?.RefreshCurrencyTex(e[0]);
    this.TabComponent.GetCurrencyItemList().forEach(e => {
      if (this.PayShopId === 100) {
        e.SetButtonActive(false);
      } else {
        e.RefreshAddButtonActive();
      }
      e.SetToPayShopFunction();
    });
  }
  SelectDefaultPayShop() {
    const i = BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip();
    var e;
    if (this.PayShopViewData && this.PayShopViewData?.ShowShopIdList?.length !== 0) {
      this.TabShopList = this.PayShopViewData.ShowShopIdList;
    } else {
      this.TabShopList = [];
      ModelManager_1.ModelManager.PayShopModel.GetPayShopIdList().forEach(e => {
        var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopInfoTabViewType(e);
        if (i) {
          if (PayShopDefine_1.iosLimitModePayShopViewType.includes(t)) {
            this.TabShopList.push(e);
          }
        } else if (PayShopDefine_1.payShopViewTabType.includes(t)) {
          this.TabShopList.push(e);
        }
      });
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:Root 页签数据", ["TabShopList", this.TabShopList]);
    }
    if (this.PayShopViewData?.PayShopId) {
      e = this.TabShopList.indexOf(this.PayShopViewData.PayShopId);
      this.jFi(this.TabShopList, e);
    } else {
      this.jFi(this.TabShopList, 0);
    }
  }
  jFi(e, n = 0) {
    const h = e.length;
    this.TabComponent.RefreshTabItemByLength(h, () => {
      for (let e = 0; e < h; e++) {
        var t = this.TabComponent.GetTabItemByIndex(e);
        var i = this.TabShopList[e];
        var o = t.GetNameTextComponent();
        var s = ModelManager_1.ModelManager.PayShopModel.GetTabInfoByPayShopIdId(i);
        t.BindRedDot("PayShopInstance", i);
        LguiUtil_1.LguiUtil.SetLocalTextNew(o, s.TabName);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:Root 选择页签", ["Index", n]);
      }
      this.TabComponent?.SelectToggleByIndex(n);
    });
  }
  $Fi() {
    this.TabViewComponent.GetCurrentTabView().RefreshView?.();
    this.UpdateGoodsList();
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(this.PayShopId);
    if (e && e.RemainingTime > TimeUtil_1.TimeUtil.TimeDeviation) {
      this.UpdateInterval = e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    }
    this.kFi = false;
  }
  coh() {
    UiManager_1.UiManager.CloseView("GiftPackageDetailsView");
    UiManager_1.UiManager.CloseView("ExchangePopView");
  }
  UpdateTime(e) {
    if (this.UpdateInterval !== undefined) {
      if (this.UpdateInterval > 0) {
        this.UpdateInterval -= e;
      } else {
        this.RefreshCountDownText();
        if (e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(this.PayShopId)) {
          this.UpdateInterval = e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND;
        }
      }
    }
  }
  qsa() {
    var e = this.GetItem(8);
    var t = this.PayShopId === 4;
    e.SetUIActive(t);
  }
  RefreshCountDownText() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopCountDownData(this.PayShopId);
    if (e === undefined) {
      this.CountDownTextActive = false;
      this.GetItem(2).SetUIActive(false);
      this.UpdateInterval = undefined;
    } else if (e.CountDownText === undefined) {
      this.CountDownTextActive = false;
      this.GetItem(2).SetUIActive(false);
      if (this.UpdateInterval !== undefined && this.UpdateInterval <= 0 && !this.kFi) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Shop", 27, "发送协议请求商店");
        }
        ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopUpdate(this.PayShopId, false);
        this.kFi = true;
      }
      this.UpdateInterval = undefined;
    } else {
      if (!this.CountDownTextActive) {
        this.GetItem(2).SetUIActive(true);
        this.CountDownTextActive = true;
      }
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopUpdateTime(this.PayShopId);
      e = PayShopGoods_1.PayShopGoods.GetEndTimeShowText(e);
      LguiUtil_1.LguiUtil.SetLocalText(this.CountDownText, "RefreshTime", e);
    }
  }
  UpdateGoodsList() {
    this.GoodsList = ModelManager_1.ModelManager.PayShopModel.GetNeedCheckGoods(this.PayShopId);
    this.AllowTick = true;
  }
  TickGoodList() {
    if (this.AllowTick) {
      if (!this.GoodsList || this.GoodsList.length <= 0) {
        this.AllowTick = false;
      } else {
        var e = [];
        var t = [];
        for (const i of this.GoodsList) {
          if (i.NeedUpdate()) {
            (i.IsDirect() ? e : t).push(i.GetGoodsId());
          }
        }
        if (!(t.length <= 0) || !(e.length <= 0)) {
          this.AllowTick = false;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Shop", 27, "请求刷新商品", ["goodsList", t]);
          }
          if (t.length > 0) {
            ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopItemUpdate(t);
          }
          if (e.length > 0) {
            ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequest(true);
          }
        }
      }
    }
  }
  OnTick(e) {
    super.OnTick(e);
    this.TickGoodList();
    this.UpdateTime(e);
    this.Uxg?.OnTick();
  }
}
exports.PayShopRootView = PayShopRootView;
//# sourceMappingURL=PayShopRootView.js.map