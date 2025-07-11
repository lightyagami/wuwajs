"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoverySlotGridItem = undefined;
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotGridItem extends VisionRecoverySlotItem_1.VisionRecoverySlotItem {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e) {
    this.RefreshUi(e);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.VisionRecoverySlotGridItem = VisionRecoverySlotGridItem;
//# sourceMappingURL=VisionRecoverySlotGridItem.js.map