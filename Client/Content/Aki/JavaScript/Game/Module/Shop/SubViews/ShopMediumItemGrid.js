"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopMediumItemGrid = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShopMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.ItemInfo = undefined;
  }
  OnRefresh(e, t, o) {
    if (e) {
      this.SetSelected(t, false);
      t = {
        Type: 4,
        Data: this.ItemInfo = e,
        ItemConfigId: e.ItemId,
        IsProhibit: e.IsLocked,
        StarLevel: e.ItemInfo.QualityId,
        BottomTextId: e.ItemInfo.Name,
        IsDisable: e.IsSoldOut(),
        IsOmitBottomText: true
      };
      this.Apply(t);
    }
  }
  OnSelected(e) {
    ModelManager_1.ModelManager.ShopModel.OpenItemInfo = this.ItemInfo;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenItemInfo);
    this.SetSelected(true, false);
  }
  OnDeselected(e) {
    this.SetSelected(false, false);
  }
}
exports.ShopMediumItemGrid = ShopMediumItemGrid;
//# sourceMappingURL=ShopMediumItemGrid.js.map