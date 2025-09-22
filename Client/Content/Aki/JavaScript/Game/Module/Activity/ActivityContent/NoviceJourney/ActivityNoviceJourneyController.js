"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNoviceJourneyController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityNoviceJourneyData_1 = require("./ActivityNoviceJourneyData");
const ActivitySubViewNoviceJourney_1 = require("./ActivitySubViewNoviceJourney");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityNoviceJourneyController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.sNe = 0;
    this.x2e = () => {
      if (this.sNe !== 0) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.sNe);
      }
    };
    this.w2e = e => {
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.sNe).SetReceiveData(e.Tps);
    };
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerLevelChanged, this.x2e);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16811, this.w2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16811);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleLevel";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewNoviceJourney_1.ActivitySubViewNoviceJourney();
  }
  OnCreateActivityData(e) {
    this.sNe = e.s5n;
    return new ActivityNoviceJourneyData_1.ActivityNoviceJourneyData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  RequestReward(t) {
    var e = Protocol_1.Aki.Protocol.Ahs.create();
    e.F6n = t;
    Net_1.Net.Call(23275, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22660);
      } else {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.sNe).AddReceivedData(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.sNe);
      }
    });
  }
}
exports.ActivityNoviceJourneyController = ActivityNoviceJourneyController;
//# sourceMappingURL=ActivityNoviceJourneyController.js.map