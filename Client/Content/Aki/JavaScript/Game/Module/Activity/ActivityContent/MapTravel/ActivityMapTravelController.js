"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMapTravelController = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const FormationPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/FormationPropertyById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMapTravelData_1 = require("./ActivityMapTravelData");
const ActivitySubViewMapTravel_1 = require("./View/ActivitySubViewMapTravel");
class ActivityMapTravelController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.DSe = (e, t) => {
      var r = ActivityMapTravelController.GetMapTravelData();
      if (r && r.PhantomQuestIds.has(e)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.Id);
      }
    };
    this.uFl = e => {
      var t = ActivityMapTravelController.GetMapTravelData();
      if (t) {
        if (e.T$s) {
          t.RefreshTravelTaskData(e.T$s);
        }
        if (e.EE_) {
          t.RefreshSoarChallengePlayData(e.EE_);
          ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore = e.EE_.vE_;
        }
        if (e.ME_) {
          t.UnlockAreaData(e.ME_);
        }
        if (e.SE_) {
          t.UnlockPhantom(e.SE_);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15045, this.uFl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15045);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityMapTravelController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityMapTravelController.qdi);
  }
  OnGetActivityResource(e) {
    return "UiItem_TravelMapSubView";
  }
  OnOpenView(e) {}
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMapTravel_1.ActivitySubViewMapTravel();
  }
  OnCreateActivityData(e) {
    return new ActivityMapTravelData_1.ActivityMapTravelData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  static GetMapTravelData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_MapTravelActivity);
    let t = undefined;
    return t = e ? e[0] : t;
  }
  static RequestMapTravelLevelUp(t) {
    var e = Protocol_1.Aki.Protocol.Bp_.create();
    Net_1.Net.Call(20967, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21087);
          t?.(false);
        } else if (e = ActivityMapTravelController.GetMapTravelData()) {
          e.TravelLevel++;
          t?.(true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
          ActivityMapTravelController.eVl(e);
        } else {
          t?.(false);
        }
      } else {
        t?.(false);
      }
    });
  }
  static RequestMultiMapTravelTaskReward(r) {
    var e = Protocol_1.Aki.Protocol.E8u.create();
    e.gps = r;
    Net_1.Net.Call(15087, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15076);
        } else {
          const t = ActivityMapTravelController.GetMapTravelData();
          if (t) {
            r.forEach(e => {
              t.SetTravelTaskDataDone(e);
            });
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapTravelTaskRefresh);
          }
        }
      }
    });
  }
  static RequestTakeTaskFinalReward() {
    var e = Protocol_1.Aki.Protocol.Up_.create();
    Net_1.Net.Call(24756, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28220);
        } else if (e = ActivityMapTravelController.GetMapTravelData()) {
          e.TaskFinalRewardData.IsReceived = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapTravelTaskRefresh);
        }
      }
    });
  }
  static RequestMultiTakeSoarChallengeReward(r) {
    var e = Protocol_1.Aki.Protocol.zHc.create();
    e.B6n = r;
    Net_1.Net.Call(15048, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18956);
        } else {
          const t = ActivityMapTravelController.GetMapTravelData();
          if (t) {
            r.forEach(e => {
              t.SetSoarChallengeRewardDone(e);
            });
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapTravelSoarRefresh);
          }
        }
      }
    });
  }
  static eVl(e) {
    if (!UiManager_1.UiManager.IsViewOpen("TravelLevelTipsView")) {
      UiManager_1.UiManager.OpenView("TravelLevelTipsView", e);
    }
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipMapTravelView");
  }
  static OpenSoarStrengthView(e) {
    var t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetBaseMax(10);
    var r = FormationPropertyById_1.configFormationPropertyById.GetConfig(10);
    var r = {
      Name: r.Name,
      IconPath: r.Icon,
      ShowArrow: true,
      PreText: Math.floor((t - e) / 100).toString(),
      CurText: Math.floor(t / 100).toString()
    };
    var e = {
      Title: "Flying_EnergyUp",
      StrengthUpgradeData: {
        AttributeId: 10,
        SingleStrengthValue: CommonParamById_1.configCommonParamById.GetIntConfig("FlySingleStrengthValue"),
        MaxSingleStrengthItemCount: CommonParamById_1.configCommonParamById.GetIntConfig("FlyMaxSingleStrengthItemCount"),
        MaxStrength: t
      },
      AttributeInfo: [r]
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
  }
}
(exports.ActivityMapTravelController = ActivityMapTravelController).qdi = (e, t) => {
  var r = ActivityMapTravelController.GetMapTravelData();
  if (r && r.GetActivityConfig().ExpItemId === e) {
    if (r.CanTravelLevelUp()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.Id);
    }
    ActivityMapTravelController.eVl(r);
  }
};
//# sourceMappingURL=ActivityMapTravelController.js.map