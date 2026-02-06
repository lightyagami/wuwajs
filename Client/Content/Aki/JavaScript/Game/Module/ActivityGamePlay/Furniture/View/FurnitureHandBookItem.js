"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureHandBookItem = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class FurnitureHandBookItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRefresh(e, t, o) {
    e = {
      Type: 4,
      ItemConfigId: (this.fGt = e).FurnitureConfig.Id,
      IsLockVisible: e.IsLock,
      BottomTextId: e.FurnitureConfig.Name,
      Data: e,
      QualityId: e.FurnitureConfig.QualityId,
      IsRedDotVisible: e.RedDotVisible,
      IsDisable: e.IsLock
    };
    this.Apply(e);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (this.fGt?.RedDotVisible) {
      this.fGt.RedDotVisible = false;
      ControllerHolder_1.ControllerHolder.FurnitureController.SetFurnitureHandBookItemRedDotAsRead(this.fGt?.FurnitureConfig.Id ?? 0);
      this.SetRedDotVisible(false);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  GetKey() {
    return this.fGt?.FurnitureConfig.Id;
  }
}
exports.FurnitureHandBookItem = FurnitureHandBookItem;
//# sourceMappingURL=FurnitureHandBookItem.js.map