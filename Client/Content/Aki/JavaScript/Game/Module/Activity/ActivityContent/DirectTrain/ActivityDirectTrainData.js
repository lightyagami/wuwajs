"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainData = exports.ActivityDirectTrainProParam = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityDirectTrainHelper_1 = require("./ActivityDirectTrainHelper");
class ActivityDirectTrainProParam {
  constructor() {
    this.ActivityDataList = [];
    this.ForceRemindIndex = undefined;
  }
  static LoadDataFromModel() {
    var e = new ActivityDirectTrainProParam();
    e.ActivityDataList = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityDataList;
    e.ForceRemindIndex = ModelManager_1.ModelManager.ActivityDirectTrainModel.ForceRemindIndex;
    return e;
  }
}
exports.ActivityDirectTrainProParam = ActivityDirectTrainProParam;
class ActivityDirectTrainData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.DPl = undefined;
  }
  PhraseEx(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 63, "[剧情直通车]PhraseEx()->", ["直通车数据, data:", e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainDataUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate, this.Id);
  }
  get HaveDisplayedGotoRedDot() {
    var e;
    if (this.DPl === undefined) {
      e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayedByActId) ?? new Set();
      this.DPl = e.has(this.Id);
    }
    return this.DPl;
  }
  set HaveDisplayedGotoRedDot(e) {
    var t;
    if (this.DPl !== e) {
      if (this.IsUnLock() || ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen) {
        t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayedByActId) ?? new Set();
        if (e) {
          t.add(this.Id);
        } else {
          t.delete(this.Id);
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayedByActId, t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate, this.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
    this.DPl = e;
  }
  IsShowRedDot() {
    return !this.GetExDataFinishShowState() && !this.HaveDisplayedGotoRedDot && this.IsUnLock();
  }
  get RedPointShowState() {
    if (!this.CheckIfInShowTime()) {
      return false;
    }
    try {
      return this.IsShowRedDot();
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Activity", 37, "[Activity] 活动红点异常", e, ["id", this.Id], ["error", e.message]);
      }
      return false;
    }
  }
  GetExDataFinishShowState() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(this.Id);
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3;
  }
}
exports.ActivityDirectTrainData = ActivityDirectTrainData;
//# sourceMappingURL=ActivityDirectTrainData.js.map