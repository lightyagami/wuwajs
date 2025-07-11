"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySmallItemGrid = undefined;
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivitySmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(e, t, r) {
    this.Refresh(e);
  }
  Refresh(e) {
    var t = e.Item;
    var r = t[1];
    this.Mne = t[0].ItemId;
    var t = {
      Data: e,
      Type: 4,
      ItemConfigId: this.Mne,
      BottomText: r > 0 ? "" + r : "",
      IsReceivedVisible: e.HasClaimed
    };
    this.Apply(t);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
exports.ActivitySmallItemGrid = ActivitySmallItemGrid;
//# sourceMappingURL=ActivitySmallItemGrid.js.map