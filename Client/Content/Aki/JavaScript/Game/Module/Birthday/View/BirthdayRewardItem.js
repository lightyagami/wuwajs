"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayRewardItem = undefined;
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
class BirthdayRewardItem extends CommonItemSmallItemGrid_1.CommonItemSmallItemGrid {
  Refresh(e) {
    var t = e[0];
    var m = e[1];
    this.ConfigId = t.ItemId;
    var t = {
      Data: e,
      Type: 4,
      ItemConfigId: this.ConfigId,
      BottomText: m > 0 ? "" + m : "",
      IsReceivedVisible: this.ShowReceivedCallBack?.(e),
      IsBirthdayEffectVisible: this.GridIndex === 0
    };
    this.Apply(t);
  }
}
exports.BirthdayRewardItem = BirthdayRewardItem;
//# sourceMappingURL=BirthdayRewardItem.js.map