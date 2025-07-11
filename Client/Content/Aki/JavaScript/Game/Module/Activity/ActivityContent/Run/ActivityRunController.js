"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewRun_1 = require("../../View/SubView/ActivitySubViewRun");
const ActivityRunData_1 = require("./ActivityRunData");
const ActivityRunModel_1 = require("./ActivityRunModel");
class ActivityRunController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return UiManager_1.UiManager.IsViewOpen("ActivityRunView");
  }
  OnOpenView(e) {
    UiManager_1.UiManager.OpenView("ActivityRunView", e);
  }
  OnGetActivityResource(e) {
    return "UiItem_Running";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRun_1.ActivitySubViewRun();
  }
  OnCreateActivityData(e) {
    return new ActivityRunData_1.ActivityRun();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceiveActivityData, ActivityRunController.AFe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceiveActivityData, ActivityRunController.AFe);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20404, ActivityRunController.PFe);
    Net_1.Net.Register(24722, ActivityRunController.xFe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20404);
    Net_1.Net.UnRegister(24722);
  }
  static SelectDefaultChallengeId(e) {
    e = ModelManager_1.ModelManager.ActivityRunModel.GetDefaultOpenUiChallengeIndex(e);
    ModelManager_1.ModelManager.ActivityRunModel.SetStartViewSelectIndex(e);
  }
  static wFe() {
    var e = new Protocol_1.Aki.Protocol.xhs();
    Net_1.Net.Call(18743, e, e => {
      ModelManager_1.ModelManager.ActivityRunModel.OnReceiveMessageData(e);
    });
  }
  static RequestTakeChallengeReward(t, i) {
    var e = new Protocol_1.Aki.Protocol.qhs();
    e.e8n = t;
    e.t8n = i;
    Net_1.Net.Call(24278, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23531);
      } else {
        ModelManager_1.ModelManager.ActivityRunModel.OnGetChallengeReward(t, i);
      }
    });
  }
  static RequestTransToParkourChallenge(e) {
    var t = new Protocol_1.Aki.Protocol.khs();
    t.e8n = e;
    Net_1.Net.Call(24826, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23265);
      } else {
        UiManager_1.UiManager.CloseView("ActivityRunSuccessView");
        UiManager_1.UiManager.CloseView("ActivityRunFailView");
      }
    });
  }
}
(exports.ActivityRunController = ActivityRunController).PFe = e => {
  ModelManager_1.ModelManager.ActivityRunModel.OnReceiveChallengeOpenNotify(e);
};
ActivityRunController.xFe = t => {
  if (t.aUs) {
    var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(t.e8n);
    if (i) {
      var n = i.GetMiniTime();
      var r = i.GetMaxScore();
      i.OnChallengeEnd(t);
      var o = i.GetMiniTime();
      var i = i.GetMaxScore();
      let e = false;
      if (o < n || r < i || n === 0) {
        e = true;
      }
      o = new ActivityRunModel_1.RunEndData();
      o.Phrase(t);
      o.SetIfNewRecord(e);
      UiManager_1.UiManager.OpenView("ActivityRunSuccessView", o);
    }
  } else {
    r = new ActivityRunModel_1.RunEndData();
    r.Phrase(t);
    UiManager_1.UiManager.OpenView("ActivityRunFailView", r);
  }
};
ActivityRunController.AFe = (e, t) => {
  if (e === Protocol_1.Aki.Protocol.uks.Proto_Parkour) {
    ActivityRunController.wFe();
  }
}; //# sourceMappingURL=ActivityRunController.js.map