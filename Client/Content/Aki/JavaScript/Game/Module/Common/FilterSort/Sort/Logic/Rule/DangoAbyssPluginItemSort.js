"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssPluginItemSort = void 0;
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class DangoAbyssPluginItemSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments), this.BU1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (t.GetRoleId() === e ? -1 : 1) - (s.GetRoleId() === e ? -1 : 1)
    }, this.kU1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (t.GetRoleId() !== e ? 1 : -1) - (s.GetRoleId() !== e ? 1 : -1)
    }, this.hr1 = (t, s, r) => {
      t = t.GetRoleId() - s.GetRoleId();
      return r ? t : -t
    }, this.KDt = (t, s, r) => {
      t = t.GetQuality() - s.GetQuality();
      return r ? t : -t
    }, this.tRt = (t, s, r) => {
      t = t.GetItemId() - s.GetItemId();
      return r ? t : -t
    }, this.OU1 = (t, s, r) => {
      return (t.GetIsLock() ? 1 : -1) - (s.GetIsLock() ? 1 : -1)
    }, this.Z$a = (t, s, r) => {
      return (t.GetIsDeprecated() ? -1 : 1) - (s.GetIsDeprecated() ? -1 : 1)
    }, this.qU1 = (t, s, r, ...e) => {
      e = e[0] ?? 0;
      return (ModelManager_1.ModelManager.DangoAbyssModel.IsPluginHasValidTag(e, t) ? -1 : 1) - (ModelManager_1.ModelManager.DangoAbyssModel.IsPluginHasValidTag(e, s) ? -1 : 1)
    }, this.uJ1 = (t, s, r) => {
      return t.GetRoleId() - s.GetRoleId()
    }
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.BU1), this.SortMap.set(2, this.kU1), this.SortMap.set(3, this.hr1), this.SortMap.set(4, this.KDt), this.SortMap.set(5, this.tRt), this.SortMap.set(6, this.OU1), this.SortMap.set(7, this.Z$a), this.SortMap.set(8, this.qU1), this.SortMap.set(9, this.uJ1)
  }
}
exports.DangoAbyssPluginItemSort = DangoAbyssPluginItemSort;
//# sourceMappingURL=DangoAbyssPluginItemSort.js.map