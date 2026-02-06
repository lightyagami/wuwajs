"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorWeaponExhibitGrid = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class SpringManorWeaponExhibitGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.qmg = undefined;
    this.$8i = undefined;
  }
  BindOnWeaponSelected(e) {
    this.qmg = e;
  }
  OnSelected() {
    this.SetSelected(true, false);
  }
  OnDeselected() {
    this.SetSelected(false, false);
  }
  OnRefresh(e, i, t) {
    this.$8i = e;
    var o = ConfigManager_1.ConfigManager.WeaponConfig?.GetWeaponConfigByItemId(e.ConfigId).WeaponName;
    var e = {
      Type: 4,
      ItemConfigId: e.ConfigId,
      IsCheckTick: e.IsSelected,
      BottomTextId: o
    };
    this.Apply(e);
    this.SetSelected(i, false);
  }
  OnExtendToggleStateChanged(e) {
    if (this.qmg && this.$8i) {
      this.qmg(this.$8i.ConfigId, this.GridIndex);
    }
  }
}
exports.SpringManorWeaponExhibitGrid = SpringManorWeaponExhibitGrid;
//# sourceMappingURL=SpringManorWeaponExhibitGrid.js.map