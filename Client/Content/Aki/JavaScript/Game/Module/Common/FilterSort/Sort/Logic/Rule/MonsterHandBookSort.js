"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonSort_1 = require("./CommonSort");
class MonsterHandBookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.VDt = (o, r, e) => {
      var o = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigById(o);
      var r = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigById(r);
      var t = o?.Type ?? 0;
      var n = r?.Type ?? 0;
      if (t !== n) {
        return (t - n) * (e ? 1 : -1);
      } else if ((t = o?.SortId ?? 0) !== (n = r?.SortId ?? 0)) {
        return (n - t) * (e ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.VDt);
  }
}
exports.MonsterHandBookSort = MonsterHandBookSort;
//# sourceMappingURL=MonsterHandBookSort.js.map