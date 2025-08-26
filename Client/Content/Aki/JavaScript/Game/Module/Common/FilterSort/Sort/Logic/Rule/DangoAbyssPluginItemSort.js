"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginItemSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class DangoAbyssPluginItemSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.cB1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (t.GetRoleId() === e ? -1 : 1) - (s.GetRoleId() === e ? -1 : 1);
    };
    this.dB1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (t.GetRoleId() !== e ? 1 : -1) - (s.GetRoleId() !== e ? 1 : -1);
    };
    this.Rr1 = (t, s, r) => {
      t = t.GetRoleId() - s.GetRoleId();
      if (r) {
        return t;
      } else {
        return -t;
      }
    };
    this.KDt = (t, s, r) => {
      t = t.GetQuality() - s.GetQuality();
      if (r) {
        return t;
      } else {
        return -t;
      }
    };
    this.tRt = (t, s, r) => {
      t = t.GetItemId() - s.GetItemId();
      if (r) {
        return t;
      } else {
        return -t;
      }
    };
    this.mB1 = (t, s, r) => {
      return (t.GetIsLock() ? 1 : -1) - (s.GetIsLock() ? 1 : -1);
    };
    this.Z$a = (t, s, r) => {
      return (t.GetIsDeprecated() ? -1 : 1) - (s.GetIsDeprecated() ? -1 : 1);
    };
    this.fB1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (ModelManager_1.ModelManager.DangoAbyssModel.IsPluginHasValidTag(e, t) ? -1 : 1) - (ModelManager_1.ModelManager.DangoAbyssModel.IsPluginHasValidTag(e, s) ? -1 : 1);
    };
    this.wZ1 = (t, s, r) => {
      return t.GetRoleId() - s.GetRoleId();
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.cB1);
    this.SortMap.set(2, this.dB1);
    this.SortMap.set(3, this.Rr1);
    this.SortMap.set(4, this.KDt);
    this.SortMap.set(5, this.tRt);
    this.SortMap.set(6, this.mB1);
    this.SortMap.set(7, this.Z$a);
    this.SortMap.set(8, this.fB1);
    this.SortMap.set(9, this.wZ1);
  }
}
exports.DangoAbyssPluginItemSort = DangoAbyssPluginItemSort;
//# sourceMappingURL=DangoAbyssPluginItemSort.js.map