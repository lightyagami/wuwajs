"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityPreWarmData extends ActivityData_1.ActivityBaseData {
  PhraseEx(e) {
    ModelManager_1.ModelManager.ActivityPreWarmModel?.CreateCollectItemData(this.Id);
  }
  GetExDataRedPointShowState() {
    return this.IsHasNewQuestRedDot();
  }
  IsHasNewQuestRedDot() {
    var e = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetAllCollectItemData();
    if (e !== undefined) {
      for (const r of e.values()) {
        var t = r.GetQuestId();
        if (t !== undefined) {
          var a = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(t);
          if (a === 2) {
            if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 1, t, 0, 0) === 1) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  RemoveQuestRedDot(e) {
    if (ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 1, e, 0, 0) === 1) {
      ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, e, 0, 0, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetExDataFinishShowState() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && ModelManager_1.ModelManager.ActivityPreWarmModel.IsAllFinish();
  }
}
exports.ActivityPreWarmData = ActivityPreWarmData;
//# sourceMappingURL=ActivityPreWarmData.js.map