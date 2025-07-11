"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeStructureSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class ComposeStructureSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.ZDt = (r, t, e) => {
      if (r.SubType !== t.SubType) {
        return (t.SubType - r.SubType) * (e ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.zDt = (r, t, e) => {
      var o = r.IsUnlock;
      var s = t.IsUnlock;
      if (o !== s) {
        if (e) {
          return s - o;
        } else {
          return o - s;
        }
      } else if ((e = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(r) ? 0 : 1) != (o = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(t) ? 0 : 1)) {
        return e - o;
      } else {
        return r.SortId - t.SortId;
      }
    };
    this.KDt = (r, t, e) => {
      var o;
      if (t.IsUnlock !== r.IsUnlock) {
        o = t.IsUnlock - r.IsUnlock;
        if (e) {
          return o;
        } else {
          return -o;
        }
      } else if (r.Quality !== t.Quality) {
        return (t.Quality - r.Quality) * (e ? -1 : 1);
      } else {
        return r.SortId - t.SortId;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZDt);
    this.SortMap.set(2, this.zDt);
    this.SortMap.set(3, this.KDt);
  }
}
exports.ComposeStructureSort = ComposeStructureSort;
//# sourceMappingURL=ComposeStructureSort.js.map