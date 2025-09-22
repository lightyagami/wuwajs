"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayData = exports.CLICKQUESTKEY = exports.CLICKKEY = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
exports.CLICKKEY = 100;
exports.CLICKQUESTKEY = 200;
class ActivityFunPlayData extends ActivityData_1.ActivityBaseData {
  PhraseEx(e) {
    e = e.X$c?.J$c;
    if (e) {
      ModelManager_1.ModelManager.ActivityFunPlayModel.CreateChallengeData(e, this.Id);
    }
  }
  CheckRedDot() {
    if (this.GetPreGuideQuestFinishState()) {
      return this.CheckPreQuestFinishedRedDot();
    } else {
      return this.CheckPreQuestUnFinishRedDot();
    }
  }
  CheckPreQuestFinishedRedDot() {
    return !!this.GetClickRedDotState(exports.CLICKKEY) || ModelManager_1.ModelManager.ActivityFunPlayModel.GetHasInternalRedDot();
  }
  CheckPreQuestUnFinishRedDot() {
    return !!this.GetClickRedDotState(exports.CLICKQUESTKEY);
  }
  GetClickRedDotState(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) === 0;
  }
  SetClickRedDotState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, exports.CLICKKEY, 0, 0, 1);
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, exports.CLICKQUESTKEY, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
  GetExDataFinishShowState() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && ModelManager_1.ModelManager.ActivityFunPlayModel.IsAllRewardClaimed();
  }
}
exports.ActivityFunPlayData = ActivityFunPlayData;
//# sourceMappingURL=ActivityFunPlayData.js.map