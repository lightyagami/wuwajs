"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayGiftController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
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
const SdkViewData_1 = require("../SdkUI/SdkViewData");
const PayShopDefine_1 = require("./PayShopDefine");
class PayGiftController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24196, PayGiftController.hFi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24196);
  }
  static OnShopInfoNotify(e) {
    ModelManager_1.ModelManager.PayGiftModel.Version = e.DBs.K7n;
    ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.DBs.RBs);
  }
  static OnShopInfoReceive(e) {
    if (e) {
      ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n;
      ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.RBs);
    }
  }
  static async QueryPayGiftInfoAsync() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList();
    var r = new Array();
    for (const o of e) {
      r.push(o.ProductId);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Pay", 27, "QueryProductInfoAsync", ["resultArray", e.length]);
    }
    await PayItemController_1.PayItemController.QueryProductInfoAsync(r);
  }
  static async SendPayGiftInfoRequestAsync() {
    var e = Protocol_1.Aki.Protocol.Yhs.create();
    e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version;
    var e = await Net_1.Net.CallAsync(16046, e);
    return !!e && !(e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19823), !e.K7n) && !!e.OUs && !(ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n, ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.OUs), 0);
  }
  static SendPayGiftInfoRequest(t = false) {
    var e = Protocol_1.Aki.Protocol.Yhs.create();
    e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version;
    Net_1.Net.Call(16046, e, e => {
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19823), e.K7n) && e.OUs) {
        ModelManager_1.ModelManager.PayGiftModel.Version = e.K7n;
        ModelManager_1.ModelManager.PayGiftModel.InitDataByServer(e.OUs, t);
        var e = ModelManager_1.ModelManager.PayGiftModel.GetDataList();
        var r = new Array();
        for (const o of e) {
          r.push(o.ProductId);
        }
        ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(r);
      }
    });
  }
  static mFa(n) {
    var e = Protocol_1.Aki.Protocol.zhs.create();
    e.s5n = n;
    e.K7n = ModelManager_1.ModelManager.PayGiftModel.Version;
    Net_1.Net.Call(24559, e, e => {
      var r;
      var o;
      var t;
      var a = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(n);
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(a.GetGoodsData().ItemId);
        o = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(a.GetGoodsData().ItemId);
        (t = new LogReportDefine_1.SdkPayGetServerBillEvent()).s_sdk_pay_order = e.CBs;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
        ControllerHolder_1.ControllerHolder.KuroSdkController.SdkPay(a.GetGetPayGiftData().PayId, e.CBs, r, o, e.gBs);
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPayShopDataChanged) {
        this.SendPayGiftInfoRequest();
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17287);
      }
    });
  }
  static SdkPay(e) {
    var r;
    var o;
    if (PayItemController_1.PayItemController.CurrentBlockBetaState && ConfigManager_1.ConfigManager.CommonConfig?.GetBetaBlockRecharge()) {
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      return;
    }
    if (FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() && e === PayShopDefine_1.MONTH_CARD_SHOP_ID) {
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    } else {
      if (PayItemController_1.PayItemController.CurrentBlockIosPayState && Info_1.Info.PlatformType === 1) {
        r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(134);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      }
      if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
        if (r = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(e)?.GetGetPayGiftData()?.ProductId) {
          if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowSdkProductInfoBeforePay()) {
            o = ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(r);
            o = SdkViewData_1.SdkPayProductInformationViewData.Create(o.Name, o.Desc, r, function (e) {
              PayItemController_1.PayItemController.SdkPayNew(e);
            });
            UiManager_1.UiManager.OpenView("SdkPayProductInformationView", o);
          } else {
            PayItemController_1.PayItemController.SdkPayNew(r);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Pay", 16, "PayGiftController SdkPay failed, productId is null");
        }
      } else {
        this.mFa(e);
      }
    }
  }
}
(exports.PayGiftController = PayGiftController).hFi = e => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.CancelCurrentWaitPayItemTimer();
  var r = {
    PayItemId: e.s5n,
    OrderId: e.CBs,
    ItemId: e.L8n,
    ItemCount: e.n9n
  };
  ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e.fBs.s5n).Phrase(e.fBs);
  KuroSdkReport_1.KuroSdkReport.OnPayShopDirectBuy(e.s5n);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPayItemSuccess, r);
};
//# sourceMappingURL=PayGiftController.js.map