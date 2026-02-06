"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemExchangeController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const CommonExchangeData_1 = require("./View/CommonExchangeData");
class ItemExchangeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Igi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this.Tgi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Igi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this.Tgi);
  }
  static get NeedPop() {
    return this.Lgi;
  }
  static OpenExchangeViewByItemId(e, n = undefined, t = false) {
    var o = new CommonExchangeData_1.CommonExchangeData();
    o.InitByItemId(e);
    o.ConfirmNoClose = t;
    o.ConfirmCallBack = n;
    o.ConfirmCallBack ||= ItemExchangeController.ItemExchangeRequest;
    ItemExchangeController.OpenExchangeViewByData(o);
  }
  static OpenExchangeViewByData(e) {
    var n = new CommonExchangeData_1.CommonExchangeViewData();
    var t = ModelManager_1.ModelManager.ItemExchangeModel.GetMaxExChangeTime(e.GetDestItemId());
    var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.GetSrcItemId());
    n.GetGainCount = (e, n) => {
      return ModelManager_1.ModelManager.ItemExchangeModel.GetCurExchangeInfo(e, n).GainCount;
    };
    n.GetConsumeCount = (e, n) => {
      return ModelManager_1.ModelManager.ItemExchangeModel.GetCurExchangeInfo(e, n).ConsumeCount;
    };
    n.GetConsumeTotalCount = (e, n) => e * n;
    n.CreateData(e, t, o);
    UiManager_1.UiManager.OpenView("CommonExchangeView", n);
  }
}
exports.ItemExchangeController = ItemExchangeController;
(_a = ItemExchangeController).Tgi = () => {
  var e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
  if (e < LoginDefine_1.ELoginStatus.EnterGameRet) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("ItemExchange", 8, "登录状态错误, 无法请求物品兑换数据", ["loginStatus", e]);
    }
  } else {
    ItemExchangeController.Igi();
  }
};
ItemExchangeController.Igi = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("ItemExchange", 8, "请求物品兑换数据");
  }
  var e = Protocol_1.Aki.Protocol.Fns.create();
  Net_1.Net.Call(20134, e, e => {
    ModelManager_1.ModelManager.ItemExchangeModel.InitItemExchangeTimeInfo(e.Ixs);
  });
};
ItemExchangeController.Lgi = true;
ItemExchangeController.ItemExchangeRequest = (n, t, e = true, o = undefined) => {
  if (t !== 0) {
    _a.Lgi = e;
    (e = Protocol_1.Aki.Protocol.$ns.create()).L8n = n;
    e.j9n = t;
    Net_1.Net.Call(27156, e, e => {
      _a.Lgi = true;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25993);
        } else {
          ModelManager_1.ModelManager.ItemExchangeModel.AddExchangeTime(n, t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ItemExChangeResponse, e.L8n, e.n9n);
          if (o) {
            o(e.L8n, e.n9n);
          }
        }
      }
    });
  }
}; //# sourceMappingURL=ItemExchangeController.js.map