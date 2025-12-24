"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventHighlightExploreUi = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (!e) {
      this.FinishExecute(false);
    }
    var r = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent();
    if (r) {
      var l = e;
      switch (l.Type) {
        case "Show":
          r.ShowHighlightExploreSkill(l.SkillType, l.Duration, l.IsSwitchBack, l.HighlightType);
          break;
        case "ToggleAndHighlightItem":
          r.ShowHighlightExploreSkill(l.SkillType, -1, true, l.HighlightType, l.ItemId, l.IsShowTips);
          break;
        case "Hide":
          r.HideHighlightExploreSkill();
      }
    }
  }
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
//# sourceMappingURL=LevelEventHighlightExploreUi.js.map