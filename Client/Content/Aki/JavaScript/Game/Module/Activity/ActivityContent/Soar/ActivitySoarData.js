"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySoarData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const SOAR_RED_DOT_CACHE_KEY = 100;
class ActivitySoarData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.FRe = 0;
  }
  PhraseEx(t) {
    t = t.Qzc;
    if (t) {
      this.FRe = t.B5n;
    }
  }
  GetExDataFinishShowState() {
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(this.FRe);
  }
  GetExDataRedPointShowState() {
    return !this.GetExDataFinishShowState() && this.IsFirstClick();
  }
  IsFirstClick() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, SOAR_RED_DOT_CACHE_KEY, 0, 0) === 0;
  }
  SaveFirstClick() {
    if (this.IsFirstClick()) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, SOAR_RED_DOT_CACHE_KEY, 0, 0, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetQuestId() {
    return this.FRe;
  }
}
exports.ActivitySoarData = ActivitySoarData;
//# sourceMappingURL=ActivitySoarData.js.map