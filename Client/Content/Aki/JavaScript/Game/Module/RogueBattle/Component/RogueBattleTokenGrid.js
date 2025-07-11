"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTokenGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RogueBattleTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SelectCallback = undefined;
  }
  OnRefresh(e, t, i) {
    var o = (this.Data = e).lIc;
    if (o &&= ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(o.v9n)) {
      e = {
        Type: 4,
        Data: e,
        IconPath: o.BuffIcon,
        QualityId: o.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        BottomTextId: o.BuffName
      };
      this.Apply(e);
    }
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.OnSelected(true);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (e) {
      this.SelectCallback?.(this.GridIndex, this.Data);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.RogueBattleTokenGrid = RogueBattleTokenGrid;
//# sourceMappingURL=RogueBattleTokenGrid.js.map