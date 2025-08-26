"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRougeLevelTabPanel = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TrapDefenseLevelTabPanel_1 = require("./TrapDefenseLevelTabPanel");
class TrapDefenseRougeLevelTabPanel extends TrapDefenseLevelTabPanel_1.TrapDefenseLevelTabPanel {
  constructor() {
    super(...arguments);
    this.ModeData = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData;
  }
  OnStart() {
    this.PanelDifficultyChange.SetActive(false);
  }
  UpdateModeData() {
    this.UpdateLevelDataList(this.ModeData.LevelDataList);
    this.UpdateBdSumProgress();
  }
}
exports.TrapDefenseRougeLevelTabPanel = TrapDefenseRougeLevelTabPanel;
//# sourceMappingURL=TrapDefenseRougeLevelTabPanel.js.map