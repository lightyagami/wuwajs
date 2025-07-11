"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventHighlightExploreUi = undefined;
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (!e) {
      this.FinishExecute(false);
    }
    var a = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(54);
    if (a) {
      var s = e;
      switch (s.Type) {
        case "Show":
          a.ShowHighlightExploreSkill(s.SkillType, s.Duration, s.IsSwitchBack, s.HighlightType);
          break;
        case "ToggleAndHighlightItem":
          a.ShowHighlightExploreSkill(s.SkillType, -1, true, s.HighlightType, s.ItemId, s.IsShowTips);
          break;
        case "Hide":
          a.HideHighlightExploreSkill();
      }
    }
  }
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
//# sourceMappingURL=LevelEventHighlightExploreUi.js.map