"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMainLevelTabPanel = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TrapDefenseLevelTabPanel_1 = require("./TrapDefenseLevelTabPanel");
class TrapDefenseMainLevelTabPanel extends TrapDefenseLevelTabPanel_1.TrapDefenseLevelTabPanel {
  constructor() {
    super(...arguments);
    this.ModeData = ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData;
    this.CurSelectDifficulty = 1;
    this.DifficultyTypeList = undefined;
    this.OnSelectDifficulty = e => {
      this.CurSelectDifficulty = e.DifficultyLevel;
      e = this.ModeData.GetLevelDataListByDifficulty(e.DifficultyLevel);
      this.UpdateLevelDataList(e);
    };
    this.OnRedDotLeftVisible = e => {
      e = this.DifficultyTypeList[e].DifficultyLevel;
      return this.ModeData.GetLevelDataListByDifficulty(e).some(e => this.ModeData.GetLevelReachOpenTimeRedDotState(e));
    };
    this.OnRedDotRightVisible = e => {
      e = this.DifficultyTypeList[e].DifficultyLevel;
      return this.ModeData.GetLevelDataListByDifficulty(e).some(e => this.ModeData.GetLevelReachOpenTimeRedDotState(e));
    };
  }
  OnStart() {
    this.PanelDifficultyChange.SetActive(true);
    this.PanelDifficultyChange.OnSelectDifficultyCallback = this.OnSelectDifficulty;
    this.PanelDifficultyChange.OnRedDotLeftVisibleCallback = this.OnRedDotLeftVisible;
    this.PanelDifficultyChange.OnRedDotRightVisibleCallback = this.OnRedDotRightVisible;
  }
  InitSelectDifficulty(e) {
    this.CurSelectDifficulty = e;
  }
  UpdateModeData() {
    var e = this.ModeData.GetDifficultyTypeList();
    var t = e.findIndex(e => e.DifficultyLevel === this.CurSelectDifficulty);
    this.DifficultyTypeList = e;
    this.PanelDifficultyChange.UpdateDataList(e, t);
  }
}
exports.TrapDefenseMainLevelTabPanel = TrapDefenseMainLevelTabPanel;
//# sourceMappingURL=TrapDefenseMainLevelTabPanel.js.map