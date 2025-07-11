"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterItemData = undefined;
class FilterItemData {
  constructor(t = 0, s = undefined, e = undefined) {
    this.FilterId = t;
    this.Content = s;
    this.xst = e;
    this.rDt = true;
    this.NeedChangeColor = false;
  }
  SetIsShowIcon(t) {
    this.rDt = t;
  }
  GetIconPath() {
    if (this.rDt) {
      return this.xst;
    }
  }
}
exports.FilterItemData = FilterItemData;
//# sourceMappingURL=FilterData.js.map