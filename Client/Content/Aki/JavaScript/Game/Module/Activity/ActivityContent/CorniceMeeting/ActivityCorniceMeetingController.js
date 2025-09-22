"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityCorniceMeetingData_1 = require("./ActivityCorniceMeetingData");
const ActivitySubViewCorniceMeeting_1 = require("./ActivitySubViewCorniceMeeting");
class ActivityCorniceMeetingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.vSn = e => {
      var t = ActivityCorniceMeetingController.GetCurrentActivityData();
      if (t &&= t.GetLevelEntryData(e._ps)) {
        if (e.tM_) {
          t.MaxScore = e.SMs;
        }
        t.CurrentScore = e.SMs;
        if (e.iM_) {
          t.RemainTime = e.ZS_;
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCorniceMeetingRedDot, e._ps);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeConfig(e._ps).ActivityId);
        UiManager_1.UiManager.OpenView("CorniceMeetingSettleView", e);
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_AbnormalData";
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(19751, this.vSn);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19751);
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewCorniceMeeting_1.ActivitySubViewCorniceMeeting();
  }
  OnCreateActivityData(e) {
    ActivityCorniceMeetingController.ActivityId = e.s5n;
    return new ActivityCorniceMeetingData_1.ActivityCorniceMeetingData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetCurrentActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(ActivityCorniceMeetingController.ActivityId);
  }
  static CorniceMeetingRewardRequest(t, r, i) {
    var e = new Protocol_1.Aki.Protocol.ym_();
    e._ps = t;
    e.t8n = r;
    Net_1.Net.Call(29859, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29859);
      } else {
        this.GetCurrentActivityData().UpdateRewarded(t, r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCorniceMeetingRedDot, t);
        i();
      }
    });
  }
  static CorniceMeetingChallengeTransRequest(e) {
    var t = new Protocol_1.Aki.Protocol.Cf_();
    t._ps = e;
    Net_1.Net.Call(18498, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18498);
      }
    });
  }
}
(exports.ActivityCorniceMeetingController = ActivityCorniceMeetingController).ActivityId = 0;
//# sourceMappingURL=ActivityCorniceMeetingController.js.map