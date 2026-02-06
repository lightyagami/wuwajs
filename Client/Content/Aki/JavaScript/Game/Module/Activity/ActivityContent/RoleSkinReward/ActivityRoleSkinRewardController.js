"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleSkinRewardController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRoleSkinRewardData_1 = require("./ActivityRoleSkinRewardData");
const ActivityRoleSkinRewardSubView_1 = require("./ActivityRoleSkinRewardSubView");
class ActivityRoleSkinRewardController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.I1g = e => {
      if (e.ob_) {
        ActivityRoleSkinRewardController.GetSkinRewardData().UpdateSkinRewardState(e.ob_.v9n, e.ob_.Y4n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, ActivityRoleSkinRewardController.ActivityId);
      }
    };
  }
  OnOpenView(e) {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(19069, this.I1g);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19069);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoverSkinMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityRoleSkinRewardSubView_1.ActivityRoleSkinRewardSubView();
  }
  OnCreateActivityData(e) {
    ActivityRoleSkinRewardController.ActivityId = e.s5n;
    return new ActivityRoleSkinRewardData_1.ActivityRoleSkinRewardData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetSkinRewardData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_SkinRewardActivity);
    let t = undefined;
    return t = e ? e[0] : t;
  }
}
(exports.ActivityRoleSkinRewardController = ActivityRoleSkinRewardController).ActivityId = 0;
//# sourceMappingURL=ActivityRoleSkinRewardController.js.map