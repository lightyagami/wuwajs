"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class ShopController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this._Mo);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19082, e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 18, "Receive ShopInfoNotify");
      }
      ModelManager_1.ModelManager.ShopModel.VersionId = e.ejn;
      ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.tGs);
    });
    Net_1.Net.Register(20053, e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 18, "Receive ShopUnlockNotify", ["unlockList", e.ABs]);
      }
      this.OnShopUnlockNotify(e);
    });
    Net_1.Net.Register(15138, this.OnShopInfoUpdateNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19082);
    Net_1.Net.UnRegister(20053);
    Net_1.Net.UnRegister(15138);
  }
  static OpenShop(e, o) {
    if (ModelManager_1.ModelManager.ShopModel.IsOpen(e)) {
      if (!UiManager_1.UiManager.IsViewShow("ShopView")) {
        UiManager_1.UiManager.OpenView("ShopView", e, o);
        return true;
      }
    } else if (GlobalData_1.GlobalData.World && (o = ConfigManager_1.ConfigManager.ShopConfig.GetShopName(ModelManager_1.ModelManager.ShopModel.GetShopConfig(e).ShopName))) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopNotOpenTip", o);
    }
    return false;
  }
  static SendShopBuyRequest(o, t, e, r, n) {
    e = Protocol_1.Aki.Protocol.Vms.create({
      ejn: ModelManager_1.ModelManager.ShopModel.VersionId,
      tjn: o,
      s5n: t,
      ijn: e,
      D8n: r,
      AVn: ModelManager_1.ModelManager.ShopModel.CurrentInteractCreatureDataLongId ?? 0
    });
    Net_1.Net.Call(16683, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.ShopModel.UpdateItemData(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Shop", 27, "购买物品成功", ["id", e.s5n], ["buyCount", e.X7n], ["response", e]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BoughtItem, o, t);
          if (n) {
            n();
          }
        } else {
          e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BoughtItem, 0, 0);
        }
      }
    });
  }
  static async SendShopInfoRequest(e) {
    e = Protocol_1.Aki.Protocol.kms.create({
      ejn: e
    });
    e = await Net_1.Net.CallAsync(16965, e);
    return !!e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.ShopModel.VersionId = e.ejn, ModelManager_1.ModelManager.ShopModel.UpdateShopListData(e.tGs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShopInfoResponded)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23621), true);
  }
  static async SendShopUpdateRequestAsync(e) {
    e = Protocol_1.Aki.Protocol.Hms.create({
      tjn: e
    });
    e = await Net_1.Net.CallAsync(25294, e);
    if (e) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.ShopModel.UpdateShopData(e.YVn);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23383);
      }
    }
  }
  static SendShopUpdateRequest(e) {
    e = Protocol_1.Aki.Protocol.Hms.create({
      tjn: e
    });
    Net_1.Net.Call(25294, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.ShopModel.UpdateShopData(e.YVn);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23383);
        }
      }
    });
  }
  static OnShopUnlockNotify(e) {
    for (const t of e.ABs) {
      var o;
      if (ModelManager_1.ModelManager.ShopModel.GetShopInfo(t.tjn) && (o = ModelManager_1.ModelManager.ShopModel.GetShopItem(t.tjn, t.s5n))) {
        o.Z6n = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGoodUnlock);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 27, "新商品解锁", ["id", t.s5n], ["buyCount", t.tjn]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShopUpdate, t.tjn);
      }
    }
  }
}
exports.ShopController = ShopController;
(_a = ShopController)._Mo = () => {
  _a.SendShopInfoRequest(ModelManager_1.ModelManager.ShopModel.VersionId).then(e => {
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShopUpdate, ModelManager_1.ModelManager.ShopModel.OpenItemInfo?.ShopId);
    }
  });
};
ShopController.OnShopInfoUpdateNotify = e => {
  ModelManager_1.ModelManager.ShopModel.UpdateShopData(e.A8s);
}; //# sourceMappingURL=ShopController.js.map