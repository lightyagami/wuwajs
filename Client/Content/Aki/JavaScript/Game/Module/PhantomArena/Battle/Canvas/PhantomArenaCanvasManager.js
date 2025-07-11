"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCanvasManager = undefined;
class PhantomArenaCanvasManager {
  constructor() {
    this.AreaCanvasList = [];
  }
  AddAreaCanvas(a) {
    this.AreaCanvasList.push(a);
  }
  ClearAreaCanvas() {
    this.AreaCanvasList = [];
  }
  SortOrderAreaCanvas(a, s, e) {
    for (const r of this.AreaCanvasList) {
      if (r.CheckCanvasSortOrder(a, s)) {
        r.HandleSortOrder();
        r.ReceiveUiInteract?.(e);
      }
    }
  }
  ResetAreaCanvas() {
    for (const a of this.AreaCanvasList) {
      a.CancelSortOrder();
      a.ReceiveUiInteract?.(undefined);
    }
  }
}
exports.PhantomArenaCanvasManager = PhantomArenaCanvasManager;
//# sourceMappingURL=PhantomArenaCanvasManager.js.map