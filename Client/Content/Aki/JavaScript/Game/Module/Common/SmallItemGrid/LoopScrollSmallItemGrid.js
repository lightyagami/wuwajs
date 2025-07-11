"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoopScrollSmallItemGrid = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const SmallItemGrid_1 = require("./SmallItemGrid");
class LoopScrollSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.pbt = undefined;
  }
  Refresh(e, t, i) {
    this.OnRefresh(e, t, i);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  OnAddEvents() {
    this.pbt = (e, t) => {
      this.OnShowGridAnimation(e, t);
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowGridAnimation, this.pbt);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowGridAnimation, this.pbt);
    this.pbt = undefined;
  }
  OnShowGridAnimation(e, t) {
    if (e === this.GridIndex && this.IsSelected) {
      this.SetSelected(false);
      this.SetSelected(true);
    }
  }
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.LoopScrollSmallItemGrid = LoopScrollSmallItemGrid;
//# sourceMappingURL=LoopScrollSmallItemGrid.js.map