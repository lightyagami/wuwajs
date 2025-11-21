"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthCardController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const SplashScreenController_1 = require("../../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../../SplashScreen/SplashScreenTask");
class MonthCardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static H2i(e) {
    ModelManager_1.ModelManager.MonthCardModel.SetRemainDays(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveMonthCardDataEvent);
  }
  static async RequestMonthCardData() {
    var e = Protocol_1.Aki.Protocol.vhs.create();
    var e = await Net_1.Net.CallAsync(15529, e);
    if (e) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.H2i(e.Pbs);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23358);
      }
    }
  }
  static j2i() {
    if (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView) {
      MonthCardController.W2i(false);
    }
  }
  static K2i(e = false) {
    var r;
    if (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView) {
      r = new SplashScreenTask_1.SplashScreenTask(1, 0, () => {
        MonthCardController.W2i(true);
      });
      SplashScreenController_1.SplashScreenController.PushSplashScreenTask(r, e);
    }
  }
  static W2i(e) {
    if (!UiManager_1.UiManager.IsViewOpen("MonthCardRewardView")) {
      UiManager_1.UiManager.OpenView("MonthCardRewardView", e);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.NTn);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.NTn);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23112, MonthCardController.Q2i);
    Net_1.Net.Register(25536, MonthCardController.X2i);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23112);
    Net_1.Net.UnRegister(25536);
  }
}
exports.MonthCardController = MonthCardController;
(_a = MonthCardController).NTn = () => {
  MonthCardController.K2i();
};
MonthCardController.xkt = () => {
  _a.RequestMonthCardData();
};
MonthCardController.Q2i = e => {
  var r = e.m9n;
  var t = e.L8n;
  var e = e.Pbs;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Shop", 37, "MonthCard:【月卡每日奖励】信息推送 - MonthCardDailyRewardNotify", ["Count", r], ["itemId", t], ["remainDays", e]);
  }
  var t = [{
    IncId: 0,
    ItemId: t
  }, r];
  ModelManager_1.ModelManager.MonthCardModel.ServerDailyReward = t;
  ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = true;
  MonthCardController.H2i(e);
  MonthCardController.K2i(true);
};
MonthCardController.X2i = e => {
  var r = e.Pbs;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Shop", 37, "MonthCard:【月卡购买通知】-MonthCardBuyNotify-信息推送", ["remainDays", r]);
  }
  var e = [{
    IncId: 0,
    ItemId: e.L8n
  }, e.m9n];
  ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward = e;
  if (ModelManager_1.ModelManager.MonthCardModel.GetRemainDays() < 0) {
    ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = true;
  }
  MonthCardController.H2i(r);
  if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
    if ((r = (e = ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward)[0].ItemId) !== 0) {
      r = new RewardItemData_1.RewardItemData(r, e[1]);
      (e = new Array()).push(r);
      r = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId();
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(r, e, () => {
        MonthCardController.j2i();
      });
    } else {
      MonthCardController.j2i();
    }
  }
};
MonthCardController.e9e = (e, r) => {
  e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
  let t = e.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenMonthCard);
  if (t = t || e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UseMonthCard");
  }
}; //# sourceMappingURL=MonthCardController.js.map