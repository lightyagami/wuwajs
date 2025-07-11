"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTowerGuideRewardGrid = undefined;
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class ActivityTowerGuideRewardGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, i) {
    var l = {
      Type: 4,
      Data: e,
      IsLockVisible: e.IsLock,
      BottomText: e.Item[1].toString(),
      ItemConfigId: e.Item[0].ItemId,
      IsDisable: e.IsLock,
      IsReceivableVisible: e.IsReceivableVisible
    };
    this.Apply(l);
    this.SetDisableComponentColor("365988", e.IsLock);
    this.SetSelected(false);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.ActivityTowerGuideRewardGrid = ActivityTowerGuideRewardGrid;
//# sourceMappingURL=ActivityTowerGuideRewardGrid.js.map