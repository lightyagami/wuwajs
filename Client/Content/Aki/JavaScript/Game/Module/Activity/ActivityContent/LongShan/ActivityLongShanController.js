"use strict";

var _a;
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
class ActivityLongShanController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.TOe = e => {
      ActivityLongShanController.GetActivityData().UpdateStage(e.gMs);
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    var e = ActivityLongShanController.GetActivityData();
    var e = LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(e.Id);
    let t = [];
    if (e?.Type === 2) {
      t = ["RoleGrowingMainView", "RoleGrowingTaskView"];
    }
    for (const i of t = e?.Type === 3 ? ["SevenHillsMainView", "SevenHillsStageTaskView"] : t) {
      if (UiManager_1.UiManager.IsViewOpen(i)) {
        return true;
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
      default:
        return new ActivitySubViewSevenHills_1.ActivitySubViewSevenHills();
    }
  }
  OnCreateActivityData(e) {
    ActivityLongShanController.LOe = e.s5n;
    return new ActivityLongShanData_1.ActivityLongShanData();
  }
  OnInit() {
    ActivityLongShanController.DOe = [];
    return true;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16689, this.TOe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16689);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityLongShanController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, ActivityLongShanController.qdi);
  }
  static GetActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityLongShanController.LOe);
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
      Net_1.Net.Call(21136, e, e => {
        if (e) {
          this.DOe.splice(this.DOe.indexOf(t), 1);
        }
      });
    }
  }
  static RequestScoreReward(e) {
    var t = Protocol_1.Aki.Protocol.ZQ1.create();
    t.w6n = this.LOe;
    t.BVn = e;
    Net_1.Net.Call(17006, t, e => {
      if (e) {
        if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 27360);
        } else {
          this.GetActivityData().UpdateScoreRewardStatus(e.tK1);
        }
      }
    });
  }
  OnActivityFirstUnlock(e) {
    switch (LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(e.Id)?.Type) {
      case 1:
        UiManager_1.UiManager.OpenView("LongShanUnlockView");
        break;
      case 3:
        UiManager_1.UiManager.OpenView("ActivityUnlockTipSevenHillsView");
    }
  }
}
exports.ActivityLongShanController = ActivityLongShanController;
(_a = ActivityLongShanController).LOe = 0;
ActivityLongShanController.DOe = [];
ActivityLongShanController.qdi = (e, t) => {
  var i = _a.GetActivityData();
  if (i?.ScoreItemId === e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, i.Id);
  }
}; //# sourceMappingURL=ActivityLongShanController.js.map