"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCanvasManager = void 0;
class PhantomArenaCanvasManager {
  constructor() {
    this.AreaCanvasList = []
  }
  AddAreaCanvas(a) {
    this.AreaCanvasList.push(a)
  }
  ClearAreaCanvas() {
    this.AreaCanvasList = []
  }
  SortOrderAreaCanvas(a, s, e) {
    for (const r of this.AreaCanvasList) r.CheckCanvasSortOrder(a, s) && (r.HandleSortOrder(), r.ReceiveUiInteract?.(e))
  }
  ResetAreaCanvas() {
    for (const a of this.AreaCanvasList) a.CancelSortOrder(), a.ReceiveUiInteract?.(void 0)
  }
}
exports.PhantomArenaCanvasManager = PhantomArenaCanvasManager;
//# sourceMappingURL=PhantomArenaCanvasManager.js.map