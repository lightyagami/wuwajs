"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingSort = undefined;
const ForgingController_1 = require("../../../../../Manufacture/Forging/ForgingController");
const CommonSort_1 = require("./CommonSort");
class ForgingSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.zDt = (r, t, o) => {
      var n = ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(r.ItemId) ? 1 : 0;
      var e = ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(t.ItemId) ? 1 : 0;
      if (n == 1 && n == e) {
        if (r.IsUnlock === t.IsUnlock) {
          return r.SortId - t.SortId;
        }
        {
          const i = r.IsUnlock - t.IsUnlock;
          return i * (o ? -1 : 1);
        }
      }
      if (n == 0 && n == e) {
        if (r.IsUnlock === t.IsUnlock) {
          return r.SortId - t.SortId;
        }
        {
          const i = t.IsUnlock - r.IsUnlock;
          return i * (o ? -1 : 1);
        }
      }
      const i = e - n;
      return i * (o ? -1 : 1);
    };
    this.rje = (r, t, o) => {
      if (t.WeaponType !== r.WeaponType) {
        return (t.WeaponType - r.WeaponType) * (o ? -1 : 1);
      } else {
        return r.SortId - t.SortId;
      }
    };
    this.iRt = (r, t, o) => {
      if (r.ItemId !== t.ItemId) {
        return (t.ItemId - r.ItemId) * (o ? -1 : 1);
      } else {
        return r.SortId - t.SortId;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.zDt);
    this.SortMap.set(2, this.rje);
    this.SortMap.set(3, this.iRt);
  }
}
exports.ForgingSort = ForgingSort;
//# sourceMappingURL=ForgingSort.js.map