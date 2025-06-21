"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonGridCardItem = void 0;
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CommonGridCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments), this.ScrollViewDelegate = void 0, this.GridIndex = 0, this.DisplayIndex = 0
  }
  Refresh(e, t, s) {}
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex
  }
}
exports.CommonGridCardItem = CommonGridCardItem;
//# sourceMappingURL=CommonGridCardItem.js.map