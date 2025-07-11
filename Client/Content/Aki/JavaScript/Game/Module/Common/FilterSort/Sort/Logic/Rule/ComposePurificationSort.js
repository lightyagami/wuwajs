"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposePurificationSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class ComposePurificationSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.zDt = (o, r, e) => {
      var t;
      var s;
      if (o.IsUnlock !== r.IsUnlock) {
        return (r.IsUnlock - o.IsUnlock) * (e ? -1 : 1);
      } else if ((s = o.IsUnlock) !== (t = r.IsUnlock)) {
        if (e) {
          return t - s;
        } else {
          return s - t;
        }
      } else if ((e = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(o) ? 0 : 1) != (s = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(r) ? 0 : 1)) {
        return e - s;
      } else {
        return o.SortId - r.SortId;
      }
    };
    this.KDt = (o, r, e) => {
      var t;
      if (r.IsUnlock !== o.IsUnlock) {
        t = r.IsUnlock - o.IsUnlock;
        if (e) {
          return t;
        } else {
          return -t;
        }
      } else if (o.Quality !== r.Quality) {
        return (r.Quality - o.Quality) * (e ? -1 : 1);
      } else {
        return o.ConfigId - r.ConfigId;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.zDt);
    this.SortMap.set(2, this.KDt);
  }
}
exports.ComposePurificationSort = ComposePurificationSort;
//# sourceMappingURL=ComposePurificationSort.js.map