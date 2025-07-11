"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattleViewQuestBtn = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewQuestBtn extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck() {
    var e;
    var t = ModelManager_1.ModelManager.QuestNewModel.GetAllRedDotData();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "开始检测主界面任务红点", ["红点数据量", t?.size]);
    }
    for ([e] of t) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (r && r.CanShowInUiPanel()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "主界面任务红点", ["红点任务", r.Id]);
        }
        return true;
      }
    }
    return false;
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotBattleViewQuestBtn = RedDotBattleViewQuestBtn;
//# sourceMappingURL=RedDotBattleViewQuestBtn.js.map