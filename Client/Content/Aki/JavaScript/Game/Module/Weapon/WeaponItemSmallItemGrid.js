"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponItemSmallItemGrid = undefined;
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class WeaponItemSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, l, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    e = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetItemId()
    };
    this.Apply(e);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.WeaponItemSmallItemGrid = WeaponItemSmallItemGrid;
//# sourceMappingURL=WeaponItemSmallItemGrid.js.map