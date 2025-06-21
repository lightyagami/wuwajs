"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityDirectTrainData = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityDirectTrainHelper_1 = require("./ActivityDirectTrainHelper");
class ActivityDirectTrainData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.DPl = void 0
  }
  PhraseEx(e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ActivityDirectTrain", 63, "[剧情直通车]PhraseEx()->", ["直通车数据, data:", e]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainDataUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate)
  }
  get HaveDisplayedGotoRedDot() {
    var e;
    return void 0 === this.DPl && (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayed, !1), this.DPl = e), this.DPl
  }
  set HaveDisplayedGotoRedDot(e) {
    this.DPl !== e && ((this.IsUnLock() || ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen) && LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayed, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)), this.DPl = e
  }
  IsShowRedDot() {
    var e;
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) && (e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(), 3 !== ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)) && !this.HaveDisplayedGotoRedDot && this.IsUnLock()
  }
  get RedPointShowState() {
    if (!this.CheckIfInShowTime()) return !1;
    try {
      return this.IsShowRedDot()
    } catch (e) {
      return e instanceof Error && Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("Activity", 37, "[Activity] 活动红点异常", e, ["id", this.Id], ["error", e.message]), !1
    }
  }
}
exports.ActivityDirectTrainData = ActivityDirectTrainData;
//# sourceMappingURL=ActivityDirectTrainData.js.map