"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInteractionMediumItemGrid = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class ItemInteractionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.hPt = 0;
    this.WPt = undefined;
  }
  OnRefresh(e, t, i) {
    var s = (this.WPt = e).ItemConfigId;
    this.hPt = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s);
    var o = e.GetCurrentCount();
    var r = e.NeedCount;
    var s = {
      Data: e,
      Type: 4,
      ItemConfigId: s,
      IsDisable: !e.IsEnable()
    };
    if (o > 0) {
      s.BottomTextId = "ItemCountSelected";
      s.BottomTextParameter = [o, this.hPt];
      s.ReduceButtonInfo = {
        IsVisible: true,
        LongPressConfigId: 1
      };
    } else if (this.hPt < r) {
      s.BottomTextId = "ItemCountNotEnough";
      s.BottomTextParameter = [this.hPt];
    } else {
      s.BottomText = this.hPt.toString();
    }
    this.Apply(s);
    this.SetSelected(e.IsSelected);
  }
  OnSelected(e) {
    if (this.WPt) {
      this.WPt.IsSelected = true;
    }
    this.SetSelected(true);
  }
  OnDeselected(e) {
    if (this.WPt) {
      this.WPt.IsSelected = true;
    }
    this.SetSelected(false);
  }
}
exports.ItemInteractionMediumItemGrid = ItemInteractionMediumItemGrid;
//# sourceMappingURL=ItemInteractionMediumItemGrid.js.map