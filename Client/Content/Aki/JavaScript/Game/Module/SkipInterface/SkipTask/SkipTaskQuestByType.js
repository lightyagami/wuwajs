"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskQuestByType = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskQuestByType extends SkipTask_1.SkipTask {
  OnRun(e) {
    var e = Number(e);
    if (e === undefined || e < 0) {
      UiManager_1.UiManager.OpenView("QuestView");
    } else {
      e = ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(e);
      UiManager_1.UiManager.OpenView("QuestView", e?.Id ?? undefined);
      this.Finish();
    }
  }
}
exports.SkipTaskQuestByType = SkipTaskQuestByType;
//# sourceMappingURL=SkipTaskQuestByType.js.map