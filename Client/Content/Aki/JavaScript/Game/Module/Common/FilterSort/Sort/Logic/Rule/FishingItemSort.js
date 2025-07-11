"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingItem = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class FishingItem extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.lP_ = (e, t, r) => {
      var o = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(e.Id) ? 1 : 0;
      var s = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(t.Id) ? 1 : 0;
      if (o != s) {
        const n = o - s;
        if (r) {
          return n;
        } else {
          return -n;
        }
      }
      const n = t.HandBookId - e.HandBookId;
      if (r) {
        return n;
      } else {
        return -n;
      }
    };
    this.JV_ = (e, t, r) => {
      t = t.HandBookId - e.HandBookId;
      if (r) {
        return t;
      } else {
        return -t;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.lP_);
    this.SortMap.set(2, this.JV_);
  }
}
exports.FishingItem = FishingItem;
//# sourceMappingURL=FishingItemSort.js.map