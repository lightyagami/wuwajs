"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityPreWarmData_1 = require("./ActivityPreWarmData");
const ActivitySubViewPreWarm_1 = require("./ActivitySubViewPreWarm");
class ActivityPreWarmController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.DSe = (e, t) => {
      if (ModelManager_1.ModelManager.ActivityPreWarmModel?.IsHasQuest(e) && this.Data !== undefined) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.Data?.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Data?.Id);
      }
    };
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnOpenView(e) {}
  async OnOpenSubView(e) {
    var t = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetProgressId();
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityPreWarm", 87, "找不到当前正在进行的id");
      }
      return Promise.resolve(false);
    } else {
      t = {
        Id: t,
        IsParsing: true,
        ActivityId: this.Data?.Id
      };
      UiManager_1.UiManager.OpenView(e, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ActivityPreWarm", 87, "打开预热活动界面（解析）");
      }
      return Promise.resolve(true);
    }
  }
  OnGetActivityResource(e) {
    return "UiItem_PreheatActivityMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewPreWarm_1.ActivitySubViewPreWarm();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityPreWarmData_1.ActivityPreWarmData();
    return this.Data;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
}
exports.ActivityPreWarmController = ActivityPreWarmController;
//# sourceMappingURL=ActivityPreWarmController.js.map