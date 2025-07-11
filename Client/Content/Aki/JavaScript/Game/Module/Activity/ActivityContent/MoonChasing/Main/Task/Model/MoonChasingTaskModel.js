"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingTaskModel = undefined;
const ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class MoonChasingTaskModel extends ModelBase_1.ModelBase {
  GetBranchLineState(e) {
    e = ConfigManager_1.ConfigManager.TaskConfig.GetBranchLineTaskById(e);
    if (e === undefined) {
      return 0;
    } else {
      return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.TaskId);
    }
  }
  GetMainLineState(e) {
    e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(e);
    if (e === undefined) {
      return 0;
    } else {
      return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.TaskId);
    }
  }
  GetFirstReadyBranchTask() {
    for (const a of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask()) {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a.TaskId);
      if (e === 1 || e === 2) {
        return a.Id;
      }
    }
    return 0;
  }
}
exports.MoonChasingTaskModel = MoonChasingTaskModel;
//# sourceMappingURL=MoonChasingTaskModel.js.map