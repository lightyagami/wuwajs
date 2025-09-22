"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTowerGuideController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewTowerGuide_1 = require("./ActivitySubViewTowerGuide");
const ActivityTowerGuideData_1 = require("./ActivityTowerGuideData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityTowerGuideController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.e4e = (e, t) => {
      var r = ActivityTowerGuideController.t4e();
      if (r) {
        r.RefreshRewardState(t);
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_TowerGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewTowerGuide_1.ActivitySubViewTowerGuide();
  }
  OnCreateActivityData(e) {
    return new ActivityTowerGuideData_1.ActivityTowerGuideData();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerRecordUpdate, this.e4e);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerRecordUpdate, this.e4e);
  }
  static t4e() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityTowerGuideController.CurrentActivityId);
  }
  static RequestTowerReward(e) {
    var t = new Protocol_1.Aki.Protocol.d0s();
    t.i8n = e;
    Net_1.Net.Call(25459, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17729);
        } else {
          ActivityTowerGuideController.RequestTowerRewardInfo();
        }
      }
    });
  }
  static RequestTowerRewardInfo() {
    var e = new Protocol_1.Aki.Protocol.C0s();
    Net_1.Net.Call(21213, e, e => {
      if (e) {
        var t = ActivityTowerGuideController.t4e();
        if (t) {
          for (const r of e.i8n) {
            t.SetRewardClaimed(r, true);
          }
        }
      }
    });
  }
}
(exports.ActivityTowerGuideController = ActivityTowerGuideController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityTowerGuideController.js.map