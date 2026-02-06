"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pendingProcessExCheckList = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
class PendingProcessControllerRuleConfigBase {}
class SpringManorPendingProcessControllerRuleConfig extends PendingProcessControllerRuleConfigBase {
  IsActive() {
    return ModelManager_1.ModelManager.SpringManorModel?.CheckInInstance() ?? false;
  }
  PendingProgressExCheck(e) {
    var r = ModelManager_1.ModelManager.SpringManorModel;
    switch (e.ProcessType) {
      case 0:
        var n = e.ShowData;
        if (n) {
          return ModelManager_1.ModelManager.BattleUiModel.CheckMissionViewItem(n, e.Reason) === 2 || r.IsActivityQuest(n.TreeConfigId ?? 0);
        } else {
          return false;
        }
      case 2:
        n = e.ShowData;
        if (n) {
          return ModelManager_1.ModelManager.BattleUiModel.CheckMissionViewItem(e.ShowData, 0) === 2 || r.IsActivityQuest(n.TreeConfigId ?? 0);
        } else {
          return false;
        }
      case 3:
        return r.IsMainQuest(e.Info.QuestId ?? 0);
    }
    return true;
  }
}
exports.pendingProcessExCheckList = [new SpringManorPendingProcessControllerRuleConfig()];
//# sourceMappingURL=PendingProcessControllerRuleConfig.js.map