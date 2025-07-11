"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class CumulativeShopData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TaskDataMap = new Map();
    this.TaskTabMap = new Map();
  }
  PhraseEx(t) {
    this.TaskDataMap.clear();
    this.TaskTabMap.clear();
    for (const a of t.Vm1.cMs) {
      this.TaskDataMap.set(a.s5n, a);
      var e = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(a.s5n).TaskTab;
      let t = this.TaskTabMap.get(e);
      (t = t || []).push(a.s5n);
      this.TaskTabMap.set(e, t);
    }
  }
  GetAnyTaskRedDot() {
    for (var [, t] of this.TaskDataMap) {
      if (t.DS_.jm1 > 0) {
        return true;
      }
    }
    return false;
  }
  GetTaskTabRedDot(t) {
    for (const e of this.TaskTabMap.get(t)) {
      if (this.TaskDataMap.get(e).DS_.jm1 > 0) {
        return true;
      }
    }
    return false;
  }
  GetExDataRedPointShowState() {
    return this.GetAnyTaskRedDot();
  }
  GetTabTaskList(t) {
    t = this.TaskTabMap.get(t);
    t?.sort((t, e) => {
      var a = this.TaskDataMap.get(t).DS_;
      var r = this.TaskDataMap.get(e).DS_;
      if (a.jm1 !== r.jm1) {
        return (a.jm1 > 0 ? -1 : 1) - (r.jm1 > 0 ? -1 : 1);
      } else if (a.Hm1 === 0 && r.Hm1 === 0) {
        return t - e;
      } else {
        return (a.Hm1 === 0 || a.mLs < a.Hm1 ? -1 : 1) - (r.Hm1 === 0 || r.mLs < r.Hm1 ? -1 : 1);
      }
    });
    return t ?? [];
  }
}
exports.CumulativeShopData = CumulativeShopData;
//# sourceMappingURL=CumulativeShopData.js.map