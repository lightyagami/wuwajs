"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class ComposeSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.ZDt = (r, e, t) => {
      if (r.SubType !== e.SubType) {
        return (e.SubType - r.SubType) * (t ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.zDt = (r, e, t) => {
      var o;
      if (e.IsUnlock !== r.IsUnlock) {
        o = e.IsUnlock - r.IsUnlock;
        if (t) {
          return o;
        } else {
          return -o;
        }
      } else if ((t = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(r) ? 0 : 1) != (o = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(e) ? 0 : 1)) {
        return t - o;
      } else {
        return r.SortId - e.SortId;
      }
    };
    this.KDt = (r, e, t) => {
      var o;
      if (e.IsUnlock !== r.IsUnlock) {
        o = e.IsUnlock - r.IsUnlock;
        if (t) {
          return o;
        } else {
          return -o;
        }
      } else if (r.Quality !== e.Quality) {
        return (e.Quality - r.Quality) * (t ? -1 : 1);
      } else {
        return r.SortId - e.SortId;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZDt);
    this.SortMap.set(2, this.zDt);
    this.SortMap.set(3, this.KDt);
  }
}
exports.ComposeSort = ComposeSort;
//# sourceMappingURL=ComposeSort.js.map