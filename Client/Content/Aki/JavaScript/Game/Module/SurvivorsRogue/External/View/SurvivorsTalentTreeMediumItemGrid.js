"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentTreeMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class SurvivorsTalentTreeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(i, e, o) {
    const t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(i);
    var r;
    if (t) {
      r = {
        Type: 4,
        BottomTextId: t.Name,
        IconPath: t.Icon,
        QualityId: t.Quality
      };
      this.Apply(r);
      this.BindOnExtendToggleClicked(e => {
        var r = {
          Type: 0,
          Id: i,
          Index: o,
          QualityId: t.Quality,
          TitleId: t.Name,
          DescId: t.Desc,
          UseToggle: false,
          IsLevelUp: false
        };
        UiManager_1.UiManager.OpenView("SurvivorsCardTips", r);
      });
      this.BindOnCanExecuteChange(() => false);
    }
  }
}
exports.SurvivorsTalentTreeMediumItemGrid = SurvivorsTalentTreeMediumItemGrid;
//# sourceMappingURL=SurvivorsTalentTreeMediumItemGrid.js.map