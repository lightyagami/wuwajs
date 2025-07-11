"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyAdventureSmallGridItem = undefined;
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
class DailyAdventureSmallGridItem extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  Refresh(e, t, i) {
    var l = e.Item;
    var s = l[1];
    this.Mne = l[0].ItemId;
    var l = {
      Data: e,
      Type: 4,
      ItemConfigId: this.Mne,
      BottomText: s > 0 ? "" + s : "",
      IsReceivedVisible: e.HasClaimed,
      IsReceivableVisible: t,
      IsLockVisible: i
    };
    this.Apply(l);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {}
}
exports.DailyAdventureSmallGridItem = DailyAdventureSmallGridItem;
//# sourceMappingURL=DailyAdventureSmallGridItem.js.map