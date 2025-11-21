"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPrizeDrawingController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityPrizeDrawingData_1 = require("./ActivityPrizeDrawingData");
const ActivityPrizeDrawingSubView_1 = require("./ActivityPrizeDrawingSubView");
class ActivityPrizeDrawingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.A8d = (e, t) => {
      if (t === Protocol_1.Aki.Protocol.hTs.a3_) {
        this.ActivityData?.QuestCompletedNotify(e);
      }
    };
    this.Xoo = e => {
      this.ActivityData?.QuestAddNotify(e.Id);
    };
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(this.ActivityId);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_PrizeDrawingActivity";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityPrizeDrawingSubView_1.ActivityPrizeDrawingSubView();
  }
  OnCreateActivityData(e) {
    this.ActivityId = e.s5n;
    return new ActivityPrizeDrawingData_1.ActivityPrizeDrawingData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.A8d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.A8d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddNewQuest, this.Xoo);
  }
  async OnOpenSubView(e) {
    if (this.ActivityData && e === "PrizeDrawingMainView" && this.ActivityData.GetPreGuideQuestFinishState()) {
      return (await UiManager_1.UiManager.OpenViewAsync("PrizeDrawingMainView")) !== undefined;
    } else {
      return Promise.resolve(false);
    }
  }
  async GachaRequest() {
    var e = Protocol_1.Aki.Protocol.ROd.create();
    e.w6n = this.ActivityId;
    var e = await Net_1.Net.CallAsync(16568, e);
    if (e) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.ActivityData?.OnAwardsUpdate(e);
        return e;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25416);
    }
  }
}
exports.ActivityPrizeDrawingController = ActivityPrizeDrawingController;
//# sourceMappingURL=ActivityPrizeDrawingController.js.map