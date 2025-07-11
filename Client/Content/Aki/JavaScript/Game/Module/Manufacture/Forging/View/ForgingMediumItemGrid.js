"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ForgingController_1 = require("../ForgingController");
class ForgingMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnRefresh(i, r, e) {
    var o = i.ItemId;
    var t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(o).ItemId;
    var l = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    if (l) {
      var n = i.IsUnlock;
      let e = false;
      e = n ? ForgingController_1.ForgingController.CheckCanForging(o) : ForgingController_1.ForgingController.CheckCanUnlock(o);
      o = {
        Type: 4,
        Data: i,
        ItemConfigId: t,
        BottomTextId: l.Name,
        IsProhibit: !n,
        IsNewVisible: i.IsNew,
        IsDisable: n > 0 && !e,
        IsRedDotVisible: e && !i.IsUnlock,
        StarLevel: l.QualityId,
        IsOmitBottomText: true,
        IsTimeFlagVisible: i.ExistEndTime > 0
      };
      this.Apply(o);
      this.SetSelected(r);
    }
  }
}
exports.ForgingMediumItemGrid = ForgingMediumItemGrid;
//# sourceMappingURL=ForgingMediumItemGrid.js.map