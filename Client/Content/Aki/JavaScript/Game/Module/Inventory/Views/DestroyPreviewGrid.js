"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyPreviewGrid = undefined;
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DestroyPreviewGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, o) {
    e = {
      Type: 4,
      Data: e,
      BottomText: e[1].toString(),
      ItemConfigId: e[0].ItemId
    };
    this.Apply(e);
    this.SetSelected(false);
  }
  OnStart() {
    this.BindOnCanExecuteChange(() => false);
  }
  OnSelected(e) {}
  OnDeselected(e) {}
}
exports.DestroyPreviewGrid = DestroyPreviewGrid;
//# sourceMappingURL=DestroyPreviewGrid.js.map