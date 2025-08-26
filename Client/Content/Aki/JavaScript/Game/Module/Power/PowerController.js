"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const CommonExchangeData_1 = require("../ItemExchange/View/CommonExchangeData");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ShopController_1 = require("../Shop/ShopController");
const PowerDefines_1 = require("./PowerDefines");
const DEFAULTEXCHANGETIME = 60;
const REQUESTPOWERGAP = 1;
const CHECKPOWERGAP = 500;
class PowerController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18577, e => {
      ModelManager_1.ModelManager.PowerModel.UpdatePowerData(e._Xs);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18577);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
  }
  static OpenPowerView(o = 2, n = 0) {
    if (!!ModelManager_1.ModelManager.FunctionModel.IsOpen(10017) && !UiManager_1.UiManager.IsViewOpen("PowerView")) {
      if (ModelManager_1.ModelManager.PowerModel.PowerCount >= ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBound");
      } else {
        this.eFa().then(() => {
          var e = n === 0;
          ModelManager_1.ModelManager.PowerModel.CurrentNeedPower = e ? DEFAULTEXCHANGETIME : n;
          var r = e ? ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit() : n + ModelManager_1.ModelManager.PowerModel.PowerCount;
          var e = new PowerDefines_1.PowerConfirmBoxData(ModelManager_1.ModelManager.PowerModel.PowerCount, o, !e, r);
          UiManager_1.UiManager.OpenView("PowerView", e);
        });
      }
    }
  }
  static async FZu(r, o) {
    var e;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10017)) {
      await this.eFa();
      e = ModelManager_1.ModelManager.PowerModel.GetPowerItemInfos(r);
      if (ModelManager_1.ModelManager.PowerModel.PowerCount + e.RenewValue * o > ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBound");
      } else {
        ShopController_1.ShopController.SendShopBuyRequest(e.ShopId, e.GoodsId, e.ItemId, o, () => {
          var e = ModelManager_1.ModelManager.PowerModel.GetPowerItemInfos(r);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBuySucceed", e.RenewValue * o);
        });
      }
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Function_notopen_tili");
    }
  }
  static async eFa() {
    await ShopController_1.ShopController.SendShopInfoRequest(ModelManager_1.ModelManager.ShopModel.VersionId);
    var e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerShopIds();
    const r = [];
    e.forEach(e => {
      r.push(ShopController_1.ShopController.SendShopUpdateRequestAsync(e));
    });
    await Promise.all(r);
  }
  static R6t() {
    if (PowerController.vea !== undefined) {
      TimerSystem_1.TimerSystem.Remove(PowerController.vea);
      PowerController.vea = undefined;
    }
  }
  static GetIfCanRequestNewPower() {
    return TimeUtil_1.TimeUtil.GetServerTime() - this.Mea > REQUESTPOWERGAP;
  }
  static OpenOverPowerExchangeView() {
    var r = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power);
    var o = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.OverPower);
    var n = ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit() - r.GetCurrentPower();
    if (n == 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PowerMaxCannotExchange"));
    } else if (o.GetCurrentPower() === 0) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ItemInfoById_1.configItemInfoById.GetConfig(ItemDefines_1.EItemId.OverPower).Name);
      t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PowerPropsCannotExchange"), t);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    } else {
      var t = new CommonExchangeData_1.CommonExchangeData();
      t.InitBySrcAndDestItemId(ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.Power, o.GetCurrentPower(), r.GetCurrentPower());
      t.ConfirmCallBack = (e, r) => {
        var o = ModelManager_1.ModelManager.PowerModel.GetOverPowerShopConfig();
        var n = o?.Price;
        let t = ItemDefines_1.EItemId.OverPower;
        if (n) {
          for (var [a] of n) {
            t = a;
            break;
          }
        }
        ShopController_1.ShopController.SendShopBuyRequest(o.ShopId, o.Id, t, r, () => {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBuySucceed", r);
        });
      };
      var r = new CommonExchangeData_1.CommonExchangeViewData();
      var a = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.GetSrcItemId());
      r.GetGainCount = (e, r) => r;
      r.GetConsumeCount = (e, r) => r;
      r.GetConsumeTotalCount = (e, r) => r;
      r.ShowCurrencyList = [ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.Power];
      if (ModelManager_1.ModelManager.PowerModel.CurrentNeedPower > 0) {
        r.StartSliderValue = ModelManager_1.ModelManager.PowerModel.CurrentNeedPower <= o.GetCurrentPower() ? ModelManager_1.ModelManager.PowerModel.CurrentNeedPower : o.GetCurrentPower();
      }
      let e = ConfigManager_1.ConfigManager.PowerConfig.GetSingleTimeExchangePowerLimit();
      if ((e = n < ConfigManager_1.ConfigManager.PowerConfig.GetSingleTimeExchangePowerLimit() ? n : e) > o.GetCurrentPower()) {
        e = o.GetCurrentPower();
      }
      r.StartSliderValue = r.StartSliderValue > e ? e : r.StartSliderValue;
      r.CreateData(t, e, a);
      UiManager_1.UiManager.OpenView("CommonExchangeView", r);
    }
  }
  static async OpenPowerRecoveryExchangeView(o) {
    await this.eFa();
    var e = ModelManager_1.ModelManager.PowerModel.GetPowerItemInfos(o);
    if (e) {
      var r = ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit();
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
      const i = e.RenewValue;
      var t;
      var a;
      var e = Math.floor((r - ModelManager_1.ModelManager.PowerModel.PowerCount) / i);
      var e = Math.min(e, n);
      if (ModelManager_1.ModelManager.PowerModel.PowerCount + i > r) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBound");
      } else {
        (r = new CommonExchangeData_1.CommonExchangeData()).InitBySrcAndDestItemId(o, ItemDefines_1.EItemId.Power, e, i);
        r.ConfirmCallBack = (e, r) => {
          this.FZu(o, r);
        };
        (t = new CommonExchangeData_1.CommonExchangeViewData()).GetGainCount = (e, r) => r * i;
        t.GetConsumeCount = (e, r) => r;
        t.GetConsumeTotalCount = (e, r) => r;
        t.ShowCurrencyList = [o, ItemDefines_1.EItemId.Power];
        if (ModelManager_1.ModelManager.PowerModel.CurrentNeedPower > 0 && (a = n * i, ModelManager_1.ModelManager.PowerModel.CurrentNeedPower <= a)) {
          t.StartSliderValue = Math.ceil(ModelManager_1.ModelManager.PowerModel.CurrentNeedPower / i);
        }
        t.CreateData(r, e, n);
        UiManager_1.UiManager.OpenView("CommonExchangeView", t);
      }
    }
  }
  static async UseSinglePowerRecoveryItem() {
    return Promise.resolve();
  }
  static ExchangePower(e, r, o) {
    if (e.ItemId === ItemDefines_1.EItemId.OverPower) {
      this.OpenOverPowerExchangeView();
    } else if (e.ItemId === 10800) {
      this.OpenPowerRecoveryExchangeView(e.ItemId);
    } else {
      ShopController_1.ShopController.SendShopBuyRequest(e.ShopId, e.GoodsId, e.ItemId, r, o);
    }
  }
  static Clear() {
    this.R6t();
    return super.Clear();
  }
}
exports.PowerController = PowerController;
(_a = PowerController).IsTickEvenPausedInternal = true;
PowerController.vea = undefined;
PowerController.Mea = 0;
PowerController.loo = () => {
  if (UiManager_1.UiManager.IsViewShow("PowerView")) {
    UiManager_1.UiManager.CloseView("PowerView");
  }
};
PowerController.xkt = () => {
  _a.SendUpdatePowerRequest(ModelManager_1.ModelManager.PowerModel.PowerItemKeyArray);
  _a.R6t();
  PowerController.vea = TimerSystem_1.TimerSystem.Forever(PowerController.Sea, CHECKPOWERGAP);
};
PowerController.Sea = () => {
  ModelManager_1.ModelManager.PowerModel.UpdatePowerRenewTimer();
};
PowerController.SendUpdatePowerRequest = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("PowerModule", 27, "体力拉取", ["itemList", e]);
  }
  var r = Protocol_1.Aki.Protocol.YZn.create();
  r.BVn = e;
  _a.Mea = TimeUtil_1.TimeUtil.GetServerTime();
  Net_1.Net.Call(29506, r, e => {
    if (e) {
      if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.PowerModel.UpdatePowerData(e.uXs);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 15711);
      }
    }
  });
}; //# sourceMappingURL=PowerController.js.map