"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const PayItemController_1 = require("../PayItem/PayItemController");
const PayShopViewData_1 = require("./PayShopData/PayShopViewData");
const PayShopDefine_1 = require("./PayShopDefine");
const ExchangePopData_1 = require("./PopView/Exchange/ExchangePopData");
class PayShopController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29286, PayShopController.dFi);
    Net_1.Net.Register(20767, PayShopController.CFi);
    Net_1.Net.Register(17363, PayShopController.gFi);
    Net_1.Net.Register(29072, PayShopController.fFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29286);
    Net_1.Net.UnRegister(20767);
    Net_1.Net.UnRegister(17363);
    Net_1.Net.UnRegister(29072);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static async SendRequestPayShopInfo(e = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 27, "PayShop:ShopItem 请求商品信息");
    }
    var o;
    var t = Protocol_1.Aki.Protocol.ils.create();
    t.K7n = ModelManager_1.ModelManager.PayShopModel.Version;
    var t = await Net_1.Net.CallAsync(26424, t);
    if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (ModelManager_1.ModelManager.PayShopModel.Version !== t.K7n) {
        ModelManager_1.ModelManager.PayShopModel.ClearData();
      }
      o = t.OUs;
      ModelManager_1.ModelManager.PayShopModel.Version = t.K7n;
      ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o);
      ModelManager_1.ModelManager.PayShopModel.SetPayShopTabData(t.Okd);
      ModelManager_1.ModelManager.PayShopModel.SetPayShopRecommendData(t.qkd);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 27, "PayShop:ShopItem 请求商品信息结束", ["version", t.K7n], ["info", o]);
      }
      ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoReceive(t?.DBs);
      return true;
    } else {
      if (e) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 27493);
      }
      return false;
    }
  }
  static async SendRequestPayShopUpdateAsync(e, o) {
    const t = new CustomPromise_1.CustomPromise();
    this.SendRequestPayShopUpdate(e, o, e => {
      t.SetResult(e);
    });
    return t.Promise;
  }
  static SendRequestPayShopUpdate(a, n, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:Root 请求刷新商城数据", ["ShopId", a], ["IsSwitch", n]);
    }
    var e = Protocol_1.Aki.Protocol.ols.create();
    e.s5n = a;
    Net_1.Net.Call(21467, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          const t = e.YVn;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Shop", 10, "PayShop:Root 请求刷新商城数据成功", ["ShopId", a], ["IsSwitch", n]);
          }
          ModelManager_1.ModelManager.PayShopModel.SetPayShopInfo(t);
          var o = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce();
          const r = () => {
            if (n) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchPayShopView, t.s5n);
            } else {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, t.s5n, true);
            }
            i?.(e);
          };
          if (o && (o = this.pFi(a))?.length > 0) {
            ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(o).then(() => {
              r();
            });
          } else {
            r();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26130);
          i?.(e);
        }
      } else {
        i?.(undefined);
      }
    });
  }
  static pFi(e) {
    var o = new Array();
    if (e === 100) {
      for (const t of ModelManager_1.ModelManager.PayItemModel.GetDataList()) {
        o.push(t.ProductId);
      }
    }
    if (e === 3) {
      for (const r of ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataList()) {
        o.push(r.ProductId);
      }
    }
    return o;
  }
  static SendRequestPayShopItemUpdate(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 27, "PayShop:ShopItem 请求刷新商品列表", ["goodsIdList", e]);
    }
    var o = Protocol_1.Aki.Protocol.sls.create();
    o.Q7n = e;
    Net_1.Net.Call(21859, o, e => {
      var o;
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        o = e.bMs;
        ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(o);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19150);
      }
    });
  }
  static SendRequestPayShopBuy(e, o = 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 请求购买商品", ["Id", e], ["Count", o]);
    }
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(e).GetGoodsData();
    PayShopController.SendRequestPayShopNormalBuy(e, o, t);
  }
  static SendRequestPayShopNormalBuy(o, t, r) {
    var e = Protocol_1.Aki.Protocol.hls.create();
    e.s5n = o;
    e.m9n = t;
    e.K7n = ModelManager_1.ModelManager.PayShopModel.Version;
    Net_1.Net.Call(26977, e, e => {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 购买商品成功", ["Id", o], ["Count", t]);
        }
        ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(e.s5n, e.m9n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPayShopDataChanged) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 商品数据不同步,通知versioncode变化", ["Id", o], ["Count", t]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, r.ShopId, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShopVersionCodeChange);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21405);
      }
    });
  }
  static ActivityPayShopBuyRequest(e, o) {
    var t;
    if (e.length !== 0) {
      t = e[0].s5n;
      t = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(t).GetGoodsData();
      PayShopController.xTg(e, t, o);
    }
  }
  static xTg(i, _, l) {
    var e = new Protocol_1.Aki.Protocol.yIg();
    e.MIg = i;
    e.K7n = ModelManager_1.ModelManager.PayShopModel.Version;
    Net_1.Net.Call(29313, e, e => {
      if (e) {
        var o = e.MIg;
        var t = o.length !== i.length;
        if (t) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Shop", 43, "[PayShop] 部分活动商品购买失败");
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 43, "[PayShop] 活动商品购买成功");
        }
        for (const a of i) {
          ModelManager_1.ModelManager.PayShopModel.UpdateActivityPayShopGoodsCount(a.s5n, a.m9n);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityPayShopGoodsBuy, _.ShopId, i, ModelManager_1.ModelManager.PayShopModel.Version);
        if (t) {
          var r = [];
          for (const n of i) {
            if (!o.some(e => e.s5n === n.s5n)) {
              r.push(n);
            }
          }
          l?.(true, r);
        } else {
          l?.(true);
        }
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18733);
        }
      } else {
        l?.(false);
      }
    });
  }
  static OpenGiftDetailsView(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 打开礼包界面");
    }
    var o = new ExchangePopData_1.ExchangePopData();
    o.PayShopGoods = e;
    UiManager_1.UiManager.OpenView("GiftPackageDetailsView", o);
    if (e.PayShopId === 3 || e.PayShopId === 6) {
      (o = new LogReportDefine_1.OnOpenGiftPackageDetailsViewLogEvent()).i_id = e.GetGoodsData().Id;
      o.i_shop_id = e.PayShopId;
      o.i_tab_id = e.GetGoodsData().TabId;
      o.i_buy_through_third_party = e.IfPayGift() ? 1 : 0;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
    }
  }
  static OpenExchangePopView(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 打开兑换界面");
    }
    var t = new ExchangePopData_1.ExchangePopData();
    var r = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(e);
    t.PayShopGoods = r;
    t.ShopItemResource = "UiItem_ShopItem";
    t.GetMaxBuyCount = o?.GetMaxBuyCount ?? undefined;
    t.CheckIfCanBuy = o?.CheckIfCanBuy ?? undefined;
    UiManager_1.UiManager.OpenView("ExchangePopView", t);
    if (r?.PayShopId === 4 || r?.PayShopId === 5) {
      (o = new LogReportDefine_1.OnClickPayShopItemLogEvent()).i_id = e;
      o.i_shop_id = r.PayShopId;
      o.i_tab_id = r.GetGoodsData().TabId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
    }
  }
  static OpenBuySkinDetailView(e) {
    var o;
    var t;
    if (e.IsDirect()) {
      o = e.GetGoodsData().Id;
      ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(o);
      (t = new LogReportDefine_1.OnOpenGiftPackageDetailsViewLogEvent()).i_id = o;
      t.i_shop_id = e.PayShopId;
      t.i_tab_id = e.GetGoodsData().TabId;
      t.i_buy_through_third_party = e.IfPayGift() ? 1 : 0;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    } else {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(e);
    }
  }
  static OpenBuyViewByGoodsId(e, o) {
    var t = e.GetGoodsData().Id;
    e.SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
    if (e.CheckIfMonthCardItem()) {
      this.OpenGiftDetailsView(e);
    } else {
      if (e.GetGoodsData().GetRewardItemType() === 11) {
        var r = e.GetGoodsData().GetGiftId();
        if (r && ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(r)?.Type === GiftType_1.GiftType.Fixed) {
          this.OpenGiftDetailsView(e);
          return;
        }
      }
      this.OpenExchangePopView(t, o);
    }
  }
  static OpenPayShopView(e = undefined, o = undefined) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)) {
      UiManager_1.UiManager.OpenView("PayShopRootView", e, o);
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    }
  }
  static OpenPayShopViewWithTab(e, o) {
    var t;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)) {
      if (UiManager_1.UiManager.IsViewOpen("PayShopRootView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchPayShopTabItem, e, o);
      } else {
        (t = new PayShopViewData_1.PayShopViewData()).PayShopId = e;
        t.SwitchId = o;
        this.OpenPayShopView(t);
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    }
  }
  static OpenPayShopViewToRecharge() {
    var e;
    if (PayItemController_1.PayItemController.CurrentBlockBetaState && FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()) {
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      return;
    }
    if (UiManager_1.UiManager.IsViewShow("PayShopRootView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchPayShopTabItem, 100, 1);
    } else {
      (e = new PayShopViewData_1.PayShopViewData()).PayShopId = 100;
      PayShopController.OpenPayShopView(e);
    }
  }
  static ClosePayShopGoodDetailPopView() {
    for (const e of ["ExchangePopView", "GiftPackageDetailsView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        UiManager_1.UiManager.CloseView(e);
      }
    }
  }
}
(exports.PayShopController = PayShopController).dFi = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Shop", 27, "PayShop:ShopItem NotifyPayShopInfo 接收到商品信息更新", ["version", e.K7n]);
  }
  var o = e.OUs;
  ModelManager_1.ModelManager.PayShopModel.Version = e.K7n;
  ModelManager_1.ModelManager.PayShopModel.SetPayShopInfoList(o);
  ModelManager_1.ModelManager.PayShopModel.SetPayShopTabData(e.Okd);
  ModelManager_1.ModelManager.PayShopModel.SetPayShopRecommendData(e.qkd);
  ControllerHolder_1.ControllerHolder.PayGiftController.OnShopInfoNotify(e);
};
PayShopController.CFi = e => {
  e = e.ABs;
  ModelManager_1.ModelManager.PayShopModel.UnLockPayShopGoods(e);
};
PayShopController.fFi = e => {
  e = e.bMs;
  ModelManager_1.ModelManager.PayShopModel.SetPayShopGoodsList(e);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Shop", 27, "PayShop:ShopItem NotifyPayShopConditionFinish 接收到商品信息更新");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPayShopConditionFinish, e);
};
PayShopController.gFi = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Shop", 27, "PayShop:ShopItem NotifyPayShopDirectBuy 接收到直购结构", ["id", e.PBs], ["count", e.n9n]);
  }
  KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.PBs);
  if (e.PBs !== undefined && e.PBs !== 0) {
    ModelManager_1.ModelManager.PayShopModel.UpdatePayShopGoodsCount(e.PBs, e.n9n);
  }
  if (e.PBs !== PayShopDefine_1.MONTH_CARD_SHOP_ID && e.PBs !== PayShopDefine_1.BATTLE_PASS_PRIMARY_ID && e.PBs !== PayShopDefine_1.BATTLE_PASS_HIGH_ID) {
    e.PBs;
    PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID;
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
};
PayShopController.nye = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)) {
    PayShopController.SendRequestPayShopInfo(false);
  }
};
PayShopController.RQe = (e, o) => {
  if (e === 10010 && o) {
    PayShopController.SendRequestPayShopInfo(false);
  }
}; //# sourceMappingURL=PayShopController.js.map