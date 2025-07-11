"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRewardSmallGrid = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class DreamLinkRewardSmallGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.Mne = 0;
  }
  OnRefresh(e, r, t) {
    var l = (this.$Tt = e).Item;
    var o = l[1];
    this.Mne = l[0].ItemId;
    var l = {
      Data: e,
      Type: 4,
      ItemConfigId: this.Mne,
      BottomText: o > 0 ? "" + o : "",
      IsReceivedVisible: e.Status === 2
    };
    this.Apply(l);
    this.SetReceivableVisible(e.Status === 0);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    if (this.$Tt.Status === 0) {
      this.$Tt.ReceiveDelegate();
    } else {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
    }
  }
}
exports.DreamLinkRewardSmallGrid = DreamLinkRewardSmallGrid;
//# sourceMappingURL=DreamLinkRewardSmallGrid.js.map