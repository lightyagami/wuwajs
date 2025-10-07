"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayItemController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const SdkViewData_1 = require("../SdkUI/SdkViewData");
class PayItemController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23716, e => {
      e = {
        PayItemId: e.s5n,
        OrderId: e.CBs,
        ItemId: e.L8n,
        ItemCount: e.n9n
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPayItemSuccess, e);
      PayItemController.KOi();
      ModelManager_1.ModelManager.PayItemModel.CleanPayingItemName();
    });
    Net_1.Net.Register(27192, PayItemController.QOi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27192);
    Net_1.Net.UnRegister(23716);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.gSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static OnClear() {
    this.KOi();
    return true;
  }
  static _Fa(o) {
    var e = Protocol_1.Aki.Protocol.Whs.create();
    e.s5n = o;
    e.K7n = ModelManager_1.ModelManager.PayItemModel.Version;
    ModelManager_1.ModelManager.PayItemModel.UpdatePayingItemName(o);
    Net_1.Net.Call(27055, e, e => {
      var r;
      var t;
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27969);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 充值请求成功,调用SDK接口", ["Id", o]);
        }
        r = ModelManager_1.ModelManager.PayItemModel.CreateSdkPayment(o, e.CBs, e.gBs);
        (t = new LogReportDefine_1.SdkPayGetServerBillEvent()).s_sdk_pay_order = e.CBs;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
        ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(r);
      }
    });
  }
  static KOi() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  }
  static async QueryPayItemInfoAsync() {
    var e = ModelManager_1.ModelManager.PayItemModel.GetDataList();
    var r = new Array();
    for (const o of e) {
      var t = ConfigManager_1.ConfigManager.PayItemConfig.GetProductIdByPayItemId(o.PayItemId);
      if (t) {
        r.push(t);
      }
    }
    return this.QueryProductInfoAsync(r);
  }
  static async SendPayItemInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.Hhs.create();
    e.K7n = ModelManager_1.ModelManager.PayItemModel.Version;
    var e = await Net_1.Net.CallAsync(18248, e);
    return !!e && !(e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18515), !e.K7n) && !!e.OUs && !(ModelManager_1.ModelManager.PayItemModel.Version = e.K7n, ModelManager_1.ModelManager.PayItemModel.InitDataListByServer(e.OUs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShopInstanceRedDot, 100), 0);
  }
  static async QueryProductInfoAsync(e) {
    if (e.length === 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pay", 16, "QueryProductInfoAsync failed, productIds is null");
      }
      return false;
    }
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      var r;
      var t = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().QueryProductInfo(e);
      if (!t.DataList) {
        if (t.NeedReLogin) {
          (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTextArgs(t.FailReason);
          r.SetCloseFunction(() => {
            ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(r);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Pay", 16, "QueryProductInfoAsync failed, data is null");
        }
        return false;
      }
      ModelManager_1.ModelManager.PayItemModel.UpdateProductInfoMap(t.DataList);
    } else if (!(await ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(e))) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pay", 27, "查询失败", ["productIds", e]);
      }
      return false;
    }
    return true;
  }
  static SdkPayNew(e) {
    var r;
    var t;
    if (this.uFa) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Pay", 16, "SdkPayNew failed, duplicate pay request");
      }
    } else if (r = ModelManager_1.ModelManager.PayItemModel.GetProductLabelByGoodsId(e)) {
      t = ModelManager_1.ModelManager.PayItemModel.GetProductChannelGoodsIdByGoodsId(e);
      if (e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenCheckoutDialog(r, e, t ?? "")) {
        this.uFa = TimerSystem_1.GameplayTimerSystem.Forever(() => {
          switch (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PollCheckoutDialogResult()) {
            case 2:
              this.RequestSdkCheckout(1);
              TimerSystem_1.GameplayTimerSystem.Remove(this.uFa);
              this.uFa = undefined;
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPayEnd, 2);
              break;
            case 1:
              break;
            default:
              TimerSystem_1.GameplayTimerSystem.Remove(this.uFa);
              this.uFa = undefined;
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPayEnd, 0);
          }
        }, 500);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pay", 16, "SdkPayNew failed, OpenCheckoutDialog failed", ["psnProductId", r], ["result", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Pay", 16, "SdkPayNew failed, psnProductLabel is null");
    }
  }
  static SdkPay(e) {
    var r;
    var t;
    if (this.CurrentBlockBetaState && FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()) {
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      return;
    }
    if (this.CurrentBlockIosPayState && Info_1.Info.PlatformType === 1) {
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      return;
    }
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (r = ConfigManager_1.ConfigManager.PayItemConfig.GetProductIdByPayItemId(e)) {
        if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowSdkProductInfoBeforePay()) {
          t = ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(r);
          t = SdkViewData_1.SdkPayProductInformationViewData.Create(t.Name, t.Desc, r, function (e) {
            PayItemController.SdkPayNew(e);
          });
          UiManager_1.UiManager.OpenView("SdkPayProductInformationView", t);
        } else {
          this.SdkPayNew(r);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pay", 16, "SdkPay failed, productId is null");
      }
    } else {
      this._Fa(e);
    }
  }
  static ISe() {
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString();
    } else if (ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()) {
      return ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString();
    } else {
      return "";
    }
  }
  static RequestSdkCheckout(e) {
    var r;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && ModelManager_1.ModelManager.LoginModel.SdkAccessToken !== "" && (r = this.ISe().toString()) !== "") {
      r = {
        AccessToken: ModelManager_1.ModelManager.LoginModel.SdkAccessToken,
        ServerId: ModelManager_1.ModelManager.LoginModel.GetServerId(),
        ServerName: ModelManager_1.ModelManager.LoginModel.GetServerName(),
        RoleId: r,
        RoleName: ModelManager_1.ModelManager.FunctionModel.GetPlayerName()
      };
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Pay", 16, "RequestSdkCheckout SDK销单", ["param", r]);
      }
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().RequestCheckoutProduct(r, (e, r, t) => {
        if (!t) {
          if (r) {
            (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTextArgs(e);
            t.SetCloseFunction(() => {
              ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Pay", 16, "RequestSdkCheckout SDK销单", ["msg", e]);
          }
        }
      }, e);
    }
  }
}
exports.PayItemController = PayItemController;
(_a = PayItemController).CurrentBlockIosPayState = false;
PayItemController.CurrentBlockBetaState = true;
PayItemController.gSe = () => {
  _a.RequestSdkCheckout(0);
};
PayItemController.QOi = e => {
  ModelManager_1.ModelManager.PayItemModel.ResetSpecialBonus(e.BVn);
};
PayItemController.uFa = undefined;
PayItemController.nye = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010)) {
    _a.SendPayItemInfoRequestAsync();
  }
};
PayItemController.RQe = (e, r) => {
  if (e === 10010 && r) {
    _a.SendPayItemInfoRequestAsync();
  }
}; //# sourceMappingURL=PayItemController.js.map