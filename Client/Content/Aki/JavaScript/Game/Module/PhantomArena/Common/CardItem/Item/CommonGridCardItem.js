"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGridCardItem = undefined;
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CommonGridCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e, t, s) {}
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.CommonGridCardItem = CommonGridCardItem;
//# sourceMappingURL=CommonGridCardItem.js.map