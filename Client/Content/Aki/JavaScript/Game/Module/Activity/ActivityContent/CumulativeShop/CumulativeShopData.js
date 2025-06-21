"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CumulativeShopData = void 0;
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
class CumulativeShopData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.TaskDataMap = new Map, this.TaskTabMap = new Map
  }
  PhraseEx(t) {
    this.TaskDataMap.clear(), this.TaskTabMap.clear();
    for (const a of t.vm1.cMs) {
      this.TaskDataMap.set(a.s5n, a);
      var e = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(a.s5n).TaskTab;
      let t = this.TaskTabMap.get(e);
      (t = t || []).push(a.s5n), this.TaskTabMap.set(e, t)
    }
  }
  GetAnyTaskRedDot() {
    for (var [, t] of this.TaskDataMap)
      if (0 < t.DS_.ym1) return !0;
    return !1
  }
  GetTaskTabRedDot(t) {
    for (const e of this.TaskTabMap.get(t))
      if (0 < this.TaskDataMap.get(e).DS_.ym1) return !0;
    return !1
  }
  GetExDataRedPointShowState() {
    return this.GetAnyTaskRedDot()
  }
  GetTabTaskList(t) {
    t = this.TaskTabMap.get(t);
    return t?.sort((t, e) => {
      var a = this.TaskDataMap.get(t).DS_,
        r = this.TaskDataMap.get(e).DS_;
      return a.ym1 !== r.ym1 ? (0 < a.ym1 ? -1 : 1) - (0 < r.ym1 ? -1 : 1) : 0 === a.Sm1 && 0 === r.Sm1 ? t - e : (0 === a.Sm1 || a.mLs < a.Sm1 ? -1 : 1) - (0 === r.Sm1 || r.mLs < r.Sm1 ? -1 : 1)
    }), t ?? []
  }
}
exports.CumulativeShopData = CumulativeShopData;
//# sourceMappingURL=CumulativeShopData.js.map