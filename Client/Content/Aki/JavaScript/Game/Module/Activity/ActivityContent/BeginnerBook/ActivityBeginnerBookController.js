"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBeginnerBookController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityBeginnerBookData_1 = require("./ActivityBeginnerBookData");
const ActivitySubViewBeginnerBook_1 = require("./ActivitySubViewBeginnerBook");
class ActivityBeginnerBookController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.sNe = 0;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_BeginnerBook";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewBeginnerBook_1.ActivitySubViewBeginnerBook();
  }
  OnCreateActivityData(e) {
    this.sNe = e.s5n;
    return new ActivityBeginnerBookData_1.ActivityBeginnerBookData();
  }
  async NewJourneyRequest() {
    const i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.sNe);
    var e = Protocol_1.Aki.Protocol.Uhs.create();
    e.B6n = i.AllBeginnerTargetList;
    var e = await Net_1.Net.CallAsync(25861, e);
    for (const r of e.eBs) {
      i.UnLockBeginnerMap.set(r.Jbs, r.zbs);
      i.FinishBeginnerMap.set(r.Jbs, r.Zbs);
    }
    i.AllBeginnerTargetList.sort((e, r) => {
      var t = i.FinishBeginnerMap.get(e) ? 1 : 0;
      var o = i.FinishBeginnerMap.get(r) ? 1 : 0;
      if (t == o) {
        e = ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(e);
        r = ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(r);
        return e.Sort - r.Sort;
      } else {
        return t - o;
      }
    });
  }
  OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Activity", 5, "初始化鸣域新程");
    }
    return true;
  }
  OnClear() {
    return true;
  }
}
exports.ActivityBeginnerBookController = ActivityBeginnerBookController;
//# sourceMappingURL=ActivityBeginnerBookController.js.map