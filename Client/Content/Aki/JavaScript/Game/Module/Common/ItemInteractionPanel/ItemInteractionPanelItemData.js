"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInteractionPanelItemData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class ItemInteractionPanelItemData {
  constructor(t, e) {
    this.ItemConfigId = 0;
    this.HPt = 0;
    this.hPt = 0;
    this.jPt = 0;
    this.NeedCount = 0;
    this.IsSelected = false;
    this.ItemConfigId = t.ItemConfigId;
    this.HPt = t.CurrentCount;
    t = t.NeedCount;
    if (t) {
      this.NeedCount = t;
    }
    this.jPt = e;
    this.hPt = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemConfigId);
  }
  SetCurrentCount(t) {
    this.HPt = t;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  GetItemCount() {
    return this.hPt;
  }
  IsEnable() {
    return this.hPt >= this.NeedCount;
  }
  GetQualityId() {
    return this.jPt;
  }
}
exports.ItemInteractionPanelItemData = ItemInteractionPanelItemData;
//# sourceMappingURL=ItemInteractionPanelItemData.js.map