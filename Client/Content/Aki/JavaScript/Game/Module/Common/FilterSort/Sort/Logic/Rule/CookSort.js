"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookSort = undefined;
const CommonSort_1 = require("./CommonSort");
class CookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.ZDt = (t, s, r) => {
      if (t.SubType !== s.SubType) {
        return (s.SubType - t.SubType) * (r ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.zDt = (t, s, r) => {
      var o;
      if (s.IsUnLock !== t.IsUnLock) {
        o = s.IsUnLock ? 1 : -1;
        if (r) {
          return o;
        } else {
          return -o;
        }
      } else if (s.IsCook !== t.IsCook) {
        o = s.IsCook - t.IsCook;
        if (r) {
          return o;
        } else {
          return -o;
        }
      } else {
        return 0;
      }
    };
    this.eRt = (t, s, r) => {
      let o = 0;
      if (t.IsUnLock === s.IsUnLock) {
        o = s.IsMachining - t.IsMachining;
      } else if (t.IsUnLock) {
        o = -1;
      } else if (s.IsUnLock) {
        o = 1;
      }
      return o = r ? o : o * -1;
    };
    this.KDt = (t, s, r) => {
      if (t.Quality !== s.Quality) {
        return (s.Quality - t.Quality) * (r ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.tRt = (t, s, r) => {
      if (t.ItemId !== s.ItemId) {
        return t.ItemId - s.ItemId;
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZDt);
    this.SortMap.set(2, this.eRt);
    this.SortMap.set(3, this.KDt);
    this.SortMap.set(4, this.tRt);
    this.SortMap.set(5, this.zDt);
  }
}
exports.CookSort = CookSort;
//# sourceMappingURL=CookSort.js.map