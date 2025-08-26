"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordChallengeMarkItem = undefined;
const GreatSwordChallengeMarkItemView_1 = require("../MarkItemView/GreatSwordChallengeMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class GreatSwordChallengeMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, a, i, o = 1) {
    super(e, r, t, a, i, o);
  }
  GetMarkItemViewType() {
    return 28;
  }
  CreateView() {
    return new GreatSwordChallengeMarkItemView_1.GreatSwordChallengeMarkItemView(this);
  }
  InitIcon() {
    this.UpdateIconPath();
  }
  UpdateIconPath() {
    this.IconPath = this.MarkConfig.UnlockMarkPic;
  }
}
exports.GreatSwordChallengeMarkItem = GreatSwordChallengeMarkItem;
//# sourceMappingURL=GreatSwordChallengeMarkItem.js.map