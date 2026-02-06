"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityEncircleController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RewardData_1 = require("../../../ItemReward/RewardData/RewardData");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityEncircleData_1 = require("./ActivityEncircleData");
const ActivityEncircleSubView_1 = require("./ActivityEncircleSubView");
const EncirclePlayLevelController_1 = require("./EncirclePlayLevelController");
class ActivityEncircleController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.BTg = e => {
      for (const r of e.mps) {
        ActivityEncircleController.GetEncircleData().UpdateChallengeInfo(r);
      }
    };
  }
  OnOpenView(e) {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(17554, this.BTg);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17554);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityEncircleMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityEncircleSubView_1.ActivityEncircleSubView();
  }
  OnCreateActivityData(e) {
    ActivityEncircleController.ActivityId = e.s5n;
    return new ActivityEncircleData_1.ActivityEncircleData();
  }
  static GetEncircleData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_Encircle);
    let r = undefined;
    return r = e ? e[0] : r;
  }
  BuildRewardData(e) {
    var r = EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentChallengeId();
    var t = ActivityEncircleController.GetEncircleData();
    var t = {
      IsSuccess: true,
      Score: EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetTotalRound(),
      RecordScore: t ? t.GetChallengeRecord(r) : 0,
      CommonItems: e,
      Type: 3,
      ViewName: "EncircleResultView"
    };
    return new RewardData_1.RewardData(t);
  }
  static GetRedPointShow() {
    var e = ActivityEncircleController.ActivityId;
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleGroups(e);
    if (e) {
      var r = ActivityEncircleController.GetEncircleData();
      if (r) {
        for (const t of e) {
          if (r.CheckGroupRedPointShow(t.Id)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static SendCompleteRequest(e, r) {
    Net_1.Net.Call(25274, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29141);
        }
        r();
      }
    });
  }
  static SendEnterRequest(e, r) {
    Net_1.Net.Call(28541, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29141);
        }
        r();
      }
    });
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
}
(exports.ActivityEncircleController = ActivityEncircleController).ActivityId = 0;
//# sourceMappingURL=ActivityEncircleController.js.map