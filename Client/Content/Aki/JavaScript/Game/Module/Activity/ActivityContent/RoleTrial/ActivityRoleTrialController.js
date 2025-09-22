"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleTrialController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityController_1 = require("../../ActivityController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRoleTrialData_1 = require("./ActivityRoleTrialData");
const ActivitySubViewRoleTrial_1 = require("./ActivitySubViewRoleTrial");
class ActivityRoleTrialController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Y2e = e => {
      var t;
      if (e && (t = ActivityRoleTrialController.J2e()) && t.IsRolePreviewOn() && (e = t.TrialToIdMap.get(e))) {
        t.CurrentRoleId = e;
      }
    };
    this.nye = () => {
      var e = ActivityRoleTrialController.J2e();
      if (e && e.IsRoleInstanceOn() && !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ActivityController_1.ActivityController.OpenActivityById(ActivityRoleTrialController.CurrentActivityId);
      }
    };
    this.z2e = e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17707);
        e = {
          ButtonTextId: "ConfirmBox_250_ButtonText_0",
          DescriptionTextId: undefined,
          IsTimeDownCloseView: false,
          IsClickedCloseView: true,
          OnClickedCallback: function () {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
          }
        };
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.ROLE_TRIAL_ERROR_RESULT, false, undefined, undefined, undefined, [e]);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(17707, this.z2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17707);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Y2e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Y2e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
  }
  static J2e() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityRoleTrialController.CurrentActivityId);
    if (e) {
      return e;
    }
  }
  static GetCurrentActivityDataList() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_RoleTrialActivity);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleTrial";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoleTrial_1.ActivitySubViewRoleTrial();
  }
  OnCreateActivityData(e) {
    return new ActivityRoleTrialData_1.ActivityRoleTrialData();
  }
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static RequestRoleInstanceReward(t) {
    var e = new Protocol_1.Aki.Protocol.xus();
    e.Q6n = t;
    Net_1.Net.Call(20643, e, e => {
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23740), e = this.J2e())) {
        e.SetRewardStateByRoleId(t, 2);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Activity", 37, "[角色试用活动]试用副本奖励领取成功", ["RoleId", t]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ActivityRoleTrialController.CurrentActivityId);
      }
    });
  }
  static async EnterRoleTrialDungeonDirectly(e, t, r) {
    t = {
      w6n: t,
      Q6n: r
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.jah = t;
    return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, [], 0, 0);
  }
  static PushRoleIntroductionViewDone() {
    var e = Protocol_1.Aki.Protocol.Wp_.create();
    Net_1.Net.Send(17199, e);
  }
}
(exports.ActivityRoleTrialController = ActivityRoleTrialController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityRoleTrialController.js.map