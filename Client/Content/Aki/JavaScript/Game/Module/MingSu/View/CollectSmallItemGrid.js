"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectSmallItemGrid = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CollectSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, l, o) {
    var e = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemInfo.Id,
      BottomText: e.Count.toString()
    };
    this.Apply(e);
    var e = ModelManager_1.ModelManager.MingSuModel;
    var r = e.GetCurrentDragonPoolId();
    var t = e.CurrentPreviewLevel;
    var i = e.GetTargetDragonPoolLevelById(r);
    var a = e.GetTargetDragonPoolMaxLevelById(r);
    if (t === i + 1 || t === i && t === a) {
      if (e.GetTargetDragonPoolActiveById(r) === 2) {
        this.SetReceivedVisible(true);
        return;
      }
    } else if (t <= i) {
      this.SetReceivedVisible(true);
      return;
    }
    this.SetReceivedVisible(false);
  }
}
exports.CollectSmallItemGrid = CollectSmallItemGrid;
//# sourceMappingURL=CollectSmallItemGrid.js.map