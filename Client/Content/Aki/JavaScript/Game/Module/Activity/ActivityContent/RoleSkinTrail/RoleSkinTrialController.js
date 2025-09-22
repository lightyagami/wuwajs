"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinTrialController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const RoleSkinTrialData_1 = require("./RoleSkinTrialData");
const RoleSkinTrialSubView_1 = require("./RoleSkinTrialSubView");
class RoleSkinTrialController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.p7l = e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22421);
        e = {
          ButtonTextId: "ConfirmBox_250_ButtonText_0",
          DescriptionTextId: undefined,
          IsTimeDownCloseView: false,
          IsClickedCloseView: true,
          OnClickedCallback: function () {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
          }
        };
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(ItemRewardDefine_1.ROLE_SKIN_TRIAL_ERROR_RESULT, false, undefined, undefined, undefined, [e]);
      }
    };
  }
  OnCreateActivityData(e) {
    return new RoleSkinTrialData_1.RoleSkinTrialData();
  }
  OnCreateSubPageComponent(e) {
    return new RoleSkinTrialSubView_1.RoleSkinTrialSubView();
  }
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleSkinOntrial";
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22421, this.p7l);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22421);
  }
  static CheckIfInRoleSkinTrialInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return !!e && e.InstSubType === 26;
  }
  static RequestRoleSkinTrailInstanceReward(r, n) {
    var e = new Protocol_1.Aki.Protocol.bv_();
    e.v7l = n;
    Net_1.Net.Call(17718, e, e => {
      if (e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26218), e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(r))) {
        e.FinishRewardById(n);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Activity", 27, "[角色皮肤试用活动]试用副本奖励领取成功", ["id", n]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r);
      }
    });
  }
  static EnterRoleTrialDungeonDirectly(e, r, n) {
    r = {
      w6n: r,
      v7l: n
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.y7l = r;
    InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, [], 0, 0);
  }
  static RequestRoleSkinTrialUiEndPush() {
    var e = Protocol_1.Aki.Protocol.Wp_.create();
    Net_1.Net.Send(28659, e);
  }
}
(exports.RoleSkinTrialController = RoleSkinTrialController).CurrentActivityId = 0;
//# sourceMappingURL=RoleSkinTrialController.js.map