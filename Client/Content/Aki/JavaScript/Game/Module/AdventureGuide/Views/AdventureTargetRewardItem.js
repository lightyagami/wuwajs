"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureTargetRewardItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class AdventureTargetRewardItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.GetRolePositionFunc = undefined;
    this.IsHighlightIndex = undefined;
  }
  OnRefresh(e, t, r) {
    this.SetSelected(t);
    var t = e[0].ItemId;
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    if (o) {
      e = {
        Type: 4,
        Data: e,
        IsOmitBottomText: true,
        BottomText: e[1].toString(),
        ItemConfigId: t,
        StarLevel: o.QualityId
      };
      this.Apply(e);
    }
  }
  OnForceSelected() {
    this.SetSelected(true, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
}
exports.AdventureTargetRewardItem = AdventureTargetRewardItem;
//# sourceMappingURL=AdventureTargetRewardItem.js.map