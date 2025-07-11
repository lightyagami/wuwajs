"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeliverMediumItemGrid = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class DeliverMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, r) {
    var t;
    var i;
    var l;
    if (e.HasItem()) {
      t = e.GetNeedCount();
      l = e.GetCurrentCount();
      i = {
        Data: e,
        Type: 4,
        ItemConfigId: e.GetCurrentItemConfigId()
      };
      if (e.GetItemRangeList().length > 1) {
        i.ReduceButtonInfo = {
          IsVisible: l > 0,
          LongPressConfigId: 1
        };
      }
      if (l < t) {
        i.BottomTextId = "DeliverSlotCountNotEnough";
        i.BottomTextParameter = [l, t];
      } else {
        i.BottomText = l + "/" + t;
      }
      this.Apply(i);
    } else {
      l = {
        Data: e,
        Type: 1,
        BottomText: e.GetCurrentCount() + "/" + e.GetNeedCount()
      };
      this.Apply(l);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    if (e.HasItem()) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.GetCurrentItemConfigId());
    }
  }
}
exports.DeliverMediumItemGrid = DeliverMediumItemGrid;
//# sourceMappingURL=DeliverMediumItemGrid.js.map