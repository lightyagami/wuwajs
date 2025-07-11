"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotQuestViewTab = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotQuestViewTab extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck(e) {
    for (const n of ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(e)) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(n.Id);
      if (r) {
        for (const o of r) {
          if (o.CanShowInUiPanel()) {
            if (ModelManager_1.ModelManager.QuestNewModel.CheckQuestRedDotDataState(o.Id) ?? false) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Quest", 18, "RedDotQuestViewTab：任务红点显示", ["mainTypeId", e], ["questId", o.Id]);
              }
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  IsMultiple() {
    return true;
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotQuestViewTab = RedDotQuestViewTab;
//# sourceMappingURL=RedDotQuestViewTab.js.map