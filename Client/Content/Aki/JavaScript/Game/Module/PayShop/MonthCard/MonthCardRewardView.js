"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthCardRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const SplashScreenController_1 = require("../../SplashScreen/SplashScreenController");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
class MonthCardRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Jkt = 0;
    this.Y2i = 0;
    this.J2i = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(12);
      var e = new RewardItemData_1.RewardItemData(this.Jkt, this.Y2i);
      var r = new Array();
      r.push(e);
      var e = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId();
      const t = this.OpenParam;
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(e, r, () => {
        if (t) {
          SplashScreenController_1.SplashScreenController.FinishCurTask(1);
        }
      });
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.JSi = () => {
      this.Og();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.J2i]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReceiveMonthCardDataEvent, this.JSi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReceiveMonthCardDataEvent, this.JSi);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MonthCardModel.LocalDailyReward;
    this.Jkt = e[0].ItemId;
    this.Y2i = e[1];
    this.Og();
    this.UiViewSequence.PlaySequence("Loop");
  }
  Og() {
    ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = false;
    this.GetText(1).SetText(ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText("e2b54e"));
  }
}
exports.MonthCardRewardView = MonthCardRewardView;
//# sourceMappingURL=MonthCardRewardView.js.map