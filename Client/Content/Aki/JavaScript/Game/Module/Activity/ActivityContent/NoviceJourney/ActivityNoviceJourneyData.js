"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNoviceJourneyData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityNoviceJourneyData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.B2e = new Set();
  }
  GetExDataRedPointShowState() {
    return this.b2e();
  }
  PhraseEx(e) {
    e = e.kps;
    this.SetReceiveData(e.Tps);
  }
  GetExDataFinishShowState() {
    for (const e of ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetNoticeJourneyConfigList()) {
      if (this.GetRewardStateByLevel(e.Id) !== 3) {
        return false;
      }
    }
    return true;
  }
  b2e() {
    for (const e of ConfigManager_1.ConfigManager.ActivityNoviceJourneyConfig.GetNoticeJourneyConfigList()) {
      if (this.GetRewardStateByLevel(e.Id) === 2) {
        return true;
      }
    }
    return false;
  }
  SetReceiveData(e) {
    for (const t of e) {
      this.B2e.add(t);
    }
  }
  AddReceivedData(e) {
    this.B2e.add(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NoticeJourneyReceive, e);
  }
  CheckRewardReceived(e) {
    return this.B2e.has(e);
  }
  GetRewardStateByLevel(e) {
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel() < e) {
      return 1;
    } else if (this.CheckRewardReceived(e)) {
      return 3;
    } else {
      return 2;
    }
  }
}
exports.ActivityNoviceJourneyData = ActivityNoviceJourneyData;
//# sourceMappingURL=ActivityNoviceJourneyData.js.map