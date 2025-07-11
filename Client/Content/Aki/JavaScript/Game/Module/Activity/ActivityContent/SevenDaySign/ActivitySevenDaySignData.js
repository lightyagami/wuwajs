"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySevenDaySignData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ActivitySevenDaySignData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.B3e = undefined;
  }
  PhraseEx(t) {
    this.B3e = t.Ops.pps;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 37, "[ActivitySevenDaySign][Phrase]签到活动签到状态打印", ["ActivityId", this.Id], ["SignStateList", this.B3e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.Id);
  }
  GetExDataRedPointShowState() {
    for (const t of this.B3e) {
      if (t === Protocol_1.Aki.Protocol.zps.CMs) {
        return true;
      }
    }
    return false;
  }
  UpdateActivityData(t) {
    this.B3e[t.c5n] = t.zps;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 37, "[ActivitySevenDaySign][UpdateData]签到活动签到状态改变", ["ActivityId", this.Id], ["SignIndex", t.c5n], ["SignState", t.zps], ["SignStateList", this.B3e]);
    }
  }
  SetRewardToGotState(t) {
    this.B3e[t] = Protocol_1.Aki.Protocol.zps.ovs;
  }
  GetRewardByDay(t) {
    t = ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivityRewardByDay(this.Id, t);
    if (t) {
      return [t];
    }
  }
  GetBigRewardIcon(t) {
    return ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(t)?.ImportantRewardIcon;
  }
  GetRewardStateByDay(t) {
    return this.B3e[t];
  }
  GetImportantItemIndex() {
    var t = ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(this.Id);
    if (t) {
      return t.ImportantRewardIndex;
    } else {
      return 0;
    }
  }
  GetImportantRewardType() {
    var t = ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(this.Id);
    if (t) {
      return t.ImportantRewardType;
    } else {
      return 0;
    }
  }
}
exports.ActivitySevenDaySignData = ActivitySevenDaySignData;
//# sourceMappingURL=ActivitySevenDaySignData.js.map