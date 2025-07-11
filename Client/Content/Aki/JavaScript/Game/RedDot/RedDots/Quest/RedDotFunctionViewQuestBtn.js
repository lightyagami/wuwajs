"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFunctionViewQuestBtn = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionViewQuestBtn extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck() {
    var e;
    for ([e] of ModelManager_1.ModelManager.QuestNewModel.GetAllRedDotData()) {
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (t && t.CanShowInUiPanel()) {
        return true;
      }
    }
    return false;
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotFunctionViewQuestBtn = RedDotFunctionViewQuestBtn;
//# sourceMappingURL=RedDotFunctionViewQuestBtn.js.map