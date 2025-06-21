"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityMoraleData = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityManager_1 = require("../../ActivityManager");
class ActivityMoraleData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    var e = ModelManager_1.ModelManager.MoraleModel;
    return !!e.RedDotScoreBox() || !!e.RedDotAreaBuff() || e.RedDotFlagBox()
  }
  PhraseEx(e) {
    e = e.n91;
    e && (ModelManager_1.ModelManager.MoraleModel.InitActivityData(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "Data PhraseEx", ["", e], ["Id", this.Id], ["Type", this.Type]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleFlagBox))
  }
  GetController() {
    return ActivityManager_1.ActivityManager.GetActivityController(this.Type)
  }
}
exports.ActivityMoraleData = ActivityMoraleData;
//# sourceMappingURL=ActivityMoraleData.js.map