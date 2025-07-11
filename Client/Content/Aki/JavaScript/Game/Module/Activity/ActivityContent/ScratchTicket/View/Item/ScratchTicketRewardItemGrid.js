"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketRewardItemGrid = undefined;
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class ScratchTicketRewardItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(e, r, t) {
    this.Refresh(e);
  }
  Refresh(e) {
    var r = e[0];
    var t = e[1];
    this.Mne = r.ItemId;
    var r = {
      Data: e,
      Type: 4,
      ItemConfigId: this.Mne,
      BottomText: t.toString(),
      IsReceivedVisible: t === 0
    };
    this.Apply(r);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
exports.ScratchTicketRewardItemGrid = ScratchTicketRewardItemGrid;
//# sourceMappingURL=ScratchTicketRewardItemGrid.js.map