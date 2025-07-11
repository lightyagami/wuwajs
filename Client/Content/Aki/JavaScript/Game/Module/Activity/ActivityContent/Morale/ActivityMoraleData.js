"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMoraleData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityManager_1 = require("../../ActivityManager");
class ActivityMoraleData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    var e = ModelManager_1.ModelManager.MoraleModel;
    return !!e.RedDotScoreBox() || !!e.RedDotAreaBuff() || e.RedDotFlagBox();
  }
  PhraseEx(e) {
    e = e.V91;
    if (e) {
      ModelManager_1.ModelManager.MoraleModel.InitActivityData(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "Data PhraseEx", ["", e], ["Id", this.Id], ["Type", this.Type]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleFlagBox);
    }
  }
  GetController() {
    return ActivityManager_1.ActivityManager.GetActivityController(this.Type);
  }
}
exports.ActivityMoraleData = ActivityMoraleData;
//# sourceMappingURL=ActivityMoraleData.js.map