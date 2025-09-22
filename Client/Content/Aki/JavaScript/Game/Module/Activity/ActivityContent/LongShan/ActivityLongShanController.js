"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLongShanController = undefined;
const LongShanActivityConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LongShanActivityConfigByActivityId");
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityLongShanData_1 = require("./ActivityLongShanData");
const ActivitySubViewLongShan_1 = require("./ActivitySubViewLongShan");
const ActivitySubViewRoleGrowing_1 = require("./RoleGrowing/ActivitySubViewRoleGrowing");
const ActivitySubViewSevenHills_1 = require("./SevenHills/View/ActivitySubViewSevenHills");
const ActivitySubViewTheme26_1 = require("./Theme26/ActivitySubViewTheme26");
class ActivityLongShanController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.TOe = e => {
      for (const t of ActivityLongShanController.wja()) {
        t.UpdateStage(e.gMs);
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const t of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_LongShanMainActivity)) {
      if (!t.CheckIfInShowTime()) {
        let e = [];
        switch (LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(t.Id)?.Type) {
          case 2:
            e = ["RoleGrowingMainView", "RoleGrowingTaskView"];
            break;
          case 3:
            e = ["SevenHillsMainView", "SevenHillsStageTaskView"];
            break;
          case 4:
            e = ["Theme26MainView", "Theme26StageTaskView"];
        }
        for (const i of e) {
          if (UiManager_1.UiManager.IsViewOpen(i)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    switch (LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(e.Id)?.Type) {
      case 1:
        return "UiItem_LongshanMain";
      case 2:
        return "UiItem_ActivityRoleGrowing";
      case 3:
        return "UiItem_QiQiuGuide";
      case 4:
        return "UiItem_ActivityThemeGuide26";
      default:
        return "UiItem_LongshanMain";
    }
  }
  OnCreateSubPageComponent(e) {
    switch (LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(e.Id)?.Type) {
      case 1:
        return new ActivitySubViewLongShan_1.ActivitySubViewLongShan();
      case 2:
        return new ActivitySubViewRoleGrowing_1.ActivitySubViewRoleGrowing();
      case 3:
        return new ActivitySubViewSevenHills_1.ActivitySubViewSevenHills();
      case 4:
        return new ActivitySubViewTheme26_1.ActivitySubViewTheme26();
      default:
        return new ActivitySubViewLongShan_1.ActivitySubViewLongShan();
    }
  }
  OnCreateActivityData(e) {
    return new ActivityLongShanData_1.ActivityLongShanData();
  }
  OnActivityFirstUnlock(e) {
    switch (LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(e.Id)?.Type) {
      case 1:
        UiManager_1.UiManager.OpenView("LongShanUnlockView");
        break;
      case 3:
        UiManager_1.UiManager.OpenView("ActivityUnlockTipSevenHillsView");
        break;
      case 4:
        UiManager_1.UiManager.OpenView("Theme26UnlockTipView");
    }
  }
  OnInit() {
    ActivityLongShanController.DOe = [];
    return true;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18435, this.TOe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18435);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityLongShanController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityLongShanController.qdi);
  }
  static wja() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_LongShanMainActivity);
  }
  static ShowUnlockTip(e) {
    e = LongShanStageById_1.configLongShanStageById.GetConfig(e);
    e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.OpenConditionId);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, new LguiUtil_1.TableTextArgNew(e));
  }
  static TakeTaskReward(t) {
    var e;
    if (!this.DOe.includes(t)) {
      this.DOe.push(t);
      (e = Protocol_1.Aki.Protocol.Igs.create()).B6n = [t];
      Net_1.Net.Call(24693, e, e => {
        if (e) {
          this.DOe.splice(this.DOe.indexOf(t), 1);
        }
      });
    }
  }
  static RequestScoreReward(t, e) {
    var i = Protocol_1.Aki.Protocol.rK1.create();
    i.w6n = t;
    i.BVn = e;
    Net_1.Net.Call(22689, i, e => {
      if (e) {
        if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 27448);
        } else {
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(t).UpdateScoreRewardStatus(e.nK1);
        }
      }
    });
  }
}
(exports.ActivityLongShanController = ActivityLongShanController).DOe = [];
ActivityLongShanController.qdi = (e, t) => {
  var i = ActivityLongShanController.wja();
  if (i.length !== 0) {
    for (const n of i) {
      if (n.ScoreItemId === e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n.Id);
      }
    }
  }
}; //# sourceMappingURL=ActivityLongShanController.js.map