"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLinkageData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ActivityLinkageById_1 = require("../../../../../Core/Define/ConfigQuery/ActivityLinkageById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityLinkageDefine_1 = require("./ActivityLinkageDefine");
const ACTIVITYLINKAGE_RED_DOT_CACHE_KEY = 100;
class ActivityLinkageData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TabDataMap = new Map();
  }
  PhraseEx(e) {
    e = e.En1;
    if (e && e.R5n) {
      for (const t of e.R5n) {
        let e = this.TabDataMap.get(t.Tn1);
        (e = e || new ActivityLinkageDefine_1.ActivityLinkageTabData()).TabId = t.Tn1;
        e.StartTimeStamp = MathUtils_1.MathUtils.LongToNumber(t.Mps);
        e.EndTimeStamp = MathUtils_1.MathUtils.LongToNumber(t.dps);
        e.IsReceive = t.bn1;
        e.IsInShowTimeChange();
        this.TabDataMap.set(t.Tn1, e);
      }
    }
  }
  ReceiveReward(e) {
    var t = this.TabDataMap.get(e);
    if (t) {
      t.IsReceive = true;
      this.TabDataMap.set(e, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 71, "活动联合页领取奖励，页签数据错误", ["tabId", e]);
    }
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, ACTIVITYLINKAGE_RED_DOT_CACHE_KEY, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetExDataRedPointShowState() {
    if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, ACTIVITYLINKAGE_RED_DOT_CACHE_KEY, 0, 0) === 0) {
      return true;
    }
    for (const e of Array.from(this.TabDataMap.values()).filter(e => e.IsInShowTime)) {
      if (!e.IsReceive) {
        return true;
      }
    }
    return false;
  }
  IsReceiveReward(e) {
    var t = this.TabDataMap.get(e);
    if (t) {
      return t.IsReceive;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 71, "活动联动页页签id未找到", ["tabId", e]);
      }
      return false;
    }
  }
  IsNeedShowTabsChange() {
    let e = false;
    for (const t of this.TabDataMap.values()) {
      if (t.IsInShowTimeChange()) {
        e = true;
      }
    }
    return e;
  }
  GetTabInfoList() {
    this.IsNeedShowTabsChange();
    return Array.from(this.TabDataMap.values()).filter(e => e.IsInShowTime).sort((e, t) => {
      var i = ActivityLinkageById_1.configActivityLinkageById.GetConfig(e.TabId).Rank;
      var r = ActivityLinkageById_1.configActivityLinkageById.GetConfig(t.TabId).Rank;
      if (i !== r) {
        return r - i;
      } else {
        return t.TabId - e.TabId;
      }
    });
  }
}
exports.ActivityLinkageData = ActivityLinkageData;
//# sourceMappingURL=ActivityLinkageData.js.map