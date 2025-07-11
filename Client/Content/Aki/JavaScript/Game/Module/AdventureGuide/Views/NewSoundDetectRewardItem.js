"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundDetectRewardItem = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class NewSoundDetectRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = -1;
  }
  OnRefresh(e) {
    var t = e.ItemData[0];
    var o = e.ItemData[1];
    this.Mne = t.ItemId;
    var t = e.HaveFinish;
    var e = {
      Data: e,
      Type: 4,
      IsReceivedVisible: t,
      ItemConfigId: this.Mne,
      BottomText: o > 0 ? "" + o : ""
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
}
exports.NewSoundDetectRewardItem = NewSoundDetectRewardItem;
//# sourceMappingURL=NewSoundDetectRewardItem.js.map